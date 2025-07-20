const { Router } = require("express");
const { profileController } = require("../controllers/publicController");

const privateRouter = Router();

privateRouter.get("/", profileController)

module.exports = privateRouter;