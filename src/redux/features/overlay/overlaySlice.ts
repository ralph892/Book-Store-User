import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OverlaySlice{
    isMounted: boolean;
};

const initialState: OverlaySlice = {
    isMounted: false,
};

export const overlaySlice = createSlice({
    name: 'overlay',
    initialState,
    reducers: {
        mountOverlay: (state) => {
            state.isMounted = true;
        },
        unmountOverlay: (state) => {
            state.isMounted = false;
        }
    }
});

export const {mountOverlay, unmountOverlay} = overlaySlice.actions;

export default overlaySlice.reducer;