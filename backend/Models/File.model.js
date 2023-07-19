const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { testConnection } = require("../helpers/connections_multi_mongodb");
const { number } = require("joi");

// Create a new User schema
const FileSchema = new Schema(
    {
        name: {
            type: String,
        },
        url: {
            type: String,
            required: true,
        },
        type: {
            type: Boolean,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        messageId: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
        collection: "files",
    }
);

module.exports = {
    File: testConnection.model("File", FileSchema),
};
