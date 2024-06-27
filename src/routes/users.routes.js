const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersController = new UsersController();

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

userRoutes.post("/", usersController.create);
userRoutes.put('/', ensureAuthenticated, usersController.update);

userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (req, res) => {
    console.log(req.file.filename)
});

module.exports = userRoutes;
