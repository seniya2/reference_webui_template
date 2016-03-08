(function() {
	'use strict';

	angular.module('singApp.core')
		.directive('snAction', snAction)
		.directive('snNavigation', snNavigation)
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
					+'<li class="ml-sm mr-n-xs hidden-xs"><a href="#"><i class="fa fa-refresh fa-lg"></i></a></li>'
					+'<li class="ml-n-xs hidden-xs"><a href="#"><i class="fa fa-times fa-lg"></i></a></li>'
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
  
  
  /* ========================================================================
   * Sing App actions. Shortcuts available via data-sn-action attribute
   * ========================================================================
   */
  snAction.$inject = ['$rootScope', 'jQuery', '$timeout'];
  function snAction($rootScope, jQuery, $timeout){
    var singActions = {
      'toggle-navigation-state': function(e, scope){
        scope.app.state['nav-static'] = !scope.app.state['nav-static'];
      },
      'toggle-navigation-collapse-state': function(){
        $rootScope.toggleNavigationCollapseState();
      },
      'toggle-chat-sidebar-state': function(){
        //remove notification sign on a first click
        jQuery(this).find('.chat-notification-sing').remove();
        $rootScope.toggleChatSidebarState();


        //demo-only stuff. TO-REMOVE in real app!
        $timeout(function(){
          // demo: add class & badge to indicate incoming messages from contact
          // .js-notification-added ensures notification added only once
          jQuery('.chat-sidebar-user-group:first-of-type .list-group-item:first-child:not(.js-notification-added)').addClass('active js-notification-added')
            .find('.fa-circle').after('<span class="badge badge-danger pull-right animated bounceInDown">3</span>');
        }, 1000)
      }
    };
    return {
      restrict: 'A',
      link: function (scope, $el, attrs){
        if (angular.isDefined(attrs.snAction) && attrs.snAction !== '') {
          $el.on('click', function(e) {
            scope.$apply(function(){
              singActions[attrs.snAction].call($el[0], e, scope);
            });
            e.preventDefault();
          });
        }

        if (angular.isDefined(attrs.tooltip) && attrs.snAction !== ''){
          $el.tooltip();
        }
      }
    }
  }

  /* ========================================================================
   * Sing App Navigation (Sidebar)
   * ========================================================================
   */
  snNavigation.$inject = ['$timeout', '$rootScope', '$state', 'jQuery', '$window'];
  function snNavigation($timeout, $rootScope, $state, jQuery, $window){
    var SnNavigationDirective = function($el, scope){
      this.$el = $el;
      this.scope = scope;
      this.helpers = scope.app.helpers;

      // publish method to global scope to allow navigation collapsing via api
      $rootScope.toggleNavigationCollapseState = jQuery.proxy(this.toggleNavigationCollapseState, this);
    };
    SnNavigationDirective.prototype = { // a set of reusable directive private functions
      expandNavigation: function(){
        //this method only makes sense for non-static navigation state
        if (this.isNavigationStatic() && (this.helpers.isScreen('md') || this.helpers.isScreen('lg'))) return;

        jQuery('body').removeClass('nav-collapsed');
        this.$el.find('.active .active').closest('.collapse').collapse('show')
          .siblings('[data-toggle=collapse]').removeClass('collapsed');
      },

      collapseNavigation: function(){
        //this method only makes sense for non-static navigation state
        if (this.isNavigationStatic() && (this.helpers.isScreen('md') || this.helpers.isScreen('lg'))) return;

        jQuery('body').addClass('nav-collapsed');
        this.$el.find('.collapse.in').collapse('hide')
          .siblings('[data-toggle=collapse]').addClass('collapsed');
      },


      /**
       * Check and set navigation collapse according to screen size and navigation state
       */
      checkNavigationState: function(){
        if (this.isNavigationStatic()){
          if (this.helpers.isScreen('sm') || this.helpers.isScreen('xs')){
            this.collapseNavigation();
          }
        } else {
          if (this.helpers.isScreen('md') || this.helpers.isScreen('lg')){
            var view = this;
            $timeout(function(){
              view.collapseNavigation();
            }, this.scope.app.settings.navCollapseTimeout);
          } else {
            this.collapseNavigation();
          }
        }
      },

      isNavigationStatic: function(){
        return this.scope.app.state['nav-static'] === true;
      },

      changeActiveNavigationItem: function(event, toState, toParams){
        var $newActiveLink = this.$el.find('a[href="' + $state.href(toState, toParams) + '"]');

        // collapse .collapse only if new and old active links belong to different .collapse
        if (!$newActiveLink.is('.active > .collapse > li > a')){
          this.$el.find('.active .active').closest('.collapse').collapse('hide');
        }
        this.$el.find('.sidebar-nav .active').removeClass('active');

        $newActiveLink.closest('li').addClass('active')
          .parents('li').addClass('active');

        // uncollapse parent
        $newActiveLink.closest('.collapse').addClass('in').siblings('a[data-toggle=collapse]').removeClass('collapsed');
      },

      toggleNavigationCollapseState: function(){
        if (jQuery('body').is('.nav-collapsed')){
          this.expandNavigation();
        } else {
          this.collapseNavigation();
        }
      },

      enableSwipeCollapsing: function(){
        var d = this;
        jQuery('.content-wrap').swipe({
          swipeLeft: function(){
            //this method only makes sense for small screens + ipad
            if (d.helpers.isScreen('lg')) return;

            if (!jQuery('body').is('.nav-collapsed')){
              d.collapseNavigation();
            }
          },
          swipeRight: function(){
            //this method only makes sense for small screens + ipad
            if (d.helpers.isScreen('lg')) return;

            // check if navigation is collapsing. exiting if true
            if (jQuery('body').is('.nav-busy')) return;

            if (jQuery('body').is('.nav-collapsed')){
              d.expandNavigation();
            }
          },
          threshold: this.helpers.isScreen('xs') ? 100 : 200
        });
      },

      collapseNavIfSmallScreen: function(){
        if (this.helpers.isScreen('xs') || this.helpers.isScreen('sm')){
          this.collapseNavigation();
        }
      },

      _sidebarMouseEnter: function(){
        if (this.helpers.isScreen('md') || this.helpers.isScreen('lg')){
          this.expandNavigation();
        }
      },
      _sidebarMouseLeave: function(){
        if (this.helpers.isScreen('md') || this.helpers.isScreen('lg')){
          this.collapseNavigation();
        }
      }
    };
    return {
      replace: true,
      templateUrl: 'dev_base2/modules/core/navigation/sidebar.html',
      link: function (scope, $el){
        var d = new SnNavigationDirective($el, scope);

        $el.on('mouseenter', jQuery.proxy(d._sidebarMouseEnter, d));
        $el.on('mouseleave', jQuery.proxy(d._sidebarMouseLeave, d));

        // wait until all includes included
        $timeout(function(){
          // set active navigation item
          d.changeActiveNavigationItem({}, $state.$current, $state.params);

          d.checkNavigationState();
        });

        /**
         * open navigation if collapsed sidebar clicked
         */
        $el.on('click', function(){
          if (jQuery('body').is('.nav-collapsed')){
            d.expandNavigation();
          }
        });

        scope.$watch('app.state["nav-static"]', function(newVal, oldVal){
          if (newVal === oldVal) return; // shouldn't they fix it?
          if (!newVal){ // if navigation state is collapsing
            d.collapseNavigation();
          }

          // let angular finish doing its stuff so all animation are applied to trigger an event on a ready DOM
          $timeout(function(){
            jQuery($window).trigger('sn:resize');
          })
        });

        // change active navigation item when state change
        $rootScope.$on('$stateChangeStart', jQuery.proxy(d.changeActiveNavigationItem, d));
        $rootScope.$on('$stateChangeSuccess', jQuery.proxy(d.collapseNavIfSmallScreen, d));

        // scroll to top manually after page change. seems that it doesn't work out of the box because
        // the actual app state is not changed - it remain app.page - only params changed.
        $rootScope.$on('$stateChangeSuccess', function(){
          $window.scrollTo(0, 0);
        });

        // enable swipe navigation collapsing
        ('ontouchstart' in $window) && d.enableSwipeCollapsing();

        /* reimplementing bs.collapse data-parent here as we don't want to use BS .panel*/
        $el.find('.collapse').on('show.bs.collapse', function(e){
          // execute only if we're actually the .collapse element initiated event
          // return for bubbled events
          if (e.target !== e.currentTarget) return;

          var $triggerLink = jQuery(this).prev('[data-toggle=collapse]');
          jQuery($triggerLink.data('parent')).find('.collapse.in').not(jQuery(this)).collapse('hide');
        })
          /* adding additional classes to navigation link li-parent for several purposes. see navigation styles */
          .on('show.bs.collapse', function(e){
            // execute only if we're actually the .collapse element initiated event
            // return for bubbled events
            if (e.target !== e.currentTarget) return;

            jQuery(this).closest('li').addClass('open');
          }).on('hide.bs.collapse', function(e){
            // execute only if we're actually the .collapse element initiated event
            // return for bubbled events
            if (e.target !== e.currentTarget) return;

            jQuery(this).closest('li').removeClass('open');
          });

        function initSidebarScroll(){
          var $sidebarContent = $el.find('.js-sidebar-content');
          if ($el.find('.slimScrollDiv').length !== 0){
              $sidebarContent.slimscroll({
                  destroy: true
              })
          }
          $sidebarContent.slimscroll({
              height: $window.innerHeight,
              size: '4px'
          });
        }

        jQuery($window).on('sn:resize', initSidebarScroll);
        initSidebarScroll();
      }
    }
  }
})();
