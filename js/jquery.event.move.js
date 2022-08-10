// DOM.event.move
//
// 2.0.0
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:     Page coordinates of pointer.
// startX:
// startY:    Page coordinates of pointer at movestart.
// distX:
// distY:     Distance the pointer has moved since movestart.
// deltaX:
// deltaY:    Distance the finger has moved since last event.
// velocityX:
// velocityY: Average velocity over last few events.

(() => {
  const fn = () => {
    const assign = Object.assign || (window.jQuery && jQuery.extend);

    // Number of pixels a pressed pointer travels before movestart
    // event is fired.
    const threshold = 8;

    // Shim for requestAnimationFrame, falling back to timer. See:
    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    const requestFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (fn, element) {
        return window.setTimeout(() => {
          fn();
        }, 25);
      };

    // Shim for customEvent
    // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    (() => {
      if (typeof window.CustomEvent === 'function') return false;
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }

      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    })();

    const ignoreTags = {
      textarea: true,
      input: true,
      select: true,
      button: true,
    };

    const mouseevents = {
      move: 'mousemove',
      cancel: 'mouseup dragstart',
      end: 'mouseup',
    };

    const touchevents = {
      move: 'touchmove',
      cancel: 'touchend',
      end: 'touchend',
    };

    const rspaces = /\s+/;

    // DOM Events

    const eventOptions = { bubbles: true, cancelable: true };

    const eventsSymbol = typeof Symbol === 'function' ? Symbol('events') : {};

    function createEvent(type) {
      return new CustomEvent(type, eventOptions);
    }

    function getEvents(node) {
      return node[eventsSymbol] || (node[eventsSymbol] = {});
    }

    function on(node, types, fn, data, selector) {
      types = types.split(rspaces);

      const events = getEvents(node);
      let i = types.length;
      let handlers;
      let type;

      function handler(e) {
        fn(e, data);
      }

      while (i--) {
        type = types[i];
        handlers = events[type] || (events[type] = []);
        handlers.push([fn, handler]);
        node.addEventListener(type, handler);
      }
    }

    function off(node, types, fn, selector) {
      types = types.split(rspaces);

      const events = getEvents(node);
      let i = types.length;
      let type;
      let handlers;
      let k;

      if (!events) {
        return;
      }

      while (i--) {
        type = types[i];
        handlers = events[type];
        if (!handlers) {
          continue;
        }
        k = handlers.length;
        while (k--) {
          if (handlers[k][0] === fn) {
            node.removeEventListener(type, handlers[k][1]);
            handlers.splice(k, 1);
          }
        }
      }
    }

    function trigger(node, type, properties) {
      // Don't cache events. It prevents you from triggering an event of a
      // given type from inside the handler of another event of that type.
      const event = createEvent(type);
      if (properties) {
        assign(event, properties);
      }
      node.dispatchEvent(event);
    }

    // Constructors

    function Timer(fn) {
      let callback = fn;
      let active = false;
      let running = false;

      function trigger(time) {
        if (active) {
          callback();
          requestFrame(trigger);
          running = true;
          active = false;
        } else {
          running = false;
        }
      }

      this.kick = (fn) => {
        active = true;
        if (!running) {
          trigger();
        }
      };

      this.end = (fn) => {
        const cb = callback;

        if (!fn) {
          return;
        }

        // If the timer is not running, simply call the end callback.
        if (!running) {
          fn();
        }
        // If the timer is running, and has been kicked lately, then
        // queue up the current callback and the end callback, otherwise
        // just the end callback.
        else {
          callback = active
            ? () => {
                cb();
                fn();
              }
            : fn;

          active = true;
        }
      };
    }

    // Functions

    function noop() {}

    function preventDefault(e) {
      e.preventDefault();
    }

    function isIgnoreTag(e) {
      return !!ignoreTags[e.target.tagName.toLowerCase()];
    }

    function isPrimaryButton(e) {
      // Ignore mousedowns on any button other than the left (or primary)
      // mouse button, or when a modifier key is pressed.
      return e.which === 1 && !e.ctrlKey && !e.altKey;
    }

    function identifiedTouch(touchList, id) {
      let i;
      let l;

      if (touchList.identifiedTouch) {
        return touchList.identifiedTouch(id);
      }

      // touchList.identifiedTouch() does not exist in
      // webkit yet… we must do the search ourselves...

      i = -1;
      l = touchList.length;

      while (++i < l) {
        if (touchList[i].identifier === id) {
          return touchList[i];
        }
      }
    }

    function changedTouch(e, data) {
      const touch = identifiedTouch(e.changedTouches, data.identifier);

      // This isn't the touch you're looking for.
      if (!touch) {
        return;
      }

      // Chrome Android (at least) includes touches that have not
      // changed in e.changedTouches. That's a bit annoying. Check
      // that this touch has changed.
      if (touch.pageX === data.pageX && touch.pageY === data.pageY) {
        return;
      }

      return touch;
    }

    // Handlers that decide when the first movestart is triggered

    function mousedown(e) {
      // Ignore non-primary buttons
      if (!isPrimaryButton(e)) {
        return;
      }

      // Ignore form and interactive elements
      if (isIgnoreTag(e)) {
        return;
      }

      on(document, mouseevents.move, mousemove, e);
      on(document, mouseevents.cancel, mouseend, e);
    }

    function mousemove(e, data) {
      checkThreshold(e, data, e, removeMouse);
    }

    function mouseend(e, data) {
      removeMouse();
    }

    function removeMouse() {
      off(document, mouseevents.move, mousemove);
      off(document, mouseevents.cancel, mouseend);
    }

    function touchstart(e) {
      // Don't get in the way of interaction with form elements
      if (ignoreTags[e.target.tagName.toLowerCase()]) {
        return;
      }

      const touch = e.changedTouches[0];

      // iOS live updates the touch objects whereas Android gives us copies.
      // That means we can't trust the touchstart object to stay the same,
      // so we must copy the data. This object acts as a template for
      // movestart, move and moveend event objects.
      const data = {
        target: touch.target,
        pageX: touch.pageX,
        pageY: touch.pageY,
        identifier: touch.identifier,

        // The only way to make handlers individually unbindable is by
        // making them unique.
        touchmove(e, data) {
          touchmove(e, data);
        },
        touchend(e, data) {
          touchend(e, data);
        },
      };

      on(document, touchevents.move, data.touchmove, data);
      on(document, touchevents.cancel, data.touchend, data);
    }

    function touchmove(e, data) {
      const touch = changedTouch(e, data);
      if (!touch) {
        return;
      }
      checkThreshold(e, data, touch, removeTouch);
    }

    function touchend(e, data) {
      const touch = identifiedTouch(e.changedTouches, data.identifier);
      if (!touch) {
        return;
      }
      removeTouch(data);
    }

    function removeTouch(data) {
      off(document, touchevents.move, data.touchmove);
      off(document, touchevents.cancel, data.touchend);
    }

    function checkThreshold(e, data, touch, fn) {
      const distX = touch.pageX - data.pageX;
      const distY = touch.pageY - data.pageY;

      // Do nothing if the threshold has not been crossed.
      if (distX * distX + distY * distY < threshold * threshold) {
        return;
      }

      triggerStart(e, data, touch, distX, distY, fn);
    }

    function triggerStart(e, data, touch, distX, distY, fn) {
      const touches = e.targetTouches;
      const time = e.timeStamp - data.timeStamp;

      // Create a movestart object with some special properties that
      // are passed only to the movestart handlers.
      const template = {
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        startX: data.pageX,
        startY: data.pageY,
        distX,
        distY,
        deltaX: distX,
        deltaY: distY,
        pageX: touch.pageX,
        pageY: touch.pageY,
        velocityX: distX / time,
        velocityY: distY / time,
        identifier: data.identifier,
        targetTouches: touches,
        finger: touches ? touches.length : 1,
        enableMove() {
          this.moveEnabled = true;
          this.enableMove = noop;
          e.preventDefault();
        },
      };

      // Trigger the movestart event.
      trigger(data.target, 'movestart', template);

      // Unbind handlers that tracked the touch or mouse up till now.
      fn(data);
    }

    // Handlers that control what happens following a movestart

    function activeMousemove(e, data) {
      const { timer } = data;

      data.touch = e;
      data.timeStamp = e.timeStamp;
      timer.kick();
    }

    function activeMouseend(e, data) {
      const { target, event, timer } = data;

      removeActiveMouse();

      endEvent(target, event, timer, () => {
        // Unbind the click suppressor, waiting until after mouseup
        // has been handled.
        setTimeout(() => {
          off(target, 'click', preventDefault);
        }, 0);
      });
    }

    function removeActiveMouse() {
      off(document, mouseevents.move, activeMousemove);
      off(document, mouseevents.end, activeMouseend);
    }

    function activeTouchmove(e, data) {
      const { event, timer } = data;
      const touch = changedTouch(e, event);

      if (!touch) {
        return;
      }

      // Stop the interface from gesturing
      e.preventDefault();

      event.targetTouches = e.targetTouches;
      data.touch = touch;
      data.timeStamp = e.timeStamp;

      timer.kick();
    }

    function activeTouchend(e, data) {
      const { target, event, timer } = data;
      const touch = identifiedTouch(e.changedTouches, event.identifier);

      // This isn't the touch you're looking for.
      if (!touch) {
        return;
      }

      removeActiveTouch(data);
      endEvent(target, event, timer);
    }

    function removeActiveTouch(data) {
      off(document, touchevents.move, data.activeTouchmove);
      off(document, touchevents.end, data.activeTouchend);
    }

    // Logic for triggering move and moveend events

    function updateEvent(event, touch, timeStamp) {
      const time = timeStamp - event.timeStamp;

      event.distX = touch.pageX - event.startX;
      event.distY = touch.pageY - event.startY;
      event.deltaX = touch.pageX - event.pageX;
      event.deltaY = touch.pageY - event.pageY;

      // Average the velocity of the last few events using a decay
      // curve to even out spurious jumps in values.
      event.velocityX = 0.3 * event.velocityX + (0.7 * event.deltaX) / time;
      event.velocityY = 0.3 * event.velocityY + (0.7 * event.deltaY) / time;
      event.pageX = touch.pageX;
      event.pageY = touch.pageY;
    }

    function endEvent(target, event, timer, fn) {
      timer.end(() => {
        trigger(target, 'moveend', event);
        return fn?.();
      });
    }

    // Set up the DOM

    function movestart(e) {
      if (e.defaultPrevented) {
        return;
      }
      if (!e.moveEnabled) {
        return;
      }

      const event = {
        startX: e.startX,
        startY: e.startY,
        pageX: e.pageX,
        pageY: e.pageY,
        distX: e.distX,
        distY: e.distY,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        velocityX: e.velocityX,
        velocityY: e.velocityY,
        identifier: e.identifier,
        targetTouches: e.targetTouches,
        finger: e.finger,
      };

      const data = {
        target: e.target,
        event,
        timer: new Timer(update),
        touch: undefined,
        timeStamp: e.timeStamp,
      };

      function update(time) {
        updateEvent(event, data.touch, data.timeStamp);
        trigger(data.target, 'move', event);
      }

      if (e.identifier === undefined) {
        // We're dealing with a mouse event.
        // Stop clicks from propagating during a move
        on(e.target, 'click', preventDefault);
        on(document, mouseevents.move, activeMousemove, data);
        on(document, mouseevents.end, activeMouseend, data);
        return;
      }
      // In order to unbind correct handlers they have to be unique
      data.activeTouchmove = (e, data) => {
        activeTouchmove(e, data);
      };
      data.activeTouchend = (e, data) => {
        activeTouchend(e, data);
      };

      // We're dealing with a touch.
      on(document, touchevents.move, data.activeTouchmove, data);
      on(document, touchevents.end, data.activeTouchend, data);
    }

    on(document, 'mousedown', mousedown);
    on(document, 'touchstart', touchstart);
    on(document, 'movestart', movestart);

    // jQuery special events
    //
    // jQuery event objects are copies of DOM event objects. They need
    // a little help copying the move properties across.

    if (!window.jQuery) {
      return;
    }

    const properties = 'startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY'.split(' ');

    function enableMove1(e) {
      e.enableMove();
    }
    function enableMove2(e) {
      e.enableMove();
    }
    function enableMove3(e) {
      e.enableMove();
    }

    function add(handleObj) {
      const { handler } = handleObj;

      handleObj.handler = function (e) {
        // Copy move properties across from originalEvent
        let i = properties.length;
        let property;

        while (i--) {
          property = properties[i];
          e[property] = e.originalEvent[property];
        }

        handler.apply(this, arguments);
      };
    }

    jQuery.event.special.movestart = {
      setup() {
        // Movestart must be enabled to allow other move events
        on(this, 'movestart', enableMove1);

        // Do listen to DOM events
        return false;
      },

      teardown() {
        off(this, 'movestart', enableMove1);
        return false;
      },

      add,
    };

    jQuery.event.special.move = {
      setup() {
        on(this, 'movestart', enableMove2);
        return false;
      },

      teardown() {
        off(this, 'movestart', enableMove2);
        return false;
      },

      add,
    };

    jQuery.event.special.moveend = {
      setup() {
        on(this, 'movestart', enableMove3);
        return false;
      },

      teardown() {
        off(this, 'movestart', enableMove3);
        return false;
      },

      add,
    };
  };
  if (typeof define === 'function' && define.amd) {
    define([], fn);
  } else if (typeof module !== 'undefined' && module !== null && module.exports) {
    module.exports = fn;
  } else {
    fn();
  }
})();
