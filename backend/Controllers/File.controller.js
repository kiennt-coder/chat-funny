const createError = require("http-errors");
const { File } = require("../Models/File.model");
const { fileValidate } = require("../helpers/validation");

module.exports = {
    // Get list
    getList: async (req, res, next) => {
        try {
            const file = await File.find();

            return res.json({
                status: 200,
                data: file,
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
                    message: "Cannot find by id!",
                    data: detailFile,
                });
            }

            return res.json({
                status: 200,
                data: detailFile,
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
                    message: "Validate faild!",
                    data: error.details[0].message,
                });
            }

            // Create room model
            const file = new File(req.body);

            // Save room in db
            const savedFile = await file.save();

            if (!savedFile) {
                throw createError({
                    message: "Cannot save file!",
                    data: savedFile,
                });
            }

            return res.json({
                status: 200,
                data: savedFile,
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
                    message: "Validate failed!",
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
                    message: "Update failed!",
                    data: updatedFile,
                });
            }

            return res.json({
                status: 200,
                data: updatedFile,
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
                    message: "Not find with id!",
                    data: removedFile,
                });

            return res.json({
                status: 200,
                data: removedFile,
            });
        } catch (error) {
            next(error);
        }
    },
};
