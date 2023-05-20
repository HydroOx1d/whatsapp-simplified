import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ContactType } from "../../types";
import { getContacts } from "../../api";

export const getContactsThunk = createAsyncThunk('chats/getContactsThunk', async (_, {dispatch}) => {
  const data = await getContacts() || []

  dispatch(pushToContacts(data))
})

type InitialStateType = {
  contacts: Array<ContactType>
}

const initialState: InitialStateType = {
  contacts: []
}

const ChatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    pushToContacts(state, action: PayloadAction<Array<ContactType>>) {
      state.contacts = action.payload
    }
  }
})

export const { pushToContacts } = ChatsSlice.actions
export const chatsReducer = ChatsSlice.reducer