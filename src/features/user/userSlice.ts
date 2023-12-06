import { createSlice } from "@reduxjs/toolkit";
import { UserTypeRedux } from "../../Types/UserTypes";

const initialState: UserTypeRedux = {
    userData: null,
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.data;
            state.token = action.payload.token;
            // console.log(action.payload)
            // Set a key-value pair in local storage to store JWT Token
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.userData = null;
            state.token = null;
            // Clear all data in local storage
            localStorage.clear();
        },
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer