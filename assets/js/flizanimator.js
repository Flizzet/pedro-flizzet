var AnimPages = {
    ABOUT: 0,
    VALUES: 1,
    SKILLS: 2,
    CONTACT: 3
}

var FlizAnimator = {
    animate: function(page) {
        switch (page) {
            case AnimPages.ABOUT:
                this.animateAboutPage();
            break;
            case AnimPages.VALUES:
                this.animateValuesPage();
            break;
            case AnimPages.SKILLS:
                this.animateSkillsPage();
            break;
            case AnimPages.CONTACT:
                this.animateContactPage();
            break;
        }
    },

    animateAboutPage: function() {
        console.log("Animating about page");
        $('#about').addClass('active');
    },

    animateValuesPage: function() {
    
    },
    
    animateSkillsPage: function () {
    
    },
    
    animateContactPage: function() {
    
    }
}

