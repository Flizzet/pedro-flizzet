var allScreenshotsLoadBools = [];

function getProjectScreenshots(project) {
    let allScreenshots = "";
    for (var i = 1; i < project.totalScreenshots; i++) {
        var screenshotURL = "assets/" + project.imageFolder + "screenshots/" + i + ".png";
        let imageSlide = 
            `<li data-thumb="` + screenshotURL + `" data-src="` + screenshotURL + `">
                <img src="` + screenshotURL + `">
            </li>`
        allScreenshots = allScreenshots + imageSlide;

        allScreenshotLoadBools.push(false);
    }
    
    return allScreenshots;
}

function setUpScreenshots() {
    $(".screenshotslider").lightSlider({
        gallery: true,
        speed: 400,
        enableSwipe: false,
        enableDrag: false,
        item: 1,
        centerSlide: true,
        currentPagerPosition: 'middle',
    });
}