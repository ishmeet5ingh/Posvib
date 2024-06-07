import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import configSlice from './configSlice'
import uploadSlice from './uploadSlice'
// import localStorageMiddleware from '../middleware/localStorageMiddleware';


const store = configureStore({
    reducer: {
        auth: authSlice,
        config: configSlice,
        upload: uploadSlice
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(localStorageMiddleware),
    });

export default store