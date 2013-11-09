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

if (!defined('DC_CONTEXT_ADMIN')) { return; }

// dead but useful code, in order to have translations
__('TwentyTwenty').__('TwentyTwenty effect for before/after images');

$core->addBehavior('adminBlogPreferencesForm',array('twentyTwentyBehaviors','adminBlogPreferencesForm'));
$core->addBehavior('adminBeforeBlogSettingsUpdate',array('twentyTwentyBehaviors','adminBeforeBlogSettingsUpdate'));

class twentyTwentyBehaviors
{
	public static function adminBlogPreferencesForm($core,$settings)
	{
		$settings->addNameSpace('twentytwenty');
		echo
		'<div class="fieldset"><h4>TwentyTwenty</h4>'.
		'<p><label class="classic">'.
		form::checkbox('twentytwenty_enabled','1',$settings->twentytwenty->enabled).
		__('Enable TwentyTwenty').'</label></p>'.
		'</div>';
	}

	public static function adminBeforeBlogSettingsUpdate($settings)
	{
		$settings->addNameSpace('twentytwenty');
		$settings->twentytwenty->put('enabled',!empty($_POST['lightbox_enabled']),'boolean');
	}
}
