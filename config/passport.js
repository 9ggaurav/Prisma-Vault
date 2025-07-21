const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { comparePasswords } = require("../utils/hash");
const { getUserByEmail } = require("../services/queries");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return done(null, false, { message: "Incorrect email"});
        }

        console.log("users from db. (from config/passport.js) ", user);
        const match = await comparePasswords(password, user.password);
        if (!match) {
            return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
})