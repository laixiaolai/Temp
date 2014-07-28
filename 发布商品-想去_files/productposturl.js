var uploading = false;
$(function() {
    $('#upload_img_file').uploadify({
        'swf'      : '/js/third/uploadify.swf',
        'uploader' : '/image_uploadfy',
        'checkScript': '/upload/exists',
        'checkExisting': '/upload/exists',
        'multi': false,
        'auto': 'true',
        'buttonText': 'upload',
        'buttonClass': '',
        'queueSizeLimit' : 1,
        'successTimeout' : 10,
        'onSelect' : function(file) {
        },
        'onUploadStart' : function(file) {
            divObj = jQuery("<div class=\"overlay\" style=\"height: 180px;\"><em>0%</em></div>");
            $("#upload_img").after(divObj);
            $("#upload_form").show();
            uploading = true;
            hideCatPhoto();
        },
        'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            var percentage = Math.round(bytesUploaded / bytesTotal * 100);
            var overlayHeight = 180 * (100-percentage) / 100;
            $(".overlay").html("<em>" + percentage + "%</em>");
            $(".overlay").css("height", overlayHeight);
        },
        'onUploadSuccess' : function(file, data, response) {
            $("#upload_img").next(".overlay").remove();
            uploading = false;
            eval("data=" + data);
            if(data.status) {
                //上传成功
                $("#upload_img").attr("src", data.imageUrl);
                $("#upload_img1").attr("value",data.imageUrl);
                $("#upload_form").show();
                $(".re-upload").append($("#upload_img_file"));
                
                $("#cat_photo").hide();
            }
        },
        'onUploadError' : function(file, errorCode, errorMsg, errorString) {
            $("#upload_img").next(".overlay").remove();
            alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
        }
    });

    // uploadfy style setting
    $(".swfupload").css("left", "0");
    $(".swfupload").css("top", "0");
    $(".uploadify-queue").hide();
    $("#upload_img_file-button").removeClass("uploadify-button");
    $("#upload_img_file-button").children("span").html("上传图片");
    $("#upload_img_file-button").css("line-height", "40px");
});

function hideCatPhoto() {
    if(uploading) {
        $("#cat_photo").attr("style", "float:right;margin-right:-9999em");
    } else {
        $("#cat_photo").hide();
    }
    $("#upload_img_file-button").children("span").html("重新上传");
}

function timelyAddDisbleClass(obj, time, newText) {
    obj.addClass("btn-disable");
    if(!time) {
        time = 10000;
    }
    origText = obj.text();
    if(newText) {
        obj.text(newText);
    }
    window.setTimeout(function(){
        obj.removeClass("btn-disable")
        if(origText) {
            obj.text(origText);
        }
    }, time);

}

