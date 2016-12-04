// Custom Script
// Developed by: Samson.Onna
var customScripts = {
    profile: function () {
        // portfolio
        if ($('.isotopeWrapper').length) {
            var $container = $('.isotopeWrapper');
            var $resize = $('.isotopeWrapper').attr('id');
            // initialize isotope
            $container.isotope({
                itemSelector: '.isotopeItem',
                resizable: false, // disable normal resizing
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
            $("a[href='#top']").click(function () {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });
            $('.navbar-inverse').on('click', 'li a', function () {
                $('.navbar-inverse .in').addClass('collapse').removeClass('in').css('height', '1px');
            });
            $('#filter a').click(function () {
                $('#filter a').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 1000,
                        easing: 'easeOutQuart',
                        queue: false
                    }
                });
                return false;
            });
            $(window).smartresize(function () {
                $container.isotope({
                    // update columnWidth to a percentage of container width
                    masonry: {
                        columnWidth: $container.width() / $resize
                    }
                });
            });
        }
    },
    lastfancybox: null,
    fancybox: function () {
        // fancybox
        $(".fancybox").fancybox({
            padding: 0,
            beforeClose: function(){
                customScripts.findlastfancybox();
            },
            afterClose: function(){
                customScripts.carouselReset();
            },
            afterShow: function(){
                customScripts.setCarouselHelpers();
            }
        });
    },
    onePageNav: function () {

        $('#mainNav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 950,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
            begin: function () {
                //I get fired when the animation is starting
            },
            end: function () {
                //I get fired when the animation is ending
            },
            scrollChange: function ($currentListItem) {
                //I get fired when you enter a section and I pass the list item of the section
            }
        });
    },
    slider: function () {
        $('#da-slider').cslider({
            autoplay: true,
            bgincrement: 0
        });
    },
    owlSlider: function () {
        var owl = $("#owl-demo");
        owl.owlCarousel();
        // Custom Navigation Events
        $(".next").click(function () {
            owl.trigger('owl.next');
        })
        $(".prev").click(function () {
            owl.trigger('owl.prev');
        })
    },
    bannerHeight: function () {
        var bHeight = $(".banner-container").height();
        $('#da-slider').height(bHeight);
        $(window).resize(function () {
            var bHeight = $(".banner-container").height();
            $('#da-slider').height(bHeight);
        });
    },
    skillbarsInit: function () {
        $(window).scroll( function () {
            if ( $(window).scrollTop()+$(window).height() >= $('#skills .progress-bar').eq(2).offset().top ){
                $('#skills .progress-bar').each(function(){
                    $(this).animate({
                        width:$(this).attr('aria-valuenow') + "%"
                    },2000);
                });
            }
        });
    },
    findlastfancybox: function () {
        customScripts.lastfancybox = "#" + $('.fancybox-inner').find('.portfolio_project').attr('id');
    },
    carouselReset: function () {
        slides = $(customScripts.lastfancybox).find('.item');
        $(slides).removeClass('active');
        $(slides).eq(0).addClass('active');
        $(customScripts.lastfancybox).find('.carousel-indicators').eq(0).addClass('active');
        $(customScripts.lastfancybox).find('.project_info').css('display', 'none');
        $(customScripts.lastfancybox).find('.project_info_toggler').removeClass('active');
    },
    setCarouselHelpers: function(){
        var fancyboxpos = $('.fancybox-wrap').position();
        var facyboxwidth = $('.fancybox-wrap').width();
        var controlwidth = $('.fancybox-wrap .right.carousel-control').width();
        var carouselheight = $('.fancybox-wrap .carousel').height();
        $('.fancybox-wrap .left.carousel-control').css('left',fancyboxpos.left + 16);
        $('.fancybox-wrap .right.carousel-control').css('left',fancyboxpos.left + facyboxwidth - controlwidth - 16);
        var attachment = (screen.width < 769) ? "absolute" : "fixed";
        if (attachment == "absolute"){
            $('.fancybox-wrap .fancybox-close').css({
                top: fancyboxpos.top - 18,
                left: fancyboxpos.left + facyboxwidth - 18,
                right: "auto",
                position: "fixed",
                zIndex: 7500
            });
        }
        fancyboxpos.top = (attachment == "absolute") ? 0 : fancyboxpos.top;
        fancyboxpos.left = (attachment == "absolute") ? 0 : fancyboxpos.left;
        $('.fancybox-wrap .project_info_toggler').css({
            position: attachment,
            top: fancyboxpos.top + 25,
            left: fancyboxpos.left
        });
        $('.fancybox-wrap .carousel-control span').fadeIn();
    },
    enableInfoTogglers: function(){
        $('.project_info_toggler').click(function(){
            if ( $(this).hasClass('active') ){
                $(this).siblings('.project_info').toggle(350);
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                var fancyboxwrap = $('.fancybox-wrap');
                var elm2show = $(this).siblings('.project_info');
                var top = fancyboxwrap.position().top;
                var width = fancyboxwrap.find('.carousel').width();
                if( fancyboxwrap.height() > elm2show.find('ul').height() ){
                    var top = top + ( fancyboxwrap.height() - elm2show.find('ul').height() )/2;
                }
                elm2show.find('ul').css({
                    top: top,
                    width: width,
                });
                elm2show.toggle(350);
            }
        });
    },
    init: function () {
        customScripts.onePageNav();
        customScripts.profile();
        customScripts.fancybox();
        customScripts.slider();
        customScripts.owlSlider();
        customScripts.bannerHeight();
        customScripts.skillbarsInit();
        customScripts.enableInfoTogglers();
    }
}
$('document').ready(function () {
    customScripts.init();
});
