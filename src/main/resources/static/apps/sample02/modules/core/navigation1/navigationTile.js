(function() {
	'use strict';

	angular.module('singApp.core')
		.directive('navbarLeft', navbarLeft)
		.directive('navbarRight', navbarRight);

	function navbarLeft() {
		
		var tmpl = '<ul class="nav navbar-nav">'
					+'<li>'
					+	'<!-- whether to automatically collapse sidebar on mouseleave. If activated acts more like usual admin templates -->'
					+	'<a class="hidden-sm hidden-xs" href="#" data-sn-action="toggle-navigation-state" title="Turn on/off sidebar collapsing" data-placement="bottom" data-tooltip>'
					+	'<i class="fa fa-bars fa-lg"></i>'
					+	'</a>'
					+	'<!-- shown on xs & sm screen. collapses and expands navigation -->'
					+	'<a class="visible-sm visible-xs" data-sn-action="toggle-navigation-collapse-state" href="#" title="Show/hide sidebar" data-placement="bottom" data-tooltip>'
					+	'<span class="rounded rounded-lg bg-gray text-white visible-xs"><i class="fa fa-bars fa-lg"></i></span>'
					+	'<i class="fa fa-bars fa-lg hidden-xs"></i>'
					+	'</a>'
					+'</li>'
					+'</ul>'
		
		return {
			restrict: 'E',			
			template: tmpl
		}
		
		

	}
	
	function navbarRight() {
		
		var tmpl = '<!-- this part is hidden for xs screens -->'
			+'<div class="collapse navbar-collapse">'			
			+'<!-- search form! link it to your search server -->'
			+'<form class="navbar-form navbar-left" role="search">'
			+'<div class="form-group">'
			+'<div class="input-group input-group-no-border">'
			+'<span class="input-group-addon">'
			+'<i class="fa fa-search"></i>'
			+'</span>'
			+'<input class="form-control" type="text" placeholder="Search Dashboard">'
			+'</div>'
			+'</div>'
			+'</form>'
			+'<ul class="nav navbar-nav navbar-right">'
			+'<li class="dropdown" dropdown>'
			+'<a dropdown-toggle class="dropdown-toggle dropdown-toggle-notifications"'
			+'id="notifications-dropdown-toggle">'
			+'<span class="thumb-sm avatar pull-left">'
			+'<img class="img-circle" src="../assets/images/people/a5.jpg" alt="...">'
			+'</span>'
			+'&nbsp;'
			+'Philip <strong>Smith</strong>&nbsp;'
			+'<span class="circle bg-warning fw-bold">'
			+'13'
			+'</span>'
			+'<b class="caret"></b>'
			+'</a>'
			+'<!-- ready to use notifications dropdown. inspired by smartadmin template.'
			+'consists of three components:'
			+'notifications, messages, progress. leave or add what"s important for you.'
			+'uses Sing"s ajax-load plugin for async content loading. See #load-notifications-btn -->'
			+'<div class="dropdown-menu animated animated-fast fadeInUp"'
			+'sn-notifications-menu></div>'
			+'</li>'
			+'<li class="dropdown" data-dropdown>'
			+'<a href class="dropdown-toggle" data-dropdown-toggle>'
			+'<i class="fa fa-cog fa-lg"></i>'
			+'</a>'
			+'<ul class="dropdown-menu">'
			+'<li><a href="#"><i class="glyphicon glyphicon-user"></i> &nbsp; My Account</a></li>'
			+'<li class="divider"></li>'
			+'<li><a data-ui-sref="app.extra-calendar">Calendar</a></li>'
			+'<li><a data-ui-sref="app.inbox">Inbox &nbsp;&nbsp;<span class="badge bg-danger animated bounceIn">9</span></a></li>'
			+'<li class="divider"></li>'
			+'<li><a data-ui-sref="login"><i class="fa fa-sign-out"></i> &nbsp; Log Out</a></li>'
			+'</ul>'
			+'</li>'
			+'<li>'
			+'<a href="#" data-sn-action="toggle-chat-sidebar-state">'
			+'<i class="fa fa-globe fa-lg"></i>'
			+'</a>'
			+'<div id="chat-notification" class="chat-notification hide">'
			+'<div class="chat-notification-inner">'
			+'<h6 class="title">'
			+'<span class="thumb-xs">'
			+'<img src="../assets/images/people/a6.jpg" class="img-circle mr-xs pull-left">'
			+'</span>'
			+'Jess Smith'
			+'</h6>'
			+'<p class="text">Hey! What"s up?</p>'
			+'</div>'
			+'</div>'
			+'</li>'
			+'</ul>'
			+'</div>';
		
		return {
			restrict: 'E',
			template: tmpl
		}
		
	}
})