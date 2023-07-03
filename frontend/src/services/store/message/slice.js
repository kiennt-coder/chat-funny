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

        createMessage: (state) => ({
            ...state,
            loading: true,
        }),
        createMessageFulfilled: (state, { payload }) => ({
            ...state,
            messages: [...state.messages, payload.savedMessage],
            loading: false,
        }),
        createMessageRejected: (state) => ({
            ...state,
            loading: false,
        }),
    },
});

export const {
    getList,
    getListFulfilled,
    getListRejected,
    createMessage,
    createMessageFulfilled,
    createMessageRejected,
} = messageSlice.actions;
export default messageSlice.reducer;
