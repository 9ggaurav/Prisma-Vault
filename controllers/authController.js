const { validationResult } = require("express-validator");
const { getUserByEmail } = require("../services/queries");
const { hashPassword } = require("../utils/hash");
const { insertNewUser } = require("../services/queries");
const {
  validateUserRegister,
  validateUserLogin,
} = require("../utils/validation");

const signupControllerGet = (req, res) => {
  res.render("signup", {
    errors: [],
    user: req.user
  });
};


const loginControllerGet = (req, res) => {
  res.render("login", {
    errors: [],
    user: req.user
  });
};

const loginControllerPost = [
  validateUserLogin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("login", {
        errors: errors.array(),
        user: req.user
      });
    }
    const { email, password } = req.body;
    console.log(`email : ${email} | password : ${password}`);
    let userInDb = await getUserByEmail(email);
    if (userInDb) {
      console.log(userInDb.password);
    } else {
      console.log("User not found");
    }
    res.render("login");
  },
];

const signupControllerPost = [
    validateUserRegister,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).render("signup", {
                errors: errors.array(),
                user: req.user
            })
        }
        let {username, email, password1} = req.body;
        password = await hashPassword(password1);
        await insertNewUser(username, email, password);
        console.log(`username: ${username} | email: ${email} | password: ${password}`);
        res.redirect("login");
    }
]

module.exports = {
  signupControllerGet,
  loginControllerGet,
  loginControllerPost,
  signupControllerPost,
};
