//公共函数 文本框离开，点击时默认值显示,去掉空格
XQTOOL={};
XQTOOL.trim=function (a) {
	if(!a) {
		return a;
	}
	return a.replace(/(\s*$)/g,"").replace(/(\u3000*$)/g,"");
};

XQTOOL.strlen=function(str){  
    var len = 0;  
    for (var i=0; i<str.length; i++) {   
     var c = str.charCodeAt(i);   
    //单字节加1   
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
       len++;   
     }   
     else {   
      len+=2;   
     }   
    }   
    return len;  
}  

//url:请求Url,data:请求参数,success:成功响应处理函数
XQTOOL.ajaxData=function(url,data,callback){
	
	$.ajax({
		url: url,
        type: 'POST',
        data:data,
        dataType: 'json',
        timeout: 50000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	//console.log("error ");
        },
		success:callback
	});	
		
};
XQTOOL.xqHtml=function(a){
	if(a.html() == "") {
		return "";
	}

	if($.trim(a.html()) == $.trim(a.attr("label"))) {
		return "";
	}
	return $.trim(a.html());
};

XQTOOL.Globe_Html_Text=function (a, c) {
	c=c||a.html();
	XQTOOL.trim(a.html())==""&&(a.html(c));
	a.blur(function () {
		XQTOOL.trim(a.val())==""&&(a.html(c));
	});
};


XQTOOL.xqVal=function(a){
	if(!a.val || a.val() == "") {
		return "";
	}

	if($.trim(a.val()) == $.trim(a.attr("label"))) {
		return "";
	}
	return $.trim(a.val());

};

XQTOOL.Globe_Input_Text=function (a,c) {
	c=c||a.val();
	XQTOOL.trim(a.val())==""&&(a.val(c),a.css({"color":"#BCBCBC"}));
	a.bind(("focus change"), function () {
		a.val()==c&&a.val("");
		a.css("color","#000");
	});
	a.blur(function () {
		XQTOOL.trim(a.val())==""&&(a.val(c),a.css({"color":"#BCBCBC"}));
	});
};

XQTOOL.shareBeforeLogin=function (positon){
	if(XIANGQU.userId==""){
		var p=positon.offset(),l=p.left,t=p.top;
		if($('#J_loginShare').find('span').hasClass('arrows-up')){
			t=t+50;
			l=l+5;
		}else{
			t=t-40;
			l=l-10;
		}

		$('#J_loginShare').css({ 
			"top":t + "px", 
			"left":l + "px" 
		}); 
		$('#J_loginShare').show();
		$('#J_loginShare').delay(4000).hide(500); 

		return false;
	}
};

XQTOOL.loginBox=function (redirectUrl,flag){
	if(redirectUrl && redirectUrl != "") {
		$("#redirectUrl").val(redirectUrl); 
		$("#qq_auth").attr("href", "/qq_auth?redirectUrl=" + encodeURI(redirectUrl));
		$("#weibo_auth").attr("href", "/weibo_auth?redirectUrl=" + encodeURI(redirectUrl));
		//$("#douban_auth").attr("href", "/douban_auth?redirectUrl=" + encodeURI(redirectUrl));
		$("#taobao_auth").attr("href", "/taobao_auth?redirectUrl=" + encodeURI(redirectUrl));
		//      $("#renren_auth").attr("href", "/renren_auth?redirectUrl=" + encodeURI(redirectUrl));
	}
	if(flag=="postTopicTip"){
		$('.login-account .titleBar span').css('font-size','16px').html('只有小站居民才能发帖，登录并加入小站');
	}
	var div_obj = $("#J-login");  
	var windowWidth = document.body.clientWidth;       
	var scrollTop = $(window).scrollTop();     
	var popupWidth = div_obj.width();
	//添加并显示遮罩层   
	$('#pandoraOverlay').show();  

	div_obj.css({"position": "fixed","width": "610px", "z-index": "9001","left": windowWidth/2-popupWidth/2,"top": 80});   
	div_obj.show();
};

XQTOOL.popupDiv=function(div_obj){
	var windowWidth = document.body.clientWidth;       
	var scrollTop = $(window).scrollTop();     
	var popupWidth = div_obj.width();
	//添加并显示遮罩层   
	$('#pandoraOverlay').show();  

	div_obj.css({"position": "fixed", "z-index": "9001","left": windowWidth/2-popupWidth/2,"top": 80});   
	div_obj.show();
};

XQTOOL.changeLogo=function(image) {
	$("#logo_image").attr("src", image);
};

//获取浏览器类型，版本
XQTOOL.browser=function(div_obj){
	
	var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    
    return Sys;
};



