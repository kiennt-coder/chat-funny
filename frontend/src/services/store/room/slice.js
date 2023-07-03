import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    activeRoom: "",
    loading: false,
};

export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        getList: (state) => ({
            ...state,
            loading: true,
        }),
        getListFulfilled: (state, { payload }) => ({
            ...state,
            rooms: payload.rooms,
            loading: false,
        }),
        getListRejected: (state) => ({
            ...state,
            loading: false,
        }),

        updateActiveRoom: (state, { payload }) => ({
            ...state,
            activeRoom: payload.activeRoom,
        }),
    },
});

export const { getList, getListFulfilled, getListRejected, updateActiveRoom } =
    roomSlice.actions;
export default roomSlice.reducer;
