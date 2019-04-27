var allPages = [];
var lastScroll = 0;
var projectPageOpen = false;
var scrollDisableElements = [
    $('body'), $('#main'), $('html')
]

$(document).ready(function() {
    setUpProjectPages();

    $.scrollTo(100);
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

function addProjectPage(project, index) {
    // Create page div
    var page = document.createElement("div");
    var pageClasses = index % 2 == 0 ? 'project-page half-page' : 'project-page half-page right';

    // Add classes to page
    page.setAttribute('class', pageClasses);
    // Create full project info element
    var fullInfo = document.createElement("div");
    fullInfo.setAttribute('class', 'project-full-info');
    $(fullInfo).html(
        `<p class='full-description'>
            ` + project.description + `
        </p><img class='mockup' src='assets/` + project.imageFolder + `mockup.png'>`
    );

    // Add elements
    $(page).append("<div class='project-header'>" + project.title + "</div>");
    $(page).append("<div class='project-page-img'><img src='assets/" + project.imageFolder + "bannerimg.png'></div>")
    $(page).append("<div class='project-description'><p class='project-info'>" + project.shortDesc + "</p></div>");
    $(page).append(fullInfo);
    $(page).append("<div class='close-button' onclick='closeAllProjectPages()'><span class='close-text'><h4>Close project</h4></span><i class='fas fa-times'></i></div>")

    // Add click to page
    $(page).click(function() {
        console.log ($(page).hasClass('active'));
        if (!projectPageOpen) {
            pageClicked(page, project);
        }
    });

    // Add new page to page array
    allPages.push(page)
    
    // Add new page to DOM
    $('#project-section').append(page);
}

function pageClicked(page, projectObject) {
    projectPageOpen = true;

    for (var i in allPages) {
        // Remove active class from all project pages
        let p = $(allPages[i]);
        if (p.hasClass('active')) {
            p.removeClass('active');
        }

        // Reset/show project section header
        $('#project-section .project-section-header').css(
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
    }

    // Apply active class to page
    $(page).addClass('active');

    // Apply scrolling effect to page
    $('.project-page.active .project-full-info').scroll(
        function(e) {
            let scrollAmt = $(this).scrollTop();
            let projectImg = $('.project-page.active .project-page-img');
            let maxImgHeight = $('.project-page.active').height() / 2;
            let minInfoHeight = $('.project-page.active').height() * 0.4;

            if (scrollAmt == 0) {
                // Minimize image height and increase info height if scrolling down
                projectImg.css({
                    'height': maxImgHeight,
                    'filter': 'brightness(1.0) blur(0px)'
                });
                projectImg.find('img').css(
                    'filter', 'blur(0px)'
                )
                $(this).css('height', minInfoHeight);
                $(this).css(
                    'height', '50%'
                )
            } else {
                // Reset image height and info height if scrolled to the top
                $('.project-page.active .project-header').css({
                    'transform': 'none',
                    'animation': 'project-page-title-reset 0.5s forwards',
                });
                projectImg.css({
                    'height': '10%',
                    'filter': 'brightness(0.25)'
                });
                projectImg.find('img').css(
                    'filter', 'blur(5px)'
                )
                $(this).css(
                    'height', '90%'
                )
            }
        }
    )

    // Remove overflow from all required scrolling elements
    for (var i in scrollDisableElements) {
        scrollDisableElements[i].css('overflow', 'hidden');
    }

    // Scroll to the newly expanded page
    $(window).scrollTo(page, 1000, {
        easing: 'easeInOutQuint'
    });
}

function closeAllProjectPages() {
    console.log("closed all");
    setTimeout(function() {
        for (var i in allPages) {
            // Remove active class from all project pages
            let p = $(allPages[i]);
            if (p.hasClass('active')) {
                p.removeClass('active');
            }

            // Reset/show project section header
            $('#project-section .project-section-header').css(
                'opacity', '1.0'
            );

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