function closeTips() {
	$("#tips-popup").find("p").html($("#tips-popup").attr("label"));
	$("#tips-popup").hide();
}

var point = {
		x:0, y:0
};

$(document).mousedown(function(e){
	setMousePoint(e);
});

/**
 * 获取鼠标在页面上的位置
 * @param ev        触发的事件
 * @return            x:鼠标在页面上的横向位置, y:鼠标在页面上的纵向位置
 */
function setMousePoint(ev) {
	point = {
			x:0, y:0
	};

	if(!ev) {
		return;
	}

	if(ev.pageX) {
		point.x += ev.pageX;
		point.y += ev.pageY;
	} else {
		point.x += ev.clientX;
		point.y += ev.clientY;
	}
}

function confirmOperate(callBack, msg) {
	var x = point.x - 60;
	var y = point.y - 90;

	if(y <= 70) {
		y = 70;
	}

	$("#tips-popup").css("left", x);
	$("#tips-popup").css("top", y);
	$("#tips-popup").show();
	$("#tips-popup .ok-tip").unbind();
	$("#tips-popup .ok-tip").bind("click", callBack);
	$("#tips-popup .ok-tip").bind("click", closeTips);

	if(msg && msg.length > 0) {
		$("#tips-popup").find("p").html(msg);
	}
}

function enterClickBind(inputNode, clickNode) {
	$(inputNode).bind("keydown", function(event) {
		if(event.keyCode==13) {
			$(clickNode).click();
		}
	});
}


function isVisiable(node) {
	return $(node).is(":visible");
}

XQTOOL.encodeHtml = function(str) {
	if(!str || str == "") {
		return str;
	}
	return str.replace(/ /g, "&nbsp;").replace(/\n/g, "<br>").replace(/\r/g, "<br>");
};

XQTOOL.decodeHtml = function(str) {
	if(!str || str == "") {
		return str;
	}
	return str.replace(/&nbsp;/g, " ").replace(/<br>/g, "\n");
};

$(document).ready(function(){
	XQTOOL.jumpToMyfaver=function(currentFaver) {
		var b;
		var likeLeft,likeTop;
		var myFaverNode = $(".like_circle:visible, .liked_circle:visible");
		var myNode = $(".user-panel .my-li");
		if(myFaverNode && myFaverNode.length > 0) {
			likeLeft=$(myFaverNode).offset().left;
			likeTop=$(myFaverNode).offset().top;
		} else if(myNode && myNode.length > 0) {
			likeLeft=$(myNode).offset().left;
			likeTop=$(myNode).offset().top;
		} else {
			likeLeft=$('.logined .like,.logined .like-red').offset().left;
			likeTop=$('.logined .like,.logined .like-red').offset().top;
		}
		b = $("<div>&hearts;</div>"),
		b.css({
			position: "absolute",
			top: c = currentFaver.offset().top -10,
			left: a = currentFaver.offset().left +10,
			fontSize: 10,
			height:18,
			opacity: 1,
			color: "black",
			zIndex: 99999
		}),
		//$('.logined .like').removeClass('like').addClass('like-red'),
		setTimeout(function(){$('.logined .like').removeClass('like').addClass('like-red');},300),
		setTimeout(function(){$('.like_circle').removeClass('like_circle').addClass('liked_circle');},300),
		b.appendTo("body"),
		b.animate({
			top:likeTop-50,
			left:likeLeft,
			fontSize: 55,
			opacity: 0
		},
		1000,
		function() {
		});
		setTimeout(function(){$('.logined .like-red').removeClass('like-red').addClass('like');},1000);
		setTimeout(function(){$('.liked_circle').removeClass('liked_circle').addClass('like_circle');},1000);
	};

	/*qiu 2013-1-11*/
	$(window).bind("scroll",function () { //浏览器滚动条触发事件
		var scrollTop = $(window).scrollTop();
		if(scrollTop>0){
			if($('.home-gotop') && scrollTop > 3542 ){
				$('.home-gotop').show();
			}else{
				$('.home-gotop').hide();
			}
			$('.gotop:not(.home-gotop)').show();
		}else{
			$('.gotop').hide();
		}
	});

	//返回顶部响应事件
	$('.gotop').click(function(){
		$(this).addClass('gotop-over');
		var current=$(this);
		setTimeout(function(){
			current.hide();
			current.removeClass('gotop-over');
		},500);
	});
	//登陆层关闭
	$('.close').click(function(){
		$('#pandoraOverlay').hide();
		$("#J-login").hide();
		return false;
	});
});

