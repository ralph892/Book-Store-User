import { IUser } from "@/interfaces/customInterface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice{
    information: IUser | undefined;
};

const initialState: UserSlice = {
    information: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        assignUser: (state, action: PayloadAction<IUser | undefined>) => {
            state.information = action.payload;
        },
    }
});

export const {assignUser} = userSlice.actions;

export default userSlice.reducer;