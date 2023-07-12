const express = require("express");
const route = express.Router();
const {
    verifyAccessToken,
    vefiryRefreshToken,
} = require("../helpers/jwt_service");
const {
    register,
    refreshToken,
    login,
    logout,
    getList,
    update,
    getDetail,
    getRooms,
} = require("../Controllers/User.controller");

// Get list user route
route.get("/", verifyAccessToken, getList);

// Get detail user route
route.get("/:id", verifyAccessToken, getDetail);

// Register user route
route.post("/register", register);

// Refresh token route
route.post("/refresh-token", vefiryRefreshToken, refreshToken);

// Login route
route.post("/login", login);

// Update user route
route.patch("/:id", verifyAccessToken, update);

// List room of users
route.get("/:id/rooms", verifyAccessToken, getRooms);

// Logout route
route.post("/logout", vefiryRefreshToken, logout);

module.exports = route;
