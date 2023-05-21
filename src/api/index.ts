import axios from 'axios'
import { AuthDataType, ChatMessageType, ContactInfoType, ContactType, InstanceStateType, NotificationType, SendMessageDataType } from '../types'

export const getContacts = async (authData: AuthDataType) => {
  try {
    const res = await axios.get<ContactType[]>(`https://api.green-api.com/waInstance${authData.instance}/GetContacts/${authData.apiTokenInstance}`)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const checkWhatsapp = async (phoneNumber: string, authData: AuthDataType) => {
  try {
    const res = await axios.post<{existsWhatsapp: boolean}>(`https://api.green-api.com/waInstance${authData.instance}/CheckWhatsapp/${authData.apiTokenInstance}`, {phoneNumber})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getContactInfo = async (chatId: string, authData: AuthDataType) => {
  try {
    const res = await axios.post<ContactInfoType>(`https://api.green-api.com/waInstance${authData.instance}/getContactInfo/${authData.apiTokenInstance}`, {chatId})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getChatHstory = async (chatId: string, authData: AuthDataType) => {
  try {
    const res = await axios.post<Array<ChatMessageType>>(`https://api.green-api.com/waInstance${authData.instance}/GetChatHistory/${authData.apiTokenInstance}`, {chatId})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const sendMessage = async (data: SendMessageDataType, authData: AuthDataType) => {
  try {
    const res = await axios.post<{idMessage: string}>(`https://api.green-api.com/waInstance${authData.instance}/SendMessage/${authData.apiTokenInstance}`, data)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getMeesageInfo = async (data: {
  chatId: string,
  idMessage: string
}, authData: AuthDataType) => {
  try {
    const res = await axios.post<ChatMessageType>(`https://api.green-api.com/waInstance${authData.instance}/getMessage/${authData.apiTokenInstance}`, data)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const recieveNotification = async (authData: AuthDataType, signal: AbortSignal) => {
  try {
    const res = await axios.get<{receiptId: number, body: NotificationType}>(`https://api.green-api.com/waInstance${authData.instance}/ReceiveNotification/${authData.apiTokenInstance}`, {signal})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const deleteNotification = async (receiptId: number, authData: AuthDataType) => {
  try {
    const res = await axios.delete<{result: boolean}>(`https://api.green-api.com/waInstance${authData.instance}/DeleteNotification/${authData.apiTokenInstance}/` + receiptId)

    return res.data
  } catch(err) {
    console.log(err)
  }
} 

export const getStateInstance = async (authData: AuthDataType) => {
  try {
    const res = await axios.get<InstanceStateType>(`https://api.green-api.com/waInstance${authData.instance}/getStateInstance/${authData.apiTokenInstance}/`)

    return res.data
  } catch(err) {
    throw new Error()
  }
}