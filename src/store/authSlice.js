import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: JSON.parse(localStorage.getItem("status")) || false,
    userData: JSON.parse(localStorage.getItem("userData")) || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true
            state.userData = action.payload.userData
            localStorage.setItem("status", JSON.stringify(state.status))
            localStorage.setItem("userData", JSON.stringify(state.userData))
        },

        logout: (state)=>{
            state.status = false
            state.userData = null
            localStorage.setItem("status", JSON.stringify(state.status))
            localStorage.setItem("userData", JSON.stringify(state.userData))
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer