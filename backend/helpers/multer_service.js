const multer = require("multer");
const path = require("path");

// Config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        let name = `kiennt-${file.fieldname}-${Date.now()}-${Math.round(
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
        return cb(new Error(`Chỉ nhận tệp (${fileTypes.join(", ")})`));
    }

    cb(null, true);
};

const uploadImg = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: maxSize,
    },
});
const uploadFile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize,
    },
});

module.exports = {
    uploadImg,
    uploadFile,
};
