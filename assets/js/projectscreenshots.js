$(document).ready(function() {
    $(".screenshotslider").lightSlider({
        gallery: true,
        speed: 400,
        enableSwipe: false,
        enableDrag: false,
        // slideMargin: 0,
        item: 1,
        // thumbItem: 12,
        // easing: 'cubic-bezier(0, 0.9, 0.5, 1.2)',
        // cssEasing: 'cubic-bezier(0, 0.9, 0.5, 1.2)',
        centerSlide: true,
        currentPagerPosition: 'middle',
        responsive : [
            {
                breakpoint:800,
                settings: {
                    slideMove: 1,
                    slideMargin: 6,
                }
            },
            {
                breakpoint:480,
                settings: {
                    slideMove: 1
                }
            }
        ],
        onSliderLoad: function(el) {
            // $('#autoWidth').removeClass('cS-hidden');
            el.lightGallery({
                // selector: '#ammoinfernoscreenshotslider .lslide'
            });
        }
    });

    // $("#lightgallery").lightGallery(); 
});