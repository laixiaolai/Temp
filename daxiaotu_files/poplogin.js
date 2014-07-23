//初始化登陆
function poplogin()
{//isqqhloginobj
    var ultype = $("input[name='ultype']").val();
    var isweibologinobj = $("input[name='isweibologinobj']").val();
    var isqqweibologinobj = $("input[name='isqqweibologinobj']").val();
    var hidelogindivobj = $("input[name='hidelogindivobj']").val();
    var isrenrenloginobj = $("input[name='isrenrenloginobj']").val();
    var showlogindivobj = $("input[name='showlogindivobj']").val();
    var isqqhloginobj = $("input[name='isqqhloginobj']").val();
    var isforgetpage  = $("input[name='isforgetpage']").val();
    $('.loginbg').hide();

    /* 测试取消登录层 renziming */

    if(!isforgetpage =='1'){

         if(isweibologinobj == '')
        {

            if(hidelogindivobj == '' ) 
            {
                showlogindiv();
            }
            if(showlogindivobj !='')
            {
                showlogindiv();
            }
        }
    }
    if((isweibologinobj != '' && typeof(isweibologinobj) != "undefined" )|| (isrenrenloginobj !='' && typeof(isrenrenloginobj) != "undefined") || (isqqweibologinobj != '' && typeof(isqqweibologinobj) != "undefined") || (isqqhloginobj != '' && typeof(isqqhloginobj) != "undefined")){
        //$('.pop-bg').show();
        $('.logreg-box').hide();
        $('#personalpop').show();  
        $('#weibologin-step').show();       
    }
    $('#index-to-reg,#index-to-login').live('click',function(){
        showlogindiv();
    })

    
    //弹出层关闭的操作
    $('.pop-bg,#reg-login-close,#overlay-quit').click(function(){                          
        //$('.pop-bg').fadeOut();
        $('#personalpop').hide();
        $('#weibologin-step').hide();
        $('#reg-login-area').hide();
        //设置cookie 标识强制隐藏登录层
        $.cookie("nd_hidelogin", 1, {expires: 0, path: '/', domain:'nuandao.com'});
    });


    $('.wblogin-tip-layer').hide();
    //微博切页
    // $(".logreg-zonebg").Slider({prevId:'.arrw-left',nextId:'.arrw-right',shownum:1,offbtn:'off_btn',offline:1});

    $('.wblogin-way').click(function(){
        console.log(1);
        $('.wblogin-way input').removeAttr('checked');
        $(this).find('input').attr('checked', 'checked');
        $('.wblogin-detail').hide();
        $(this).parent().parent().find('.wblogin-detail').show();
        //$('.forget').hide();
        $(this).parent().find('.forget').show();
    });
    $('.wblogin-way').eq(0).trigger('click');

    var $loginSnsBind = $('.login-sns-bind').click(function(e) {
        console.log(this)
        if($(e.target).is('.wblogin-way-radio')) {
            console.log(this);
            $loginSnsBind.removeClass('checked');
            $(this).addClass('checked');
        }
    });

    $('.wblogin-tip-layer input, .wblogin-tip-layer .btns').click(function(){
        $('.wblogin-tip-layer').hide();
        $('.wblogin-way').eq(0).trigger('click');
    });
    //回车绑定事件
    document.onkeydown=function(event){
        e = event ? event :(window.event ? window.event : null); 

        if(e.keyCode==13){ 
           if($('#reg-login-area').css('display') != 'none'){
              checkval(1,$(this).find('.loginbtn'));
           }
           if($('#weibologin-step').css('display') != 'none'){
	            if($('.wblogin-way').eq(0).find('input').attr("checked") =='checked')
	            {
	            	 if(ultype == 'weibo')
	                 {
	                      weiboreg();
	                 }
	                 if(ultype == 'renren'){
	                      renrenreg();
	                 }
	                if(ultype == 'qq'){
	             	   qqweiboreg();
	                }
	                if(ultype == 'qqh'){
	             	   qqhreg();
	                }   
	            }
	
	            if($('.wblogin-way').eq(1).find('input').attr("checked") =='checked')
	            {
                    if(ullogin(ultype))
                    {
                        $('.btn-withloading').click(function(){
                            $(this).find('.btns').css('visibility','hidden');
                            $(this).find('.login-loading').css('visibility','visible');
                        });           
                    }
	              // if(ultype == 'weibo')
	              //    {
	              //         weiboreg();
	              //    }
	              //    if(ultype == 'renren'){
	              //         renrenreg();
	              //    }
	              //   if(ultype == 'qq'){
	             	//    qqweiboreg();
	              //   }
	              //   if(ultype == 'qqh'){
	             	//    qqhreg();
	              //   }   
	            }
	            
	            //$(this).find('.btns').css('visibility','hidden');
	            //$(this).find('.login-loading').css('visibility','visible');
           }
        };
    };

    $("#login-btn").click(function(){
        checkval(1,$(this));
    });

    $("#tologin-btn").click(function(){
        checkval(0,$(this));
    });

    $("#weibo-newu-btn,#qqweibo-newu-btn,#renren-newu-btn,#qqh-newu-btn").click(function(){

        if(ultype == 'weibo')
        {
             weiboreg();
        }
        if(ultype == 'renren'){
             renrenreg();
        }
       if(ultype == 'qq'){
    	   qqweiboreg();
       }
       if(ultype == 'qqh'){
    	   qqhreg();
       }
    });

    // $("#qqh-newu-btn").click(function(event) {
    //     alert(click);
    //     alert(ultype);
    // });

    $("#weibo-loginu-btn,#qqweibo-loginu-btn,#renren-loginu-btn,#qqh-loginu-btn").click(function(){
        if(ullogin(ultype))
        {
            $('.btn-withloading').click(function(){
	            $(this).find('.btns').css('visibility','hidden');
	            $(this).find('.login-loading').css('visibility','visible');
            });           
        }
    });
}
//登录或注册
function checkval(where,clickedbtn){
    var isinvite = $("input[name='isinvite']").val();
    var invitetype = $("input[name='invitetype']").val();
    var s = window.location.search;

    var uemail=$("#uemail"),upassword=$("#upassword"),uerror=$("#text-error1");
    var remember = $('input[name=remember]:checked');
    var uagreeterms = $('input[name=uagreeterms]:checked');
    var k1=0;
    var k2=0;
    
    var clickbtn = $("input[name='clickbtn']").val();//之前点击的按钮id
    
    uerror.html('').hide();//隐藏所有的错误提示
    
    if(uemail.val()==""){
        uerror.eq(k1).html('请填写邮箱').show();
        return false;
    }else{
        if (!checkuseremail(uemail.val())) { 
            uerror.eq(k1).html("邮箱格式有误").show();
            return false; 
        }else{
            uerror.eq(k1).html('').hide();
        }
    }
    
    if(upassword.val()==""){
        uerror.eq(k2).html('请填写密码').show();
        return false;
    }else{
        uerror.eq(k2).html('').hide();
    }

    if(uagreeterms.val()){
        uerror.eq(k2).html('').hide();
    }else{
        uerror.eq(k2).html('请勾选同意服务条款').show();
        return false;
    }
  
    var data = 'isajax=1&remember='+remember.val()+'&email='+uemail.val()+'&password='+upassword.val()+'&agreeterms='+uagreeterms.val()+'&itype='+invitetype+'&book='+1;;
    
    //点击加loading效果
    addloading(clickedbtn);

    $.ajax({
        type: "POST",
        url: "/public/lazyentrance",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        beforeSend:function(){},
        success:function(re){
          if(re.status == 1){
            trackclick(1,0);
            if (where==0) {
                window.location.href=window.location.host;
            };
            if(re.data.checktype == 1){
            	window.location.href= gettourl('');
            	
            }else{
                if(s != ''){
                    mixpanel.register({'Introduction Type':'advertisement'});
                }else{
                    if(isinvite > 0){
                        if(invitetype == 1){
                            mixpanel.register({'Introduction Type':'invited'});
                        }else{
                            mixpanel.register({'Introduction Type':'shared'});
                        }
                        
                    }else{
                        mixpanel.register({'Introduction Type':'default'});
                    }
                }

                if(isinvite > 0){
                     mixpanel.track("All Registration Complete", {'weibo':'no','invited':'yes','unique inviter' : re.data.count}); 
                }else{
                        mixpanel.track("All Registration Complete", {'weibo':'no','invited':'no'});
                }
                setTimeout("window.location.href= gettourl('')", 1);
            }  

            //取消loading效果；
            removeloading(clickedbtn);      
          }else{

            //取消loading效果；
            removeloading(clickedbtn);

            if(re.data.itype == 1){
                if(re.status ==2){
                    uerror.eq(k2).html(re.info).show();
                }else{
                    uerror.eq(k1).html(re.info).show();
                }
            }else{
                $('#forgetpwd').show(); 
                if(re.info == '邮箱已经存在' && regtype == 2){
                    $('#newemail-copy').html(uemail.val());
                    $('#ucemail').val(uemail.val());
                    $('.logreg-box').hide();
                    $('#weibologin-step-2').show();             
                }else{
                    uerror.eq(k1).html(re.info).show();
                }
            }
          }
        },
        error:function(){
                return;
        }
      });
    //$("#loginform").submit();
}


