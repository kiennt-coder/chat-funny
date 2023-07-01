import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import appSlice from "./app/slice";
import roomSlice from "./room/slice";

const reducers = combineReducers({
    auth: authSlice,
    app: appSlice,
    room: roomSlice,
});

export default reducers;
