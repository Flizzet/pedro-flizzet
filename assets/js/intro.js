var introClosed = false;
var stretchStrength = 0.02;
var introScrollAmt = 0;

$(document).ready(function() {

    // Moving left half horizontally on mouse movement
    $(window).mousemove(function(event) {
        stretchLeftHalf(event);
        stretchRightHalf(event);
    });

    // Closing intro & opening main page on scrolldown or button click
    $('.scroll-down-indicator').on('click', closeIntro);

    // Listen for scrolling, increment scrolling down to close functionality
    document.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
            introScrollAmt += (e.deltaY / 15);
            var newHeightPercentage = 70 - introScrollAmt;
            if (newHeightPercentage <= 0) {
                $('#start-page .intro-header .border-piece').css('height', 0 + "px");    
                closeIntro();
            } else {
                $('#start-page .intro-header .border-piece').css('height', newHeightPercentage + "%");
                $('#start-page .intro-header h1 .period').css('padding-left', (introScrollAmt * 2) + 10 + "px");
            }
        }
    });

    closeIntro();

});

function closeIntro() {
    if (introClosed) return;

    introClosed = true;

    // Close intro page
    $('#start-page').animate({
        left: "+=100vw"
    }, 500, "swing", function() {
        // Intro page finished swiping away
    });
    // Opem main page
    setTimeout(function() {
        $('#main').animate({
            left: "+=100vw"
        }, 400, "easeOutQuart", function() {
            // Main page finished swiping in
        });
    }, 300);

}

function stretchLeftHalf(mouseData) {
    // Get difference between mouse and leftHalf
    var leftHalf = $('#start-page .main-page .left-half');
    var mouseDistance = mouseData.pageX - leftHalf.offset().left;
    var stretchAmt = mouseDistance * stretchStrength;
    
    // Apply newly found stretch to left half
    leftHalf.css({
        'margin-left': stretchAmt,
    });
    leftHalf.find($('.scroll-down-indicator')).css({
        'margin-left': stretchAmt * 1.15
    })
    leftHalf.find($('.intro-socials')).css({
        'margin-left': -stretchAmt * 0.2
    })
}

function stretchRightHalf(mouseData) {
    // Get difference between mouse and rightHalf
    var rightHalf = $('#start-page .main-page .right-half');
    var rightHalfRightSide = $('#start-page .main-page').offset().left + $('#start-page .main-page').width();
    var mouseDistance = mouseData.pageX - rightHalfRightSide;
    stretchAmt = mouseDistance * stretchStrength;

    // Find extending box shadow values for right half
    var baseShadowXOffset = -20;
    var newShadowXOffset = baseShadowXOffset * (stretchAmt * 0.04) - 40;
    var newBoxShadow = newShadowXOffset + "px 0px 0px rgba(0, 0, 0, 0.2)";

    // Apply newly found stretch and box shadow to right half
    rightHalf.css({
        'margin-left': stretchAmt * 1.3,
        'box-shadow': newBoxShadow
    })

}