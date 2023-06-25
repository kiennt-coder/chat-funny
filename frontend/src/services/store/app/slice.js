import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItemActive: "",
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
    },
});

export const { setMenuItemActive, setTheme } = appSlice.actions;
export default appSlice.reducer;
