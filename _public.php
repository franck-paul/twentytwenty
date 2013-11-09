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

$core->addBehavior('publicHeadContent',array('twentyTwentyPublic','publicHeadContent'));

class twentyTwentyPublic
{
	public static function publicHeadContent($core)
	{
		$core->blog->settings->addNameSpace('twentytwenty');
		if (!$core->blog->settings->twentytwenty->enabled) {
			return;
		}

		$url = $core->blog->getQmarkURL().'pf='.basename(dirname(__FILE__));
		echo
		'<style type="text/css">'."\n".
		'@import url('.$url.'/css/twentytwenty.css);'."\n".
		"</style>\n".
		'<script type="text/javascript" src="'.$url.'/js/jquery.min.js"></script>'."\n".
		'<script type="text/javascript" src="'.$url.'/js/jquery.event.move.min.js"></script>'."\n".
		'<script type="text/javascript" src="'.$url.'/js/jquery.twentytwenty.min.js"></script>'."\n".
		'<script type="text/javascript">'."\n".
		"//<![CDATA[\n".
		'$(window).load(function(){'."\n".
			'$(".twentytwenty-container").twentytwenty();'."\n".
		'});'."\n".
		"\n//]]>\n".
		"</script>\n";
	}
}
