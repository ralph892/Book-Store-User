import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartSlice{
    isMounted: boolean;
};

const initialState: CartSlice = {
    isMounted: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        mountMiniCart: (state) => {
            state.isMounted = true;
        },
        unmountMiniCart: (state) => {
            state.isMounted = false;
        }
    }
});

export const {mountMiniCart, unmountMiniCart} = cartSlice.actions;

export default cartSlice.reducer;