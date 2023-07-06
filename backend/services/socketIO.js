let users = [];
let rooms = [];

const isHasRoom = (room) => rooms.find((item) => item === room);

const connectSocket = (io, socket) => {
    users.push({
        socketId: socket.id,
    });

    // event user join the room
    socket.on("joinRoom", (data) => {
        users = users.map((user) => {
            let newUser =
                user.socketId === socket.id
                    ? {
                          ...user,
                          ...data,
                      }
                    : {
                          ...user,
                      };

            return newUser;
        });
        rooms = rooms.concat(data.rooms);
        rooms.push([...new Set(rooms)]);
        socket.join(data.rooms);
        socket.to(data.rooms).emit("newUserJoinRoom", { ...data });
        socket.emit("joinRoomSuccess", {
            ...data,
        });
    });

    // event user send message to the room
    socket.on("sendMessage", (data) => {
        if (isHasRoom(data.room))
            socket.to(data.room).emit("sendMessageSuccess", {
                ...data,
            });
    });

    // event user leave the room
    socket.on("leaveRoom", (data) => {
        let room = isHasRoom(data.room);
        let user = users.find((user) => user.socketId === socket.id);
        if (room) {
            socket.leave(room);
            io.to(room).emit(`user ${user.name} has left the room`);
            socket.emit("leaveRoomSuccess", {
                ...data,
            });
        }
    });

    // event user disconnect
    socket.on("disconnect", () => {
        socket.broadcast.emit("userDisconnect");
    });
};

module.exports = connectSocket;
