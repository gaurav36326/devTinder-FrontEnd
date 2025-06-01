import {createSlice} from '@reduxjs/toolkit'
const requestSlice = createSlice({
    name : "requests",
    initialState : [],
    reducers : {
        addRequests : (state,action)=>{
            return action.payload
        },
        removeRequests : (state,action)=>{
            return [];
        }
    }
})

export const {addRequests,removeRequests} = requestSlice.actions;

export default requestSlice.reducer;