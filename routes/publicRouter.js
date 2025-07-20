const { Router } = require('express');
const publicRouter = Router();

const { homeController, aboutController } = require("../controllers/publicController");

publicRouter.get("/", homeController)

publicRouter.get("/about", aboutController)

module.exports = publicRouter;