import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    submitState: {
        state: "",
        id: ""
    } 
}

export const submitStateSlice = createSlice({
    name: "submitState",
    initialState, 
    reducers: {
        setSubmitState: (state, action)=> {
           const {submitState, id} = action.payload
           state.submitState.state = submitState
           state.submitState.id = id
        },

        resetSubmitState: (state)=> {
            state.submitState.state = ""
            state.submitState.id = ""
        }
    }
})

export const {setSubmitState, resetSubmitState} = submitStateSlice.actions
export default submitStateSlice.reducer