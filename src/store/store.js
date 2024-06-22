import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import configReducer from './configSlice'
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import loadingReducer from './loadingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        config: configReducer,
        users: userReducer,
        error: errorReducer,
        loading: loadingReducer
    },
    });

export default store