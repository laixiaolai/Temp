
/**
 * 快捷加入购物车
 * @int num	数量
 * @int pid	商品ID号
 * @author cham	
 * 注：showCartMsg默认回调函数
 */
function lazyAddCart(num, pid,subid, func, buynow)
{
    if(!func){
        func = showCartMsg;
    }
    if(func == 'coudan'){
        func = showCoudanMsg;
    }
    if(!subid){
        subid = $('#subs'+pid).val();
    }

    if(typeof(subid) == 'undefined'){
        subid = 0;
    }
    if(typeof(buynow) == 'undefined'){
        buynow = 0;
    }
    addCartAction(num,pid,subid,func,buynow);
}
/**
 * 添加商品到购物车中
 * @int num		商品数量 
 * @int pid		商品ID号
 * @int subid	商品类型
 * @str func	自定义方法
 * @auther cham
 */
function addCartAction(num, pid, subid, func, buynow)
{
	var data = "id="+pid+
		"&subid="+subid+
		"&buynow="+buynow+
		"&num="+num;
	$.ajax({
		type: "POST",
		url: "/shopping/addCart",
		dataType:"json",
		cache: false,
		data: data+"&ajax=1&m=" + Math.random(),
		beforeSend:function(){},
		success:function(re){
			func(re,pid,subid,num);
			//2 卖完;0 不足;-2 货品不可买;1购入OK
		},error:function(){
				return;
		}
	  });

}

/**
 * 加入购物车后默认回调函数
 * @int num		结果集 
 * @int pid		商品ID号
 * @int subid	商品类型
 * @auther cham
 */
function showCartMsg(msg,pid,subs,num)
{
	var pagesign = getpagesign();
	if(msg.status == 'unlogin'){
      	showlogindiv('#buy'+pid);
    //很OK
    }else if(msg.status == 1){
		trackcart(pagesign);
		//$(window).scrollTop(0);
		minicart();//导航购物车
		if(pagesign == 'feed' || pagesign=="weibofeed")
		{
			$("#navcart-pop").show();
			//$('#navcart-popbar').addClass('bgwhite');
			$('.cart').addClass('carthover');
		}
		

		//加入购物车成功弹出层
		pprice = $('.pprice'+pid).html();
		ppic = $('#weibosyncimg'+pid).attr('src');
		pname = $('#weibosyncimg'+pid).attr('alt');

		if(pname!='' && pprice!='' && num>0 && ppic !='')
		{
			$('.pop-pname').html(pname);
			$('.pop-pnum').html(num);
			$('.pop-pprice').html(pprice);
			$('.pop-ppic').find('img').attr('src', ppic);

			$('.add-cart-popupwrap').show();
			$('.add-cart-popup').show();
		}	

		//$("html, body").animate({scrollTop : 0}, 500);//慢慢回到顶部 取消回到顶部 @final 2013-3-26 cham
	//货品已卖完
	}else if(msg.status == 2){
		if(subs > 0){
			$("#not-enough-"+pid).show();
		}else{
			$("#empty-alert-"+pid).slideDown(300);
			setTimeout(function(){
			$("#empty-alert-"+pid).slideUp(300)},3000);
		}
	//货品不足
	}else if(msg.status == 0){

	//货品不可买	
	}else if(msg.status == -2){
		
	}else{
	
	}
}


/**
 *  免费凑单 回调函数
 *
 */
