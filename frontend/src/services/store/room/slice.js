import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
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
    },
});

export const { getList, getListFulfilled, getListRejected } = roomSlice.actions;
export default roomSlice.reducer;
