const homeController = (req, res) => {
    res.render("home")
}

const aboutController = (req, res) => {
    res.render("about");
}

const profileController = (req, res) => {
    res.render("profile")
}


module.exports = {
    homeController,
    aboutController,
    profileController
}