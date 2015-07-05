$(function(){
	// $(".main").height(window.screen.availHeight);
	// $(".main").width(window.screen.availWidth);

	//视频滚动
//
//	window.mySwipe1 = new Swipe(document.getElementById('swipte1'), {
//	   	startSlide: 0,
//	   	speed: 400,
//	   	continuous: true,
//	   	disableScroll: false,
//	   	stopPropagation: true,
//	   	callback: function(index, elem) {
//	     	var i = bullets1.length;
//	     	while (i--) {
//	         	bullets1[i].className = ' ';
//	     	}
//	     	bullets1[index].className = 'on';
//	   },
//	   transitionEnd: function(index, elem) {}
//	 });
//	var proCount1 = mySwipe1.getNumSlides();
//	var bullets1 = document.getElementById('mypoint1').getElementsByTagName('li'); 
//
//	$(".left_btn1").on("click",function(){
//		mySwipe1.prev();
//	});
//	$(".right_btn1").on("click",function(){
//		mySwipe1.next();
//	});
//	$(".one_btn").on("click",function(){
//		mySwipe1.slide(0, 0);
//	});
//	$(".two_btn").on("click",function(){
//		mySwipe1.slide(1, 0);
//	});
//	$(".three_btn").on("click",function(){
//		mySwipe1.slide(2, 0);
//	});
//	$(".four_btn").on("click",function(){
//		mySwipe1.slide(3, 0);
//	});
//
//
//	/*$(".vedio_btn").on("click",function(){
//		//alert($(this).index());
//		mySwipe1.slide($(this).index(), 0);
//	});*/
//
//	//图片滚动
//	window.mySwipe2 = new Swipe(document.getElementById('swipte2'), {
//	   	startSlide: 0,
//	   	speed: 400,
//	   	continuous: true,
//	   	disableScroll: false,
//	   	stopPropagation: true,
//	   	callback: function(index, elem) {
//	     	var i = bullets2.length;
//	     	while (i--) {
//	         	bullets2[i].className = ' ';
//	     	}
//	     	bullets2[index].className = 'on';
//	   },
//	   transitionEnd: function(index, elem) {}
//	 });
//	var proCount2 = mySwipe2.getNumSlides();
//	var bullets2 = document.getElementById('mypoint2').getElementsByTagName('li');
//
//	$(".left_btn2").on("click",function(){
//		mySwipe2.prev();
//	});
//	$(".right_btn2").on("click",function(){
//		mySwipe2.next();
//	});

	$(".drive_btn").on("click",function(){
//		nowpage = 3;
//		$(".main").css({ "top": nowpage * -100 + "%" });
        if(oldpageindex!=4){
        pageindex = 4;
        move2();}
	});

	$(".car_window_btn").on("click",function(){
//		nowpage = 2;
//		$(".main").css({ "top": nowpage * -100 + "%" });
        if(oldpageindex!=3){
        pageindex = 3;
        move2();}
	});

	$("#swipte2_main li").on("click",function(){
		$(".big_img_box img").attr("src",'images/big' + ($(this).index() + 1) + '.jpg');
		$(".big_img_box").show();
	});
	
	$(".close").on("click",function(){
		$(".big_img_box").hide();
	});

	$(".submit_btn").on("click",function(){
		checkInfo();
	});

	$(".form_close").on("click",function(){
//		nowpage = 2;
//		$(".main").css({ "top": nowpage * -100 + "%" });
        if(oldpageindex!=3){
        pageindex = 1;
        move2();}
	});

	$(".dealer_close").on("click",function(){
		//nowpage = 3;
		$(".showWord").hide();
		//$(".main").css({ "top": nowpage * -100 + "%" });
		$(".con").show();
	});

	/*经销商查询*/
	$(".search_btn").on("click",function(){
		$(".showWord").show();
		$(".con").hide();
		//num = 1;
	});

	/*省市经销商加载*/
	var html = '<option value="">请选择</option>';
	for(var i = 0;i < pcd.length;i ++){
		html += '<option value="' + pcd[i].pId + '">' + pcd[i].pName + '</option>';
	}
	$(".provinceAll").html(html);

	$(".provinceAll").on("change",function(){
		var html2 = '<option value="">请选择</option>';
		$(".cityAll").html(html2);
		for(var i = 0;i < pcd.length;i ++){
			if(pcd[i].pId == $(this).val()){
				var citys = pcd[i].Cities;
				for(var j = 0;j < citys.length;j ++){
					html2 += '<option value="' + citys[j].cId + '">' + citys[j].cName + '</option>';	
				}
				break;
			}
		}
		$(".cityAll").html(html2);
	});

	$(".city").on("change",function(){
		var html3 = '<option value="">请选择</option>';
		$(".dealer").html(html3);
		for(var i = 0;i < pcd.length;i ++){
			var citys = pcd[i].Cities;
			//alert(citys[0].cId);
			for(var j = 0;j < citys.length;j ++){
				if(citys[j].cId == $(this).val()){
					var dealers = citys[j].Dealers;
					for(k = 0;k < dealers.length;k ++){
						html3 += '<option value="' + dealers[k].dCode + '">' + dealers[k].dName + '</option>';
					}
					break;
				}
			}
		}
		$(".dealer").html(html3);
	});

	//经销商查询
	var html5 = '';
	for(var i = 0;i < select.length;i ++){
		if(select[i].pId == 5){
			var dCitys = select[i].Cities;
			for(var j = 0;j < dCitys.length;j ++){
				var dDealers = dCitys[j].Dealers;
				if(dCitys[j].cId == 57){
					for(var k = 0;k < dDealers.length;k ++){
						html5 += '<li><h4>'+dDealers[k].dName+'</h4><p>'+dDealers[k].address+'</p><p>'+dDealers[k].phone+'</p></li>';
					}
					break;
				}
			}
		}
	}
	/*$(".dea_prevince").val("北京");
	$(".dea_city").val("北京");
	$(".dea_prevince").find("option[value=57]").attr("selected",true);
	$(".dea_city").find("option[value=57]").attr("selected",true);*/
	$(".dealer_con ul").html(html5);

	
	$(".dea_city").on("change",function(){
		var html4 = '';
		for(var i = 0;i < select.length;i ++){
			if(select[i].pId == $(".dea_prevince").val()){
				var dCitys = select[i].Cities;
				for(var j = 0;j < dCitys.length;j ++){
					var dDealers = dCitys[j].Dealers;
					if(dCitys[j].cId == $(".dea_city").val()){
						for(var k = 0;k < dDealers.length;k ++){
							html4 += '<li><h4>'+dDealers[k].dName+'</h4><p>'+dDealers[k].address+'</p><p>'+dDealers[k].phone+'</p></li>';
						}
						break;
					}
				}
			}
		}
		$(".dealer_con ul").html(html4);
	});

	var hammertime = Hammer($('.con')[0]).on("swipeup", function(event) {
        move2();
    });

});
var vindex = 0;
function initSw(){
    if(pageindex==3){
    window.mySwipe1 = new Swipe(document.getElementById('swipte1'), {
	   	startSlide: 0,
	   	speed: 400,
	   	continuous: true,
	   	disableScroll: false,
	   	stopPropagation: true,
	   	callback: function(index, elem) {
	     	var i = bullets1.length;
	     	while (i--) {
	         	bullets1[i].className = ' ';
	     	}
	     	bullets1[index].className = 'on';
	   },
	   transitionEnd: function(index, elem) {}
	 });
	var proCount1 = mySwipe1.getNumSlides();
	var bullets1 = document.getElementById('mypoint1').getElementsByTagName('li'); 

//	$(".left_btn1").on("touchend",function(){
//		mySwipe1.prev();
////        if(vindex<0){
////            vindex=3;
////        }
////        mySwipe1.slide(--vindex, 0);
//	});
//	$(".right_btn1").on("touchend",function(){
//		mySwipe1.next();
////        if(vindex>3){
////            vindex=0;
////        }
////        mySwipe1.slide(++vindex, 0);
//	});
	$(".one_btn").on("click",function(){
		mySwipe1.slide(0, 0);
	});
	$(".two_btn").on("click",function(){
		mySwipe1.slide(1, 0);
	});
	$(".three_btn").on("click",function(){
		mySwipe1.slide(2, 0);
	});
	$(".four_btn").on("click",function(){
		mySwipe1.slide(3, 0);
	});

    }
	/*$(".vedio_btn").on("click",function(){
		//alert($(this).index());
		mySwipe1.slide($(this).index(), 0);
	});*/
if(pageindex==4){
	//图片滚动
	window.mySwipe2 = new Swipe(document.getElementById('swipte2'), {
	   	startSlide: 0,
	   	speed: 400,
	   	continuous: true,
	   	disableScroll: false,
	   	stopPropagation: true,
	   	callback: function(index, elem) {
	     	var i = bullets2.length;
	     	while (i--) {
	         	bullets2[i].className = ' ';
	     	}
	     	bullets2[index].className = 'on';
	   },
	   transitionEnd: function(index, elem) {}
	 });
	var proCount2 = mySwipe2.getNumSlides();
	var bullets2 = document.getElementById('mypoint2').getElementsByTagName('li');

	$(".left_btn2").on("click",function(){
		mySwipe2.prev();
	});
	$(".right_btn2").on("click",function(){
		mySwipe2.next();
	});
}
}
//页面向上滑动

