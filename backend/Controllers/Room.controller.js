const createError = require("http-errors");
const { Room } = require("../Models/Room.model");
const { Message } = require("../Models/Message.model");
const { roomValidate } = require("../helpers/validation");

module.exports = {
    // Get list
    getList: async (req, res, next) => {
        try {
            let filterQuery = { ...req.query };
            if (filterQuery.type) {
                filterQuery.type = filterQuery.type.includes("true")
                    ? true
                    : false;
            }

            const rooms = await Room.find(filterQuery).populate(
                "users",
                "nickname"
            );

            return res.json({
                status: 200,
                data: {
                    rooms,
                },
                message: "Lấy danh sách thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Get list message in room
    getListMessage: async (req, res, next) => {
        try {
            const { id } = req.params;

            const messages = await Message.find({ roomId: id }).populate(
                "files",
                "name url type url"
            );

            if (!messages) {
                throw createError({
                    message: "Không tìm thấy tin nhắn nào!",
                    data: messages,
                });
            }

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

            const detailRoom = await Room.findById(id).populate(
                "users",
                "nickname"
            );

            if (!detailRoom) {
                throw createError({
                    message: "Không tìm thấy phòng!",
                    data: detailRoom,
                });
            }

            return res.json({
                status: 200,
                data: { detailRoom },
                message: "Lấy thông tin thành công!",
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
                    message: "Xác thực thất bại!",
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
                data: { savedRoom },
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

            const { error } = roomValidate(req.body);

            if (error) {
                throw createError({
                    message: "Xác thực thất bại!",
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
                    message: "Cập nhật thất bại!",
                    data: updateRoom,
                });
            }

            return res.json({
                status: 200,
                data: { updateRoom },
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

            const removeRoom = await Room.findByIdAndDelete(id);

            if (!removeRoom)
                throw createError({
                    message: "Không tìm thấy phòng!",
                    data: removeRoom,
                });

            return res.json({
                status: 200,
                data: { removeRoom },
                message: "Xóa thành công!",
            });
        } catch (error) {
            next(error);
        }
    },
};
