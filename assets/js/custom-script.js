(function ($) {

/*==================================
        Toggle JS Start
==================================*/

$(".navbar-toggler").on("click", function () {
    if ($(window).width() < 1199) {
        $(this).toggleClass("active");
        $(".nav_wrapper").slideToggle();
    }
});

$(window).on("resize", function () {
    if ($(window).width() >= 1199) {
        $(".nav_wrapper").show();
        $(".navbar-toggler").removeClass("active");
    } else {
        if (!$(".navbar-toggler").hasClass("active")) {
            $(".nav_wrapper").hide();
        }
    }
});


if ($(window).width() >= 1199) {
    $(".nav_wrapper").show();
} else {
    $(".nav_wrapper").hide();
}
    
/*==================================
        Toggle JS End
==================================*/


/*==================================
    Homer Banner Slider JS Start
================================= */
  if ($(".bannerlg_slider").length) {

    // Progress Bar
    var $slider = $('.bannersm_slider');
    var $progressBar = $('.progress');
    var $counter = $('.slide_count');

    function updateSliderData(slick, currentSlide) {

        var totalSlides = slick.slideCount;
        var current = currentSlide + 1;

        // Progress calculation
        var calc = (current / totalSlides) * 100;

        $progressBar.css('background-size', calc + '% 100%');

        // Counter
        $counter.text(current < 10 ? '0' + current : current);
    }

    // EVENTS FIRST
    $slider.on('init', function (event, slick) {
        updateSliderData(slick, 0);
    });

    $slider.on('afterChange', function (event, slick, currentSlide) {
        updateSliderData(slick, currentSlide);
    });

    // THEN INIT SLICK
    $('.bannerlg_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.bannersm_slider',
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    });

    $('.bannersm_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        asNavFor: '.bannerlg_slider',
        focusOnSelect: true
    });
}


// Custom Dots
$('.banner_sm').each(function () {

    const $container = $(this);
    const $slider = $container.find('[class^="bannersm_"]');
    const $dotsContainer = $container.find('.custom_dots');

    const slideCount = $slider.slick('getSlick').slideCount;

    for (let i = 0; i < slideCount; i++) {
        $dotsContainer.append(`<li data-index="${i}"></li>`);
    }

    const $dots = $dotsContainer.find('li');

    const visibleDots = 5;
    const centerDotIndex = Math.floor(visibleDots / 2);

    function updateDots(currentIndex) {

        $dots.removeClass('active far hidden');

        $dots.each(function (index) {

            const distance = Math.abs(currentIndex - index);

            if (distance === 0) {
                $(this).addClass('active');
            } else if (distance === centerDotIndex + 1) {
                $(this).addClass('far');
            } else if (distance > centerDotIndex) {
                $(this).addClass('hidden');
            }

        });

    }

    $dots.on('click', function () {

        const index = $(this).data('index');
        $slider.slick('slickGoTo', index);

    });

    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        updateDots(nextSlide);
    });

    updateDots(0);

});
/*==================================
    Homer Banner Slider JS End
==================================*/

/*====================================
    Research Development JS Start
====================================*/
    if ($(".research_slider").length) {
        const researchSlider = new Swiper(".research_slider", {
            autoplay: {
                delay: 2000,
            },
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.research_pagination',
                clickable: true,
            },
            speed: 1000,
        });
    }
/*====================================
    Research Development JS End
====================================*/


/*====================================
    Counter JS Start
====================================*/
if ($(".counter__slider").length) {
    const counterSlider = new Swiper(".counter__slider", {
        slidesPerView: 6,
        spaceBetween: 20,
        autoplay: {
                    delay: 3000,
                },
        pagination: {
                    el: '.counter_pagination',
                    clickable: true,
                },

        breakpoints: {
            220: {
                slidesPerView: 1,
                pagination: {
                    el: '.counter_pagination',
                    clickable: true,
                },
                
            },
            375: {
                slidesPerView: 2,
                
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
                
            },
            1200: {
                slidesPerView: 6,
                pagination: {
                    el: '.counter_pagination',
                    clickable: false,
                },
            }
        }
    });
}
/*====================================
    Counter JS End
====================================*/

/*====================================
    Our Capabilities JS Start
====================================*/
     if ($('.manufacturing__section .single_item').length) {
        $('.manufacturing__section .single_item').click(function() {
            $('.single_item').removeClass('active');
            $(this).addClass('active');
        });
    }
/*====================================
    Our Capabilities JS End
====================================*/

// img add in background
    if ($('.bg_img').length) {
        $('.bg_img').each(function(){
            const el = $(this),
            src = el.attr('src'),
            parent = el.parent();
            parent.css({
                'background-image': `url(${src})`,
                'background-size': 'cover',
                'background-position': '50% 50%',
                'background-repeat': 'no-repeat',
            });
            el.hide();
        });
    }

