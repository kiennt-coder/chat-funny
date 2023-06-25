const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { testConnection } = require("../helpers/connections_multi_mongodb");

// Create a new User schema
const RoomSchema = new Schema(
    {
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        type: {
            type: Boolean,
            required: true,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
        collection: "rooms",
    }
);

module.exports = {
    Room: testConnection.model("Room", RoomSchema),
};
