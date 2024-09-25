import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:false
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{state.loading=true},
        signinSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=false
        },
        signinFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        updateStart:(state)=>{state.loading=true},
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=false
        },
        updateFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }

    }
});
export const{signInStart,signinSuccess,signinFailure,updateStart,updateSuccess,updateFailure}=userSlice.actions;
export default userSlice.reducer;
