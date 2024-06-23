import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isLoading: true, 
};

// Create loading slice
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions and reducer
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
