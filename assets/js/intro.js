$(document).ready(function() {

    $('.scroll-down-indicator').on('click', function() {
        console.log("Click");
        // $('#start-page').addClass('closed');

        // $('#start-page').fadeOut(700);

        $('#start-page').animate({
            left: "+=100vw"
        }, 500, "swing", function() {
            console.log("Callback");
            // $(this).remove();
            // $('html').css('overflow-y', 'visible');
            // $('body').css('overflow-y', 'visible');
        })
        setTimeout(function() {
            $('#main').animate({
                left: "+=100vw"
            }, 400, "easeOutQuart", function() {

            });
        }, 300)

        // $('#start-page').children().fadeOut(300);
        // $('#start-page').children().css('opacity', '0');
        // $('#main').addClass('open');
        // $('#start-page .uncover-container').css('display', 'none');
        // $('#main').css('display', 'block');
    })

});