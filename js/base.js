// JavaScript Document
!$('#banner_box').length > 0 || (function(){
	var	bannerPicLi = $('.banner_pic').find('li'),
		bannerBtnLi = $('.banner_btn').find('li')
		time = 3000,
		iNow = 0;
		timer = null;
		
	play();
	
	bannerBtnLi.live('mouseover',function(){
		clearInterval(timer);
		iNow = 	bannerBtnLi.index($(this));
		change(iNow);
		
	});
	bannerBtnLi.live('mouseout',function(){
		play();
	});
	
	function play(){
		timer = setInterval(auto,time);		
	}
	
	function change(i){
		bannerPicLi.eq(i).fadeIn(500).siblings().fadeOut(400);
		bannerBtnLi.eq(i).addClass('on').siblings().removeClass('on');
	};
	
	function auto(){
		if(iNow == bannerPicLi.length - 1){
			iNow = 0;
		} else {
			iNow++;		
		}
		change(iNow);
	};
})();

//listPage
$('.newsList li').each(function(){
	$(this).mouseover(function(){
		$('.newsList li').removeClass("liBg");
		$(this).addClass("liBg");
	});
});

