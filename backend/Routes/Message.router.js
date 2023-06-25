const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_service");
const {
    getList,
    create,
    update,
    getDetail,
    remove,
} = require("../Controllers/Message.controller");

// Get list message route
route.get("/", verifyAccessToken, getList);

// Create message route
route.post("/", verifyAccessToken, create);

// Update message route
route.patch("/:id", verifyAccessToken, update);

// Detail message route
route.get("/:id", verifyAccessToken, getDetail);

// Delete message route
route.delete("/:id", verifyAccessToken, remove);

module.exports = route;