jQuery.validator.addMethod("xqValRequired", function(value, element) {
	if(!$(element).val || $(element).val() == "") {
		return false;
	}

	if($.trim($(element).val()) == $.trim($(element).attr("label"))) {
		return false;
	}
	return true;
}, "不能为空");

// 前缀搜索中，上移节点
function moveupNode(presearchDiv) {
	var ulNode = $(presearchDiv).find("ul");
	if($(ulNode).children().length==0) {
		return;
	}
	var curNode = $(ulNode).find(".current");
	var nextNode;
	if(!curNode || curNode.length == 0) {
		nextNode = $(ulNode).children("li").last();
	} else {
		nextNode = $(curNode).prev("li");
		if(!nextNode || nextNode.length==0) {
			nextNode = $(curNode).children("li").last();
		}
	}
	$(ulNode).children().removeClass("current");
	$(nextNode).addClass("current");
	$(presearchDiv).parent().find("input[type=text]").val(($(nextNode)).find("a").html());
}
 
//前缀搜索中，下移节点
function movedownNode(presearchDiv) {
	var ulNode = $(presearchDiv).find("ul");
	if($(ulNode).children("li").length==0) {
		return;
	}
	var curNode = $(ulNode).find("li.current");
	var nextNode;
	if(!curNode || curNode.length == 0) {
		nextNode = $(ulNode).children("li").first();
	} else {
		nextNode = $(curNode).next("li");
		if(!nextNode || nextNode.length==0) {
			nextNode = $(curNode).children("li").first();
		}
	}
	$(ulNode).children().removeClass("current");
	$(nextNode).addClass("current");
	$(presearchDiv).parent().find("input[type=text]").val(($(nextNode)).find("a").html());
}

// 前缀搜索
function fetchPresearchWords(keyword, callback) {
    $.ajax({
        url: '/xiangqu/preSearchWords',
        type: 'POST',
        data:{"keyword":keyword,"num":10},
        dataType: 'json',
        timeout: 50000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(data){
        	if(callback) {
        		callback(data);
        	}
        }
    });
}
//显示本地图片
function ShowImage(obj, imgObj){
	var browserVersion= window.navigator.userAgent.toUpperCase();//浏览器版本信息           

	if (window.navigator.appName=="Microsoft Internet Explorer"){//ie浏览器
		if(browserVersion.indexOf("MSIE 6.0")>-1){//ie6
			imgObj.attr("src",obj.value);
		}else{//ie7、ie8、ie9
			if(typeof FileReader !== "undefined"){
				var reader = new FileReader(); 
				reader.onload = function(e){imgObj.attr("src",e.target.result);};
				reader.readAsDataURL(obj.files[0]);
			}
		}
	}else if(browserVersion.indexOf("FIREFOX")>-1){ //火狐浏览器
		var firefoxVersion= parseFloat(window.navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
		if(firefoxVersion<7){//firefox7.0以下版本
			imgObj.attr("src", obj.files[0].getAsDataURL());
		}else{//火狐7.0以上版本
			imgObj.attr("src", window.URL.createObjectURL(obj.files[0]));
		}
	}else if(obj.files){                    
		//兼容chrome等，也可以兼容火狐，通过HTML5来获取路径                   
		if(typeof FileReader !== "undefined"){
			var reader = new FileReader(); 
			reader.onload = function(e){imgObj.attr("src",e.target.result);};
			reader.readAsDataURL(obj.files[0]);
		}
	} else {
		imgObj.attr("src",obj.value);//其他
	}
}

/**
 * @author Alexander Farkas
 * backgroundPosition插件
 * v. 1.02
 */
(function($) {
	$.extend($.fx.step,{
		backgroundPosition: function(fx) {
			if (fx.state === 0 && typeof fx.end == 'string') {
				var start = $.curCSS(fx.elem,'backgroundPosition');
				start = toArray(start);
				fx.start = [start[0],start[2]];
				var end = toArray(fx.end);
				fx.end = [end[0],end[2]];
				fx.unit = [end[1],end[3]];
			}
			var nowPosX = [];
			nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
			nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
			fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

			function toArray(strg){
				strg = strg.replace(/left|top/g,'0px');
				strg = strg.replace(/right|bottom/g,'100%');
				strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
				var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
				return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
			}
		}
	});
})(jQuery);

$.fn.setCursorPosition = function(position){
	if(this.lengh == 0) return this;
	return $(this).setSelection(position, position);
};

$.fn.setSelection = function(selectionStart, selectionEnd) {
	if(this.lengh == 0) return this;
	input = this[0];

	if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	} else if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}

	return this;
};

$.fn.focusEnd = function(){
	this.setCursorPosition(this.val().length);
};
