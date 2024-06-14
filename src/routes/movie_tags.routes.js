const { Router } = require("express");

const Movie_tagsController = require("../controllers/Movie_tagsController");
const movie_tagsController = new Movie_tagsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movie_tagsRoutes = Router();

movie_tagsRoutes.use(ensureAuthenticated);
movie_tagsRoutes.get("/", movie_tagsController.index);

module.exports = movie_tagsRoutes;
