var currentSlider = undefined;

function getProjectScreenshots(project) {
    let allScreenshots = "";
    for (var i = 1; i < project.totalScreenshots + 1; i++) {
        var screenshotURL = "assets/" + project.imageFolder + "screenshots/" + i + ".png";
        let imageSlide = 
            `<li data-thumb="` + screenshotURL + `" data-src="` + screenshotURL + `">
                <img src="` + screenshotURL + `">
            </li>`
        allScreenshots = allScreenshots + imageSlide;
    }

    return allScreenshots;
}

function setUpScreenshots(project) {
    let sliderId = project.codename + "screenshots"
    currentSlider = $("#" + sliderId).lightSlider({
        gallery: true,
        speed: 400,
        // enableSwipe: false,
        // enableDrag: false,
        item: 1,
        centerSlide: true,
        currentPagerPosition: 'middle'
    });
}

function destroyCurrentSlider() {
    if (currentSlider) {
        currentSlider.destroy();
    }
}