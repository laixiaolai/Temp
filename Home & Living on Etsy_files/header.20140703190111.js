define("header/dropdown_menu",["jquery"],function(t){var e=function(){};return e.prototype={bindEvents:function(){t("body").on("click",function(e){if(0===t(".sub-nav:visible").length)return!0;var i=t(e.target);i.is(":not(.gnav-user-avatar)")&&0===i.parents(".sub-nav").length&&t(".sub-nav").removeClass("show").addClass("hide")}),t(".has-sub-nav > a").on("click",function(e){"ontouchstart"in window&&(e.preventDefault(),e.stopImmediatePropagation());var i=t(this).siblings(".sub-nav");t(".sub-nav").each(function(){t(this).is(i)||t(this).removeClass("show hide").addClass("hide")}),i.hasClass("show")?i.removeClass("show").addClass("hide"):i.addClass("show").removeClass("hide")})}},e}),define("header/search_bar",["jquery"],function(t){var e=function(){this.$search_input=t("#gnav-search").find(".search-input")};return e.prototype={bindEvents:function(){this.$search_input.on("change keyup",t.proxy(function(){this.handleButtonStateBasedOnInput()},this)),this.$search_input.on("focusin",t.proxy(function(){this.handleButtonStateBasedOnInput()},this)),this.$search_input.on("focusout",t.proxy(function(){this.handleButtonStateBasedOnInput()},this))},checkStateOnLoad:function(){this.handleButtonStateBasedOnInput()},handleButtonStateBasedOnInput:function(){""!==this.$search_input.val()||this.$search_input.is(":focus")?this.$search_input.siblings(".search-button").addClass("btn-primary").removeClass("btn-link"):this.$search_input.siblings(".search-button").addClass("btn-link").removeClass("btn-primary")}},e}),define("header/search_event",["jquery"],function(t){var e="keyboard",i="click",n="gnav_perform_search",r="gnav_search_focus",s=function(e){this.$search_form=e||t("#gnav-search"),this.$search_query=this.$search_form.find("#search-query"),this.trigger_method=null,this.window_gained_focus=!1,this.search_focus_method=null};return s.prototype={bindEvents:function(){this.$search_form.on("keypress",t.proxy(function(t){13==t.which&&(this.trigger_method=e)},this)).on("click",".btn-primary",t.proxy(function(){this.trigger_method||(this.trigger_method=i)},this)).on("submit",t.proxy(function(){Etsy.setTransientValue(n,{php_event_name:n,interaction_type:this.trigger_method}),this.trigger_method=null},this)),this.$search_query.on("mousedown",t.proxy(function(e){var n=t(e.target);n.is(":focus")||(this.search_focus_method=i)},this)).on("focus",t.proxy(function(){this.window_gained_focus||(this.search_focus_method||(this.search_focus_method=e),Etsy.setTransientValue(r,{php_event_name:r,interaction_type:this.search_focus_method}),this.search_focus_method=null),this.window_gained_focus=!1},this)),t(window).on("focus",t.proxy(function(){this.$search_query.is(":focus")&&(this.window_gained_focus=!0)},this))},readSearchTriggerCookieAndMaybeFireEvent:function(){var t=Etsy.readTransientValue(n);t&&(Etsy.EventLogger.logEvent(t),Etsy.eraseTransientValue(n)),t=Etsy.readTransientValue(r),t&&(Etsy.EventLogger.logEvent(t),Etsy.eraseTransientValue(r))}},s}),require({paths:{"header/dropdown_menu":"header/dropdown_menu.20140703190111","header/search_bar":"header/search_bar.20140703190111","header/search_event":"header/search_event.20140703190111"}},["jquery","header/dropdown_menu","header/search_bar","header/search_event"],function(t,e,i,n){var r,s=new e,a=new i;t(document).ready(function(){r=new n(t("#gnav-search")),s.bindEvents(),r.bindEvents(),a.bindEvents(),a.checkStateOnLoad()})});