let users = [];
let rooms = [];

const isHasRoom = (room) => rooms.find((item) => item === room);

const connectSocket = (io, socket) => {
    // event user join the room
    socket.on("joinRoom", (data) => {
        users.push(data);
        rooms = rooms.concat(data.rooms);
        rooms = [...new Set(rooms)];
        socket.join(data.rooms);
        socket.to(data.rooms).emit("newUserJoinRoom", { ...data });
        socket.emit("joinRoomSuccess", {
            ...data,
        });
    });

    // event user send message to the room
    socket.on("sendMessage", (data) => {
        socket.to(data.roomId).emit("sendMessageSuccess", {
            ...data,
        });
    });

    // event user leave the room
    socket.on("leaveRoom", (data) => {
        socket.leave(data.roomId);
        io.to(data.roomId).emit(`user ${data.user._id} has left the room`);
        socket.emit("leaveRoomSuccess", {
            ...data,
        });
    });

    // event user disconnect
    socket.on("disconnect", () => {
        socket.broadcast.emit("userDisconnect");
    });
};

module.exports = connectSocket;
