<?php
# -- BEGIN LICENSE BLOCK ----------------------------------
# This file is part of TwentyTwenty, a plugin for Dotclear 2.
#
# Copyright (c) Franck Paul and contributors
#
# Licensed under the GPL version 2.0 license.
# A copy of this license is available in LICENSE file or at
# http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
# -- END LICENSE BLOCK ------------------------------------

if (!defined('DC_RC_PATH')) { return; }

$this->registerModule(
	/* Name */				"TwentyTwenty",
	/* Description*/		"TwentyTwenty effect for before/after images",
	/* Author */			"Franck Paul and contributors",
	/* Version */			"0.2",
	array(
		/* Permissions */	'permissions' =>	'admin',
		/* Type */			'type' =>			'plugin'
	)
);