function showCoudanMsg(msg,pid,subid,num){
    var pagesign = getpagesign();
    if(msg.status == 'unlogin'){
        showlogindiv('#buy'+pid);
    //OK
    }else if(msg.status == 1){
		trackcart(pagesign);
        //alert(msg.data.cartid);
        var buyid = $("#buy"+pid);
        var img = $(buyid).parent().parent().find('img').attr('src');
        var pname = $(buyid).parent().find('a:first').html();
        var price = $(buyid).parent().find('strong').html();
        price = parseFloat(price);
        var brandname = $(buyid).attr('brandname');
        var retailprice = $(buyid).attr('retailprice');
        var storage = $(buyid).attr('stor');
        var iscoupon = $(buyid).attr('iscoupon');
        var sta = $(buyid).attr('sta');
        var ppath = $(buyid).parent().find('a:first').attr('href');
        var designer = $(buyid).attr('desi');

        var trHtml = '<div class="order-holder">';
            trHtml +=  '<div class="designer" bnum=1>设计师:&nbsp;'+designer+'</div>';
            trHtml +=  '<ul class="order-item checked" id="c'+msg.data.cartid+'">';
            trHtml +=    '<li>';
            trHtml +=     '<input type="checkbox" class="td-chk" checked="checked" value="'+msg.data.cartid+'" pid="'+pid+'" subid="0" onclick="changenum_2()">';
            trHtml +=    '</li>';
            trHtml +=    '<li class="td-info"> <a href="'+ppath+'" target="_blank"><img width="100" height="100" src="'+img+'" alt="'+pname+'" ></a>';
            trHtml +=      '<dl>';
            trHtml +=        '<dt><a href="'+ppath+'" target="_blank">'+pname+'</a></dt>';
            trHtml +=        '<dd>品牌: '+brandname+'</dd>';
            if(iscoupon == 0)
                        {
            trHtml +=        '<dd class="text-error">不可使用代金券</dd>';
            } 
            trHtml +=      '</dl>';
            trHtml +=    '</li>';

            if(price == retailprice){
            trHtml +=          '<li class="td-price">￥'+price+' </li>';
            }else{
            trHtml +=          '<li class="td-price">￥'+price+'<del style="display:none">￥'+retailprice+'</del> </li>';
            }

            if((storage==0) || (sta != 1)){
            trHtml +=    '<li class="td-amount">';  
            trHtml +=    '</li>';
            }else{
            trHtml +=    '<li class="td-amount">';
            trHtml +=      '<div class="item-amount"> <a class="minus" href="javascript:void(0)" onclick="setAmount.reduce(\'#input-num-'+pid+'-0\')">-</a>';
            trHtml +=        '<input name="number" onkeyup="setAmount.modify(\'#input-num-'+pid+'-0\')" value="1" id="input-num-'+pid+'-0" pid="'+pid+'" subid="0" cartnum="'+storage+'" onblur="changenum($(this))">';
            trHtml +=        '<a href="javascript:void(0)" onclick="setAmount.add(\'#input-num-'+pid+'-0\')" class="plus">+</a> </div>';
            trHtml +=      '<div class="amount-msg text-error">&nbsp;</div>';
            trHtml +=    '</li>';
            }
            trHtml +=    '<li class="td-sum">￥<strong>'+price+'</strong></li>';
            trHtml +=    '<a class="item-delete" cid="'+msg.data.cartid+'" href="javascript:void(0);">删除</a>';
            trHtml +=  '</ul>';
            trHtml +='</div>';  
        if(msg.data.cartid===true){
            alert('此货品已经放在购物车里了！');
            //var now_value =$("#c"+msg.data.cartid).find('.item-amount').eq(0).find('input').val()+1;
           // $("#c"+msg.data.cartid).find('.item-amount').eq(0).find('input').val(now_value);
        }else {
        $('.order-list').append(trHtml);
        }
        //$("#buy"+pid).parent().parent().parent().remove();
        
        changenum_2(); //初始载入时，重新计算价格、件数

    //货品不足
    }else if(msg.status == 0){
        $("#buy"+pid).parent().parent().find('.orange').html('暂时无货');   
    //货品不可买    
    }else if(msg.status == -2){
        $("#buy"+pid).parent().parent().find('.orange').html('暂时无货!');   
    }else{
        $("#buy"+pid).parent().parent().find('.orange').html('暂时无货!');   
    }

    $("#buy"+pid).parent().parent().remove();

}
