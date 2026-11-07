<?php

/**
 * @brief TwentyTwenty, a plugin for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Plugins
 *
 * @author Franck Paul
 *
 * @copyright Franck Paul contact@open-time.net
 * @copyright GPL-2.0 https://www.gnu.org/licenses/gpl-2.0.html
 */
declare(strict_types=1);

if (isset($this) && is_object($this) && method_exists($this, 'registerModule') && isset($this->id) && is_string($this->id)) {
    $this->registerModule(
        'TwentyTwenty',
        'TwentyTwenty effect for before/after images',
        'Franck Paul and contributors',
        '6.1',
        [
            'date'        => '2026-11-07T17:08:49+0100',
            'requires'    => [['core', '2.39']],
            'permissions' => 'My',
            'type'        => 'plugin',
            'settings'    => [
                'blog' => '#params.twentytwenty',
            ],

            'details'    => 'https://open-time.net/?q=twentytwenty',
            'support'    => 'https://github.com/franck-paul/twentytwenty',
            'repository' => 'https://raw.githubusercontent.com/franck-paul/twentytwenty/main/dcstore.xml',
            'license'    => 'gpl2',
        ]
    );
}