//微博
function weiboreg()
{
    var isinvite = $("input[name='isinvite']").val();
    var invitetype = $("input[name='invitetype']").val();
    var s = window.location.search;

    var uemail=$("#newemail"),uerror=$("#text-error2");
    var k3=0;

    uerror.html('').hide();
    if(uemail.val()==""){
        uerror.eq(k3).html('请填写邮箱').show();
        return false;
    }else{
        if (!checkuseremail(uemail.val())) { 
            uerror.eq(k3).html("邮箱格式有误").show();
            return false; 
        }else{
            uerror.eq(k3).html('').hide();      
        }
    }
    var data = 'isajax=1&itype='+invitetype+'&agreeterms='+1+'&email='+uemail.val()+'&weiboface='+1+'&book='+1;

    //点击加loading效果
    addloading($('.snsregbtn'));

    $.ajax({
        type: "POST",
        url: "/public/insert",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        //beforeSend:function(){},
        success:function(re){
            if(re.status == 1){
                if(s != ''){
                    mixpanel.register({'Introduction Type':'advertisement'});
                }else{
                    if(isinvite > 0){
                        if(invitetype == 1){
                            mixpanel.register({'Introduction Type':'invited'});
                        }else{
                            mixpanel.register({'Introduction Type':'shared'});
                        }
                        
                    }else{
                        mixpanel.register({'Introduction Type':'default'});
                    }
                }
                mixpanel.register({'Weibo Status':'Bound', 'Weibo Share':'On', 'Weibo Buy':'On'});  
         
                if(isinvite > 0){
                        mixpanel.track("All Registration Complete", {'weibo':'yes','invited':'yes','unique inviter' : re.data.count});
                        mixpanel.track("Weibo Bind Complete", {'Bind on':'register'});
     
                }else{
                        mixpanel.track("All Registration Complete", {'weibo':'yes','invited':'no'});
                        mixpanel.track("Weibo Bind Complete", {'Bind on':'register'});
                }
                
                
                //取消loading效果；
                removeloading($('.snsregbtn'));
                setTimeout("window.location.href= gettourl('"+s+"')", 1000);
                return true;
            }else{

            //取消loading效果；
            removeloading($('.snsregbtn'));

                if(re.info == '邮箱已经存在'){
                    // $('#newemail-copy').html(uemail.val());
                    // $('#ucemail').val(uemail.val());
                    // $('.logreg-box').hide();
                    // $('#weibologin-step-2').show();   
                     uerror.eq(k3).html(re.info).show();          
                }else{
                    uerror.eq(k3).html(re.info).show();
                }
                return false;
            }
            
        },error:function(){
            return;
        }
      });

}
//qqweibo
function qqweiboreg()
{
    var isinvite = $("input[name='isinvite']").val();
    var invitetype = $("input[name='invitetype']").val();
    var s = window.location.search;

    var uemail=$("#newemail"),uerror=$("#text-error2");
    var k3=0;

    uerror.html('').hide();
    if(uemail.val()==""){
        uerror.eq(k3).html('请填写邮箱').show();
        return false;
    }else{
        if (!checkuseremail(uemail.val())) { 
            uerror.eq(k3).html("邮箱格式有误").show();
            return false; 
        }else{
            uerror.eq(k3).html('').hide();      
        }
    }
    var data = 'isajax=1&itype='+invitetype+'&agreeterms='+1+'&email='+uemail.val()+'&qqweiboface='+1+'&book='+1;
   
    //点击加loading效果；
    addloading($('.snsregbtn'));

    $.ajax({
        type: "POST",
        url: "/public/insert",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        //beforeSend:function(){},
        success:function(re){
            if(re.status == 1){
                if(s != ''){
                    mixpanel.register({'Introduction Type':'advertisement'});
                }else{
                    if(isinvite > 0){
                        if(invitetype == 1){
                            mixpanel.register({'Introduction Type':'invited'});
                        }else{
                            mixpanel.register({'Introduction Type':'shared'});
                        }
                        
                    }else{
                        mixpanel.register({'Introduction Type':'default'});
                    }
                }
                mixpanel.register({'Weibo Status':'Bound', 'Weibo Share':'On', 'Weibo Buy':'On'});  
         
                if(isinvite > 0){
                        mixpanel.track("All Registration Complete", {'weibo':'yes','invited':'yes','unique inviter' : re.data.count});
                        mixpanel.track("Weibo Bind Complete", {'Bind on':'register'});
     
                }else{
                        mixpanel.track("All Registration Complete", {'weibo':'yes','invited':'no'});
                        mixpanel.track("Weibo Bind Complete", {'Bind on':'register'});
                }
                
                
                //取消loading效果；
                removeloading($('.snsregbtn'));
                setTimeout("window.location.href= gettourl('"+s+"')", 1000);
                return true;
            }else{

                //取消loading效果；
                removeloading($('.snsregbtn'));

                if(re.info == '邮箱已经存在'){
                    // $('#newemail-copy').html(uemail.val());
                    // $('#ucemail').val(uemail.val());
                    // $('.logreg-box').hide();
                    // $('#weibologin-step-2').show();   
                     uerror.eq(k3).html(re.info).show();          
                }else{
                    uerror.eq(k3).html(re.info).show();
                }
                return false;
            }
            
        },error:function(){
            return;
        }
      });

}
//qqh
function qqhreg(){
	   var isinvite = $("input[name='isinvite']").val();
	    var invitetype = $("input[name='invitetype']").val();
	    var s = window.location.search;

	    var uemail=$("#newemail"),uerror=$("#text-error2");
	    var k3=0;
	    uerror.html('').hide();
	    
	    if(uemail.val()==""){
	        uerror.eq(k3).html('请填写邮箱').show();
	        return false;
	    }else{
	        if (!checkuseremail(uemail.val())) { 
	            uerror.eq(k3).html("邮箱格式有误").show();
	            return false; 
	        }else{
	            uerror.eq(k3).html('').hide();      
	        }
	    }
	    
	    var data = 'isajax=1&itype='+invitetype+'&agreeterms='+1+'&email='+uemail.val()+'&qqhface='+1+'&book='+1;

	    
        //点击加loading效果；
        addloading($('.snsregbtn'));

	    $.ajax({
	        type: "POST",
	        url: "/public/insert",
	        dataType:"json",
	        cache: false,
	        data: data+"&m=" + Math.random(),
	        //beforeSend:function(){},
	        success:function(re){
	            if(re.status == 1){
	                if(s != ''){
	                    mixpanel.register({'Introduction Type':'advertisement'});
	                }else{
	                    if(isinvite > 0){
	                        if(invitetype == 1){
	                            mixpanel.register({'Introduction Type':'invited'});
	                        }else{
	                            mixpanel.register({'Introduction Type':'shared'});
	                        }
	                        
	                    }else{
	                        mixpanel.register({'Introduction Type':'default'});
	                    }
	                }
	                mixpanel.register({'Weibo Status':'Bound', 'Weibo Share':'On', 'Weibo Buy':'On'});  
	         
	                if(isinvite > 0){
	                        mixpanel.track("All Registration Complete", {'weibo':'yes','invited':'yes','unique inviter' : re.data.count});
	                        mixpanel.track("Weibo Bind Complete", {'Bind on':'register'});
	     
	                }else{
	                        mixpanel.track("All Registration Complete", {'weibo':'yes','invited':'no'});
	                        mixpanel.track("Weibo Bind Complete", {'Bind on':'register'});
	                }
	                
	                ///取消loading效果；
                    removeloading($('.snsregbtn'));
	                setTimeout("window.location.href= gettourl('"+s+"')", 1000);
	                return true;
	            }else{

	               //取消loading效果；
                    removeloading($('.snsregbtn'));

	                if(re.info == '邮箱已经存在'){
	                    // $('#newemail-copy').html(uemail.val());
	                    // $('#ucemail').val(uemail.val());
	                    // $('.logreg-box').hide();
	                    // $('#weibologin-step-2').show();   
	                     uerror.eq(k3).html(re.info).show();          
	                }else{
	                    uerror.eq(k3).html(re.info).show();
	                }
	                return false;
	            }
	            
	        },error:function(){
	            return;
	        }
	      });
}


