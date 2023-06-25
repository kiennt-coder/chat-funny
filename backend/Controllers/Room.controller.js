const createError = require("http-errors");
const { Room } = require("../Models/Room.model");
const { Message } = require("../Models/Message.model");
const { roomValidate } = require("../helpers/validation");

module.exports = {
    // Get list
    getList: async (req, res, next) => {
        try {
            const rooms = await Room.find().populate("users", "nickname");

            return res.json({
                status: 200,
                data: rooms,
            });
        } catch (error) {
            next(error);
        }
    },

    // Get list message in room
    getListMessage: async (req, res, next) => {
        try {
            const { id } = req.params;

            const messages = await Message.find({ roomId: id });

            if (!messages) {
                throw createError({
                    message: "Cannot find message in room!",
                    data: messages,
                });
            }

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

            const detailRoom = await Room.findById(id).populate(
                "users",
                "nickname"
            );

            if (!detailRoom) {
                throw createError({
                    message: "Cannot find by id!",
                    data: detailRoom,
                });
            }

            return res.json({
                status: 200,
                data: detailRoom,
            });
        } catch (error) {
            next(error);
        }
    },

    // Create
    create: async (req, res, next) => {
        try {
            const { name, type, users } = req.body;

            //Validate data
            const { error } = roomValidate(req.body);

            if (error) {
                throw createError({
                    message: "Validate faild!",
                    data: error.details[0].message,
                });
            }

            // Create room model
            const room = new Room({
                name,
                type,
                users,
            });

            // Save room in db
            const savedRoom = await room.save();

            return res.json({
                status: 200,
                data: savedRoom,
            });
        } catch (error) {
            next(error);
        }
    },

    // Update
    update: async (req, res, next) => {
        try {
            const { id } = req.params;

            const { error } = roomValidate(req.body);

            if (error) {
                throw createError({
                    message: "Validate failed!",
                    data: error.details[0].message,
                });
            }

            const updateRoom = await Room.findByIdAndUpdate(
                id,
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            );

            if (!updateRoom) {
                throw createError({
                    message: "Update failed!",
                    data: updateRoom,
                });
            }

            return res.json({
                status: 200,
                data: updateRoom,
            });
        } catch (error) {
            next(error);
        }
    },

    // Remove
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;

            const removeRoom = await Room.findByIdAndDelete(id);

            if (!removeRoom)
                throw createError({
                    message: "Not find with id!",
                    data: removeRoom,
                });

            return res.json({
                status: 200,
                data: removeRoom,
            });
        } catch (error) {
            next(error);
        }
    },
};
