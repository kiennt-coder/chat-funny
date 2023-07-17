import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItemActive: "",
    chatDetailActive: false,
    theme: "light",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setMenuItemActive: (state, { payload }) => ({
            ...state,
            menuItemActive: payload,
        }),
        setTheme: (state, { payload }) => ({
            ...state,
            theme: payload,
        }),
        setChatDetailActive: (state, { payload }) => ({
            ...state,
            chatDetailActive: payload,
        }),
    },
});

export const { setMenuItemActive, setTheme, setChatDetailActive } =
    appSlice.actions;
export default appSlice.reducer;
