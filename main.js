
/*获取非行间样式*/
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
}

/*根据class获取元素*/
function getByClass(oParent,sClass){
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    for(var i=0;i<aEle.length;i++){
        if(aEle[i].className==sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

/*轮播*/
function PicSlide(panel,opt){
    this.panel=typeof panel=="string"?document.getElementById(panel):panel;
    for(var k in opt)this[k]=opt[k]
    this.init()
};
PicSlide.prototype={
    current:0,
    timer:null,
    time:null,
    type:"scroll",
    act:"scroll",
    interval:4000,
    init:function (){
        var _this=this,world=this.panel.parentNode;
        this.imgs=this.panel.getElementsByTagName("li");
        for(var i=0,l=this.imgs.length;i<l;i++)
            this.imgs[i].style.cssText="position:absolute;display:"+(i==0?"":"none");
        this.createTab();
        this.interval=Math.max(this.interval,this.time);
        world.onmouseover=function (){_this.hover=true};
        world.onmouseout=function (){_this.hover=false};
        this.auto()
    },
    createTab:function (){
        var len=this.imgs.length,btn,_this=this;
        this.nav=document.getElementById(this.panel.id+"_nav");
        this.btns=this.nav.getElementsByTagName("li");
        for(var i=0;i<len;i++){
            btn=this.btns[i];
            if(i==0)btn.className="nd-active";
            btn.radioIndex=i;
            btn.onmouseover=function (){_this.focus(this.radioIndex)}
        }
    },
    focus:function (next){
        next=next%this.imgs.length;
        if(next==this.current)return;
        this.btns[this.current].className="";
        this.btns[next].className="nd-active";
        this.fade(next);
    },
    fade:function (next){
        var _this=this;
        clearInterval(this.timer);
        this.timer=this.fx(1,0,function (x){
           _this.opacity( _this.imgs[_this.current],x)
        },function (){
            _this.imgs[_this.current].style.display="none";
            _this.opacity(_this.imgs[next],0);
            _this.imgs[next].style.display="";
            _this.current=next;
            _this.timer=_this.fx(0,1,function (x){
                _this.opacity( _this.imgs[next],x)
            },0,200,.5)
        })
    },
    fx:function (f,t,fn,ed,tm,r){
        var D=Date,d=new D,e,ed=ed||D,c=tm||0,r=r||5;
        return e=setInterval(function (){
            var z=Math.min(1,(new D-d)/c);
            var stop=fn(+f+(t-f)*Math.pow(z,r),z);
            if(z==1||false===stop)ed(clearTimeout(e))
        },10)
    },
    opacity:function (el,n){
       el.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+n*100+");";
       if(n==1)el.style.filter=null;	
       el.style.opacity=n;       
    },
    auto:function (){
        var _this=this;
        setInterval(function (){if(!_this.hover)_this.focus(_this.current+1)},this.interval);
    }
};


/*获取非行间样式*/
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
}

/*运动框架*/
function startMove(obj,attr,iTarget){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=0;
        if(attr=='opacity'){
            cur=Math.round(parseFloat(getStyle(obj,attr))*100);
        }
        else{
            cur=parseInt(getStyle(obj,attr));
        }

        var speed=(iTarget-cur)/6;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);

        if(cur==iTarget){
            clearInterval(obj.timer);
        }
        else{
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
                
            }
            else{
                obj.style[attr]=cur+speed+'px';
            }
        }
    },30);
}


/*首页大图轮播*/
function scroll(oParent,obig,osmall,prev,next,actived){
    var oDiv=document.getElementById(oParent);
    var oBtnPrev=getByClass(oDiv,prev)[0];
    var oBtnNext=getByClass(oDiv,next)[0];
    var oSmall=getByClass(oDiv,osmall)[0];  
    var aLiSmall=oSmall.getElementsByTagName('li');
    var oUlBig=getByClass(oDiv,obig)[0];
    var aLiBig=oUlBig.getElementsByTagName('li');
    var nowZIndex=2;
    var now=0;
    
    
    //大图切换
    for(var i=0;i<aLiSmall.length;i++){
        aLiSmall[i].index=i;

        aLiSmall[i].onmouseover=function(){
            
            if(this.index==now)return;
            now=this.index;
            tab();
        }
        aLiSmall[i].onmouseout=function(){
            if(this.index!=now){
                startMove(this,'opacity',60);
            }
        }

    }

    function tab(){
        aLiBig[now].style.zIndex=nowZIndex++;

        for(var i=0;i<aLiSmall.length;i++){
            aLiSmall[i].className='';
        }
        aLiSmall[now].className=actived;

        aLiBig[now].style.height=0;
        startMove(aLiBig[now],'height',500);

    }

    oBtnPrev.onclick=function(){
        now--;
        if(now==-1){
            now=aLiSmall.length-1;
        }
        tab();
    };

    oBtnNext.onclick=function(){
        now++;
        if(now==aLiSmall.length){
            now=0;
        }
        tab();
    };

    var timer=setInterval(oBtnNext.onclick,5000);
    oDiv.onmouseover=function(){
        clearInterval(timer);
    }
    oDiv.onmouseout=function(){
        timer=setInterval(oBtnNext.onclick,5000);
    }

};



