import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    loading: false,
};

export const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        getList: (state) => ({
            ...state,
            loading: true,
        }),
        getListFulfilled: (state, { payload }) => ({
            ...state,
            files: payload.files,
            loading: false,
        }),
        getListRejected: (state) => ({
            ...state,
            loading: false,
        }),
        // Create File
        createFile: (state) => ({
            ...state,
            loading: true,
        }),
        createFileFulfilled: (state, { payload }) => ({
            ...state,
            files: [...state.files, payload.savedFile],
            loading: false,
        }),
        createFileRejected: (state) => ({
            ...state,
            loading: false,
        }),
    },
});

export const {
    getList,
    getListFulfilled,
    getListRejected,
    createFile,
    createFileFulfilled,
    createFileRejected,
} = fileSlice.actions;
export default fileSlice.reducer;
