const multer = require("multer");
const path = require("path");

// Config multer
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/images");
    },
    filename: function (req, file, cb) {
        let name = `kiennt-image-${file.fieldname}-${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, name);
    },
});

const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/files");
    },
    filename: function (req, file, cb) {
        let name = `kiennt-file-${file.fieldname}-${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, name);
    },
});

const maxSize = 1 * 1024 * 1024;

const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const imageFilter = function (req, file, cb) {
    if (!imageTypes.includes(file.mimetype)) {
        return cb(new Error(`Chỉ nhận ảnh (${imageTypes.join(", ")})`));
    }

    cb(null, true);
};

const fileTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/pdf",
];

const fileFilter = function (req, file, cb) {
    if (!fileTypes.includes(file.mimetype)) {
        return cb(new Error(`Chỉ nhận ảnh (${fileTypes.join(", ")})`));
    }

    cb(null, true);
};

const uploadImg = multer({
    storage: storageImage,
    fileFilter: imageFilter,
    limits: {
        fileSize: maxSize,
    },
});
const uploadFile = multer({
    storage: storageFile,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize,
    },
});

module.exports = {
    uploadImg,
    uploadFile,
};
