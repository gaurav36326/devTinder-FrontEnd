import {configureStore} from "@reduxjs/toolkit";
import userState from './userSilce';
import feedState from './feedSilce';
import connectionState from './connectionSlice'
import requestsState from './requestsSlice'

const store = configureStore({
    reducer :{
        user : userState,
        feed : feedState,
        connection : connectionState,
        requests : requestsState,
    }
})

export default store;