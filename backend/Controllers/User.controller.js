const createError = require("http-errors");
const { User } = require("../Models/User.model");
const { userValidate } = require("../helpers/validation");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_service");

module.exports = {
    // Register
    register: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            // Validate data
            const { error } = userValidate(req.body);

            if (error) {
                throw createError.Unauthorized(error.details[0].message);
            }

            // Check user is exists
            const isExists = await User.findOne({
                username,
            });

            if (isExists) {
                throw createError.Conflict(
                    `${username} đã tồn tại!`
                );
            }

            // Create user model
            const user = new User({
                username,
                password,
            });

            // Save user in db
            const savedUser = await user.save();

            return res.json({
                status: 200,
                data: savedUser,
                message: "Đăng ký thành công!"
            });
        } catch (error) {
            next(error);
        }
    },
    // Refresh token
    refreshToken: async (req, res, next) => {
        try {
            const { userId } = req.payload;

            if (!userId) {
                throw createError.BadRequest();
            }

            const accessToken = await signAccessToken(userId);
            const refToken = await signRefreshToken(userId);

            return res.json({
                status: 200,
                data: {
                    accessToken,
                    refreshToken: refToken,
                },
                message: "Làm mới token thành công!"
            });
        } catch (error) {
            next(error);
        }
    },
    // Login
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            // Validate data
            const { error } = userValidate(req.body);

            if (error) {
                throw createError.Unauthorized(error.details[0].message);
            }

            // Find user follow username in DB
            const user = await User.findOne({ username });

            // Check user alrealy exists
            if (!user) {
                throw createError.Unauthorized("Tài khoản không tồn tại!");
            }

            // Check password is correct
            const isCorrectPassword = await user.isCorrectPassword(password);

            if (!isCorrectPassword) {
                throw createError.Unauthorized("Mật khẩu sai!");
            }

            // Create access token
            const accessToken = await signAccessToken(user._id);
            // Create refresh token
            const refreshToken = await signRefreshToken(user._id);

            return res.json({
                status: 200,
                data: {
                    user,
                    accessToken,
                    refreshToken,
                },
                message: "Đăng nhập thành công!"
            });
        } catch (error) {
            next(error);
        }
    },
    // Logout
    logout: (req, res, next) => {
        try {
            res.send("Logout success!");
        } catch (error) {
            next(error);
        }
    },
    // Get list
    getList: async (req, res, next) => {
        try {
            const users = await User.find();

            if (!users) {
                throw createError({
                    message: "Cannot find user",
                    data: users,
                });
            }

            return res.json({
                status: 200,
                data: users,
                message: "Lấy danh sách thành công!"
            });
        } catch (error) {
            next(error);
        }
    },
    // Update user
    update: async (req, res, next) => {
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            );

            return res.json({
                status: 200,
                data: updateUser,
                message: "Cập nhật tài khoản thành công!"
            });
        } catch (error) {
            next(error);
        }
    },
};
