import { createSlice } from "@reduxjs/toolkit";
import setting from "../../../configs/setting";

const { LOCAL_STORAGE } = setting;

const initialState = {
    user: JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER)) || {},
    accessToken: JSON.parse(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)) || {},
    refreshToken: JSON.parse(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)) || {},
    remember: localStorage.getItem(LOCAL_STORAGE.REMEMBER) || "",
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
            accessToken: payload.accessToken,
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
            accessToken: "",
            refreshToken: "",
            loading: false,
        }),
        logoutRejected: (state) => ({
            ...state,
            loading: false,
        }),

        // Refresh Token
        refreshToken: (state) => ({
            ...state,
            loading: true,
        }),
        refreshTokenFulfilled: (state, { payload }) => ({
            ...state,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            loading: false,
        }),
        refreshTokenRejected: (state) => ({
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

    // Refresh Token
    refreshToken,
    refreshTokenFulfilled,
    refreshTokenRejected,
} = authSlice.actions;
export default authSlice.reducer;
