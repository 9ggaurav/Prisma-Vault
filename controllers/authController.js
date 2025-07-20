const signupController = (req, res) => {
    res.render("signup")
}

const loginController = (req, res) => {
    res.render("login")
}

module.exports = {
    signupController,
    loginController
}