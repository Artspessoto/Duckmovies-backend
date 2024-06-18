const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController");
const movieTagsController = new MovieTagsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieTagsRoutes = Router();

movieTagsRoutes.use(ensureAuthenticated);
movieTagsRoutes.get("/", movieTagsController.index);

module.exports = movieTagsRoutes;