//抓取url
function fetchUrl(obj) {
    if($("#aFetch").hasClass("btn-disable")) {
        alert("商品获取中， 请稍候");
        return;
    }

    var urlObj = $("#fetchUrl");
    var errorDiv = urlObj.parent().siblings(".msg-error");
    var normalDiv = urlObj.parent().siblings(".msg-normal");
    if(!urlObj.val || urlObj.val() == "") {
        errorDiv.show();
        normalDiv.hide();
        return;
    } else {
        errorDiv.hide();
        normalDiv.show();
    }
    
    timelyAddDisbleClass($("#aFetch"), 8000, "链接获取中");
    var picNum=1;
    $.ajax({
        url: "/product/fetchAjax",
        type: "POST",
        dataType: "json",
        data: {
            fetchUrl: function() {
                return $("#fetchUrl").val();
            }
        },
        success: function(data) {
            $("#aFetch").removeClass("btn-disable");
            $("#aFetch").text("确定");
            var status = data.status;
            var message = data.message;
            if(status) {
                if(data.xiangqu) {
                    errorDiv.html("该链接已存在");
                    errorDiv.show();
                    normalDiv.hide();
                    return;
                }
            
                $("#upload_form").show();
                $("#price").val(data.price);
                //$("#price").hide();
                //$("#price").next("span").remove();
                //$("#price").after("<span class=\"w-280 \">" + data.price + "</span>");
                setBlackFont($("#price"));
                $("#upload_img").attr("src", data.image);
                $("#upload_img1").attr("value", data.image);
				if(data.image2){
					
					$("#J_upload_img2 img").attr("src", data.image2);
					$("#upload_img2").attr("data", data.image2);
                	$("#upload_img2").attr("value", data.image2);
					$("#J_upload_img2").show();
				}
				if(data.image3){
					
					$("#upload_img3").attr("data", data.image4);
					$("#J_upload_img3 img").attr("src", data.image3);
                	$("#upload_img3").attr("value", data.image3);
					$("#J_upload_img3").show();
					
				}
				if(data.image4){
					
					$("#J_upload_img4 img").attr("data", data.image4);
					$("#J_upload_img4 img").attr("src", data.image4);
					$("#upload_img4").attr("data", data.image4);
                	$("#upload_img4").attr("value", data.image4);
					$("#J_upload_img4").show();
				}
				
				
                $("#title").val(data.title);
                setBlackFont($("#title"));
                titleCheck($("#title"), 50);
                $("#url_title").val(data.title);
                $("#purchaseAddress").val(data.url);
                setBlackFont($("#purchaseAddress"));
                $("#purchaseAddress").parent("li").hide();
                $("#brand").val(data.brand);
                setBlackFont($("#brand"));
                $("#brandStory").val(data.brandStory);
                setBlackFont($("#brandStory"));
                $("#place").val(data.place);
                setBlackFont($("#place"));
                $(".del").show();
                hideCatPhoto();
                $(".re-upload").append($("#upload_img_file"));
            } else {
                errorDiv.html(message);
                errorDiv.show();
                normalDiv.hide();
            }
        }
    });
}




function setBlackFont(obj) {
    obj.css("color","#000");
}

//显示该节点绑定的error div
function showErrorDiv(obj) {
    obj.next(".msg-error").show();
}

//隐藏该节点绑定的error div
function hideErrorDiv(obj) {
    obj.siblings(".msg-error").hide();
}

// 是否已经上传了图片
function isImageUploaded() {
    if(!$("#upload_img").attr("src") || $("#upload_img").attr("src") == "") {
        return false;
    }
    return true;
}
// 提交表单
function submitUploadForm() {
    if(XIANGQU.userId==""){
        XQTOOL.loginBox();
        return false;
    }
    
    if(!isImageUploaded()) {
        alert("请先上传商品图片");
        return false;
    }

    if(!$("#tag_select").val || $("#tag_select").val() == "") {
        showErrorDiv($("#tag_select"));
		$("html,body").animate({scrollTop:$(".post-info").offset().top - 70},500);//qiu 2013-1-24
        return false;
    }
    if(!$("#cate_select").val || $("#cate_select").val() == "") {
        showErrorDiv($("#cate_select"));
		$("html,body").animate({scrollTop:$(".post-info").offset().top - 70},500);//qiu 2013-1-24
        return false;
    }
    if($("#description").attr("label")==$("#description").val()||$("#description").attr("label")==$("#description").html()){
    	$("#description").html("");
    	$("#description").val("");
    }

    return $("#upload_form").submit();
}

// 插入子类目
function insertCateTag(obj, cateID, category) {
    var liObj = document.createElement("li");
    var aObj = document.createElement("a");
    var clickMethod = "selectItem(" + cateID + ", this)";
    $(aObj).attr("onclick", clickMethod);
    $(aObj).attr("href", "javascript:" + clickMethod);
    $(aObj).html(category);
    $(liObj).append($(aObj));
    obj.append($(liObj));
}

//选择一级类目 
function tagSelect(tag, obj) {
    selectItem(tag, obj);
    var ul=$("#cate_select_dl").children("dd").children("ul");

    //隐藏该节点下面的error div
    hideErrorDiv(ul);

    $.ajax({
        url: "/category/getSubCategory",
        type: "POST",
        dataType: "json",
        data: {
            category_id: function() {
                return tag;
            }
        },
        success: function(data) {
            var status = data.status;
            var message = data.message;
            var subCategory = data.subCategory;
            if(!status) {
                alert(message);
            } else {
                ul.children().remove();
                ul.next("input").val("");
                for(var cateInfo in subCategory) {
                    var cateArray = subCategory[cateInfo].split(":");
                    insertCateTag(ul, cateArray[0], cateArray[1]);
                }
                $("#cate_select_dl").show();
            }
        }
    });
}

