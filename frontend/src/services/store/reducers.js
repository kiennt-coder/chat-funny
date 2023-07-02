import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import appSlice from "./app/slice";
import roomSlice from "./room/slice";
import messageSlice from "./message/slice";

const reducers = combineReducers({
    auth: authSlice,
    app: appSlice,
    room: roomSlice,
    message: messageSlice,
});

export default reducers;
