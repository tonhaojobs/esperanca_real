// ---------------------------------
// -------- Document ready ---------
// ---------------------------------

jQuery(document).ready(function () {

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
});

