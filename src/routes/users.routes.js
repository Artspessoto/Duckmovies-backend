const { Router } = require("express");

const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post("/", usersController.create);
userRoutes.put('/', ensureAuthenticated, usersController.update);

module.exports = userRoutes;
