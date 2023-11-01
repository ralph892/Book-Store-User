import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingSlice{
    isMounted: boolean;
};

const initialState: LoadingSlice = {
    isMounted: true,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        mountLoading: (state) => {
            state.isMounted = true;
        },
        unmountLoading: (state) => {
            state.isMounted = false;
        }
    }
});

export const {mountLoading, unmountLoading} = loadingSlice.actions;

export default loadingSlice.reducer;