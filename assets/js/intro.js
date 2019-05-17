var introClosed = false;
var stretchStrength = 0.02;

$(document).ready(function() {

    // Moving left half horizontally on mouse movement
    $('#start-page .main-page').mousemove(function(event) {
        stretchLeftHalf(event);
    });

    // Closing intro & opening main page on scrolldown or button click
    $('.scroll-down-indicator').on('click', closeIntro);

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
    var leftHalf = $('#start-page .main-page .left-half');
    // Get difference between mouse and leftHalf
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
        'margin-left': stretchAmt * 0.4
    })
}
