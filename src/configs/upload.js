const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const AppError = require("../utils/AppError");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const ALLOWED_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif"];

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.includes(extname)) return cb(null, true);
  cb(new AppError("Apenas imagens com extensão jpeg, jpg, png ou gif são permitidas.", 401));
};

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
  fileFilter,
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
