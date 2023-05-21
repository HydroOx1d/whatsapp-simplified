import axios from 'axios'
import { ChatMessageType, ContactInfoType, ContactType, NotificationType, SendMessageDataType } from '../types'

export const getContacts = async () => {
  try {
    const res = await axios.get<ContactType[]>('https://api.green-api.com/waInstance1101823062/GetContacts/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286')

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const checkWhatsapp = async (phoneNumber: string) => {
  try {
    const res = await axios.post<{existsWhatsapp: boolean}>('https://api.green-api.com/waInstance1101823062/CheckWhatsapp/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286', {phoneNumber})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getContactInfo = async (chatId: string) => {
  try {
    const res = await axios.post<ContactInfoType>('https://api.green-api.com/waInstance1101823062/getContactInfo/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286', {chatId})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getChatHstory = async (chatId: string) => {
  try {
    const res = await axios.post<Array<ChatMessageType>>('https://api.green-api.com/waInstance1101823062/GetChatHistory/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286', {chatId})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const sendMessage = async (data: SendMessageDataType) => {
  try {
    const res = await axios.post<{idMessage: string}>('https://api.green-api.com/waInstance1101823062/SendMessage/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286', data)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getMeesageInfo = async (data: {
  chatId: string,
  idMessage: string
}) => {
  try {
    const res = await axios.post<ChatMessageType>('https://api.green-api.com/waInstance1101823062/getMessage/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286', data)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const recieveNotification = async () => {
  try {
    const res = await axios.get<{receiptId: number, body: NotificationType}>('https://api.green-api.com/waInstance1101823062/ReceiveNotification/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286')

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const deleteNotification = async (receiptId: number) => {
  try {
    const res = await axios.delete<{result: boolean}>('https://api.green-api.com/waInstance1101823062/DeleteNotification/0f281d97053c45339d87b605cfebba8646fadb52f6eb446286/' + receiptId)

    return res.data
  } catch(err) {
    console.log(err)
  }
} 