var nowpage = 0;
var num = 0;
var pageindex = 2;
var oldpageindex = 1;
function move1(){
	$(".con").swipe({
	    swipe: function(event, direction, distance, duration, fingerCount){
	        if (num != 0) { return; }
	        if (direction == "up") {
	            nowpage = nowpage + 1;
	        } else if (direction == "down") {
	            nowpage = nowpage - 1;
	        }
	        if (nowpage > 3) {
	            nowpage = 3;
	        }
	        if (nowpage < 0) {
	            nowpage = 0;
	        }
	        $(".main").animate({ "top": nowpage * -100 + "%" }, 50);
	    }
	});
}
function move(){}
function move2(){
    if(pageindex>4){
        pageindex=1;
    }
            $('#step'+oldpageindex).removeClass('show').addClass('hide');
            
            $('#step'+ pageindex).removeClass('hide').addClass('show').css('display','block');
            oldpageindex = pageindex;
            pageindex++;
            initSw();
    
}

//删除左右两端的空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function checkInfo(){
    var name = $.trim($(".name").val()), reg_ch = /[^\u4e00-\u9fa5]/,reg_en = /^[a-zA-Z]+$/;
    if(!name) {
        alert("请输入您的姓名！");
        return;
    }else if (reg_ch.test(name) && !reg_en.test(name)) {
        alert("请输入中文姓名或英文姓名！");
        return;
    }

	var tel = $.trim($(".tel").val()), reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
    if(!tel || !reg.test(tel)) {
        alert("请输入正确的手机号码！"); 
        return;
    }

    var email = $(".email").val();
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (! email || ! reg.test(email)) {
       alert("邮箱格式不正确！");
       return
    }

    var province = $('.province').val();
    var provinceName = $('.province').text();
    if(!province){
        alert("请选择省!");
        return;
    }

    var city = $('.city').val();
    var cityName = $('.city').text();
    if(!city){
        alert("请选择市!");
        return;
    }

    var dealer = $('.dealer').val();
    var dealerName = $('.dealer').text();
    if(!dealer){
        alert("请选择经销商!");
        return;
    }

    
 
    var url = 'http://ama.adwo.com/advmessage/adv/addResultJsonP.action?advid=30206';
    $.ajax({
        url: url,
        cache: false,
        dataType: 'jsonp',
        jsonpCallback: "eventcallback",
        data: {
        	realname:name,
        	mobile:tel,
        	email:email,
        	provinceid:province,
        	provincename:provinceName,
        	cityid:city,
        	cityname:cityName,
        	dealerid:dealer,
        	expand1:dealerName,
        },
        success: function(data){
        	if(data[0].success==1){
        		alert("数据提交成功！");
        	}else{
        		alert(data[0].info)
        	}
        }
    });
}
