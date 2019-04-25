$(document).ready(function() {
    setUpProjectPages();
});

function setUpProjectPages() {
    // Create every project page based on the JSON
    for (var i in AllProjects) {
        let project = AllProjects[i];

        console.log(project.title);

        addProjectPage(project, i);
    }
}

function addProjectPage(project, index) {
    var page = document.createElement("div");
    var pageClasses = index % 2 == 0 ? 'project-page half-page' : 'project-page half-page right';
    page.setAttribute('class', pageClasses);
    $(page).append("<div class='project-header'>" + project.title + "</div>");
    $(page).append("<div class='project-page-img'><img src='assets/" + project.bannerImage + "'></div>")
    $(page).append("<div class='project-description'><p class='project-info'>" + project.description + "</p></div>");

    $('#project-section').append(page);
}