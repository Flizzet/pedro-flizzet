var allPages = [];

$(document).ready(function() {
    setUpProjectPages();
});

function setUpProjectPages() {
    // Create every project page based on the JSON
    for (var i in AllProjects) {
        let project = AllProjects[i];

        addProjectPage(project, i);
    }
}

function addProjectPage(project, index) {
    // Create page div
    var page = document.createElement("div");
    var pageClasses = index % 2 == 0 ? 'project-page half-page' : 'project-page half-page right';
    page.setAttribute('class', pageClasses);
    // Add elements
    $(page).append("<div class='project-header'>" + project.title + "</div>");
    $(page).append("<div class='project-page-img'><img src='assets/" + project.imageFolder + "bannerimg.png'></div>")
    $(page).append("<div class='project-description'><p class='project-info'>" + project.shortDesc + "</p></div>");

    // Add click to page
    $(page).click(function() {
        pageClicked(page, project);
    });

    // Add new page to page array
    allPages.push(page)
    
    // Add new page to DOM
    $('#project-section').append(page);
}

function pageClicked(page, projectObject) {
    console.log("Clicked " + projectObject.title);

    // Remove active class from all project pages
    for (var i in allPages) {
        let p = $(allPages[i]);
        if (p.hasClass('active')) {
            p.removeClass('active');
        }
    }

    // Apply active class
    $(page).addClass('active');
}