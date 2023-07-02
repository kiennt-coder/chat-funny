import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        getList: (state) => ({
            ...state,
            loading: true,
        }),
        getListFulfilled: (state, { payload }) => ({
            ...state,
            messages: payload.messages,
            loading: false,
        }),
        getListRejected: (state) => ({
            ...state,
            loading: false,
        }),
    },
});

export const { getList, getListFulfilled, getListRejected } =
    messageSlice.actions;
export default messageSlice.reducer;
