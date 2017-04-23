;(function($){
	$.fn.backToTop=function(options){
		var defaults = {
			scrollTopScale: 100,
			duration: 700,
			fadeTime: 400
			
		}
		var options = $.extend(defaults,options);
		this.each(function(){
			var ethis = $(this);
			$(window).scroll(function(){  
			    if ($(window).scrollTop()>options.scrollTopScale){  
			      ethis.fadeIn(options.fadeTime);  
			    }else{  
			      ethis.fadeOut(options.fadeTime);  
			    }  
			  }); 
			  ethis.click(function(event) {
			  	event.stopPropagation();
			    $('body,html').animate({scrollTop:0}, options.duration);
			  });  
		});
		return this;
	}
})(jQuery);