import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        // Get Messages
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
        // Create Message
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
        // Update Message
        updateMessage: (state) => ({
            ...state,
            loading: true,
        }),
        updateMessageFulfilled: (state, { payload }) => ({
            ...state,
            messages: state.map((message) => {
                let newMessage = { ...message };
                newMessage =
                    message._id === payload.updatedMessage && newMessage
                        ? {
                              ...newMessage,
                              ...payload.updatedMessage,
                          }
                        : { ...newMessage };

                return newMessage;
            }),
            loading: false,
        }),
        updateMessageRejected: (state) => ({
            ...state,
            loading: false,
        }),
        // Delete Message
        deleteMessage: (state) => ({
            ...state,
            loading: true,
        }),
        deleteMessageFulfilled: (state, { payload }) => ({
            ...state,
            messages: state.messages.filter(
                (message) => message._id !== payload.removedMessage._id
            ),
            loading: false,
        }),
        deleteMessageRejected: (state) => ({
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
    updateMessage,
    updateMessageFulfilled,
    updateMessageRejected,
    deleteMessage,
    deleteMessageFulfilled,
    deleteMessageRejected,
} = messageSlice.actions;
export default messageSlice.reducer;
