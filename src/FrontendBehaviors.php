<?php
/**
 * @brief twentytwenty, a plugin for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Plugins
 *
 * @author Franck Paul and contributors
 *
 * @copyright Franck Paul carnet.franck.paul@gmail.com
 * @copyright GPL-2.0 https://www.gnu.org/licenses/gpl-2.0.html
 */
declare(strict_types=1);

namespace Dotclear\Plugin\twentytwenty;

use dcCore;
use dcUtils;

class FrontendBehaviors
{
    public static function publicHeadContent()
    {
        if (!dcCore::app()->blog->settings->twentytwenty->enabled) {
            return;
        }

        echo
        dcUtils::cssModuleLoad(My::id() . '/css/twentytwenty.css') .
        '<style type="text/css">' . "\n" .
        '.twentytwenty-before-label:before { content: "' . __('Before') . '"; }' . "\n" .
        '.twentytwenty-after-label:before { content: "' . __('After') . '"; }' . "\n" .
            "</style>\n";
        echo
        dcUtils::jsModuleLoad(My::id() . '/js/jquery.event.move.js') .
        dcUtils::jsModuleLoad(My::id() . '/js/jquery.twentytwenty.js') .
        dcUtils::jsModuleLoad(My::id() . '/js/main.js');
    }
}
