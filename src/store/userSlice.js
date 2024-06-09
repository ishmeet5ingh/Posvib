import { createSlice } from "@reduxjs/toolkit";

const parseJSON = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item && item !== "undefined" ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage`, error);
        return null;
    }
};

const initialState = {
    users: parseJSON("users"),
    currentUser: parseJSON("currentUser")
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action)=> {
            state.users = action.payload
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
        }
    }
})

export const {setUsers, setCurrentUser} = userSlice.actions

export default userSlice.reducer