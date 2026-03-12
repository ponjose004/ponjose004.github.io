(function ($) {
    "use strict";

    var bootsnav = {
        initialize: function() {
            this.event();
            this.hoverDropdown();
            this.navbarSticky();
            this.navbarScrollspy();
        },

        event: function() {
            var getNav = $("nav.navbar.bootsnav");

            // Navbar Sticky
            var navSticky = getNav.hasClass("navbar-sticky");
            if (navSticky) {
                getNav.wrap("<div class='wrap-sticky'></div>");
            }

            // Navbar Mobile
            if (getNav.hasClass("navbar-mobile")) {
                $(".navbar-collapse").on("shown.bs.collapse", function() {
                    $("body").addClass("side-right");
                }).on("hide.bs.collapse", function() {
                    $("body").removeClass("side-right");
                });

                $(window).on("resize", function() {
                    $("body").removeClass("side-right");
                });
            }
        },

        hoverDropdown: function() {
            var getNav = $("nav.navbar.bootsnav"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.nav").data("in"),
                getOut = getNav.find("ul.nav").data("out");

            if (getWindow < 991) {
                $(".scroller").css("height", "auto");
                $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter");
                $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave");

                $("nav.navbar.bootsnav ul.nav").each(function() {
                    $(".dropdown-menu", this).addClass("animated");
                    $("a.dropdown-toggle", this).on('click', function(e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(getIn);
                        $(this).closest("li.dropdown").first().toggleClass("on");
                        return false;
                    });
                });

                $("nav.navbar.bootsnav").on("mouseleave", function() {
                    $('li.dropdown', this).removeClass("on");
                    $(".dropdown-menu", this).stop().fadeOut();
                    $(".dropdown-menu", this).removeClass(getIn);
                });

            } else if (getWindow > 991) {
                $(".scroller").css("height", getHeight + "px");

                $("nav.navbar.bootsnav ul.nav").each(function() {
                    $(".dropdown-menu", this).addClass("animated");
                    $("li.dropdown", this).on("mouseenter", function() {
                        $(".dropdown-menu", this).eq(0).removeClass(getOut);
                        $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                        $(this).addClass("on");
                        return false;
                    });

                    $("li.dropdown", this).on("mouseleave", function() {
                        $(".dropdown-menu", this).eq(0).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                        $(this).removeClass("on");
                    });
                });
            }
        },

        navbarSticky: function() {
            var getNav = $("nav.navbar.bootsnav"),
                navSticky = getNav.hasClass("navbar-sticky");

            if (navSticky) {
                var getHeight = getNav.height();
                $(".wrap-sticky").height(getHeight);
                var getOffset = $(".wrap-sticky").offset().top;

                $(window).on("scroll", function() {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > getOffset) {
                        getNav.addClass("sticked");
                    } else {
                        getNav.removeClass("sticked");
                    }
                });
            }
        },

        navbarScrollspy: function() {
            var navScrollSpy = $(".navbar-scrollspy"),
                $body = $('body'),
                getNav = $('nav.navbar.bootsnav'),
                offset = getNav.outerHeight();

            if (navScrollSpy.length) {
                $body.scrollspy({ target: '.navbar', offset: offset });

                $('.scroll').on('click', function(event) {
                    event.preventDefault();
                    $('.scroll').removeClass("active");
                    $(this).addClass("active");
                    $(".navbar-collapse").removeClass("in");

                    var $anchor = $(this).find('a'),
                        $section = $($anchor.attr('href')).offset().top,
                        $window = $(window).width(),
                        $minusDesktop = getNav.data("minus-value-desktop"),
                        $minusMobile = getNav.data("minus-value-mobile"),
                        $speed = getNav.data("speed");

                    var $position = $window > 992 ? $section - $minusDesktop : $section - $minusMobile;
                    $('html, body').stop().animate({ scrollTop: $position }, $speed);
                });

                var fixSpy = function() {
                    var data = $body.data('bs.scrollspy');
                    if (data) {
                        offset = getNav.outerHeight();
                        data.options.offset = offset;
                        $body.data('bs.scrollspy', data);
                        $body.scrollspy('refresh');
                    }
                };

                $(window).on('resize', function() {
                    setTimeout(fixSpy, 200);
                });
            }
        }
    };

    // Initialization
    $(document).ready(function() {
        bootsnav.initialize();
    });

    // ✅ Reset on resize
    $(window).on("resize", function() {
        bootsnav.hoverDropdown();
        setTimeout(function() {
            bootsnav.navbarSticky();
        }, 500);

        // ✅ Fix Navbar Toggle Bars
        $(".navbar-toggle").each(function() {
            $(".fa", this).removeClass("fa-times");
            $(".fa", this).addClass("fa-bars");
            $(this).removeClass("fixed");
        });

        $(".navbar-collapse").removeClass("in on bounceIn");
    });

}(jQuery));