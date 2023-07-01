const createError = require("http-errors");
const { Message } = require("../Models/Message.model");
const { messageValidate } = require("../helpers/validation");

module.exports = {
    // Get list
    getList: async (req, res, next) => {
        try {
            const messages = await Message.find().populate(
                "files",
                "name url text"
            );

            return res.json({
                status: 200,
                data: { messages },
                message: "Lấy danh sách thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Detail
    getDetail: async (req, res, next) => {
        try {
            const { id } = req.params;

            const detailMessage = await Message.findById(id).populate(
                "files",
                "name url text"
            );

            if (!detailMessage) {
                throw createError({
                    message: "Không tìm thấy!",
                    data: detailMessage,
                });
            }

            return res.json({
                status: 200,
                data: { detailMessage },
                message: "Lấy thông tin thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Create
    create: async (req, res, next) => {
        try {
            //Validate data
            const { error } = messageValidate(req.body);

            if (error) {
                throw createError({
                    message: "Xác thực thất bại!",
                    data: error.details[0].message,
                });
            }

            // Create room model
            const message = new Message(req.body);

            // Save room in db
            const savedMessage = await message.save();

            if (!savedMessage) {
                throw createError({
                    message: "Thêm mới thất bại!",
                    data: savedMessage,
                });
            }

            return res.json({
                status: 200,
                data: { savedMessage },
                message: "Thêm mới thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Update
    update: async (req, res, next) => {
        try {
            const { id } = req.params;

            const { error } = messageValidate(req.body);

            if (error) {
                throw createError({
                    message: "Xác thực thất bại!",
                    data: error.details[0].message,
                });
            }

            const updatedMessage = await Message.findByIdAndUpdate(
                id,
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            );

            if (!updatedMessage) {
                throw createError({
                    message: "Cập nhật thất bại!",
                    data: updatedMessage,
                });
            }

            return res.json({
                status: 200,
                data: { updatedMessage },
                message: "Cập nhật thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Remove
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;

            const removedMessage = await Message.findByIdAndDelete(id);

            if (!removedMessage)
                throw createError({
                    message: "Không tìm thấy!",
                    data: removedMessage,
                });

            return res.json({
                status: 200,
                data: { removedMessage },
                message: "Xóa thành công!",
            });
        } catch (error) {
            next(error);
        }
    },
};
