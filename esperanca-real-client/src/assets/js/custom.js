// ---------------------------------
// -------- Document ready ---------
// ---------------------------------


jQuery(document).ready(function () {

    //Tob bar shrinking
    $(function () {
        window.addEventListener('scroll', function (e) {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = $('header').height() - 150,
                header = document.querySelector(".header-nav");
            if (header !== null) {
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                    }
                }
            }
        });
    });



    //Localscroll initialization

    $.localScroll({

        queue: true,
        duration: 1000,
        hash: false,
        onBefore: function (e, anchor, $target) {
            // The 'this' is the settings object, can be modified
        },
        onAfter: function (anchor, settings) {
            // The 'this' contains the scrolled element (#content)
        }
    });


    //Menu functionality
    var menu = document.querySelector(".menu"),
        menuCont = document.querySelector(".menu-container"),
        toggle = document.querySelector(".menu-bar");

    function toggleToggle() {
        toggle.classList.toggle("menu-open");

        var open = $('.menu-text').text();
        var close = $('.menu-text').attr('data-text');

        if ($('.menu-text').text(open)) {
            $('.menu-text').text(close);
        } else {
            $('.menu-text').text(open);
        }
        $('.menu-text').attr('data-text', open);
    };

    function toggleMenu() {
        menu.classList.toggle("active");
        menuCont.classList.toggle('overlay_bg');
    };

    if (toggle !== null) {
        toggle.addEventListener("click", toggleToggle, false);
        toggle.addEventListener("click", toggleMenu, false);
    }

    if (menuCont !== null) {
        menuCont.addEventListener("click", toggleToggle, false);
        menuCont.addEventListener("click", toggleMenu, false);
    }


    /* ---------------------------------------------
     Height 100%
     --------------------------------------------- */
    function js_height_init() {
        (function ($) {
            $(".js-full-height").height($(window).height());
            $(".js-parent-height").each(function () {
                $(this).height($(this).parent().first().height());
            });
        })(jQuery);
    }

    js_height_init();


    $(window).resize(function () {

        js_height_init();

    });

    /*-------------------------------------------------*/
    /* =  Animated content
     /*-------------------------------------------------*/

    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100
        }
    );

    wow.init();

    //Tooltip

    $('[data-toggle="tooltip"]').tooltip();
});


//Features Timeline
jQuery(document).ready(function ($) {
    var $timeline_block = $('.cHouse-timeline-block');

    //hide timeline blocks which are outside the viewport
    $timeline_block.each(function () {
        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
            $(this).find('.cHouse-timeline-img, .cHouse-timeline-content').addClass('is-hidden');
        }
    });

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function () {
        $timeline_block.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cHouse-timeline-img').hasClass('is-hidden')) {
                $(this).find('.cHouse-timeline-img, .cHouse-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });
});


//Testimonial box carousel
$(document).ready(function () {
    $('#Carousel-testimonial').carousel({
        interval: 5000
    });
    $('.floating-menu li').on('click', function () {
        $('li.current').removeClass('current');
        $(this).addClass('current');
    });
    //scrollup js
    jQuery('.stats-bg').parallax("50%", 0.1);

    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 200) {
            jQuery('.scrollup').fadeIn();
        } else {
            jQuery('.scrollup').fadeOut();
        }
    });

    jQuery('.scrollup').click(function () {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});


jQuery(document).ready(function (t) {
    t(window).scroll(function () {
        var e = 600;
        t(".magical.iphone").each(function () {
            if (t(this).offset().top < t(window).scrollTop() + e) {
                t(window).scrollTop() + e - t(this).offset().top;
                var i = 200,
                    n = t(this).attr("data-expand-from");
                t(this).find("#screen-2").css(n, i / 3), t(this).find("#screen-3").css(n, i / 1.5), t(this).find("#screen-4").css(n, i);
                var s = this;
                setTimeout(function () {
                    t(s).addClass("open")
                }, 1200)
            }
        })
    })
});


jQuery(document).ready(function (u) {
    u(window).scroll(function () {
        var e = 600;
        u(".magical.iphone").each(function () {
            if (u(this).offset().top < u(window).scrollTop() + e) {
                u(window).scrollTop() + e - u(this).offset().top;
                var i = 200,
                    n = u(this).attr("data-expand-from");
                u(this).find("#screen-6").css(n, i / 3), u(this).find("#screen-7").css(n, i / 1.5), u(this).find("#screen-8").css(n, i);
                var s = this;
                setTimeout(function () {
                    u(s).addClass("open")
                }, 1200)
            }
        })
    })
});

