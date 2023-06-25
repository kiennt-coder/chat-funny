import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: "",
    refreshToken: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => ({
            ...state,
        }),
        loginFulfilled: (state, { payload }) => ({
            ...state,
            user: payload,
        }),
        loginRejected: (state) => ({
            ...state,
        }),
    },
});

export const { login, loginFulfilled, loginRejected } = authSlice.actions;
export default authSlice.reducer;
