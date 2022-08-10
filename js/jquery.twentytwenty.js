/*global $ */
(() => {
  $.fn.twentytwenty = function (options) {
    var options = $.extend(
      {
        default_offset_pct: 0.5,
        orientation: 'horizontal',
        before_label: 'Before',
        after_label: 'After',
        no_overlay: false,
        move_slider_on_hover: false,
        move_with_handle_only: true,
        click_to_move: false,
      },
      options,
    );

    return this.each(function () {
      let sliderPct = options.default_offset_pct;
      const container = $(this);
      const sliderOrientation = options.orientation;
      const beforeDirection = sliderOrientation === 'vertical' ? 'down' : 'left';
      const afterDirection = sliderOrientation === 'vertical' ? 'up' : 'right';

      container.wrap(`<div class='twentytwenty-wrapper twentytwenty-${sliderOrientation}'></div>`);
      if (!options.no_overlay) {
        container.append("<div class='twentytwenty-overlay'></div>");
        const overlay = container.find('.twentytwenty-overlay');
        overlay.append(`<div class='twentytwenty-before-label' data-content='${options.before_label}'></div>`);
        overlay.append(`<div class='twentytwenty-after-label' data-content='${options.after_label}'></div>`);
      }
      const beforeImg = container.find('img:first');
      const afterImg = container.find('img:last');
      container.append("<div class='twentytwenty-handle'></div>");
      const slider = container.find('.twentytwenty-handle');
      slider.append(`<span class='twentytwenty-${beforeDirection}-arrow'></span>`);
      slider.append(`<span class='twentytwenty-${afterDirection}-arrow'></span>`);
      container.addClass('twentytwenty-container');
      beforeImg.addClass('twentytwenty-before');
      afterImg.addClass('twentytwenty-after');

      const calcOffset = (dimensionPct) => {
        const w = beforeImg.width();
        const h = beforeImg.height();
        return {
          w: `${w}px`,
          h: `${h}px`,
          cw: `${dimensionPct * w}px`,
          ch: `${dimensionPct * h}px`,
        };
      };

      const adjustContainer = (offset) => {
        if (sliderOrientation === 'vertical') {
          beforeImg.css('clip', `rect(0,${offset.w},${offset.ch},0)`);
          afterImg.css('clip', `rect(${offset.ch},${offset.w},${offset.h},0)`);
        } else {
          beforeImg.css('clip', `rect(0,${offset.cw},${offset.h},0)`);
          afterImg.css('clip', `rect(0,${offset.w},${offset.h},${offset.cw})`);
        }
        container.css('height', offset.h);
      };

      const adjustSlider = (pct) => {
        const offset = calcOffset(pct);
        slider.css(sliderOrientation === 'vertical' ? 'top' : 'left', sliderOrientation === 'vertical' ? offset.ch : offset.cw);
        adjustContainer(offset);
      };

      // Return the number specified or the min/max number if it outside the range given.
      const minMaxNumber = (num, min, max) => Math.max(min, Math.min(max, num));

      // Calculate the slider percentage based on the position.
      const getSliderPercentage = (positionX, positionY) => {
        const sliderPercentage =
          sliderOrientation === 'vertical' ? (positionY - offsetY) / imgHeight : (positionX - offsetX) / imgWidth;

        return minMaxNumber(sliderPercentage, 0, 1);
      };

      $(window).on('resize.twentytwenty', (e) => {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var offsetY = 0;
      var imgWidth = 0;
      var imgHeight = 0;
      const onMoveStart = (e) => {
        if (
          ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) &&
          sliderOrientation !== 'vertical'
        ) {
          e.preventDefault();
        } else if (
          ((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) &&
          sliderOrientation === 'vertical'
        ) {
          e.preventDefault();
        }
        container.addClass('active');
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width();
        imgHeight = beforeImg.height();
      };
      const onMove = (e) => {
        if (container.hasClass('active')) {
          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        }
      };
      const onMoveEnd = () => {
        container.removeClass('active');
      };

      const moveTarget = options.move_with_handle_only ? slider : container;
      moveTarget.on('movestart', onMoveStart);
      moveTarget.on('move', onMove);
      moveTarget.on('moveend', onMoveEnd);

      if (options.move_slider_on_hover) {
        container.on('mouseenter', onMoveStart);
        container.on('mousemove', onMove);
        container.on('mouseleave', onMoveEnd);
      }

      slider.on('touchmove', (e) => {
        e.preventDefault();
      });

      container.find('img').on('mousedown', (event) => {
        event.preventDefault();
      });

      if (options.click_to_move) {
        container.on('click', (e) => {
          offsetX = container.offset().left;
          offsetY = container.offset().top;
          imgWidth = beforeImg.width();
          imgHeight = beforeImg.height();

          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        });
      }

      $(window).trigger('resize.twentytwenty');
    });
  };
})();
