import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem("users")) || null,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null
}


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