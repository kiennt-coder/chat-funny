import { io } from "socket.io-client";
import setting from "../../configs/setting";

export const socket = io(setting.SOCKET_URL, {
    withCredentials: true,
});
