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

if (!defined('DC_RC_PATH')) {return;}

$core->addBehavior('publicHeadContent', array('twentyTwentyPublic', 'publicHeadContent'));

class twentyTwentyPublic
{
    public static function publicHeadContent($core)
    {
        $core->blog->settings->addNameSpace('twentytwenty');
        if (!$core->blog->settings->twentytwenty->enabled) {
            return;
        }

        echo
        dcUtils::cssLoad($core->blog->getPF('twentytwenty/css/twentytwenty.css')) .
        '<style type="text/css">' . "\n" .
        '.twentytwenty-before-label:before { content: "' . __('Before') . '"; }' . "\n" .
        '.twentytwenty-after-label:before { content: "' . __('After') . '"; }' . "\n" .
            "</style>\n";
        if ($core->blog->settings->twentytwenty->jquery) {
            echo
            dcUtils::jsLoad($core->blog->getPF('twentytwenty/js/jquery.min.js')) .
            dcUtils::jsLoad($core->blog->getPF('twentytwenty/js/jquery.cookie.min.js'));
        }
        echo
        dcUtils::jsLoad($core->blog->getPF('twentytwenty/js/jquery.event.move.min.js')) .
        dcUtils::jsLoad($core->blog->getPF('twentytwenty/js/jquery.twentytwenty.min.js')) .
            '<script type="text/javascript">' . "\n" .
            '$(window).load(function(){' . "\n" .
            '$(".twentytwenty-container").twentytwenty();' . "\n" .
            '});' . "\n" .
            "</script>\n";
    }
}