//微博
function renrenreg()
{
    var isinvite = $("input[name='isinvite']").val();
    var invitetype = $("input[name='invitetype']").val();
    var s = window.location.search;

    var uemail=$("#newemail"),uerror=$("#text-error2");
    var k3=0;

    uerror.html('').hide();
    if(uemail.val()==""){
        uerror.eq(k3).html('请填写邮箱').show();
        return false;
    }else{
        if (!checkuseremail(uemail.val())) { 
            uerror.eq(k3).html("邮箱格式有误").show();
            return false; 
        }else{
            uerror.eq(k3).html('').hide();      
        }
    }
    var data = 'isajax=1&agreeterms='+1+'&email='+uemail.val()+'&renrenface='+1+'&book='+1;

    //点击加loading效果
    addloading($('.snsregbtn'));

    $.ajax({
        type: "POST",
        url: "/public/insert",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        //beforeSend:function(){},
        success:function(re){
            if(re.status == 1){
                if(s != ''){
                    mixpanel.register({'Introduction Type':'advertisement'});
                }else{
                    if(isinvite > 0){
                        if(invitetype == 1){
                            mixpanel.register({'Introduction Type':'invited'});
                        }else{
                            mixpanel.register({'Introduction Type':'shared'});
                        }
                        
                    }else{
                        mixpanel.register({'Introduction Type':'default'});
                    }
                }
                mixpanel.register({'Renren Status':'Bound', 'Renren Share':'On', 'Renren Buy':'On'});  
         
                if(isinvite > 0){
                        mixpanel.track("All Registration Complete", {'Renren':'yes','invited':'yes','unique inviter' : re.data.count});
                        mixpanel.track("Renren Bind Complete", {'Bind on':'register'});
     
                }else{
                        mixpanel.track("All Registration Complete", {'Renren':'yes','invited':'no'});
                        mixpanel.track("Renren Bind Complete", {'Bind on':'register'});
                }
                
                
                //取消loading效果；
                removeloading($('.snsregbtn'));
                setTimeout("window.location.href= gettourl('"+s+"')", 1000);
                return true;
            }else{
                
                //取消loading效果；
                removeloading($('.snsregbtn'));

                if(re.info == '邮箱已经存在'){
                    // $('#newemail-copy').html(uemail.val());
                    // $('#ucemail').val(uemail.val());
                    // $('.logreg-box').hide();
                    // $('#weibologin-step-2').show();   
                     uerror.eq(k3).html(re.info).show();          
                }else{
                    uerror.eq(k3).html(re.info).show();
                }
                return false;
            }
            
        },error:function(){
            return;
        }
      });

}

