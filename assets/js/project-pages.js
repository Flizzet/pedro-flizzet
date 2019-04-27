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
        </p><img class='mockup' src='assets/` + project.imageFolder + `mockup.png'>
        <div class="detail-tabs container">
            <div class="tab-slider--nav">
                <ul class="tab-slider--tabs">
                    <li class="tab-slider--trigger active" rel="development` + project.codename + `">
                        <p>Development</p>
                        <i class="fas fa-code tab-subicon"></i>
                    </li>
                    <li class="tab-slider--trigger" rel="design` + project.codename + `">
                        <p>Design</p>
                        <i class="fas fa-paint-brush tab-subicon"></i>
                    </li>
                    <li class="tab-slider--trigger" rel="distribution` + project.codename + `">
                        <p>Distribution</p>
                        <i class="fas fa-road tab-subicon"></i>
                    </li>
                    <li class="tab-slider--trigger" rel="platforms` + project.codename + `">
                        <p>Platforms</p>
                        <i class="fas fa-tablet-alt tab-subicon"></i>
                    </li>
                </ul>
            </div>

            <div class="tab-slider--container">
                <div id="development` + project.codename + `" class="tab-slider--body">
                    <h2>Development</h2>
                    <p>`
                        + project.developmentDetail +
                    `</p>
                </div>
                <div id="design` + project.codename + `" class="tab-slider--body">
                    <h2>Design</h2>
                    <p>`
                        + project.designDetail +
                    `</p>
                </div>
                <div id="distribution` + project.codename + `" class="tab-slider--body">
                    <h2>Distribution</h2>
                    <p>`
                        + project.distributionDetail +
                    `</p>
                </div>
                <div id="platforms` + project.codename + `" class="tab-slider--body">
                    <h2>Platforms</h2>
                    <p>`
                        + project.platformsDetail +
                    `</p>
                </div>
            </div>
        </div>
        <div class="full-page"></div>`
    );

    // Add elements
    $(page).append("<div class='project-header'>" + project.title + "</div>");
    $(page).append("<div class='project-page-img'><img src='assets/" + project.imageFolder + "bannerimg.png'></div>")
    $(page).append("<div class='project-description'><p class='project-info'>" + project.shortDesc + "</p></div>");
    $(page).append(fullInfo);
    $(page).append("<div class='close-button' onclick='closeAllProjectPages()'><span class='close-text'><h4>Close project</h4></span><i class='fas fa-times'></i></div>")

    // Add click to page
    $(page).click(function() {
        if (!projectPageOpen) {
            pageClicked(page, project);
        }
    });

    // Add new page to page array
    allPages.push(page)
    
    // Add new page to DOM
    $('#project-section').append(page);

    // Enable new tabs and their required listeners
    $(".tab-slider--body").hide();
    $(".tab-slider--body:first").show();

    $(".tab-slider--nav li").click(function() {
        $(".tab-slider--body").fadeOut(200);

        // Assign the active tab and fade in its content
        var activeTab = $(this).attr("rel");
        setTimeout(function() {
            $("#" + activeTab).fadeIn(200);
        }, 250);

        // Remove active from old tab
        $(".tab-slider--nav li").removeClass("active");

        // Add active to new tab
        $(this).addClass("active");
    });
    
    // Fade in first tab
    $("#" + $(".tab-slider--nav li").attr("rel")).fadeIn();
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
        // $("#" + $(".tab-slider--nav li").attr("rel")).fadeIn();
        $("#" + ($(page).find('.tab-slider--nav li').attr("rel"))).fadeIn();
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
    setTimeout(function() {
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