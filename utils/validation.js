const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { getUserByEmail } = require("../services/queries");

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 50 characters";
const emailErr = "Email must be in proper format";

const validateUserRegister = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`First name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .custom(async (email) => {
      const existing = await getUserByEmail(email);
      if (existing) {
        throw new Error(`Email ${email} already registered! Please use another email.`);
      } else {
        console.log("email valid as not already registered");
        return true;
      }
    }),
  body("password1").trim()
    .isLength({min: 6}).withMessage("Password must be atleast 6 characters long"),
  body("password2").trim()
    .custom(async (value, {req}) => {
        if (value !== req.body.password1) {
            throw new Error("Password do not match");
        }
        return true
    })

];

const validateUserLogin = [
     body("email").trim()
        .isEmail().withMessage("Invalid email"),
    body("password").trim()
        .isLength({min: 6}).withMessage("Password must be at least 6 character long")
]

module.exports = { 
    validateUserLogin, 
    validateUserRegister
}
