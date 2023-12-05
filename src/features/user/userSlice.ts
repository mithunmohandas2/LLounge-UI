import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            console.log(action.payload)
            // Set a key-value pair in local storage to store JWT Token
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.userData = null;
            // Clear all data in local storage
            localStorage.clear();
        },
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer