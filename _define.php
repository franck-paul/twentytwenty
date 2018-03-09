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

$this->registerModule(
    "TwentyTwenty",                                // Name
    "TwentyTwenty effect for before/after images", // Description
    "Franck Paul and contributors",                // Author
    "0.3",                                         // Version
    array(
        'requires'    => array(array('core', '2.9')), // Dependencies
        'permissions' => 'admin',                     // Permissions
        'type'        => 'plugin'                    // Type
    )
);
