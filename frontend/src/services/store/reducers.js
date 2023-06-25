import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import appSlice from "./app/slice";

const reducers = combineReducers({
    auth: authSlice,
    app: appSlice,
});

export default reducers;
