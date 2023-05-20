import axios from 'axios'
import { ChatMessageType, ContactInfoType, ContactType, NotificationType, SendMessageDataType } from '../types'

export const getContacts = async () => {
  try {
    const res = await axios.get<ContactType[]>('https://api.green-api.com/waInstance1101823038/GetContacts/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91')

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const checkWhatsapp = async (phoneNumber: string) => {
  try {
    const res = await axios.post<{existsWhatsapp: boolean}>('https://api.green-api.com/waInstance1101823038/CheckWhatsapp/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91', {phoneNumber})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getContactInfo = async (chatId: string) => {
  try {
    const res = await axios.post<ContactInfoType>('https://api.green-api.com/waInstance1101823038/getContactInfo/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91', {chatId})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const getChatHstory = async (chatId: string) => {
  try {
    const res = await axios.post<Array<ChatMessageType>>('https://api.green-api.com/waInstance1101823038/GetChatHistory/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91', {chatId})

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const sendMessage = async (data: SendMessageDataType) => {
  try {
    const res = await axios.post<{idMessage: string}>('https://api.green-api.com/waInstance1101823038/SendMessage/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91', data)

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
    const res = await axios.post<ChatMessageType>('https://api.green-api.com/waInstance1101823038/getMessage/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91', data)

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const recieveNotification = async () => {
  try {
    const res = await axios.get<{receiptId: number, body: NotificationType}>('https://api.green-api.com/waInstance1101823038/ReceiveNotification/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91')

    return res.data
  } catch(err) {
    console.log(err)
  }
}

export const deleteNotification = async (receiptId: number) => {
  try {
    const res = await axios.delete<{result: boolean}>('https://api.green-api.com/waInstance1101823038/DeleteNotification/b57adf0d6b15440d808defe5edcf1e4e6abac0ef375d453b91/' + receiptId)

    return res.data
  } catch(err) {
    console.log(err)
  }
} 