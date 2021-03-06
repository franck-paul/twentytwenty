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

if (!defined('DC_CONTEXT_ADMIN')) {return;}

// dead but useful code, in order to have translations
__('TwentyTwenty') . __('TwentyTwenty effect for before/after images');

$core->addBehavior('adminBlogPreferencesForm', ['twentyTwentyBehaviors', 'adminBlogPreferencesForm']);
$core->addBehavior('adminBeforeBlogSettingsUpdate', ['twentyTwentyBehaviors', 'adminBeforeBlogSettingsUpdate']);

class twentyTwentyBehaviors
{
    public static function adminBlogPreferencesForm($core, $settings)
    {
        $settings->addNameSpace('twentytwenty');
        echo
        '<div class="fieldset"><h4 id="twentytwenty">TwentyTwenty</h4>' .
        '<p><label class="classic">' .
        form::checkbox('twentytwenty_enabled', '1', $settings->twentytwenty->enabled) .
        __('Enable TwentyTwenty') . '</label></p>' .
        '<p class="clear form-note">' . __('Note that this feature requires jQuery 3+.') . '</p>' .
            '</div>';
    }

    public static function adminBeforeBlogSettingsUpdate($settings)
    {
        $settings->addNameSpace('twentytwenty');
        $settings->twentytwenty->put('enabled', !empty($_POST['twentytwenty_enabled']), 'boolean');
    }
}
