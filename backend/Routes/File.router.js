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
route.get("/", getList);

// Create file route
route.post("/", create);

// Update file route
route.patch("/:id", update);

// Detail file route
route.get("/:id", getDetail);

// Delete file route
route.delete("/:id", remove);

module.exports = route;
