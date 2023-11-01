import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./features/notification/notificationSlice";
import cartReducer from "./features/cart/cartSlice";
import overlayReducer from "./features/overlay/overlaySlice";
import loadingReducer from "./features/loading/loadingSlice";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        cart: cartReducer,
        overlay: overlayReducer,
        loading:loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;