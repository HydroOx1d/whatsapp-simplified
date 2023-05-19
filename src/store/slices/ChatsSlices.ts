import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types";
import { getContacts } from "../../api";

export const getContactsThunk = createAsyncThunk('chats/getContactsThunk', async (_, {dispatch}) => {
  const data = await getContacts() || []

  dispatch(pushToContacts(data))
})

type InitialStateType = {
  contacts: Array<Contact>
}

const initialState: InitialStateType = {
  contacts: []
}

const ChatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    pushToContacts(state, action: PayloadAction<Array<Contact>>) {
      state.contacts = action.payload
    }
  }
})

export const { pushToContacts } = ChatsSlice.actions
export const chatsReducer = ChatsSlice.reducer