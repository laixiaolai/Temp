$(document).ready(function(){
	 XQTOOL.Globe_Input_Text($('.search_goods .searchText'),$('.search_goods .searchText').attr("label"));
     $(".search_text, .searchText").each(function() {
         var submitDiv = $(this).closest("div").find(".submit");
         enterClickBind($(this), $(submitDiv));
     });

    $(".search input[type=text], .search_whole input[type=text], .search_goods input[type=text]").keyup(function(event) {
    	var parentNode = $(this).closest("div");
    	var keyword = $(this).val();
        parentNode = parentNode.parent();
        var presearchDiv = $(parentNode).find(".search-container");
        if(event.keyCode == 38) {
        	event.preventDefault();
        	moveupNode($(presearchDiv));
        	return;
        } else if(event.keyCode == 40) {
        	event.preventDefault();
        	movedownNode($(presearchDiv));
        	return;
        }
     	fetchPresearchWords(keyword, function(data){
     		$(".search-container").hide();
     		var ulNode = $(presearchDiv).find("ul");
     		$(ulNode).html("");
    		if(data.status) {
    			if(data.words.length > 0) {
    				for(var i in data.words) {
    					var word = data.words[i];
    					$(ulNode).append('<li><a href="/list.html?keyword=' + encodeURI(word) + '&sort=1">' + word + '</a></li>');
    				}
    				$(presearchDiv).show();
    			}
    		} else {
    		}
    	});

     });
     
     $(".search .submit, .search_whole .submit, .search_goods .submit").click(function() {
         var searchTxtDiv = $(this).closest("div").find("input[type=text]");
         var text = XQTOOL.xqVal($(searchTxtDiv));
         if(text && text != "") {
        	 text=text.replace("/","+");
             window.location.href="/list/search/" + text + "?sort=1";
         }
     });
     
     $(".hovertag").hover(function () {
         $(this).addClass("hover");
      },
      function () {
         $(this).removeClass("hover");
      });
         
     $(".currenttag").hover(function () {
         $(this).addClass("current");
      },
      function () {
         $(this).removeClass("current");
      });
     
     var isList=$('.header-common').attr('isList');
 	if(isList!="true" && $("#user-nav").length == 0) {
         //非list页面导航栏固定效果 
         $(window).bind("scroll",function () { //浏览器滚动条触发事件
             var scrollTop = $(window).scrollTop();
             if(scrollTop>0){
                 $('.header-bar').addClass('header-bar-fixed');
                 $('.decorate-bar').addClass('decorate-bar-fixed');
                 $('.header-common .searchWrap').css("margin","22px 0 0 36px");
             }else{
                 $('.header-bar-fixed').removeClass('header-bar-fixed');
                 $('.decorate-bar-fixed').removeClass('decorate-bar-fixed');
                 $('.header-common .searchWrap').css("margin","13px 0 0 36px");
             }
         });
     }

	 //导航区，登录后右上角,下拉列表显示
	var n=null,l=null;
	$('.user-panel .logined .my').mouseenter(function(){
	    clearTimeout(n);
		var current = $(this);
		n=setTimeout(function () {
	    	$('.user-panel .logined .drop-menu').slideDown(200);
			$('.user-panel .logined .my').parent().css('background-color','#414042');
	    },300);
		$(".user-panel .logined .drop-menu").hover(function () {
			clearTimeout(n);
			$('.user-panel .logined .drop-menu').slideDown(200)
		},
		function () {
			$('.user-panel .logined .drop-menu').hide();
			$('.user-panel .logined .my').parent().css('background-color','transparent');
		});
	});
	
	$('.user-panel .logined .my').mouseleave(function(){
		 clearTimeout(n);
		var current = $(this);
	    n=setTimeout(function () {
	    	$('.user-panel .logined .drop-menu').hide();
			$('.user-panel .logined .my').parent().css('background-color','transparent');
	    },200);
	});
	$('.logined li').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
});
