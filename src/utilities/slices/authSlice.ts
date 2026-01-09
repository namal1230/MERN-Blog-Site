import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {axiosPrivate} from "../../api/axiosPrivate";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get("/customer/verify-refresh-token",{withCredentials:true});
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    token: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout,setToken } = authSlice.actions;
export default authSlice.reducer;
