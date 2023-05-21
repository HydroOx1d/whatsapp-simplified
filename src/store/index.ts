import { configureStore } from "@reduxjs/toolkit";
import { chatsReducer } from "./slices/ChatsSlices";
import { authReducer } from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store