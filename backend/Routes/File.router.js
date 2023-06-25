const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_service");
const {
    getList,
    create,
    update,
    getDetail,
    remove,
} = require("../Controllers/File.controller");

// Get list file route
route.get("/", verifyAccessToken, getList);

// Create file route
route.post("/", verifyAccessToken, create);

// Update file route
route.patch("/:id", verifyAccessToken, update);

// Detail file route
route.get("/:id", verifyAccessToken, getDetail);

// Delete file route
route.delete("/:id", verifyAccessToken, remove);

module.exports = route;
