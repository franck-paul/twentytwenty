<?php
/**
 * @brief TwentyTwenty, a plugin for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Plugins
 *
 * @author Franck Paul
 *
 * @copyright Franck Paul carnet.franck.paul@gmail.com
 * @copyright GPL-2.0 https://www.gnu.org/licenses/gpl-2.0.html
 */
if (!defined('DC_RC_PATH')) {
    return;
}

class twentyTwentyPublic
{
    public static function publicHeadContent()
    {
        dcCore::app()->blog->settings->addNameSpace('twentytwenty');
        if (!dcCore::app()->blog->settings->twentytwenty->enabled) {
            return;
        }

        echo
        dcUtils::cssModuleLoad('twentytwenty/css/twentytwenty.css') .
        '<style type="text/css">' . "\n" .
        '.twentytwenty-before-label:before { content: "' . __('Before') . '"; }' . "\n" .
        '.twentytwenty-after-label:before { content: "' . __('After') . '"; }' . "\n" .
            "</style>\n";
        echo
        dcUtils::jsModuleLoad('twentytwenty/js/jquery.event.move.js') .
        dcUtils::jsModuleLoad('twentytwenty/js/jquery.twentytwenty.js') .
        dcUtils::jsModuleLoad('twentytwenty/js/main.js');
    }
}

dcCore::app()->addBehavior('publicHeadContent', [twentyTwentyPublic::class, 'publicHeadContent']);
