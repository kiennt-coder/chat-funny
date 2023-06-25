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
                data: messages,
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
                    message: "Cannot find by id!",
                    data: detailMessage,
                });
            }

            return res.json({
                status: 200,
                data: detailMessage,
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
                    message: "Validate faild!",
                    data: error.details[0].message,
                });
            }

            // Create room model
            const message = new Message(req.body);

            // Save room in db
            const savedMessage = await message.save();

            if (!savedMessage) {
                throw createError({
                    message: "Cannot save! meesage!",
                    data: savedMessage,
                });
            }

            return res.json({
                status: 200,
                data: savedMessage,
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
                    message: "Validate failed!",
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
                    message: "Update failed!",
                    data: updatedMessage,
                });
            }

            return res.json({
                status: 200,
                data: updatedMessage,
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
                    message: "Not find with id!",
                    data: removedMessage,
                });

            return res.json({
                status: 200,
                data: removedMessage,
            });
        } catch (error) {
            next(error);
        }
    },
};
