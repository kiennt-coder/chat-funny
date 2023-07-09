const express = require("express");
const helmet = require("helmet");
const createError = require("http-errors");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const userRoute = require("./Routes/User.router");
const roomRoute = require("./Routes/Room.router");
const messageRoute = require("./Routes/Message.router");
const fileRoute = require("./Routes/File.router");
const errorLogEvents = require("./helpers/logEvents");
const http = require("http");

const allowlist = [
    "http://localhost:3000",
    "http://localhost:3000/",
    "http://localhost:5500",
    "http://localhost:5500/",
    "http://172.0.0.1:3000",
    "http://172.0.0.1:3000/",
    "http://172.0.0.1:5500",
    "http://172.0.0.1:5500/",
    "https://chat-funny.vercel.app",
    "https://chat-funny.vercel.app/",
];

// Create Express Application
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const connectSocket = require("./services/socketIO");
const io = new Server(server, {
    cors: {
        origin: allowlist,
        credentials: true
    },
});

// Change HTTP Headers
app.use(helmet());

// Cors
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

// Read json
app.use(express.json());

// Parse json to string or array
app.use(express.urlencoded({ extended: true }));

// log all requests to access.log
// app.use(
//     morgan("common", {
//         stream: fs.createWriteStream(
//             path.join(__dirname, "./Logs/access.log"),
//             { flags: "a" }
//         ),
//     })
// );

// Create route home
app.use("/v1/users", userRoute);

// Create route room
app.use("/v1/rooms", roomRoute);

// Create route message
app.use("/v1/messages", messageRoute);

// Create route file
app.use("/v1/files", fileRoute);

// Create function handle error not found
app.use((req, res, next) => {
    next(createError.NotFound("This route is not exists!"));
});

// Create function response message error
app.use((err, req, res, next) => {
    errorLogEvents(
        `${req.url}---${req.method}---${err.status}---${err.message}`
    );
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
    });
});

// Socket.io
io.on("connection", (socket) => connectSocket(io, socket));

// Create port
const PORT = process.env.PORT || 3001;

// Listen port with Server running
server.listen(PORT, function () {
    console.log(`Server is running with Port::${PORT}!`);
});
