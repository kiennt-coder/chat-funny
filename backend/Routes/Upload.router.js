const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_service");
const {
    uploadImages,
    uploadFiles,
} = require("../Controllers/Upload.controller");
const { uploadImg, uploadFile } = require("../helpers/multer_service");

// Upload image route
route.post(
    "/images",
    verifyAccessToken,
    uploadImg.array("images", 10),
    uploadImages
);

// Upload file route
route.post("/files", uploadFile.array("files", 5), uploadFiles);

module.exports = route;
