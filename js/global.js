$(function() {
	"use strict";

    //VARIABLES
    var tabFinish = 0, enableScroll = 0, swipers = [],winW, winH, xsPoint = 767, smPoint = 991, mdPoint = 1199, initIterator = 0, is_visible = $('.menu-button').is(':visible');
    winW = $(window).width();
    winH  =  $(window).height();


    //WINDOW LOAD
	$(window).load(function(){
		$('body').addClass('loaded');
		$('#loader-wrapper').fadeOut();
        window.scrollTo(0, 0);

        if(window.location.hash) {
            var index = $('.scroll-to-link[href="'+window.location.hash+'"]').index('.scroll-to-link');
            $('body, html').animate({'scrollTop':$('.scroll-to-block').eq(index).offset().top}, 10, function(){enableScroll = 1;});

        }else enableScroll = 1;
    });

    function initSwiper(){
        var initIterator = 0;
        $('.swiper-container').each(function(){
            var $t = $(this);

            var index = 'unique-id-'+initIterator;
            var slideMode = $(this).attr('data-mode');
            $t.attr('data-init', index).addClass('initialized');
            $t.find('.pagination').addClass('pagination-'+index);

            var loopVar = parseInt($t.attr('data-loop')),
                slidesPerViewVar = $t.attr('data-slides-per-view'),
                xsValue, smValue, mdValue, lgValue;
            var centeredSlidesVar = ($t.closest('.history, .testimonials-container').length)?1:0;
            if(slidesPerViewVar == 'responsive'){
                slidesPerViewVar = 1;
                xsValue = $t.attr('data-xs-slides');
                smValue = $t.attr('data-sm-slides');
                mdValue = $t.attr('data-md-slides');
                lgValue = $t.attr('data-lg-slides');
            }

            swipers[index] = new Swiper(this,{
                pagination: '.pagination-'+index,
                loop: loopVar,
                paginationClickable: true,
                calculateHeight: true,
                slidesPerView: slidesPerViewVar,
                roundLengths: true,
                mode:slideMode,
                centeredSlides: centeredSlidesVar,
                onInit: function(swiper){
                    if($t.attr('data-slides-per-view')=='responsive') updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper);
                },
                onSlideChangeEnd:function(swiper){

                    var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                    if($t.next().find('.slider-index').length) {
                        $t.next().find(".start_index").html(activeIndex+1);
                    }
                    if($t.find('.slider-index').length) {
                        $t.find(".start_index").html(activeIndex+1);
                    }
                    if($t.hasClass('swiper-project')) {
                        var activeSlide = $t.find('.swiper-slide-active'),
                            activePrev =  activeSlide.prev().data('name'),
                            activeNext =  activeSlide.next().data('name');

                        $('.v-project-prev span').text(activePrev);
                        $('.v-project-next span').text(activeNext);

                        if(!activeSlide.next().hasClass('swiper-slide')) {
                            $('.v-project-next').fadeOut();
                        }
                        else{
                            $('.v-project-next').fadeIn();
                        }

                        if(!activeSlide.prev().hasClass('swiper-slide')) {
                            $('.v-project-prev').fadeOut();
                        }
                        else{
                            $('.v-project-prev').fadeIn();
                        }
                    }
                    if($t.hasClass('testimonials-slider')) {
                        $('.testimonials-item').parent().find('.testimonials-item').css('display', 'none').removeClass('active');
                        $('.testimonials-item').eq(activeIndex).css({
                            'display' : 'block',
                            'opacity' : 0
                        }).animate({'opacity' : 1},50,
                        function() {
                            $(this).addClass('active');
                        }
                        );
                    }

                },
            });
            swipers[index].reInit();
            if($t.find('.default-active').length) swipers[index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);
            initIterator++;
        });
    };


    //FUNCTIONS OF PAGE RESIZE
    function resizeCall(){
        winW = $(window).width();
        winH  =  $(window).height();
        $('.swiper-container[data-slides-per-view="responsive"]').each(function(){
            swipers[$(this).attr('data-init')].reInit();
        });
        is_visible = $('.menu-button').is(':visible');
        if(is_visible) {
            $('.s-header').addClass('fixed').removeClass('fixed-bottom fixed-top');
        }
    }
    $(window).resize(function(){
        resizeCall();
    });
    window.addEventListener("orientationchange", function() {
        resizeCall();
    }, false);


    initSwiper();

    // BACKGROUND IMG
    $('.center-image').each(function(){
        var bgSrc = $(this).attr('src');
        $(this).parent().css({'background-image':'url('+bgSrc+')'});
        $(this).remove();
    });

    //MENU RESPONSIVE SHOW
    $('.menu-button').on('click', function () {
        var menu = $('.nav').slideToggle(400);
        $(this).toggleClass('active');

        $(window).resize(function(){
            var w = $(window).width();
            if(w > 320 && menu.is(':hidden')) {
                menu.removeAttr('style');
            }
        });
    });

    //MENU RESPONSIVE SHOW TYPE2
    $('.m-menu-button').on('click', function () {
        $(this).toggleClass('active');
        $('.m-header').toggleClass('m-header-active');
        $('.m-nav').toggleClass('m-nav-active');

    });

    if(is_visible){
        $('.nav a').on('click', function () {
            $('.nav').slideUp(300);
            $('.menu-button').removeClass('active');
        });
    }

    $('.m-nav a').on('click', function () {
        if(winW < 992 ) {
            $('.m-nav').removeClass('m-nav-active');
        }
    });

});







