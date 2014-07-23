$(document).ready(function(){
	//点击喜欢 
	// 列表页中红心按钮
	$('.like').on('click', likeCallback);
	// 商品页该区域是ajax局部刷新出来的
	$('#pblock').on('click', '.likebtn', likeCallback);

});//ready end;

// 点击喜欢按钮事件的回调函数
var likeCallback = function(e) {
	var $self = $(this);
	var productid = $self.attr('pdid');
	var pname = $self.attr('pdname');
	var page = getpagesign();
	var clickbtn = '#like'+productid;
	like(clickbtn, productid, 'product', pname, page);
}

//用户评价、商品详情页同步微博
function syncWeiboComment(productid, commentid){
	var data = 'productid='+productid+'&id='+commentid;
	$.ajax({
		type: "POST",
		url: "/weibo/syncWeiboForComment",
		dataType:"json",
		cache : false,
		data: data+"&m=" + Math.random(),
		success:function(o){
			if(o.status == 1){
				//同步微博成功
	  		}else if(o.status == 0){
	  			//微博过期
	  			weiboNotice('expires');
	 	 	}
	   	return;
		},
		error:function(){
		}
	});
}

//喜欢：货品页 销售页 货品页  shop页 search页 favorites页 brand页
function like(clickbtn,productid,ptype, pname, page){
	var likeloading = $(clickbtn).attr('likeloading');
	var pageClass='';
	if(productid.length<=0 || likeloading == 1){
		return false;
	}
	var data = "productid="+productid;
	$.ajax({
			type: "POST",
			url: "/user/like",
			dataType:"json",
			cache : false,
			data: data+"&ajax=1&m=" + Math.random(),
			beforeSend: function(){
				$("#like"+productid).attr('likeloading', '1');
			},
			success:function(o){
				var $likeBtn = $(clickbtn);
				var $likeNum = $likeBtn.siblings('span');
				$likeNum = $likeNum.length ? $likeNum : $likeBtn;			// 统一两种情况
				var nLikeNum = +$likeNum.text();

				if(o.status == 'unlogin'){
					showlogindiv(clickbtn);
				}else if(o.status == 1){
				    tracklike(ptype, pname, page);
					$likeBtn.addClass('like--checked');						// 添加喜欢
					$likeNum.text(nLikeNum + 1);							// 数字加1
					weiboNotice('setting');
					syncWeibo(productid);	
		  		}else{
					$likeBtn.removeClass('like--checked');					// 取消喜欢
					$likeNum.text(nLikeNum - 1);							// 数字减1
		 	 	}
		 	 	$("#like"+productid).attr('likeloading', '0');
			},
			error:function(o){
				// console.log('like: ' + o.info);	
			}
	});
}

//用户喜欢操作同步微博
function syncWeibo(productid){
	var img = $('#weibosyncimg'+productid);
	var data = 'productid='+productid+'&pic='+img.attr('src')+'&saleid='+img.attr('saleid')+'&pname='+img.attr('alt');
	//alert(data);
	//return;
	$.ajax({
		type: "POST",
		url: "/weibo/syncweibo",
		dataType:"json",
		cache : false,
		data: data+"&m=" + Math.random(),
		success:function(o){
			if(o.status == 1){

	  		}else if(o.status == 0){
	  			//微博过期
	  			weiboNotice('expires');
	 	 	}
	   	return;
		},
		error:function(){
		}
	});

}

//微博分享设置
function weiboSet(val,type){
	$.ajax({
	type: "POST",
	url: "/feed/weiboset",
	dataType:"json",
	cache : false,
	data:{setting:val,posttype:val,type:type},
	success:function(o){
		if(o.status == 1){
		}else{
		}
		return;
	},
	error:function(){
	}
	});
}

function weiboNotice(t){
	//第一次分享 微博设置
	if(t == 'setting'){
		if($.cookie('nd_weibonotice')){
			//弹出提示层
			//popdiv('#credits_pop', 560, 250, '0.4');
			$('.pop_out').show();
			$('.weibo-pop').show();
		}
	}else if(t == 'expires'){
	//过期
		//popdiv('#credits_pop', 560, 250, '0.4');
		$('.pop_out').show();
		$('.oauth-pop').show();
	}else if(t == 'pwd'){
	//解除绑定，设置密码
		//popdiv('#credits_pop', 560, 250, '0.4');
		$('.pop_out').show();
		$('.pwd-pop').show();
	}
}