//注册
$(function() {
    //弹出
    $("#aa a,.reg a").click(function() {
        $("#reg_setp,#setp_quicklogin").show();
        
        $("#reg_setp").animate({
            left: 0 //移动位置
        },
        500, "easeOutQuart") //速度与形式
    });
    
    //返回
    $(".back_setp").click(function() {
        "block" == $("#setp_quicklogin").css("display") && $("#reg_setp").animate({
            left: "100%"
        },
        500, "easeOutQuart", //速度与形式
        function() {
            $("#reg_setp,#setp_quicklogin").hide()
        })
    });
});

$(function() {
    
    // 列表弹出POPUP
    $.fn.showSlide = function() {
        $(this).hover(function() {
            var a = $(this);
            dsfdjsk = setTimeout(function() {
                a.find(".sc_detail").stop(!0, !1).animate({
                    bottom: "0"
                },
                450, "easeOutQuart")
            },
            50)
        },
        function() {
            clearTimeout(dsfdjsk);
            $(this).find(".sc_detail").stop(!0, !1).animate({
                bottom: "-60px"
            },
            380, "easeOutQuart")
        })
    };
    $(".list_grid_1").showSlide();
    
    
    // 返回顶部 
    $(window).scroll(function() {
        0 < $(window).scrollTop() ? ($("#footer_side").css({
            bottom: 30
        }), $("#backtop").click(function() {
            if (!$("html,body").is(":animated")) return $("html,body").animate({
                scrollTop: 0
            },
            500),
            !1
        })) : $("#footer_side").css({
            bottom: -250
        })
    });
    
    
    
    //搜索
    if (document.getElementById("search_class_emu")) {
        $("#search_class option:eq(" + $(".search_class_cur").index() + ")").attr("selected", !0);
        $(".searchtxt").focus(function() {
            $("#search_class_emu").stop(!0, !0).slideDown(500, "easeOutQuart")
        });
        $("#header").mouseleave(function() {
            $("#search_class_emu").stop(!0, !0).slideUp(500, "easeOutQuart");
            document.getElementById("search").getElementsByTagName("input")[0].blur()
        });
        var v = $("#search form").attr("data-action");
        $("#search_class_emu li").click(function() {
            $("#search_class_emu li").removeClass("search_class_cur");
            $(this).addClass("search_class_cur");
            $("#search_class option[selected]").removeAttr("selected");
            var a = $(this).attr("data-cat") || "";
            $("#search form").attr("action", v + a + "/")
        })
    }
    

    
    
    
    //用户_登录_输入款_焦点
    $.fn.placeholder = function() {
        var a = $(this),
        b = a.val();
        a.focus(function() {
            a.val() == b && a.val("");
        }).blur(function() {
            "" == a.val() && a.val(b)
        })
    };

    $(".searchtxt").placeholder();//搜索框焦点
    $(".comment_text").placeholder();//评论框焦点
    
    $(".loginusername").placeholder();
    $(".loginuserpasswordt").focus(function() {
        "\u5bc6\u7801" == $(this).attr("value") && ($(".loginuserpasswordt").hide(), $(".loginuserpasswordp").show(), document.getElementsByName("password")[0].focus())
    });
    $(".loginuserpasswordp").blur(function() {
        "" == $(this).val() && ($(".loginuserpasswordt").show(), $(".loginuserpasswordp").hide(), $(".loginuserpasswordt").attr("value", "\u5bc6\u7801"))
    });
    
});


//注册登录页面 背景
(function($){   
    $.fn.fullscreenr = function(options) {
        if(options.height === undefined) alert('Please supply the background image height, default values will now be used. These may be very inaccurate.');
        if(options.width === undefined) alert('Please supply the background image width, default values will now be used. These may be very inaccurate.');
        if(options.bgID === undefined) alert('Please supply the background image ID, default #bgimg will now be used.');
        var defaults = { width: 1280,  height: 1024, bgID: 'bgimg' };
        var options = $.extend({}, defaults, options); 
        $(document).ready(function() { $(options.bgID).fullscreenrResizer(options); });
        $(window).bind("resize", function() { $(options.bgID).fullscreenrResizer(options); });      
        return this;        
    };  
    $.fn.fullscreenrResizer = function(options) {
        // Set bg size
        var ratio = options.height / options.width; 
        // Get browser window size
        var browserwidth = $(window).width();
        var browserheight = $(window).height();
        // Scale the image
        if ((browserheight/browserwidth) > ratio){
            $(this).height(browserheight);
            $(this).width(browserheight / ratio);
        } else {
            $(this).width(browserwidth);
            $(this).height(browserwidth * ratio);
        }
        // Center the image
        $(this).css('left', (browserwidth - $(this).width())/2);
        $(this).css('top', (browserheight - $(this).height())/2);
        return this;        
    };
})(jQuery);


//全屏背景
$(function(){
    var theWindow        = $(window),
        $bg              = $("#bg"),
        aspectRatio      = $bg.width() / $bg.height();
                                
    function resizeBg() {
        
        if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            $bg
                .removeClass()
                .addClass('bgheight');
        } else {
            $bg
                .removeClass()
                .addClass('bgwidth');
        }
                    
    }
                                
    theWindow.resize(function() {
        resizeBg();
    }).trigger("resize");

});



//把元素类型为空格而且是文本都删除
function del_ff(elem){
    var elem_child = elem.childNodes;
    for(var i=0; i<elem_child.length;i++){
        if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
            elem.removeChild(elem_child[i])
        }
    }
}


