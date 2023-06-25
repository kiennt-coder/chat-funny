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
} = require("../Controllers/User.controller");

// Get list user route
route.get("/", getList);

// Register user route
route.post("/register", register);

// Refresh token route
route.post("/refresh-token", vefiryRefreshToken, refreshToken);

// Login route
route.post("/login", login);

// Update user route
route.patch("/:id", verifyAccessToken, update);

// Logout route
route.post("/logout", vefiryRefreshToken, logout);

module.exports = route;
