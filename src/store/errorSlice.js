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
    error: parseJSON("error")
}
export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
            localStorage.setItem("error", JSON.stringify(state.error))
        },
        clearError: (state) => {
            state.error = null;
            localStorage.setItem("error", JSON.stringify(state.error))
          },
    }
})

export const {setError, clearError} = errorSlice.actions

export default errorSlice.reducer