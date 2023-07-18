const createError = require("http-errors");

module.exports = {
    // Upload images
    uploadImages: async (req, res, next) => {
        try {
            let { files } = req;

            console.log("files::", files);

            return res.json({
                status: 200,
                data: files,
                message: "Thêm ảnh thành công!",
            });
        } catch (error) {
            console.log("error::", error.message);
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
