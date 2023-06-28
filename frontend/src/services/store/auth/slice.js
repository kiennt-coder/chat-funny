import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: "",
    refreshToken: "",
    loading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Login
        login: (state) => ({
            ...state,
            loading: true,
        }),
        loginFulfilled: (state, { payload }) => ({
            ...state,
            user: payload?.user || {},
            token: payload.accessToken,
            refreshToken: payload.refreshToken,
            loading: false,
        }),
        loginRejected: (state) => ({
            ...state,
            loading: false,
        }),

        // Register
        register: (state) => ({
            ...state,
            loading: true,
        }),
        registerFulfilled: (state, { payload }) => ({
            ...state,
            user: payload || {},
            loading: false,
        }),
        registerRejected: (state) => ({
            ...state,
            loading: false,
        }),
    },
});

export const {
    // Login
    login,
    loginFulfilled,
    loginRejected,

    // Register
    register,
    registerFulfilled,
    registerRejected,
} = authSlice.actions;
export default authSlice.reducer;
