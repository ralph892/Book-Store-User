import { IBook } from "@/interfaces/customInterface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState{
    isMounted: boolean;
    data?: IBook;
};

const initialState: NotificationState = {
    isMounted: false,
    data: undefined
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        mountNotification: (state, action: PayloadAction<IBook>) => {
            state.isMounted = true;
            state.data = action.payload;
        },
        unmountNotification: (state) => {
            state.isMounted = false;
        }
    }
});

export const {mountNotification, unmountNotification} = notificationSlice.actions;

export default notificationSlice.reducer;