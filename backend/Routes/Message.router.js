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
route.get("/", getList);

// Create message route
route.post("/", create);

// Update message route
route.patch("/:id", update);

// Detail message route
route.get("/:id", getDetail);

// Delete message route
route.delete("/:id", remove);

module.exports = route;
