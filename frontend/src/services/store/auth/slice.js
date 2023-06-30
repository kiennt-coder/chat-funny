import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: "",
    refreshToken: "",
    remember: false,
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
            remember: payload.remember,
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

        // Logout
        logout: (state) => ({
            ...state,
            loading: true,
        }),
        logoutFulfilled: (state) => ({
            ...state,
            user: {},
            token: "",
            refreshToken: "",
            loading: false,
        }),
        logoutRejected: (state) => ({
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

    // Logout
    logout,
    logoutFulfilled,
    logoutRejected,
} = authSlice.actions;
export default authSlice.reducer;
