const createError = require("http-errors");

module.exports = {
    // Upload images
    uploadImages: async (req, res, next) => {
        try {
            let { files } = req;

            return res.json({
                status: 200,
                data: files,
                message: "Thêm ảnh thành công!",
            });
        } catch (error) {
            next(error);
        }
    },

    // Upload files
    uploadFiles: async (req, res, next) => {
        try {
            let { files } = req;

            return res.json({
                status: 200,
                data: files,
                message: "Thêm tệp thành công!",
            });
        } catch (error) {
            next(error);
        }
    },
};
