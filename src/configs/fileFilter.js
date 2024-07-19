const path = require("path");
const AppError = require("../utils/AppError");

const ALLOWED_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif"];

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(extname)) return cb(null, true);
    cb(new AppError("Apenas imagens com extensão jpeg, jpg, png ou gif são permitidas.", 400));
};

module.exports = fileFilter;
