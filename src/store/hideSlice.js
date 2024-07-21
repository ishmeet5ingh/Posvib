import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isHide: true, 
};

// Create hide slice
const hideSlice = createSlice({
  name: 'hide',
  initialState,
  reducers: {
    // Set hide state
    setHide: (state, action) => {
      state.isHide = action.payload;
    },

  },
});

// Export actions and reducer
export const { setHide } = hideSlice.actions;
export default hideSlice.reducer;