//微博登录
function ullogin(type)
{
    var uemail=$("#bind-email"),upassword=$("#bind-password"),uerror=$("#text-error3");
    var k4=0;
    var k5=0;

    var errornum = parseInt($('#error-num').val());
    uerror.html('').hide();//隐藏所有的错误提示
    if(uemail.val()==""){
        uerror.eq(k4).html('请填写邮箱').show();
        return false;
    }else{
        if (!checkuseremail(uemail.val())) { 
            uerror.eq(k4).html("邮箱格式有误").show();
            return false; 
        }else{
            uerror.eq(k4).html('').hide();
        }
    }
    
    if(upassword.val()==""){
        uerror.eq(k5).html('请填写密码').show();
        return false;
    }else{
        uerror.eq(k5).html('').hide();
    }
    var data = 'isajax=1&remember=1&email='+uemail.val()+'&password='+upassword.val()+'&'+'&ultype='+type;

    //点击加loading效果
    addloading($('.snslogbtn'));

    $.ajax({
        type: "POST",
        url: "/public/checklogin",
        dataType:"json",
        cache: false,
        data: data+"&m=" + Math.random(),
        beforeSend:function(){},
        success:function(re){
          if(re.status == 1){
            window.location.href= gettourl('');
          }else{

            //取消loading效果；
            removeloading($('.snslogbtn'));

            if(re.status ==2){
                if(errornum<1)
                {
                    errornum +=1;
                    $("#error-num").val(errornum);  
                }else{
                    $("#ucpassword").val('');
                    $("#ucemail").val('');
                    $('.wblogin-tip-layer').show();
                }
                uerror.eq(k4).html(re.info).show();
            }else{
                uerror.eq(k4).html(re.info).show();
            }
            return false;
          }
          
        },
        error:function(){
                return;
        }
    });

}



