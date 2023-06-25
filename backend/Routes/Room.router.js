const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_service");
const {
    getList,
    getListMessage,
    create,
    update,
    getDetail,
    remove,
} = require("../Controllers/Room.controller");

// Get list room route
route.get("/", verifyAccessToken, getList);

// Get list message in room route
route.get("/:id/messages", verifyAccessToken, getListMessage);

// Create room route
route.post("/", verifyAccessToken, create);

// Update room route
route.patch("/:id", verifyAccessToken, update);

// Detail room route
route.get("/:id", verifyAccessToken, getDetail);

// Delete room route
route.delete("/:id", verifyAccessToken, remove);

module.exports = route;
