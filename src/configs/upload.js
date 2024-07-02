const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const {fileFilter} = require("./fileFilter");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");


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
