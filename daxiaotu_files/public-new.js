var ND = ND || {};
ND.TEST = '7.0';
// 解决调不支持console的浏览器报错
if(typeof window.console === 'undefined') {
    window.console = {
        log: function() { return; }
    };
}

// 用于执行公共插件的代码

/*
 * Special scroll events for jQuery
 * 用于图片延迟加载
 * 当滚动条停止滚动时, 加载视口里的商品图片
 * http://james.padolsey.com/javascript/special-scroll-events-for-jquery/
 */
;(function(){
 
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
 
    special.scrollstart = {
        setup: function() {
 
            var timer,
                handler =  function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }
 
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll', handler).data(uid1, handler);
 
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    };
 
    special.scrollstop = {
        latency: 300,
        setup: function() {
 
            var timer,
                    handler = function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    }
 
                    timer = setTimeout( function(){
 
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args);
 
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll', handler).data(uid2, handler);
 
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };
 
})();

/*==========================Document Ready==========================*/

$(function() {
    var $win = $(window);
    //-----------------------------------------
    // ios移动设备的下载app条 及打开页面时的下载封面
    //-----------------------------------------
    if(/(iphone|ipad|ipod)/i.test(navigator.userAgent)) {

        $("#downApp-btn").css('display', 'block');
                
        $('#downApp_now').click(function(event) {
            window.location = 'nuandao://web2app';
            setTimeout(function() {
                window.location = 'itms-apps://itunes.apple.com/cn/app/nuan-dao/id583307376?mt=8'
            }, 30);
        });
    }

    //=====导航的下拉界面延迟展开=====
    var navItem_hoverClass = 'nav-item_hover';
    var navItem_during = 100;
    $('.nav-li').each(function() {
        // 每个选单项的定时器都不同, 因此不应该为全局变量
        var headerNav_overTimer = null;
        var headerNav_outTimer = null;
        var me = $(this);
        // hover模拟的是鼠标指针进入和离开元素
        me.hover(function() {
            clearTimeout(headerNav_outTimer);
            headerNav_overTimer = setTimeout(function() {
                me.addClass(navItem_hoverClass);
            }, navItem_during);
        }, function() {
            clearTimeout(headerNav_overTimer);
            headerNav_outTimer = setTimeout(function() {
                me.removeClass(navItem_hoverClass);
            }, navItem_during);
        });
    });

    //=====点击搜索按钮,搜索回车事件,关闭搜索弹出层=====
    $("#search-btn span").click(function (){ searchShow();});

    $('#search-keyword').bind('keypress',function(event){
            if(event.keyCode == "13")  {
               submitSearch();//执行搜索
            }
     });
    
    $('#close-search').bind('click',function(event){
        searchShow();
    });

    //=====显示或隐藏其他SNS登陆按钮=====
    $('#showothersns').live('click', function(event) {
        $(this).toggle(function() {
            $('#othersns').show();
        }, function() {
            $('#othersns').hide();
        });
        $(this).trigger('click')
    });

    //=====今日最新mouseover弹出列表=====
    $('.sale-today_leaf').hover(function() {
        var self = $(this);
        // 为最右边的图片添加类third-item
        if(self.index() % 3 === 2) self.addClass('third-item'); 
        self.find('.piclist').css('display', 'block');
        self.find('.sale-today_leaf-price').css('zIndex', '8');
    }, function() {
        $(this).find('.piclist').css('display', 'none');
        $(this).find('.sale-today_leaf-price').css('zIndex', '1');
    });

    //=====头部快速注册 绑定 登陆/注册弹出层 事件=====
    $('.header-regreward').click(function() {
        showlogindiv();
    });

    $('.piclist-child img').bind('mouseover', function(event) {
        var self = $(this);
        var targetEle = self.parents('.sale-today_leaf');
        targetEle.find('.currentImage').attr('src', self.attr('data-src'));
        targetEle.find('.sale-today_leaf-info a').text(self.attr('title'));
        targetEle.find('.sale-today_leaf-price').html('<strong>￥' + self.attr('data-price') + '</strong>');
    });

    //=====产品页面微博分享按钮=====
    $('.weibobtn').click(function(event) {
        $('.sns-btn .icon-a').trigger('click');
        event.preventDefault();
    });

    //=====页面加载完成后=====
    $(window).load(function() {
        // 添加微博关注的插件
        setTimeout(function() {
            $('#J_index-weibo-plugins1').html('<iframe width="121" scrolling="no" height="24" frameborder="0" src="http://widget.weibo.com/relationship/followbutton.php?language=zh_cn&amp;width=136&amp;height=24&amp;uid=2093879035&amp;style=2&amp;btn=red&amp;dpc=1" border="0" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>');
            $('#J_index-weibo-plugins2').html('<iframe width="121" scrolling="no" height="24" frameborder="0" src="http://widget.weibo.com/relationship/followbutton.php?language=zh_cn&amp;width=136&amp;height=24&amp;uid=2093879035&amp;style=1&amp;btn=red&amp;dpc=1" border="0" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>');
        }, 0);
    })
    //导航交互 添加滚动事件使其显示或隐藏；
    // var hidePos;
    // if($(".sale-today_title h2").length > 0){
    //     hidePos = $(".sale-today_title h2").offset().top - $(".header-a").height() - $(".header-b").height();
    // }else{
    //     hidePos = 0;
    // }
    // var start = 0; 
    // var end = 0;
    // var direction;
    // $(window).scroll(function() {
    //     var st = Math.max($(document.documentElement).scrollTop(),$(window).scrollTop());
    //     var end = st;
    //     if(end > start){
    //         direction = "down";
    //         start = end;
    //     }
    //     if(end < start){
    //         direction = "up";
    //         start = end;
    //     }
    //     if(direction=="down"){
    //         if(st >= hidePos){
    //             // $(".header-b").animate({"height":"0px"}, 100);
    //             // $(".header-b").hide(200).css('overflow','');
    //             $(".header-b").css('display','none');
    //         }
    //     }
    //     if(direction=="up"){
    //         if(st < hidePos){
    //             return false;
    //         }
    //         // $(".header-b").animate({"height":"46px"}, 100);
    //         // $(".header-b").show(200).css('overflow','');
    //         $(".header-b").css('display','block');
    //     }
    // });

})//ready end

//以下的$(document).ready()是从 js-public.js 中转移过来的内容；
$(document).ready(function(){   
    // event banner 相关  =====可删除 #event-banner 定义在 \Nuandao\Tpl\Home\new\Public\header.html
    // var eventBanner = $('#event-banner'),
    //     bannerL = eventBanner.find('.banner-l'),
    //     bannerS = eventBanner.find('.banner-s'),
    //     btnCloseBanner = eventBanner.find('.btn-close'),
    //     win = $(window);

    // if(eventBanner.length){
    //     if($.cookie("nd_banner_showed") != 'true'){
    //         bannerS.hide();
    //         bannerL.fadeOut().slideDown(function(){
    //             win.trigger('reposition-menu');
    //         });
    //         setTimeout(function(){
    //             var bannerSHeight = bannerS.outerHeight()
    //             bannerL.fadeIn().animate({
    //                 height: bannerSHeight
    //             }, function(){
    //                 bannerL.hide();
    //                 bannerS.show();
    //                 win.trigger('reposition-menu');
    //                 $.cookie("nd_banner_showed", true);
    //             });
    //         }, 3000);
    //     }
    //     btnCloseBanner.bind('click', function(e){
    //         eventBanner.hide();
    //         win.trigger('reposition-menu');
    //     });
    // }

    //点击导航大家喜欢的喜欢数public ======可删除
    // #like-tip 定义在 \Nuandao\Tpl\Home\new\Feed\weibofriends.html、\Nuandao\Tpl\Home\new\Index\index.html、
    // \Nuandao\Tpl\Home\new\Public\product_B.html、\Nuandao\Tpl\Home\new\Public\product_D.html
    // $('#like-tip').click(function(){
    //     $.cookie("nd_fn", 0, {path: '/', domain:'nuandao.com' });
    //     $(this).find('show_fc').hide();
    // });

    //针对微博提示 ======可删除 .pop_close 定义在\Nuandao\Tpl\Home\new\下的的文件中
    // $('.pop_close').click(function() {
    //     $.cookie('nd_weibonotice', null, { path: '/',domain:'nuandao.com' });
    //     $('#credits_pop').fadeOut(function() {
    //         $('#popbg').fadeOut();  
    //     });
    // }); 

    //=====针对微博提示=====
    $('#credits_pop .cancel').click(function() {
        $('#credits_pop').find('.popout-invite').hide();
        $('#credits_pop').fadeOut();
    }); 

    //搜索
    $(".search-input").click(function(){
        var empty = $(".search-input").attr("empty");
        //alert(empty);
        if(empty == '1'){
            $(".search-input").val("");
            $(".search-input").attr("empty",'0');
        }
    });
    //搜索按钮 ======可删除 .search-submit 定义在\Nuandao\Tpl\Home\new\下的的文件中
    // $(".search-submit").click(function(){
    //     var empty = $(".search-input").attr("empty");
    //     var val = $(".search-input").val();
    //     if(empty == '1' || val == ''){
    //         return;
    //     }
    //     location.href = "/search/keyword/"+encodeURI(val);
    //     //$("#search-form").submit();
    // });

    // $('#menu-popbar,#menu-bar-name').live('mouseenter', function() { 
    //     //$(this).addClass('bgwhite');
    //     //$('#menu-popbar').addClass('bgwhite');
    //     $("#menu-pop").show();
    // }).live('mouseleave', function () {
    //     $(this).removeClass('bgwhite');
    //     $('#menu-popbar').removeClass('bgwhite');
    //     $("#menu-pop").hide();
    // });

    //======以下待排查
    // $('#navcart-popbar').live('mouseenter', function() { 
    //     //$(this).addClass('bgwhite');
    //     $("#navcart-pop").show();
    // }).live('mouseleave', function () {
    //     //$(this).removeClass('bgwhite');
    //     $("#navcart-pop").hide();
    // });
    // $(".cart").hover(function(){
    // }, function(){
    //     $(this).removeClass("carthover");
    // }); 
    
    //鼠标hover在购物车弹层上时的handle；
    $("#navcart-pop").hover(function(){
        if (typeof navhideclear !== 'undefined') {
            clearTimeout(navhideclear);
        };
    }, function(){
        $(".cart").removeClass("carthover");
    }); 
    
    //鼠标hover在购物车按钮上时的handle；
    $('.menu').live('mouseenter', function() { 

        if ($(this).find(".menu-list").children().length>0) {   
        $(this).find(".menu-list dl").css('max-height',($(window).height()-100)+'px');
        $(this).find(".menu-list").show();
        };
    }).live('mouseleave', function () {
        $(this).find(".menu-list").hide();
    });

    
    // $("#navcart-popbar").hover(function(){
        
    //     $("#navcart-pop").show();
        
    // }, function(){
        
    //     $("#navcart-pop").hide();
        
    // }); 
    
    // $(".pin").hover(function(){
        
    //     $(this).find('.pin-name').addClass('pin-name-on');
    //     $(this).find('.pin-time').fadeIn();
        
    // }, function(){
        
    //     $(this).find('.pin-name').removeClass('pin-name-on');
    //     $(this).find('.pin-time').fadeOut();
        
    // }); 
    

    //  likehover(); ======可删除
    // $('.sales-pins, .pin-pins').live('mouseenter', function() { 
    //     var $share = $(this).find('.pins-likeshare-share'),
    //         $snsWrapper = $share.find('>div');
    //     $share.stop(true, true).animate({width: $snsWrapper.width()});
    // }).live('mouseleave', function () {
    //    $(this).find('.pins-likeshare-share').stop(true, true).animate({width:0});
    // });

    // $(".pins dt").live('mouseenter', function(){
    //     $(this).find('.pins-discount').fadeIn(300);
    // }).live('mouseleave', function () {
    //     $(this).find('.pins-discount').fadeOut(300);
    // });

    
    //=====订阅邮箱输入文本事件=====
    $("#news-email").keyup(function(){
        var filter=/^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
        if (!filter.test($(this).val())) 
        { 
            $("#newsbook-btn").removeClass('checked').removeClass('newsbook-btn');
        }
        else
        {
            $("#newsbook-btn").addClass('checked').addClass('newsbook-btn');
        }
    }); 
        
        
        
    //=====订阅邮箱按钮事件=====
    $(".newsbook-btn").live('click',function(){
                $("#news-email").hide();
        $("#bookloading").show();
                //订阅成功到这
                $.ajax({
                        type: "POST",
                        url: "/ajax/subscribeEmail",
                        dataType:"json",
                        cache : false,
                        data: "email="+$('#news-email').val()+"&m=" + Math.random(),
                        success:function(o){
                                if(o.status == 1){
                                        //订阅成功到这
                                        $("#news-email").hide();
                                        $("#newsbook-btn").hide();
                                        $("#booktips").addClass('email-oked').html('订阅成功，请至邮箱依照提示完成订阅').show();
                                        $("#bookloading").hide();
                                        setTimeout(function(){
                                            $("#booktips").hide();
                        $("#news-email").val('').fadeIn();
                                            $("#newsbook-btn").removeClass('checked').removeClass('newsbook-btn').fadeIn();
                    }, 3000);
                                }else if(o.status == 2){
                                        //已订阅到这里判断
                                        $("#news-email").hide();
                                        $("#newsbook-btn").hide();
                                        $("#booktips").removeClass('email-oked').html('您已经订阅，换个邮箱试试').show();
                                        $("#bookloading").hide();
                                        setTimeout(function(){
                                                $("#booktips").hide();
                                                $("#news-email").val('').fadeIn();
                                            $("#newsbook-btn").removeClass('checked').removeClass('newsbook-btn').fadeIn();
                                        }, 3000);
                                }
                        }, error:function(){ }
                });
    }); 

    
    //=====客服=====
    $('.kefubar').click(function(){
        $(this).hide();
        //$(".kefupop").animate({scrollTop : 0}, 500);
        var y1=$("#footer").offset();
        var y2=$(".kefupop").offset();
        $(".kefupop").height(y1.top-y2.top);
        $(".kefupop").show(500);
    });

    $(".kefuclose").click(function(){
        $(".kefupop").hide();
        $('.kefubar').show(500);
    });

    //滑动回顶 =====可删除
    // $(".back_to_top").click(function(){$("html, body").animate({scrollTop : 0}, 500);});
    
    // $('.pl-btn').live("click",function(){   

    // }); 
    
    //气球    =====可删除
    // $('.feed-btt').click(function(){
    //     $(this).animate({
    //         bottom:"1500px"},
    //         800,
    //         function(){
    //             $(this).css("bottom","-170px")
    //         });
    //     $("html, body").animate({scrollTop : 0}, 500);
    // });   
    // $(window).scroll(function () {
    //     //气球
    //     if ($(window).scrollTop()>40 && $(".feed-btt").css("bottom")=="-170px")
    //     {           
    //         $(".feed-btt").stop(true, false).animate({
    //             bottom:"40px"
    //             },400);
    //     }else if($(window).scrollTop()<40 && $(".feed-btt").css("bottom")=="40px") 
    //     {
    //         $(".feed-btt").stop(true, false).animate({
    //             bottom:"-170px"
    //             },400);
    //     };
    // });

    //加入购物车显示弹出层控制 =====可删除
    // $('.add-cart-popuptitle .delete, .pop-shpping').click(function(){
    //     var pagesign = getpagesign();
    //     trackgoShopping(pagesign);
    //     $('.add-cart-popupwrap').hide();
    // });

    //统计去结进行统计 =====可删除
    // $('.gotocart').click(function(){
    //     var pagesign = getpagesign();       
    //     trackgotocart(pagesign);
    //     setTimeout("window.location.href= gettourl('./shopping')", 1000);
    // });

    //个人信息加载 =====未验证
    var pagesign = getpagesign();
    if(pagesign!='checkout' && pagesign!='order' && pagesign!='shopping')
    {
        personal();
        if((pagesign == 'sale') || (pagesign == 'product') || (pagesign == 'only')){
            syncShareButton();
        }
        
    }

    //异步加载商品信息模块 =====未验证
    if(pagesign == 'product')
    {
        syncProductBlock();
    }
    // syncUserbehavior();  //由于前端暂时不需要RetentionScience 统计，so暂时关掉
    
    // 提交设计师注册信息（与用户注册不同） =====可删除
    // $('#J_Go').click(function() {
    //     // 获取提交url
    //     var url = this.getAttribute('data-url');

    //     partner(url);
    // });

    // //=====首页大图banner轮番=====
    // // by 20140508 mackxu
    // // 参考参数: Public/scripts/plugins/jquery.flexslider.js
    // $('#J_banner').flexslider({ pauseOnHover: true, slideshowSpeed: 5000, namespace: "nd-" });

    // //=====首页本周新品轮播 by mackxu 20140520=====
    // $('#J_saleWeek').flexslider({ animation: 'slide', slideshow: false, animationLoop: false, controlNav: false, namespace:'sale-week_' });
    // //=====lookbook 与上面用同一个插件=====
    // // by 20140508 mackxu
    // $('.flash-lookbook').flexslider({ animation: 'slide', slideshowSpeed: 7000, pauseOnHover: true, controlNav: false, directionNav: false });

    //=====优酷视频, 把sale页尾部的iframe移动到指定位置显=====
    $(window).load(function() {
        $sale_player_iframe = $('#J_sale_player_iframe');
        if($sale_player_iframe.length !== 0) {
            $('#J_sale_player').append($sale_player_iframe);
            $sale_player_iframe.show();
        }
    });
    
    //=====隐藏或显示选单=====
    var $listLeaf = $('#J_list-leaf');
    var $listMenu = $('#J-list-menu');
    var $menubar  = $('#J_menubar');

    var listHidden = 'list-hidden';
    var listMenuHidden = 'listMenuHidden'; // class类 侧边栏隐藏标识。
    var containerList = 'container-list';

    $menubar.click(function() {
        var self = $(this);
        if(self.hasClass(listHidden)) {
            $listMenu.removeClass(listMenuHidden).show();
            $listLeaf.addClass(containerList);
            self.text('隐藏选单').removeClass(listHidden);
            $.cookie('list-hidden', null, {path:'/',domain:'nuandao.com'});
        }else {
            $listMenu.hide().addClass(listMenuHidden);
            $listLeaf.removeClass(containerList);
            self.text('显示选单').addClass(listHidden);
            $.cookie('list-hidden', true , {path:'/',domain:'nuandao.com'});
        }
    });
    // 当上一页侧边栏是隐藏时，触发click事件
    if($.cookie('list-hidden')) $menubar.click();

    // 监听每个分类的标题, 使下拉框能动画地伸缩
    $listMenu.delegate('dt', 'click', function() {
        $(this).next('dd').slideToggle().toggleClass('dd-hide');
    });

});

/*==========================Define Function==========================*/

/*
 * 搜索区域的显示和隐藏
 */
function searchShow(){
    if($('#search-area').css('display') == 'none'){
         $('#search-area').show();
         $('#search-keyword').focus();
    }else{
         $('#search-area').hide();
    }
}


//搜索提交
function submitSearch(){
    var val = $.trim($("#search-keyword").val());
    if( val === ''){
        return false;;
    }
    location.href = "/search/keyword/"+encodeURI(val);
}

function overlay(options) {
    var ok = options.ok;
    var cancel = options.cancel;
    var target = options.target;
    var $overlay = $(options.container);
    // 如果不存在该遮罩
    if(!$overlay.length) return;
    $('.overlay').hide();
    // 重写弹层内容
    if(options.content) { $overlay.find('.overlay-content').html(options.content); }

    // 显示并定位弹层
    $overlay.show();
    if(target) {
        var targetOffset = options.target.offset();
        var targetW = options.target.width();
        var overlayH = $overlay.height();
        var overlayW = $overlay.width();
        $overlay.offset(function() {
            return {
                left: targetOffset.left - overlayW + targetW,
                top: targetOffset.top - overlayH - 12
            }   
        });
    }

    $overlay.show().unbind('click').bind('click', function(e) {
        var $target = $(e.target);
        if($target.hasClass('cancel')) {
            // 如果存在取消操作
            cancel && cancel.call(this, options.args);
            this.style.display = 'none';
        }else if($target.hasClass('ok')) {
            // 存在ok函数，并且返回true时 才能关闭弹层
            if(ok && ok.call(this, options.args)) {
                this.style.display = 'none';
            }else {
                // console.log('不存在ok或ok没有返回true');
            }
        }
    });
    return $overlay;
}

//按钮加loading效果函数，传入jQuery选择器比(this)
function addloading(btn){
    btn.attr('originhtml',btn.html());
    //$(this).height($(this).height());
    btn.addClass('btn-loading').append("<div class='onloading'><div class='sloading'><div></div><div></div><div></div><div></div></div></div>");
    btn.find('.onloading').width(btn.width());
}
//按钮消除loading效果函数，传入jQuery选择器比(this)
function removeloading(btn){
    btn.find('.onloading').remove();
}

//topbox滑动  
function movebox(){
        var topscroll = $(document).scrollTop(); 
        if(topscroll<118){
        $('.fl-topbox-flow').css("position","relative").removeClass('shadow');          
        }
        else{
        $('.fl-topbox-flow').css("position","fixed").addClass('shadow');
        };  };
window.onscroll=movebox;
window.onload= $(window).scrollTop(0);

function likehover(){
    $(".pins,.pin-pins-img").hover(function(){
        $(this).find('.pins-share').slideDown(300);
        //$(this).find('.sales-add-cart').show();
        //$(this).find('.paddc-tip').show();
    }, function(){
        $(this).find('.pins-share').slideUp(300);
        //$(this).find('.sales-add-cart').hide();
        //$(this).find('.paddc-tip').hide();
    });
    
    $(".pins dt").hover(function(){
        $(this).find('.pins-discount').fadeIn(300);
    }, function(){
        $(this).find('.pins-discount').fadeOut(300);
    });
    
    $('.sales-pins, .pin-pins').hover(function(){
        $(this).find('.pins-likeshare-share').stop(true, true).animate({
            width:"110px"
        });
        },function(){
        $(this).find('.pins-likeshare-share').stop(true, true).animate({
            width:"0px"
        });
    });
} 


function getnowtime() {  
 var timestamp = (new Date()).valueOf().toString().substr(0,10);  
 return parseInt(timestamp);  
}

//导航购物
function minicart(nocount){
  if(nocount){
    var data =  "countdown=0";
  }else{
    var data =  "countdown=1";
  }
  
  $.ajax({
        type: "POST",
        url: "/shopping/cart",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        beforeSend:function(){},
        success:function(re){
            if(re.data != null)
            {
                if(re.data.num){
                    $('#cart_total_quantity_value').html(re.data.num);
                    $('#cart_total_quantity_value').show();
                }else {
                    $('#cart_total_quantity_value').hide();
                }
                $('#navcart-pop').html(re.data.html);
                $('#navcart-popbar').show();                
            }

        },error:function(){
                //alert('未知错误');
                return;
            }
    });
}
//倒计时
function DownCount(){
  if(actnum <= 0){
    return;
  }
    for(var i=0;i<actnum;i++){
        if(endtimes[i]<=0){
            $("#ongoing_"+i).html("0秒"); 
        }else{          
            timechange(endtimes[i],i);  
            endtimes[i] = endtimes[i]-1;
        }
    }
}
function timechange(expires,i){
    if(expires > 0){
        var second = expires;
    }else{
        var second = "分";
        return second;
    }
    var day = hour = minutes = "";
    if(second>86400){
        day = Math.floor(second/86400)+" 天";
        second = second%86400;
    }
    if(second>3600){
        hour = Math.floor(second/3600);
        hour = hour.toString();
        if(hour.length==1){
            hour = hour + " 小时";
        }else{
            hour = hour + " 小时";
        }
        second = second%3600;
    }
    if(second>60){
        minutes = Math.floor(second/60);
        minutes = minutes.toString();
        if(minutes.length==1){
            minutes = minutes + "分";
        }else{
            minutes = minutes + "分";
        }
        second = second%60;
    }
    second = second.toString();
    if(second.length==1){
        second = second + "秒";
    }else{
        second = second + "秒";
    }
    $(".ongoing,#ongoing_"+i).html(day+hour+minutes+second); 
}

function popdiv(popdiv,width,height,alpha){
    
    var A = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; 
    var D = 0;
    D = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    if (D == 0) {
    D = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    } 
    var topheight = (A + (D - 300) / 2)-50 + "px";  
    $("#popbg").css({height:$(document).height(),filter:"alpha(opacity="+alpha+")",opacity:alpha})
    $("#popbg").fadeIn();
    $(popdiv).removeClass();
    $(popdiv).attr("class","pop_out ");
    $(popdiv).css({left:(($(document).width())/2-(parseInt(width)/2))+"px",top:topheight});
    $(popdiv).fadeIn();
}

//track分享
//参数：分享网分享url 分享内容类型 分享内容分享来源页面
function shareto(stype, url, ptype, pname, page){
    // if(isunlogin() == 1){
    //  showlogindiv();
    // }else{
        mixpanel.track('Share', {'mp_note':'user shared '+pname+' using '+stype,'Share Content':ptype,'Share Name':pname ,'Share Page':page,'Share SNS':stype});
        window.open(url);
    // }
}

//track喜欢
//参数：喜欢内容类喜欢内容喜欢来源页面
function tracklike(ptype, pname, page){
  mixpanel.track('Like ', {'mp_note':'user liked '+pname,'Like Content':ptype,'Like Name':pname ,'Like Page':page});
}

/* track评论
 * 参数：ctype(comment类型) page(页面) pname(留言的商
 * feed页发表留言 user message    feed   商品
 * product页发表留言 user message   product   商品
 * 我的订单页发表评buyer comment   myorder   商品
 */
function trackcomment(ctype, pname, page){
  mixpanel.track('Comment ', {'mp_note':'user commented on '+pname,'Comment Type':ctype,'Comment Name':pname ,'Comment Page': page});
}

//track邀
//参数：分享网分享url 邀请来源页
function trackinvite(stype, url, page, num){
  mixpanel.track('Invite', {'mp_note':'user invited using '+stype,'Invite Page':page,'Invite SNS':stype,'Amount Invited':num});
  if(url!='')
  {
      window.open(url); 
  }
}


//track加入购物
//参数：分享网分享url 邀请来源页
function trackcart(page){
  mixpanel.track("Add to Cart", {'Add to Cart Page':page});//Mixpanel 统计 购物
}
//统计去结进行统计
function trackgotocart(page){
    mixpanel.track("Go to Cart", {'Go to Cart Page':page});//Mixpanel 统计 结算
}
//点击继续购物" 和点击右上角进行统计
function trackgoShopping(page){
    mixpanel.track("Go on Shopping", {'Go on Shopping Page':page});//Mixpanel 统计 继续购物
}
//track邀
//参数：分享网分享url 邀请来源页
function trackweibo(stype, url, page){
  $('.boxtop-wbbox').hide();
  setTimeout('window.location.href= \''+url+'\'', 1000);
}
//验证用户邮箱
function checkuseremail(email)
{
    var filter=/^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    return filter.test(email);
}

//获取页面标识
function getpagesign(){
    var pagesign = $("input[name='pagesign']").val();
    return pagesign;
}

//获取用户行为
function getbehaviorid(){
    var behaviorid = $("input[name='behaviorid']").val();
    return behaviorid;
}

//获取当前是否登录
function isunlogin(){
    var unlogin = $("input[name='unlogin']").val();
    return unlogin;
}


//用户未登录点击跟踪cookie
//type 0 cookie记录
//type 1 cookie读取删除
function trackclick(type,clickbtn){
  if(type == 0)
  {
      if(clickbtn){
        $.cookie("clickbtn", clickbtn);
      }
  }else{
    var unlogin = isunlogin();
    //click事件跟踪
    if(unlogin!=1)
    {
        clickbtn = $.cookie('clickbtn');
        if(clickbtn != '' && clickbtn != 0){
            var pagesign = getpagesign();
            if(pagesign != 'index')
            {
                $(clickbtn).click();        
            }
            $.cookie('clickbtn', null);
            $("input[name='clickbtn']").val(''); 
         }      
    }
  }

  
}

//用户信息
function personal(){
  var pagesign = getpagesign();//pagesign
  if (pagesign=="login") { return;};
  var url = encodeURIComponent(window.location.href);//now pageurl
  var data = "default=1&pagesign="+pagesign+"&url="+url;
  $.ajax({
        type: "POST",
        url: "/Ajax/personal",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        beforeSend:function(){},
        success:function(re){
          // $('#personalhead').html(re.data.head);
          $('#j_mynuandao').find('li:last-child').remove().end().append(re.data.head);
          $('#personalfoot').html(re.data.foot);
          $('.header-regreward').css('display', 'none');
          //alert(re.data.pop);
          $('#personalpop').html(re.data.pop);
          //登陆弹层
          if(re.data.unlogin == 1)
          {
            poplogin();
            $('.header-regreward').css('display', 'block');
          }
          if(re.data.unlogin == 0)
          {
            $('.header-regreward').css('display', 'none');
          }
        },error:function(){
            //alert('未知错误');
            return;
        }
    });
}

//用户信息
function syncUserbehavior(){
  var pagesign = getpagesign();
  var behaviorid = getbehaviorid();
  var data = "default=1&pagesign="+pagesign+"&id="+behaviorid;
  $.ajax({
        type: "POST",
        url: "/Ajax/syncbehavior",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        beforeSend:function(){},
        success:function(re){
          $('#personalfootjs').html(re.data.footjs);
        },error:function(){
            //alert('未知错误');
            return;
        }
    });
}

function syncShareButton()
{
    var pagesign = getpagesign();
    var behaviorid = getbehaviorid();
    var data = "default=1&pagesign="+pagesign+"&id="+behaviorid;
    if(pagesign == 'sale' || pagesign == 'product' || pagesign == 'only')
    {
        $.ajax({
            type: "POST",
            url: "/Ajax/syncShareButton",
            dataType:"json",
            cache: false,
            data: data+"&m=" + Math.random(),
            beforeSend:function(){},
            success:function(re){
              $('#topbox-share').html(re.data.share);
              $('#topbox-time').html(re.data.topboxtime);
            },error:function(){
                //alert('未知错误');
                return;
            }
        });
    }
}


function syncProductBlock()
{
    var pagesign = getpagesign();
    var behaviorid = getbehaviorid();
    var data = "default=1&pagesign="+pagesign+"&id="+behaviorid;
    if(pagesign == 'product')
    {
        $.ajax({
            type: "POST",
            url: "/Ajax/syncProductBlock",
            dataType:"json",
            cache: false,
            data: data+"&m=" + Math.random(),
            beforeSend:function(){},
            success:function(re){
              $('#pblock').append(re.data.html.pblock);
              $('#pprice').html(re.data.html.pprice);
              $('#feedlist').html(re.data.html.feedlist);
            },error:function(){
                //alert('未知错误');
                return;
            }
        });
    }   
}

// 提交设计师信
function partner(url, partner_submit) {
    if(partner.submit) return;                      // 防止再次提交表单
    var required = false;                           // 标记表单必填项是否都填写
    var $msg = $('#J_message');                     // 显示提示信息
    var message = '';
    var $partnerInfo = $('#J_partnerInfo');
    var $inputs = $partnerInfo.find('input');       // 所有的文本
    $.each($inputs.toArray(), function() {
        if(this.getAttribute('require') && !$.trim(this.value)){
            $(this).addClass('error');
            required = true;
        }
    });
    if(required) { message += '红色框为必填'; }
    // 验证邮箱的合法
    var $email = $inputs.filter('[name="email"]');
    var email_re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var email_valid = email_re.test($email.val());
    if(!email_valid) { $email.addClass('error'); message += '填写有效的邮箱地址.'; }
    $inputs.bind('focus', function(){
        $(this).removeClass('error');
        $msg.hide();
    });
    
    if(!required && email_valid) {
        $.ajax({
            type: 'POST',
            url: url,
            dataType:"json",
            data: $partnerInfo.serialize()+"&m=" + Math.random(),
            beforeSend: function(){
                    partner.submit = true; 
                },
            success: function(o){ 
                if(o.status == 1){
                    partner.submit = true; 
                    $msg.text('您的信息已提交成').show(); 
                }else{  
                    partner.submit = false;             
                    $msg.html(o.info);  
                }
            },error:function(){
                //alert('未知错误');
                return;
            }
        }); 
    }else {
        $msg.text(message).show();
    }

}
;


//---------- 优美的分割线 -----------// 
$(document).ready(function() {
	$("#m-search-btn").click(function(event) {
		$("#search-area").toggle();
	});
});;


//---------- 优美的分割线 -----------// 
var ND = ND || {};
ND.EMAIL = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
ND.isFn = function(sFunc) {
    return (typeof $.fn[sFunc] === 'function') ? true : false;
};
ND.checkEmail = function(email, el) {
    if(email === '') {
        el.text('请填写邮箱地址').show();
        return false;
    }
    if(!ND.EMAIL.test(email)) {
        el.text('您填写的邮箱地址不正确').show();
        return false;
    }
    return true;
};
ND.isIos = function() { 
    return /(iphone|ipad|ipod)/i.test(navigator.userAgent); 
};
ND.setBackgroundImage = function(url) { 
    return 'url(' + url + ')';
};
/**
 * 延迟加载图片
 * 由事件触发指定区域图片的加载请求
 * 
 * 例如$('#J_header-nav').lazyloadBlock({ block: '.header-nav', events: { load: window }});
 * 当load事件触发后,自动加载.header-nav区域内的图片
 */
;(function($, window, undefined) {

    var defaults = {
        image: 'img',               // img元素或类名 如.lazyloadImg
        block: '',                  // 要加载图片区域，可以配合事件按需加载
        events: null,               // 事件集合{事件: 触发事件的元素或选择器} { click: '.active a', load: window }
        autoTriggle: false          // 当ready时是否开始加载。经常用于可见区域
    };
    $.fn.lazyloadBlock = function(options) {
        // opts = $.extend(defaults, options); 这样会修改第一个参数defaults的结构导致意外
        var opts = $.extend({}, defaults, options);
        var lazyloadOpts = $.extend({}, options, { event: 'lazyloadAppear' })
        var image = opts.block ? opts.block + ' ' + opts.image : opts.image;
        var events = opts.events; 
        // 显示活动区域的图片
        var appear = function() {
            this.find(image).trigger('lazyloadAppear');
        }
        return this.each(function() {
            var $self = $(this)
                , appearProxy = $.proxy(appear, $self);
            // 为所有图片添加事件触发的延迟加载
            $(opts.image, $self).lazyload(lazyloadOpts);

            // 遍历events对象指定元素上的事件
            for(var evType in events) {             
                if(events.hasOwnProperty(evType)) {
                    var selector = events[evType];
                    // 正则匹配最后空格前后的选择器字符串
                    if( typeof selector === 'string' && (selectors = /(.+)\s(\S+)/.exec(selector))) {
                        // 用on代替delegate
                        $(selectors[1]).on(evType, selectors[2], appearProxy);
                    }else {
                        $(selector).bind(evType, function() {
                            if(evType === 'load') {             // window.onload时执行
                                setTimeout(appearProxy, 0);
                            }else {
                                appear.call($self);
                            }
                        });
                    }
                }
            }
            // 页面加载时触发一次
            $(document).ready(function() {
                opts.autoTriggle && appear.call($self);
            });
        });

    };
}(jQuery, window));

$(function() {
    var $win = ND.$win = $(window);
    // 导航nav的特别推荐内的图片延迟到load事件后加载
    $('#J_header-nav').lazyloadBlock({
        image: '.header-nav-img',
        events: { load: window }
    });
    // 参考参数: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
    if(ND.isFn('flexslider')) {
        //=====首页大图banner轮番=====
        // by 20140508 mackxu
        $('#J_banner').flexslider({ pauseOnHover: true, slideshowSpeed: 5000, namespace: "nd-" });

        //=====lookbook 与上面用同一个插件=====
        // by 20140508 mackxu
        $('.flash-lookbook').flexslider({ animation: 'slide', slideshowSpeed: 7000, pauseOnHover: true, controlNav: false, directionNav: false });
        
    }

    //=====图片的延迟加载,加速page load=====
    if(ND.isFn('lazyload')) {

        $('.lazyload-img').lazyload({
            threshold : 600,            // causes image to load 600 pixels before it appears on viewport
            failure_limit : 10,         // 找到3个不在可见区域的图片是才停止搜索
            event: "scrollstop",
            skip_invisible : false      // 对隐藏状态的图片添加该延迟
        });
    }
    
    // 找回密码
    $('#getpwd-btn').on('click', function() {
        var email = $.trim($('#uemail').val());
        var $errorTxt = $('.error-txt');
        if(ND.checkEmail(email, $errorTxt)) {
            $.ajax({
                type: 'POST',
                url: '/public/resetemail',
                data: { email: email },
                dataType: 'json'
            }).done(function(r) {
                if(r.status === 0) $errorTxt.text(r.info).show();
                if(r.status === 1) {
                    console.log(r.info);
                    $('#formforget').hide();
                    $('#formsend').show();
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                return;
            });
        }
    });
    // 找回密码加强版, 监听输入框的回车事件
    $('#uemail').keydown(function(e) {
        if(e.which === 13) {
            $('#getpwd-btn').click();
            e.preventDefault();
        } 
    });
    

});

