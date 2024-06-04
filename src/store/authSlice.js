import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: JSON.parse(localStorage.getItem("status")) || false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true
            state.userData = action.payload.userData
            localStorage.setItem("status", JSON.stringify(state.status))
        },

        logout: (state)=>{
            state.status = false
            state.userData = null
            localStorage.setItem("status", JSON.stringify(state.status))
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer