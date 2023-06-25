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
route.get("/", getList);

// Get list message in room route
route.get("/:id/messages", getListMessage);

// Create room route
route.post("/", create);

// Update room route
route.patch("/:id", update);

// Detail room route
route.get("/:id", getDetail);

// Delete room route
route.delete("/:id", remove);

module.exports = route;
