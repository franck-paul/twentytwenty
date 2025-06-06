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
$this->registerModule(
    'TwentyTwenty',
    'TwentyTwenty effect for before/after images',
    'Franck Paul and contributors',
    '4.3',
    [
        'date'        => '2025-06-04T12:11:35+0200',
        'requires'    => [['core', '2.28']],
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
