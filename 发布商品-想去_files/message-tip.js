$(document).ready(function(){
		
	
	$('.logined li').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	
	
	
	$('.user-msg-box .user-fans').click(function(){
		$(this).parent().remove();
		//ajax已读请求,清除新消息
		$.ajax({
    			url: '/user/cleanNews',
    			type: 'POST',
    			data:{"requestType":"FANS_INFO"},
    			dataType: 'json',
    			timeout: 70000,
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    			},
    			success: function(data){
    			}
          });
	});
	$('.user-msg-box .user-liked').click(function(){
		$(this).parent().remove();
		//ajax已读请求,清除新消息
		$.ajax({
    			url: '/user/cleanNews',
    			type: 'POST',
    			data:{"requestType":"FAVER_ME"},
    			dataType: 'json',
    			timeout: 70000,
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    			},
    			success: function(data){
    			}
          });
	});
	$('.user-msg-box .user-comments').click(function(){
		$(this).parent().remove();
		//ajax已读请求,清除新消息
		$.ajax({
    			url: '/user/cleanNews',
    			type: 'POST',
    			data:{"requestType":"COMMENT_ME"},
    			dataType: 'json',
    			timeout: 70000,
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    			},
    			success: function(data){
    			}
          });
	});
	
	$('.user-msg-box .user-letter').click(function(){
		$(this).parent().remove();
		//ajax已读请求,清除新私信，暂时未实现
		$.ajax({
    			url: '/user/cleanNews',
    			type: 'POST',
    			data:{"requestType":"PRIVATE_MSG"},
    			dataType: 'json',
    			timeout: 70000,
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    			},
    			success: function(data){
    			}
          });
	});

	if(XIANGQU.userId!=""){
            //新粉丝时切换
			var fansNum=$('.user-msg-box .user-fans').attr('fansNum');
			var fansClose;
    		$('.user-msg-box .user-fans').mouseover(function(){
    			$(".user-fans .new").flip({
    				direction:'lr',
					speed:100,
    				color:'#000000',
    				
    				onEnd: function(){
    					
    					$('.user-msg-box .user-fans .new').removeClass('new').addClass('active').html('<a href="/uc/fans" target="_blank"><em>'+fansNum+'<ins>个</ins></em><p>新粉丝</p></a>').show();
    				}
    			});
				clearTimeout(fansClose);
				$('.user-msg-box .user-fans .close').show();
    		});
    
    		$('.user-msg-box .user-fans').mouseleave(function(){
    			$(".user-fans .active").flip({
    				direction:'lr',
    				color:'#000000',
					speed:100,
    				onEnd: function(){
    					
    					$('.user-msg-box .user-fans .active').removeClass('active').addClass('new').html('<a href="/uc/fans" target="_blank"><em>+'+fansNum+'</em></a>').show();
    				}
    			});
				fansClose=setTimeout(function(){$('.user-msg-box .user-fans .close').hide();},5000);
				
    		});
		
			//新喜欢我的
			var faverClose;
			var favNum=$('.user-msg-box .user-liked').attr('favNum');
    		$('.user-msg-box .user-liked').mouseover(function(){
    			$(".user-liked .new").flip({
    				direction:'lr',
    				color:'#000000',
    				speed:100,
    				onEnd: function(){
    					
    					$('.user-msg-box .user-liked .new').removeClass('new').addClass('active').html('<a href="/uc/faverMe" target="_blank"><em>'+favNum+'<ins>个</ins></em><p>喜欢我的</p></a>').show();
    				}
    			});
				clearTimeout(faverClose);
				$('.user-msg-box .user-liked .close').show();
    		});
    
    		$('.user-msg-box .user-liked').mouseleave(function(){
    			$(".user-liked .active").flip({
    				direction:'lr',
    				color:'#000000',
					speed:100,
    				onEnd: function(){
    					
    					$('.user-msg-box .user-liked .active').removeClass('active').addClass('new').html('<a href="/uc/faverMe" target="_blank"><em>+'+favNum+'</em></a>').show();
    				}
    			});
				faverClose=setTimeout(function(){$('.user-msg-box .user-liked .close').hide();},5000);
				//
    		});
		
			//新评论的
			var commentClose;
			var commentNum=$('.user-msg-box .user-comments').attr('commentNum');
    		$('.user-msg-box .user-comments').mouseover(function(){
    			$(".user-comments .new").flip({
    				direction:'lr',
    				color:'#000000',
    				speed:100,
    				onEnd: function(){
    					
    					$('.user-msg-box .user-comments .new').removeClass('new').addClass('active').html('<a href="/user/commentme" target="_blank"><em>'+commentNum+'<ins>个</ins></em><p>新评论</p></a>').show();
    				}
    			});
				clearTimeout(commentClose);
				$('.user-msg-box .user-comments .close').show();
    		});
    
    		$('.user-msg-box .user-comments').mouseleave(function(){
    			$(".user-comments .active").flip({
    				direction:'lr',
    				color:'#000000',
					speed:100,
    				onEnd: function(){
    					
    					$('.user-msg-box .user-comments .active').removeClass('active').addClass('new').html('<a href="/user/commentme" target="_blank"><em>+'+commentNum+'</em></a>').show();
    				}
    			});
				commentClose=setTimeout(function(){$('.user-msg-box .user-comments .close').hide();;},5000);
				//
    		});
		
			//新私信的privateMsgNum
			var msgClose;
			var privateMsgNum =$('.user-msg-box .user-letter').attr('privateMsgNum');
    		$('.user-msg .user-letter').mouseover(function(){
    			$(".user-msg .user-letter .new").flip({
    				direction:'lr',
    				color:'#000000',
    				speed:100,
    				onEnd: function(){
    					
    					$('.user-msg-box .user-letter .new').removeClass('new').addClass('active').html('<a href="/uc/message" target="_blank"><em>'+privateMsgNum+'<ins>封</ins></em><p>新私信</p></a>').show();
    				}
    			});
				clearTimeout(msgClose);
				$('.user-msg-box .user-letter .close').show();
    		});
    
    		$('.user-msg .user-letter').mouseleave(function(){
    			$(".user-msg .user-letter .active").flip({
    				direction:'lr',
    				color:'#000000',
					speed:100,
    				onEnd: function(){
    					
    					$('.user-msg .user-letter .active').removeClass('active').addClass('new').html('<a href="/uc/message" target="_blank"><em>+'+privateMsgNum+'</em></a>').show();
    				}
    			});
				msgClose=setTimeout(function(){$('.user-msg .user-letter .close').hide();},5000);
    		});
    }
			
	
	  //右上角我的想去，消息提醒
    var n=null,l=null;
    $('#J_popLogin').click(function(e){
        if(XIANGQU.userId==""){
                e.preventDefault();
                var url =window.location.href;
                XQTOOL.loginBox(url);
                return false;
        }
    });
    $('.user-panel .logined .my').mouseenter(function(){
        clearTimeout(n);
        var current = $(this);
        n=setTimeout(function () {
            $('#J_profile').show();
        },200);
        
        $(".user-panel .logined .profile").hover(function () {
            clearTimeout(n);
            $('#J_profile').show();
        },
        function () {
            $('#J_profile').hide();
        });
    });
    
    $('.user-panel .logined .my').mouseleave(function(){
         clearTimeout(n);
        var current = $(this);
        n=setTimeout(function () {
            $('#J_profile').hide();
        },300);
    });
    
    $('.user-panel .logined .share').mouseenter(function(){
    	$(this).parent().parent().find('.user-remind').css("top","80px").show();
        $('.user-msg-box').hide();
    });
    
    $('.user-panel .logined .share').mouseleave(function(){
    	$(this).parent().parent().find('.user-remind').css("top","80px").hide();
        $('.user-msg-box').show();
    });
    
    
    $('.user-msg .user-fans .close').click(function(){
        $(this).parent().remove();
        //ajax已读请求,清除新消息
        $.ajax({
                url: '/user/cleanNews',
                type: 'POST',
                data:{"requestType":"FANS_INFO"},
                dataType: 'json',
                timeout: 70000,
                error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("系统繁忙,请稍后");
                },
                success: function(data){
                }
          });
    });
    $('.user-msg-box .user-liked .close').click(function(){
        $(this).parent().remove();
        //ajax已读请求,清除新消息
        $.ajax({
                url: '/user/cleanNews',
                type: 'POST',
                data:{"requestType":"FAVER_ME"},
                dataType: 'json',
                timeout: 70000,
                error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("系统繁忙,请稍后");
                },
                success: function(data){
                }
          });
    });
    $('.user-msg-box .user-comments .close').click(function(){
        $(this).parent().remove();
        //ajax已读请求,清除新消息
        $.ajax({
                url: '/user/cleanNews',
                type: 'POST',
                data:{"requestType":"COMMENT_ME"},
                dataType: 'json',
                timeout: 70000,
                error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("系统繁忙,请稍后");
                },
                success: function(data){
                }
          });
    });
    
    $('.user-msg-box .user-letter .close').click(function(){
        $(this).parent().remove();
        //ajax已读请求,清除新私信，暂时未实现
        $.ajax({
                url: '/user/cleanNews',
                type: 'POST',
                data:{"requestType":"PRIVATE_MSG"},
                dataType: 'json',
                timeout: 70000,
                error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("系统繁忙,请稍后");
                },
                success: function(data){
                }
          });
    });
});