// 类目选择事件
function selectItem(tag, obj) {
    var curNode;

    if(window.event) {
        curNode = window.event.srcElement;
    } else {
        curNode = document.activeElement || obj;
    }

    var ul_parent = $(curNode).parent("li").parent("ul");
    ul_parent.children("li").removeClass("selected");
    $(curNode).parent("li").addClass("selected");
    ul_parent.siblings("input").val(tag);
    hideErrorDiv(ul_parent);
}

function titleCheck(obj, num) {
    var len = obj.val().length;
    obj.siblings("div.msg-error").remove();
    if(len > num) {
        obj.parent().append("<div class=\"msg-error\" style=\"display:block\">字数长度超出限制 (" + len + "/" + num + ")</div>");
    }
}

function numberCheck(obj, num) {
    var len = obj.val().length;
    var em = obj.siblings("em");
    em.html(len + "/" + num);
    obj.siblings("div.msg-error").remove();
    if(len > num) {
        obj.parent().append("<div class=\"msg-error\" style=\"display:block\">字数超出最大限制了哦，请精简一下</div>");
    }
}

// document ready事件
$(document).ready(function(){
	
	$('.upload-img .set').click(function(){
    	var fromSrc=$(this).parent().find('img').attr('src');
    	var fromValue=$(this).parent().find('input').attr('value');
    	
    	var mainSrc=$('#upload_img').attr('src');
    	var mainValue=$('#upload_img1').attr('value');
    	$('#upload_img1').attr('value',fromValue);
    	$('#upload_img').attr('src',fromSrc);
    	$(this).parent().find('img').attr('src',mainSrc);
    	$(this).parent().find('input').attr('value',mainValue);
	});

	//多图的hover,选中，取消事件
	$('.upload-img-list .upload-img li').mouseenter(function(){
		$(this).find('.overlay').fadeIn(600);
		if($(this).find('.word').length>0){
			$(this).find('.word').show();
		}
		$(this).find('.set').show();
		if($(this).hasClass('selected')){
			$(this).find('.J_nochoose').fadeIn(600);
		}else{
			$(this).find('.J_choose').fadeIn(600);
		}
	});
	
	$('.upload-img-list .upload-img li').mouseleave(function(){
		$(this).find('.overlay').fadeOut(600);
		if($(this).find('.word').length>0){
			$(this).find('.word').hide();
		}
		$(this).find('.set').hide();
		if($(this).hasClass('selected')){
			$(this).find('.J_nochoose').fadeOut(600);
		}else{
			$(this).find('.J_choose').fadeOut(600);
		}
	});
	
	
	$('.J_nochoose').click(function(){
		$(this).parent('li').find('.overlay').show();
		$(this).parent('li').removeClass('selected');
		$(this).hide();
		$(this).parent('li').find('.J_choose').fadeIn(600);
		$(this).parent('li').find('input').attr('value','');
	});
	
	
	$('.J_choose').click(function(){
		$(this).parent('li').find('.overlay').show();
		$(this).parent('li').addClass('selected');
		$(this).hide();
		$(this).parent('li').find('.J_nochoose').fadeIn(600);
		$(this).parent('li').find('input').attr('value',$(this).parent('li').find('input').attr('data'));
	});
	
    $(".del").click(function(){
        $("#upload_form")[0].reset();
        $("div.msg-error").hide();
        $("div.msg-success").hide();
        $("li").removeClass("selected");
        $("#purchaseAddress").parent("li").show();
        $("#upload_img").attr("src", "");
        $("#upload_form").hide();
        $("#fetchUrl").val("");
        $("#price").show();
        $("#price").next("span").remove();
        $(".del").hide();

    });

    $("#upload_form").validate({
        submitHandler:function(form){
            if($("#aSubmit").hasClass("btn-disable")) {
                alert("商品发布中，请稍候");
                return false;
            }
            if($("#description").attr("label")==$("#description").val()||$("#description").attr("label")==$("#description").html()){
            	$("#description").html("");
            }
            timelyAddDisbleClass($("#aSubmit"), 60000, "商品发布中");
            form.submit();
        },
        rules:{
            "brandStory":{
                xqValRequired:true,
                maxlength:500
            },
            "title":{
                xqValRequired:true,
                maxlength:40
            },
            "brand":{
                xqValRequired:true,
                maxlength:30
            },
            "place":{
                xqValRequired:true,
                maxlength:30
            },
            "price":{
                xqValRequired:true,
                maxlength:30
            },
            "purchaseAddress":{
                xqValRequired:true,
				url:true,
                maxlength:500
            }
        },
        errorElement: 'div',
        success: function(label) {
            label.siblings("input").removeClass("valid");
            label.siblings("input").removeClass("error");
            label.siblings("div.msg-success").remove();
            label.siblings("div.msg-error").remove();
            label.removeClass("msg-error");
        },
        errorPlacement: function(error, element) {
            element.siblings("div.msg-error").remove();
            element.siblings("div.msg-success").remove();
            element.siblings("[generated='true']").remove();
            element.removeClass("error valid");
            error.removeClass();
            error.addClass("msg-error");
            error.appendTo(element.parent());
        },
        messages:{
            "brand":{
                xqValRequired:"请输入品牌",
                maxlength:jQuery.format("品牌长度不能大于{0}")
            },
            "place":{
                xqValRequired:"请输入商品诞生地",
                maxlength:jQuery.format("商品诞生地长度不能大于{0}")
            },
            "brandStory":{
                xqValRequired:"请输入品牌故事",
                maxlength:jQuery.format("字数超出最大限制了哦，请精简一下")
            },
            "title":{
                xqValRequired:"请输入标题",
                maxlength:jQuery.format("标题长度不能大于{0}")
            },
            "price":{
                xqValRequired:"请输入商品的价格",
                maxlength:jQuery.format("价格长度不能大于{0}")
            },
            "purchaseAddress":{
                xqValRequired:"请输入购买链接",
				url:"请输入有效购买链接",
                maxlength:jQuery.format("购买链接长度不能大于{0}")
            }
        }
    });

     $("#topicShared").click(function() {
        if ($(this).attr("checked")) {
            $(this).val("true");
        } else {
            $(this).val("false");
        }
    });
    
    $("#fetchUrl").keypress(function(event) {
        if(event.keyCode==13) {
            $("#aFetch").click();
        }
        return true;
    });
    
    XQTOOL.Globe_Input_Text($("#brand"), $("#brand").attr("label"));
    XQTOOL.Globe_Input_Text($("#place"), $("#place").attr("label"));
    XQTOOL.Globe_Input_Text($("#brandStory"), $("#brandStory").attr("label"));
    XQTOOL.Globe_Input_Text($("#title"), $("#title").attr("label"));
    XQTOOL.Globe_Input_Text($("#price"), $("#price").attr("label"));
    XQTOOL.Globe_Input_Text($("#purchaseAddress"), $("#purchaseAddress").attr("label"));
    XQTOOL.Globe_Input_Text($("#description"), $("#description").attr("label"));
    XQTOOL.Globe_Input_Text($("#fetchUrl"), $("#fetchUrl").attr("label"));
    
    XQTOOL.changeLogo("/images/core/logo_page.png");
    $("#brand").blur(function() {
	    ajaxUpdateBrandStory($(this).val(), $("#brandStory"), $("#place"));
	});

	//品牌故事自动补充
	function ajaxUpdateBrandStory(brand, brandStoryNode, placeNode) {
	    $.ajax({
	        url: '/brand/ajax_get_brand_story',
	        type: "POST",
	        dataType: "json",
	        data: {
	            brand: brand,
				purAddress:""
	        },
	        success: function(data) {
	            if(data.status) {
	                $(brandStoryNode).val(data.brand_story);
	                $(placeNode).val(data.place);
	            }
	        }
	    });
	}
});