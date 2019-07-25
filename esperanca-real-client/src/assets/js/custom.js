//   all ------------------
function initSolonick() {
    "use strict";
    //   loader ------------------
    $(".pin").text("Loading");
    $(".loader-wrap").fadeOut(300, function () {
        $("#main").animate({
            opacity: "1"
        }, 300);
    });
    //   Background image ------------------
    var a = $(".bg");
    a.each(function (a) {
        if ($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });
    //   clone ------------------
    $.fn.duplicate = function (a, b) {
        var c = [];
        for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
        return this.pushStack(c);
    };
    $("<div class='container full-height'></div>").appendTo(".sec-lines");
    $("<div class='line-item'></div>").duplicate(5).appendTo(".sec-lines .container");

    $("<div class='half-bg-dec-item'></div>").duplicate(12).appendTo(".half-bg-dec");
    $("<div class='hidden-works-item-dec'><i class='fal fa-arrow-left'></i></div>").appendTo(".hidden-works-item");
    var cr2 = $(".card-popup-rainingvis");
    cr2.each(function (cr) {
        var starcount2 = $(this).attr("data-starrating2");
        $("<i class='fas fa-star'></i>").duplicate(starcount2).prependTo(this);
    });
    //   hero parallax hover ------------------
    var $one = $(".mm-parallax"),
        browserPrefix = "",
        usrAg = navigator.userAgent;
    if (usrAg.indexOf("Chrome") > -1 || usrAg.indexOf("Safari") > -1) browserPrefix = "-webkit-";
    else if (usrAg.indexOf("Opera") > -1) browserPrefix = "-o";
    else if (usrAg.indexOf("Firefox") > -1) browserPrefix = "-moz-";
    else if (usrAg.indexOf("MSIE") > -1) browserPrefix = "-ms-";
    $(".hero-wrap").mousemove(function (a) {
        var b = Math.ceil(window.innerWidth / 1.5),
            c = Math.ceil(window.innerHeight / 1.5),
            d = a.pageX - b,
            e = a.pageY - c,
            f = e / c,
            g = -(d / b),
            h = Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2)),
            i = 10 * h;
        $one.css(browserPrefix + "transform", "rotate3d(" + f + ", " + g + ", 0, " + i + "deg)");
    });
    function heroAnim() {
        function a(a) {
            var b = a.length,
                c, d;
            while (b) {
                d = Math.floor(Math.random() * b--);
                c = a[b];
                a[b] = a[d];
                a[d] = c;
            }
            return a;
        }
        var b = $(".half-bg-dec-item");
        $(a(b).slice(0, $(".half-bg-dec").data("ran"))).each(function (a) {
            var bc = $(this);
            b.removeClass("half-bg-dec-vis")
            bc.addClass("half-bg-dec-vis");

        });
    }
    setInterval(function () {
        heroAnim();
    }, 2000);
    //   parallax thumbnails position  ------------------
    $(".bg-parallax-module").each(function () {
        var tcp = $(this),
            dpl = tcp.data("position-left"),
            dpt = tcp.data("position-top");
        tcp.css({
            "top": dpt + "%"
        });
        tcp.css({
            "left": dpl + "%",
        });
    });
    $(".album-thumbnails div").each(function () {
        var dp2 = $(this).data("position-left2"),
            dpt2 = $(this).data("position-top2");
        $(this).css({
            "top": dpt2 + "%"
        });

        $(this).css({
            "left": dp2 + "%",
        });
	});
	
	$(".scroll-nav-wrap").scrollToFixed({
        minWidth: 569,
        zIndex: 12,
        preUnfixed: function () {
            $(this).css("margin-top", "0");
        },
        preFixed: function () {
            if ($(window).width() < 1064) $(this).css("margin-top", "80px");
        }
    });
    $(".hidden-info-wrap-bg").scrollToFixed({
        minWidth: 1064,
        zIndex: 12,
        marginTop: 80,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".hidden-info-wrap-bg").outerHeight(true);
            return a;
        }
    });
    $(".fixed-column").scrollToFixed({
        minWidth: 1064,
        zIndex: 12,
        marginTop: 120,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".fixed-column").outerHeight(true) - 50;
            return a;
        }
    });
    if ($(".fixed-bar").outerHeight(true) < $(".post-container").outerHeight(true)) {
        $(".fixed-bar").addClass("fixbar-action");
        $(".fixbar-action").scrollToFixed({
            minWidth: 1064,
            marginTop: function () {
                var a = $(window).height() - $(".fixed-bar").outerHeight(true) - 100;
                if (a >= 0) return 20;
                return a;
            },
            removeOffsets: true,
            limit: function () {
                var a = $(".limit-box").offset().top - $(".fixed-bar").outerHeight() - 20;
                return a;
            }
        });
    } else $(".fixed-bar").removeClass("fixbar-action");

    //   accordion ------------------
    $(".accordion a.toggle").on("click", function (a) {
        a.preventDefault();
        $(".accordion a.toggle").removeClass("act-accordion");
        $(this).addClass("act-accordion");
        if ($(this).next('div.accordion-inner').is(':visible')) {
            $(this).next('div.accordion-inner').slideUp();
        } else {
            $(".accordion a.toggle").next('div.accordion-inner').slideUp();
            $(this).next('div.accordion-inner').slideToggle();
        }
    });
   
    //   Contact form------------------
    $("#contactform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                subject: $('#subject').val(),
                comments: $("#comments").val(),
                verify: $('#verify').val()

            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactform input, #contactform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });

    var shrcn = $(".share-wrapper"),
        ssb = $(".showshare");
    function showShare() {
        hideMenu();
        shrcn.fadeIn(1).removeClass("isShare").addClass("invis-share");
        $(".share-title span").shuffleLetters({});
        ssb.addClass("clshbt");
        setTimeout(function () {
            $(".soa").each(function (a) {
                var b = $(this);
                setTimeout(function () {
                    b.addClass("soavis")
                }, 150 * a);
            });

        }, 300);
    }
    function hideShare() {
        shrcn.fadeOut(400).addClass("isShare").removeClass("invis-share");
        $(".soa").removeClass("soavis");
        ssb.removeClass("clshbt");
    }
    $(".close-share").on("click", function () {
        hideShare();
    });
    ssb.on("click", function () {

        if (shrcn.hasClass("isShare")) showShare();
        else hideShare();
        return false;
    });
    //   menu ------------------
    $("#menu").menu();
    $(".sliding-menu li a.nav").parent("li").addClass("submen-dec");
    var nbw = $(".nav-button"),
        nhw = $(".nav-holder"),
        nho = $(".nav-overlay");
    function showMenu() {
        hideShare();
        nho.fadeIn(500);
        nhw.animate({
            left: "0",
            opacity: 1
        }, {
            queue: false,
            duration: 600,
            easing: "easeInOutExpo"
        });
        nbw.removeClass("but-hol").addClass("cmenu");

    }
    function hideMenu() {
        nhw.animate({
            left: "-1064px",
            opacity: 0
        }, {
            queue: false,
            duration: 600,
            easing: "easeInOutExpo"
        });
        nbw.addClass("but-hol").removeClass("cmenu");
        nho.fadeOut(500);
    }
    nbw.on("click", function () {
        if (nbw.hasClass("but-hol")) showMenu();
        else hideMenu();
        return false;
    });
    nho.on("click", function () {
        hideMenu();
        return false;
    });
    
    var tooltips = document.querySelectorAll('.nav-overlay .tooltip');
    window.onmousemove = function (e) {
        var x = (e.clientX + 20) + 'px',
            y = (e.clientY + 20) + 'px';
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.top = y;
            tooltips[i].style.left = x;
        }
    };
    // Styles ------------------
    function csselem() {
        $(".height-emulator").css({
            height: $(".fixed-footer").outerHeight(true)
        });
        $(".show-case-slider .show-case-item").css({
            height: $(".show-case-slider").outerHeight(true)
        });
        $(".fullscreen-slider-item").css({
            height: $(".fullscreen-slider").outerHeight(true)
        });
        $(".half-slider-item").css({
            height: $(".half-slider-wrap").outerHeight(true)
        });
        $(".half-slider-img-item").css({
            height: $(".half-slider-img").outerHeight(true)
        });
        $(".hidden-info-wrap-bg").css({
            height: $(window).outerHeight(true) - 80 + "px"
        });
        $(".slideshow-item").css({
            height: $(".slideshow-container").outerHeight(true)
        });
        $(".fs-carousel-item").css({
            height: $(".fs-carousel").outerHeight(true)
        });
    }
    csselem();
    var $window = $(window);
    $window.resize(function () {
        csselem();
    });
    // Counter ------------------
    if ($(".counter-widget").length > 0) {
        var countCurrent = $(".counter-widget").attr("data-countDate");
        $(".countdown").downCount({
            date: countCurrent,
            offset: 0
        });
    }
    //   scroll to------------------
    $(".custom-scroll-link").on("click", function () {
        var a = 80;
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({
                    scrollTop: b.offset().top - a
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });

    $(".to-top").on("click", function (a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $("<div class='to-top-letter'>t</div><div class='to-top-letter'>o</div><div class='to-top-letter'>p</div>").appendTo(".to-top span");
    //   Blog filter ------------------
    $(".blog-btn").on("click", function () {
        $(this).parent(".blog-btn-filter").find("ul").slideToggle(500);
        return false;
    });

}
//   Parallax ------------------
function initparallax() {
    var a = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
        }
    };

}
    //   instagram ------------------	
    var actoket = $('#insta-content').data("instatoken");
    var token = actoket,
        num_photos = 6;
    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {
            access_token: token,
            count: num_photos
        },
        success: function (data) {
            for (x in data.data) {
                $('#insta-content').append('<a target="_blank" href="' + data.data[x].link + '"><img src="' + data.data[x].images.low_resolution.url + '"></a>');
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    //   audio player ------------------
    if ($(".audio-player-wrap").length > 0) {
        function initAudiolist() {
            audiojs.events.ready(function () {
                var a = audiojs.createAll({
                        trackEnded: function () {
                            var next = $('.audio-player-wrap ol li.playing').next();
                            if (!next.length) next = $('.audio-player-wrap ol li').first();
                            next.addClass('playing').siblings().removeClass('playing');
                            audio.load($('a.audio-link', next).attr('data-srcaudio'));
                            audio.play();
                        }
                    }),
                    audio = a[0],
                    ids = ['vol-0', 'vol-40', 'vol-70', 'vol-100'];
                for (var i = 0, ii = ids.length; i < ii; i++) {
                    var elem = document.getElementById(ids[i]),
                        volume = ids[i].split('-')[1];
                    elem.setAttribute('data-volume', volume / 100)
                    elem.onclick = function (e) {
                        audio.setVolume(this.getAttribute('data-volume'));
                        e.preventDefault();
                        return false;
                    }
                }
                var audio = a[0];
                first = $('.audio-player-wrap ol a.audio-link').attr('data-srcaudio');
                $('.audio-player-wrap ul li').first().addClass('playing');
                audio.load(first);
                $('.audio-player-wrap ol li a.audio-link').on("click", function (e) {
                    e.preventDefault();
                    if ($(this).parent("li").attr('class') === 'playing') {
                        $(this).parent("li").addClass('pause');
                        audio.playPause();
                    } else {
                        $(this).parent("li").removeClass('pause').addClass('playing').siblings().removeClass('playing').removeClass('pause');
                        audio.load($(this).attr('data-srcaudio'));
                        audio.play();
                    }
                });
            });
        }
        initAudiolist();
        $('.volume-control span').on('click', function () {
            $('.volume-control span').removeClass("allvolumne");
            var onStar = Number($(this).data('value'));
            var stars = $(this).parent().children('span');
            for (i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }
            for (i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }
            if ($(this).data("value") === 1) {
                $(this).addClass('allvolumne');
            }
        });
        var alblisttitle = $(".playlist-wrap ol").data("listalbumtitle");
        $(".album-list-title").text("(" + alblisttitle + ")");
    }
    var audprev = $("#preview-sound");
    $('.album-preview').on({
        mouseenter: function () {
            var audioprevpath = $(this).data("audiopath");
            audprev.attr("src", audioprevpath);
            audprev[0].play();
        },
        mouseleave: function () {
            audprev[0].pause();
            audprev[0].currentTime = 0;
        }
    });
//   Init All ------------------
$(function () {
    initparallax();
    initSolonick();
});