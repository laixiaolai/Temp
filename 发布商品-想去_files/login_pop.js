/////////////////////////////////////////////////////////////////
// 登录弹出相关
$(document).ready(function(){
    $("#redirectUrl").val(document.location.href);
    var redirectUrl = $("#redirectUrl").val();
    $("#qq_auth").attr("href", "/qq_auth?redirectUrl=" + encodeURI(redirectUrl));
    $("#weibo_auth").attr("href", "/weibo_auth?redirectUrl=" + encodeURI(redirectUrl));
    //$("#douban_auth").attr("href", "/douban_auth?redirectUrl=" + encodeURI(redirectUrl));
    $("#taobao_auth").attr("href", "/taobao_auth?redirectUrl=" + encodeURI(redirectUrl));
    //    $("#renren_auth").attr("href", "/renren_auth?redirectUrl=" + encodeURI(redirectUrl));
    $('#email-login .btn-main-s').click(function(){
        $('#email-login').submit();
    });
    $("#email-login").keypress(function(event) {
        if(event.keyCode==13) {
            $("#email-login").submit();
        }
        return true;
    });

    $("#email-login").validate({
        submitHandler: function(form) {
            var status = false;
            $.ajax({
                url: "/user_check/ajax",
                type: "POST",
                dataType: "json",   
                data: {
                    username: function() {
                        return $("#username").val();
                    },
                    password: function() {
                        return $("#password").val();
                    }
                },
                success: function(data) {
                    status = data;
                    if(status) {
                        form.submit();
                    } else {
                        $(".msg-text-error").show();
                    }
                    return data;
                }
            });
        }
    });

    $('.close').click(function(){
        $('#pandoraOverlay').hide();
        $("#J-login").hide();
        return false;
    });

    $("a.login").click(function(){
        XQTOOL.loginBox();
    });
    
    $(".login-check").click(function(){
        if(XIANGQU.userId==""){
            XQTOOL.loginBox($(this).attr("href"));
            return false;
        }
    });
    
    $(".label").bind("click", function(){
        $(this).hide();
        $(this).siblings("input").focus();
    });
    XQTOOL.Globe_Input_Text($("#username"), $("#username").attr("label"));
});

/////////////////////////////////////////////////////////////////////
// 求建议
$(document).ready(function(){
    $('.feedback a').click(function(){
        if(XIANGQU.userId==""){
            XQTOOL.loginBox();
            return false;
        }
        $('.msg-success-main').hide();
        $('#J_suggestionContent').val('');
        $('#J_suggestionContent').show();
        var windowWidth = document.body.clientWidth;  
        //$('.feedback-popup').css({"left": windowWidth/2-300,"top": 220});
        var msgTip=$('#J_feedbackContent').attr('label');
        $('.feedback-popup').show();
        XQTOOL.Globe_Input_Text($('#J_feedbackContent'),msgTip);
        $('#J_feedbackContent').focus(function(){
        	$(this).val('');
        });
        $('#J_feedbackContent').blur(function(){
        	if($(this).val() != msgTip){
        		$(this).unbind("focus");
        	}
        });
        
    });
    $('.feedback-popup .btn-main').click(function(){
        var d =$("#J_feedbackContent");
        var content =d.val();
        if(content==''||content==d.attr('label')){
            $('.msg-error').show();
            return false;
        }
        
        $.ajax({
            url: '/suggestion',
            type: 'POST',
            data:{"content":content},
            dataType: 'json',
            timeout: 50000,
            error: function(XMLHttpRequest, textStatus, errorThrown){
                    
                    
            },
            success: function(data){
                    
                if(data.code!="2000"){
                    alert("评论由于特殊原因暂无服务,请稍后……");
                    return false;
                }
                d.val('');
                $('#J_suggestionContent').hide();
                $('.msg-success-main').show();
                $('.feedback-popup').delay(1000).hide(500); 
            }
         });
    });
    
    $('.feedback-popup .close').click(function(){
        $(".feedback-popup").hide();
        return false;
    });
    
});

