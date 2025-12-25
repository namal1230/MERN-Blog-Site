import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string;
  name: string;
  email: string;
  profile: string;
  id:string;
}

export const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    token: "",
    name:"",
    email:"",
    profile:"",
    id:""
  } as AuthState,
  reducers: {
    setAuth:(state: AuthState, action: PayloadAction<AuthState>)=>{
        state.token=action.payload.token;
        state.name=action.payload.name;
        state.email=action.payload.email;
        state.profile=action.payload.profile;
        state.id=action.payload.id;
        console.log(state)
        console.log(action.payload);
        
    }
  },
})

export const { setAuth } = loginSlice.actions

export default loginSlice.reducer