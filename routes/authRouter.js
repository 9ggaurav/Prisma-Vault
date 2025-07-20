const { Router } = require("express");
const { signupController, loginController } = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/signup", signupController);
authRouter.get("/login", loginController);

module.exports = authRouter