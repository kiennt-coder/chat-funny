const createError = require("http-errors");
const { File } = require("../Models/File.model");
const { fileValidate } = require("../helpers/validation");

module.exports = {
    // Get list
    getList: async (req, res, next) => {
        try {
            const files = await File.find();

            return res.json({
                status: 200,
                data: { files },
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

            const detailFile = await File.findById(id);

            if (!detailFile) {
                throw createError({
                    message: "Không tìm thấy!",
                    data: detailFile,
                });
            }

            return res.json({
                status: 200,
                data: { detailFile },
                message: "Thêm mới thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Create
    create: async (req, res, next) => {
        try {
            //Validate data
            const { error } = fileValidate(req.body);

            if (error) {
                throw createError({
                    message: "Xác thực thất bại!",
                    data: error.details[0].message,
                });
            }

            // Create room model
            const file = new File(req.body);

            // Save room in db
            const savedFile = await file.save();

            if (!savedFile) {
                throw createError({
                    message: "Thêm mới thất bại!",
                    data: savedFile,
                });
            }

            return res.json({
                status: 200,
                data: { savedFile },
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

            const { error } = fileValidate(req.body);

            if (error) {
                throw createError({
                    message: "Xác thực thất bại!",
                    data: error.details[0].message,
                });
            }

            const updatedFile = await File.findByIdAndUpdate(
                id,
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            );

            if (!updatedFile) {
                throw createError({
                    message: "Cập nhật thất bại!",
                    data: updatedFile,
                });
            }

            return res.json({
                status: 200,
                data: { updatedFile },
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

            const removedFile = await File.findByIdAndDelete(id);

            if (!removedFile)
                throw createError({
                    message: "Không tìm thấy!",
                    data: removedFile,
                });

            return res.json({
                status: 200,
                data: { removedFile },
                message: "Xóa thành công!",
            });
        } catch (error) {
            next(error);
        }
    },
};
