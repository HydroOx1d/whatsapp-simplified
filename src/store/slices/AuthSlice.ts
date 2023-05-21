import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type InitialStateType = {
  instance: string,
  apiTokenInstance: string,
  isAuth: boolean
}

const initialState: InitialStateType = {
  instance: '',
  apiTokenInstance: '',
  isAuth: false
}

const AuthSlice =  createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    login(state, action: PayloadAction<{instance: string, apiInstanceToken: string}>) {
      state.apiTokenInstance = action.payload.apiInstanceToken
      state.instance = action.payload.instance
      state.isAuth = true
    }
  }
})


export const authReducer = AuthSlice.reducer
export const { login } = AuthSlice.actions