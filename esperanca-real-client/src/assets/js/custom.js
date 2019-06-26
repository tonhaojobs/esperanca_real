
jQuery(document).ready(function () {
	
	$(function () {
        window.addEventListener('scroll', function (e) {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 20 /*$('header').height() - 100,*/,
                header = document.querySelector(".header-nav");
            if (header !== null) {
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");

                        var line1 = document.querySelector(".line-1");
                        var line2 = document.querySelector(".line-2");
                        var line3 = document.querySelector(".line-3");

                        classie.remove(line1, "rotate");
                        classie.remove(line2, "rotate");
                        classie.remove(line3, "rotate");

                        classie.remove(line1, "rotate-1");
                        classie.remove(line2, "rotate-2");
                        classie.remove(line3, "rotate-3");
                    }
                }
            }
        });
    });
    
    $('.home_').on('click', function () { 
        var line1 = document.querySelector(".line-1");
        var line2 = document.querySelector(".line-2");
        var line3 = document.querySelector(".line-3");

        classie.remove(line1, "rotate");
        classie.remove(line2, "rotate");
        classie.remove(line3, "rotate");

        classie.remove(line1, "rotate-1");
        classie.remove(line2, "rotate-2");
        classie.remove(line3, "rotate-3");
    });

    $('.header-hamburguer').on('click', function () { 

        var line1 = document.querySelector(".line-1");
        var line2 = document.querySelector(".line-2");
        var line3 = document.querySelector(".line-3");

        if (classie.has(line1, "rotate")) {

            classie.remove(line1, "rotate");
            classie.remove(line2, "rotate");
            classie.remove(line3, "rotate");

            classie.remove(line1, "rotate-1");
            classie.remove(line2, "rotate-2");
            classie.remove(line3, "rotate-3");

        } else {

            classie.add(line1, "rotate");
            classie.add(line2, "rotate");
            classie.add(line3, "rotate");

            classie.add(line1, "rotate-1");
            classie.add(line2, "rotate-2");
            classie.add(line3, "rotate-3");
        }
    });


    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100
        }
    );

    wow.init();
    
});