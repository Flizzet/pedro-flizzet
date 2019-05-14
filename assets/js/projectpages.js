var allPages = [];
var lastScroll = 0;
var projectPageOpen = false;
var scrollDisableElements = [
    $('body'), $('#main'), $('html')
]

$(document).ready(function() {
    setUpProjectPages();
});

function setUpProjectPages() {
    // Create every project page based on the JSON
    for (var i in AllProjects) {
        let project = AllProjects[i];

        addProjectPage(project, i);
    }

    for (var i in allPages) {
        if (i == 0) {
            // pageClicked(allPages[i], AllProjects[i]);
        }
    }
}

function pageClicked(page, projectObject) {
    projectPageOpen = true;

    // Set up screenshots
    setUpScreenshots(projectObject);

    // Assign all page CSS
    for (var i in allPages) {
        // Remove active class from all project pages
        let p = $(allPages[i]);
        if (p.hasClass('active')) {
            p.removeClass('active');
        }

        // Reset/show project section header
        $('#project-section .projects-section-header').css(
            'opacity', '1.0'
        );

        // Show all headers
        $(p).find('.project-header').css('opacity', 1);

        // Hide other project headers so they don't show in expanded page
        if (i != allPages.indexOf(page)) {
            $(p).find('.project-header').css('opacity', '0');
        }

        // Hide project section header if the first project is clicked
        if (page == allPages[0]) {
            $('#project-section .projects-section-header').css(
                'opacity', '0'
            )
        }

        // Fade in first detail tab
        $("#" + ($(page).find('.tab-slider--nav li').attr("rel"))).fadeIn();
    }

    // Apply active class to page
    $(page).addClass('active');
    let maxImgHeight = window.innerHeight / 2;

    // Reset image height and info height if scrolled to the top
    $(page).find('.project-page-img').css({
        'height': maxImgHeight,
    });
    $(page).find('.project-full-info').css('height', '45%');

    // Apply scrolling effect to page
    $('.project-page.active .project-full-info').scroll(
        function(e) {
            let scrollAmt = $(this).scrollTop();
            let projectImg = $('.project-page.active .project-page-img');
            let maxImgHeight = $('.project-page.active').height() / 2;

            if (scrollAmt == 0) {
                // Reset image height and info height if scrolled to the top
                projectImg.css({
                    'height': maxImgHeight,
                });
                $(this).css('height', '50%');
                // Rebrighten image by increasing opacity
                projectImg.find('img').css('opacity', 1.0);
                // Darken mockup
                $(this).find('.mockup').removeClass('active');
            } else {
                // Minimize image height and increase info height if scrolling down
                $('.project-page.active .project-header').css({
                    'transform': 'none',
                    'animation': 'project-page-title-reset 0.5s forwards',
                });
                projectImg.css({
                    'height': '10%',
                });
                // Dark image by decrease opacity
                projectImg.find('img').css('opacity', 0.4);
                // Brighten mockup
                $(this).find('.mockup').addClass('active');
                // Set new big size on project info
                $(this).css('height', '90%');
            }
        }
    )

    // Remove overflow from all required scrolling elements
    for (var i in scrollDisableElements) {
        scrollDisableElements[i].css('overflow', 'hidden');
    }
    $(page).css('overflow', 'hidden');

    // Scroll to the newly expanded page
    $(window).scrollTo(page, 1000, {
        easing: 'easeInOutQuint'
    });
}

function closeAllProjectPages() {
    destroyCurrentSlider();

    setTimeout(function() {
        for (var i in allPages) {
            // Remove active class from all project pages
            let p = $(allPages[i]);
            if (p.hasClass('active')) {
                p.find('.project-page-img').css({
                    'height': '100%'
                })
                p.find('.project-page-img img').css({
                    'opacity': '1.0'
                })
                p.removeClass('active');
            }

            // Reset/show project section header
            $('#project-section .projects-section-header').css(
                'opacity', '1.0'
            );
            
            // Re-enable overflow
            $(p).css('overflow', 'visible');

            // Show all headers
            $(p).find('.project-header').css('opacity', 1);
        }

        projectPageOpen = false;

        for (var i in scrollDisableElements) {
            let e = scrollDisableElements[i];

            if (e.css('overflow') == 'hidden') {
                e.css({
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden'
                })
            }
        }
    }, 100);
}