//获取跳转链接
function gettourl(param){
  var url = window.location.href;
  var len = window.location.href.toLowerCase().indexOf('share_show');
  if(param != ''){
    url = "http://"+window.location.host+'/'+param;
  }else{
    url = window.location.href;
  }
  
  return url;
}

function logindivshow(){
    var isweibologinobj = $("input[name='isweibologinobj']").val();
    var isrenrenloginobj = $("input[name='isrenrenloginobj']").val();
    var isqqhloginobj = $("input[name='isqqhloginobj']").val();
    if((isweibologinobj != '' && typeof(isweibologinobj) != "undefined" )|| (isrenrenloginobj!='' && typeof(isrenrenloginobj) != "undefined") || (isqqhloginobj!='' && typeof(isqqhloginobj) != "undefined"))
    {
        //weibo、renren联合登陆事件过滤
    }else{
        //$('.pop-bg').show();
        $('#weibologin-step').hide();
        $('#personalpop').show();   
        $('#reg-login-area').show();   
        //showpopbg();   
    }

}

//弹出层弹出操作
function showpopbg(){
    
    var A = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; 
    var D = 0;
    D = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    if (D == 0) {
    D = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    } 
    $(".pop-bg").css({height:$(document).height(),width:document.documentElement.clientWidth,filter:'alpha(opacity=0.4)',opacity:0.4}).fadeIn();
}


