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

});







