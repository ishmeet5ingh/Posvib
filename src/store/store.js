import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import configReducer from './configSlice';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import loadingReducer from './loadingSlice';
import submitStateReducer from './submitStateSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,         // Manages auth state
    config: configReducer,     // Manages config state
    users: userReducer,        // Manages user state
    error: errorReducer,       // Manages error  state
    loading: loadingReducer,   // Manages loading state
    submitState: submitStateReducer // manages submitState
  },
});

export default store;