function showlogindiv(clickbtn){
	var isinviteobj = $("input[name='isinviteobj']").val();
	if(clickbtn){
		$("input[name='clickbtn']").val(clickbtn);
        trackclick(0 ,clickbtn);////跟踪未登录用户上次的点击行为
	}
	
	//点击分享url进入nd首页延迟10s显示登录层，并提示邀请人信息
	var url = window.location.href;
	var reg = /[product|products|sale|sales|brand]\/(\d+)\/share_show\/([A-Za-z]{6,6})$/; //分享url
	var reg_1 = /(products\/(\d+)\/)?u\/([A-Za-z]{6,6})$/;  //邀请url
	var isshareurl = reg.test(url);
	var isshareurl_1 = reg_1.test(url);
    var coupon_on = $("#couponon").val();
	if((isshareurl == true) || (isshareurl_1 == true)){
        //setTimeout("logindivshow()", 10000); 取消10s延时弹出
        logindivshow();
	}else{
        if(coupon_on == ''){
            $(".logreg-share").hide();
        }
        logindivshow();
	}

    

    //mixpanel 统计注册

    if(isinviteobj == 1)
    {
    	 var invited = 'yes';
    }else{
    	var invited = 'no';
    }
	// mixpanel.track("All Registration Visit", {'invited':invited});
}
