import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import configSlice from './configSlice'
import userSlice from './userSlice';
import errorSlice from './errorSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        config: configSlice,
        users: userSlice,
        error: errorSlice
    },
    });

export default store