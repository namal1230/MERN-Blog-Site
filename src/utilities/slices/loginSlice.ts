import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string;
  name: string | undefined;
  email: string;
  profile: string;
  id:string;
  role: "user" | "admin" | null;
}

export const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    token: "",
    name:"",
    email:"",
    profile:"",
    id:"",
    role:null
  } as AuthState,
  reducers: {
    setAuth:(state: AuthState, action: PayloadAction<AuthState>)=>{
        state.token=action.payload.token;
        state.name=action.payload.name;
        state.email=action.payload.email;
        state.profile=action.payload.profile;
        state.id=action.payload.id;
        state.role=action.payload.role;
    },
    removeAuth:(state: AuthState)=>{
      state.email="",
      state.id="",
      state.profile="",
      state.token="",
      state.name="",
      state.role=null
    }
  },
})

export const { setAuth,removeAuth } = loginSlice.actions

export default loginSlice.reducer