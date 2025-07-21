const { use } = require("passport");

const homeController = (req, res) => {
    res.render("home", {
        user: req.user
    });
}

const aboutController = (req, res) => {
    res.render("about", {
        user: req.user
    });
}

const profileController = (req, res) => {
    res.render("profile")
}


module.exports = {
    homeController,
    aboutController,
    profileController
}