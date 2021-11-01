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

$this->registerModule(
    'TwentyTwenty',                                // Name
    'TwentyTwenty effect for before/after images', // Description
    'Franck Paul and contributors',                // Author
    '0.3',                                         // Version
    [
        'requires'    => [['core', '2.16']],                            // Dependencies
        'permissions' => 'admin',                                       // Permissions
        'type'        => 'plugin',                                      // Type
        'settings'    => ['blog' => '#params.twentytwenty'],            // Settings

        'details'    => 'https://open-time.net/?q=twentytwenty',       // Details URL
        'support'    => 'https://github.com/franck-paul/twentytwenty', // Support URL
        'repository' => 'https://raw.githubusercontent.com/franck-paul/twentytwenty/master/dcstore.xml'
    ]
);
