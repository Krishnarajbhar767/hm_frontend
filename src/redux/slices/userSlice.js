import { createSlice } from "@reduxjs/toolkit";
import getCookieByName from "../../utils/getCookie";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearUser: (state, action) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
