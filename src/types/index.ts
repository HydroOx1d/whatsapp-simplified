export type ContactType = {
  id: string,
  name: string,
  type: 'user' | 'group'
}

export type ContactInfoType = {
  avatar: string,
  name: string,
  email: string,
  category: string,
  description: string,
  chatId: string,
  lastSeen: string,
  isArchive: boolean,
  isDisappearing: boolean,
  isMute: boolean,
  messageExpiration: number,
  muteExpiration: number
}

export type ChatMessageType = {
  type: 'incoming' | 'outgoing',
  timestamp: number,
  idMessage: string,
  statusMessage?: 'pending' | 'sent' | 'delivered' | 'read',
  typeMessage: 'textMessage',
  chatId: string,
  senderId: string,
  textMessage?: string,
}

export type SendMessageDataType = {
  chatId: string,
  message: string,
  quotedMessageId?: string,
  archiveChat?: boolean,
  linkPreview?: boolean
}

export type NotificationType = {
  typeWebhook: 'incomingMessageReceived',
  instanceData: {
    idInstance: number,
    wid: string,
    typeInstance: string,
  },
  timestamp: number,
  idMessage: string,
  senderData: {
    chatId: string,
    sender: string,
    chatName: string,
    senderName: string,
  },
  messageData: {
    typeMessage: string,
    textMessageData: {
      textMessage: string,
    },
  },
}