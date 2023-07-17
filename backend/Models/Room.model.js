const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { testConnection } = require("../helpers/connections_multi_mongodb");
const { Message } = require("./Message.model");

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

RoomSchema.pre("findOneAndDelete", async function (next) {
    try {
        let roomId = this.getQuery()["_id"];
        await Message.deleteMany({ roomId: roomId });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = {
    Room: testConnection.model("Room", RoomSchema),
};
