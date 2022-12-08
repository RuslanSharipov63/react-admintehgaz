import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mw: false
}

export const IsModalWindowSlice = createSlice({
    name: '@modalwindow',
    initialState,
    reducers: {
        editModalWindow: (state, action) => {
            state.mw = action.payload;
        }
    }
})

export const { editModalWindow } = IsModalWindowSlice.actions;