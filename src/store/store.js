import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import configSlice from './configSlice'
import localStorageMiddleware from '../middleware/localStorageMiddleware';


const store = configureStore({
    reducer: {
        auth: authSlice,
        config: configSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    });

export default store