/*========================================
    Featured Location Accordion Start
========================================*/
    if ($(".we_serve_accordion").length) {

        // Sab content hide
        $(".we_serve_accordion .content_area").hide();

        // First item open
        $(".we_serve_accordion .single_item:first .content_area").show();
        $(".we_serve_accordion .single_item:first").addClass("active");

        // Click event
        $(".we_serve_accordion .accordion_header").on("click", function () {

            if ($(this).next(".content_area").is(":visible")) {

                $(this).next(".content_area").slideUp();
                $(this).parent().removeClass("active");

            } else {

                $(".we_serve_accordion .content_area").slideUp();
                $(".we_serve_accordion .single_item").removeClass("active");

                $(this).next(".content_area").slideDown();
                $(this).parent().addClass("active");
            }
        });
    }
/*========================================
    Featured Location Accordion End
========================================*/

/*====================================
    Smart Systems JS Start
====================================*/

if ($(".category_slider").length) {

    let smartSystemSlider;

    function initSmartSlider(activeSlider) {
        if (smartSystemSlider && smartSystemSlider.destroy) {
            smartSystemSlider.destroy(true, true);
        }

        smartSystemSlider = new Swiper(activeSlider[0], {
            loop: true,
            slidesPerView: 3.8,
            spaceBetween: 1,
            autoplay: {
                delay: 2000,
            },

            pagination: {
                el: activeSlider.closest(".product_slider").find('.product_pagination')[0],
                clickable: true,
                dynamicBullets: true,
            },

            observer: true,
            observeParents: true,
            speed: 600,

            breakpoints: {
                220:  { slidesPerView: 1,   spaceBetween: 14 },
                600:  { slidesPerView: 3,   spaceBetween: 16 },
                992:  { slidesPerView: 2.5, spaceBetween: 0  },
                1200: { slidesPerView: 3 },
                1600: { slidesPerView: 3.8 },
            },

            on: {
                init() {
                    this.pagination.render();
                    this.pagination.update();
                }
            }
        });
    }

    function activateTab(targetSlide, idx) {
        document.querySelectorAll(".category_slider .swiper-slide")
            .forEach(s => s.classList.remove("on"));
        targetSlide.classList.add("on");
        muCenter(targetSlide);
        swiperContent.slideTo(idx, 300);

        const activeProductSlider = $(swiperContent.slides[idx]).find(".product_slider");
        if (activeProductSlider.length) {
            initSmartSlider(activeProductSlider);
        }
    }

    const swiperTab = new Swiper(".category_slider", {
        slidesPerView: "auto",
        freeMode: false,
        allowTouchMove: false,
        simulateTouch: false, 
        navigation: {
            nextEl: ".slider-next",
            prevEl: ".slider-prev",
        },
    });

    var swiperContent = new Swiper(".smarttab_slider", {
        slidesPerView: 1,
        allowTouchMove: false,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
    });

    let lankTitles = document.querySelectorAll(".category_slider .swiper-slide a");
    lankTitles.forEach(function (link, idx) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            activateTab(link.parentElement, idx);
        });
    });

    var prevBtn = document.querySelector('.slider-prev');
    var nextBtn = document.querySelector('.slider-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            var current = document.querySelector('.category_slider .swiper-slide.on');
            if (current && current.previousElementSibling?.classList.contains('swiper-slide')) {
                var prev = current.previousElementSibling;
                var idx  = Array.prototype.indexOf.call(prev.parentNode.children, prev);
                activateTab(prev, idx);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            var current = document.querySelector('.category_slider .swiper-slide.on');
            if (current && current.nextElementSibling?.classList.contains('swiper-slide')) {
                var next = current.nextElementSibling;
                var idx  = Array.prototype.indexOf.call(next.parentNode.children, next);
                activateTab(next, idx);
            }
        });
    }

    function muCenter(target) {
        var snbwrap   = document.querySelector(".category_slider .swiper-wrapper");
        var slides    = snbwrap.querySelectorAll(".swiper-slide");
        var box       = document.querySelector(".category_slider");
        var boxWidth  = box.offsetWidth;
        var wrapWidth = 0;
        slides.forEach(s => wrapWidth += s.offsetWidth);

        var targetLeft      = target.offsetLeft;
        var targetWidth     = target.offsetWidth;
        var selectTargetPos = targetLeft + targetWidth / 2;
        var pos;

        var prevBtn = document.querySelector(".slider-prev");
        var nextBtn = document.querySelector(".slider-next");

     
        if (prevBtn) prevBtn.classList.remove("swiper-button-disabled");
        if (nextBtn) nextBtn.classList.remove("swiper-button-disabled");


        var allSlides   = Array.from(snbwrap.querySelectorAll(".swiper-slide"));
        var activeIndex = allSlides.indexOf(target);
        var lastIndex   = allSlides.length - 1;


        if (activeIndex === 0)         prevBtn && prevBtn.classList.add("swiper-button-disabled");
        if (activeIndex === lastIndex) nextBtn && nextBtn.classList.add("swiper-button-disabled");


        if (selectTargetPos <= boxWidth / 2) {
            pos = 0;
        } else if (wrapWidth - selectTargetPos <= boxWidth / 2) {
            pos = wrapWidth - boxWidth;
        } else {
            pos = targetLeft - boxWidth / 2 + targetWidth / 2;
        }

        if (wrapWidth > boxWidth) {
            snbwrap.style.transform         = `translate3d(${pos * -1}px, 0, 0)`;
            snbwrap.style.transitionDuration = "500ms";
        } else {
            snbwrap.style.transform         = "translate3d(0, 0, 0)";
            snbwrap.style.transitionDuration = "0ms";
        }
    }


    const firstProductSlider = $(".smarttab_slider .swiper-slide-active").find(".product_slider");
    if (firstProductSlider.length) {
        initSmartSlider(firstProductSlider);
    }

}

