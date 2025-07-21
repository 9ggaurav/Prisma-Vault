const { Router } = require("express");
const { signupControllerGet, loginControllerGet, loginControllerPost, signupControllerPost } = require("../controllers/authController");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/signup", signupControllerGet);
authRouter.get("/login", loginControllerGet);
authRouter.post("/login", passport.authenticate('local', { failureRedirect: "/auth/login", successRedirect: "/"}));
authRouter.post("/signup", signupControllerPost);

authRouter.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});

module.exports = authRouter