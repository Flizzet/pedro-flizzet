function addProjectPage(project, index) {
    // Create page div
    var page = document.createElement("div");
    var pageClasses = index % 2 == 0 ? 'project-page half-page scrollto-page' : 'project-page half-page scrollto-page right';

    // Add classes to page
    page.setAttribute('class', pageClasses);
    // Create screenshots string
    var allScreenshots = "";
    for (var i = 1; i < project.totalScreenshots; i++) {
        let imageSlide = "<li>\n<div class='slides'>\n<img src='assets/" + project.imageFolder + "screenshots/" + i + ".png'>\n</div>\n</li>\n";
        allScreenshots = allScreenshots + imageSlide;
    }
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
        <div class="screenshot-container">
            <h1 class="screenshots-header">Screenshots</h1>
            <div class="container">
                <div class="screenshot-background"></div>
                <ul class="screenshotslider" id="` + project.codename + `screenshots">
                    ` + getProjectScreenshots(project) + `
                </ul>
            </div>
        </div>
        <div class="special-description-1 special-description">
            <h1 class="special-description-header">
                Special Description 1
            </h1>
            <p class="special-description-paragraph>
            This is a special description. Lorem ipsum dookie cheesesteak nuts. Lorem cheese booty nuts.
            </p>
            <hr>
        </div>
        `
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