/*====================================
    Smart Systems JS end
====================================*/

/*========================================
    Testimonials JS Start
========================================*/
/* === *** Testimonials Cnt Js Start *** === */
    var testimonialSwiper = new Swiper(".testimonials_cnt_slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,

        navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
        },

        pagination: {
            el: ".testimonials_pagination",
            clickable: true,
        },
    });
/* === *** Testimonials Cnt Js End *** === */

/* === *** Testimonials Logo Top Js Start *** === */
    var testimonialTopSwiper = new Swiper(".testimonial_logo_top_slider", {
        slidesPerView: 6,
        spaceBetween: 10,
        loop: true,
        speed: 3000,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },


        breakpoints: {
            320: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 4,
                
            },
            1200: {
                slidesPerView: 5,
            },
            1500: {
                slidesPerView: 6,
            }
        }

        
    });
/* === *** Testimonials Logo Top Js End *** === */

/* === *** Testimonials Logo Center Js Start *** === */
    var testimonialCenterSwiper = new Swiper(".testimonial_logo_center_slider", {
        slidesPerView: 6,
        spaceBetween: 10,
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 4,
                
            },
            1200: {
                slidesPerView: 5,
            },
            1500: {
                slidesPerView: 6,
            }

        }
    });
/* === *** Testimonials Logo Center Js End *** === */

/* === *** Testimonials Logo Bottom Js Start *** === */
    var testimonialBottomSwiper = new Swiper(".testimonial_logo_bottom_slider", {
        slidesPerView: 6,
        spaceBetween: 10,
        loop: true,
        speed: 3000,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },

        breakpoints: {
            320: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 4,
                
            },
            1200: {
                slidesPerView: 5,
            },
            1500: {
                slidesPerView: 6,
            }

        }
    });
/* === *** Testimonials Logo Bottom Js End *** === */
/*========================================
    Testimonials JS End
========================================*/

/*========================================
    Social Impact JS Start
========================================*/
    if ($('.social_impact_tab').length) {
        swiper = new Swiper('.social_tab_slider', {
            loop: false,
            slidesPerView: 'auto',
            allowTouchMove: true,
            spaceBetween: 10,
            centeredSlides: false,
            pagination: {
                el: ".social_tab_pagination",
                clickable: true,
            },
            breakpoints: {
                220: {
                    slidesPerView: 1,
                },

                480: {
                    slidesPerView: 'auto',
                },
            }
        });
    }
    if ($('.social_impact_tab').length) {

        function activateTab(tabId) {
            $('.social_impact_tab').removeClass('active');
            $('.social_impact_tab[data-id="' + tabId + '"]').addClass('active');

            $('.social_impact_details')
                .removeClass('tab-active')
                .hide();

            var activeTab = $('.social_impact_details[data-id="' + tabId + '"]');

            activeTab
                .css('display', 'flex')
                .hide()
                .fadeIn(300)
                .addClass('tab-active');

            setTimeout(function () {
                if (typeof splideInstances !== "undefined") {
                    splideInstances.forEach(function (splide) {
                        splide.refresh();
                    });
                }
            }, 300);
        }

        // Click event
        $('.social_impact_tab').on('click', function () {
            var tabId = $(this).data('id');
            activateTab(tabId);
        });

        var defaultTab = $('.social_impact_tab.active').data('id');

        if (!defaultTab) {
            defaultTab = $('.social_impact_tab').first().data('id');
        }

        activateTab(defaultTab);
    }
/*========================================
    Social Impact JS End
========================================*/





/*========================================
    footer acordian JS Start
========================================*/


        $(".footer_link:first").addClass("active");
        $(".footer_link:first .footer__wrapper").show();

        $(".footer_acordian_arrow").on("click", function () {

            let parent = $(this).closest(".footer_link");
            let wrapper = parent.find(".footer__wrapper");

           
            if(parent.hasClass("active")){
            return;
            }

            
            $(".footer_link").removeClass("active");
            $(".footer__wrapper").slideUp();

            parent.addClass("active");
            wrapper.stop(true, true).slideDown();

        });

    
/*========================================
   footer acordian JS End
========================================*/


})(jQuery);