const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { testConnection } = require("../helpers/connections_multi_mongodb");

// Create a new User schema
const MessageSchema = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Room",
        },
        userSendId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        userReveiceId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        text: {
            type: String,
            required: true,
        },
        files: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        ],
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        ],
        isSeen: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
        collection: "messages",
    }
);

module.exports = {
    Message: testConnection.model("Message", MessageSchema),
};
