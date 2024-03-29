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

use Dotclear\App;
use Dotclear\Helper\Html\Form\Checkbox;
use Dotclear\Helper\Html\Form\Fieldset;
use Dotclear\Helper\Html\Form\Label;
use Dotclear\Helper\Html\Form\Legend;
use Dotclear\Helper\Html\Form\Para;
use Dotclear\Helper\Html\Form\Text;

class BackendBehaviors
{
    public static function adminBlogPreferencesForm(): string
    {
        $settings = My::settings();

        echo
        (new Fieldset('twentytwenty'))
        ->legend((new Legend(__('TwentyTwenty'))))
        ->fields([
            (new Para())->items([
                (new Checkbox('twentytwenty_enabled', $settings->enabled))
                    ->value(1)
                    ->label((new Label(__('Enable TwentyTwenty'), Label::INSIDE_TEXT_AFTER))),
            ]),
            (new Para())->class('clear form-note warn')->items([
                (new Text(null, __('Note that this feature requires jQuery 3+.'))),
            ]),
        ])
        ->render();

        return '';
    }

    public static function adminBeforeBlogSettingsUpdate(): string
    {
        $settings = My::settings();
        $settings->put('enabled', !empty($_POST['twentytwenty_enabled']), App::blogWorkspace()::NS_BOOL);

        return '';
    }
}
