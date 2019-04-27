var allScreenshotSliders = [];

$(document).ready(function() {
    $('.slider-container').each(function(i) {
        var sliderContainer = $(this);
        sliderContainer.currentImgIndex = 0;
        sliderContainer.allImgs = sliderContainer.find('img');
        sliderContainer.nextImg = function() {
            // Remove active from current image
            $(this.allImgs[this.currentImgIndex]).removeClass('active');
            // Iterate current image
            if (this.currentImgIndex < this.allImgs.length - 1) {
                this.currentImgIndex ++;
            } else {
                this.currentImgIndex = 0;
            }
            // Add active to current image
            $(this.allImgs[this.currentImgIndex]).addClass('active');
        };
        sliderContainer.prevImg = function() {
            // Remove active from current image
            $(this.allImgs[this.currentImgIndex]).removeClass('active');
            // Iterate current image
            if (this.currentImgIndex > 0) {
                this.currentImgIndex--;
            } else {
                this.currentImgIndex = this.allImgs.length - 1;
            }
            // Add active to current image
            $(this.allImgs[this.currentImgIndex]).addClass('active');
        };
        
        // Find the buttons and add their onclick
        sliderContainer.find('.slider-prev-button').click(function() {
            sliderContainer.prevImg();
        });
        sliderContainer.find('.slider-next-button').click(function() {
            sliderContainer.nextImg();
        });
        // Add it to the list of sliders
        allScreenshotSliders.push(sliderContainer);
    })
});