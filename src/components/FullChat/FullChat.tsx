import styles from './FullChat.module.css'
import send from '../../assets/send.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteNotification, getChatHstory, getContactInfo, getMeesageInfo, getStateInstance, recieveNotification, sendMessage } from '../../api'
import React from 'react'
import { ChatMessageType, ContactInfoType, SendMessageDataType } from '../../types'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

const FullChat = () => {
  const {apiTokenInstance, instance} = useSelector((state: RootState) => state.auth)
  const params = useParams<{ chatId: string }>()
  const [chatMessages, setChatMessages] = React.useState<Array<ChatMessageType>>([])
  const [contactInfo, setContactInfo] = React.useState<ContactInfoType | null>(null)
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const fullChatMainRef = React.useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const chatId = params.chatId + '@c.us'

  const recieveNotificationWithInterval = async (signal: AbortSignal) => {
    const notification = await recieveNotification({apiTokenInstance, instance}, signal)

    if (notification) {
      // смотрим, что уведомление о входящем сообщении и проверяем, совпадает ли id собеседника с id из уведомления
      if (notification.body.typeWebhook === 'incomingMessageReceived' && notification.body.senderData.chatId === chatId) {
        // получаем информацию о сообщении и рендерим
        getMeesageInfo({ chatId, idMessage: notification.body.idMessage || '' }, {apiTokenInstance, instance}).then(message => {
          if (message) {
            setChatMessages(prev => [...prev, message])
          }
        })
      }
      // очищаем уведомление
      deleteNotification(notification.receiptId, {apiTokenInstance, instance})
    }

    // Через 2 секунды повторяем выше изложенное
    await new Promise(res => setTimeout(res, 2000))
    
    //если произошла отписка от функции, прекращаем рекурсию
    if(!signal.aborted) {
      await recieveNotificationWithInterval(signal)
    }
  }

  React.useEffect(() => {
    const abort = new AbortController()
    const { signal } = abort
    // отправляем частые запросы на сервер на наличие уведомлений
    recieveNotificationWithInterval(signal)

    return () => {
      // при размонтировании отписываемся от рекурсивной функции
      abort.abort()
    }
  }, [params.chatId])

  React.useEffect(() => {
    if (chatId) {
      // получаем историю чата
      getChatHstory(chatId, {apiTokenInstance, instance}).then(data => setChatMessages(data?.reverse() || []))
      // получаем информацию о собеседнике
      getContactInfo(chatId, {apiTokenInstance, instance}).then(data => setContactInfo(data || null))
    }
  }, [chatId])

  React.useEffect(() => {
    // когда чат обновляется, смотрим последние сообщения
    if (fullChatMainRef.current) {
      fullChatMainRef.current.scroll({
        top: fullChatMainRef.current.scrollHeight - fullChatMainRef.current.clientHeight
      })
    }
  }, [chatMessages])


  // Отправляем сообщение собеседнику
  const onSendMessage = async () => {
    const messageData: SendMessageDataType = {
      chatId,
      message: textAreaValue
    }
    const stateInstance = await getStateInstance({apiTokenInstance, instance})

    if(stateInstance.stateInstance === 'notAuthorized') {
      navigate('/login')
    }

    const idMessage = await sendMessage(messageData, {apiTokenInstance, instance})

    // через секунду получаем информацию об отправленном сообщении и рендерим его
    setTimeout(() => {
      getMeesageInfo({
        chatId,
        idMessage: idMessage?.idMessage || ''
      }, {apiTokenInstance, instance}).then(data => {
        if (data) {
          setChatMessages(prev => [...prev, data])
        }
      })

    }, 1000)

    setTextAreaValue('')
  }

  return (
    <div className={styles.fullChat}>
      <div className={styles.fullChatWrap}>
        <div className={styles.fullChatHeader}>
          <div className={styles.fullChatUser}>
            <div className={styles.fullChatUserInfo}>
              <div className={styles.fullChatUserName}>{contactInfo?.name}</div>
            </div>
          </div>
        </div>
        <div className={styles.fullChatMain} ref={fullChatMainRef}>
          {
            chatMessages.map(message => {
              return (
                <React.Fragment key={message.idMessage}>
                  {message.type === 'incoming' ? (
                    <div className={styles.fullChatMessage + ' ' + styles.incoming}>{message.textMessage}</div>
                  ) : (
                    <div className={styles.fullChatMessage + ' ' + styles.outgoing}>{message.textMessage}</div>
                  )}
                </React.Fragment>
              )
            })
          }
        </div>
        <div className={styles.fullChatForm}>
          <form>
            <div className={styles.fullChatFormText}>
              <textarea value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} onKeyDown={(e) => {
                if (e.shiftKey === false && e.key === 'Enter') {
                  onSendMessage()
                }
              }}></textarea>
            </div>
            <div className={styles.fullChatFormBtn}>
              <button type='button' onClick={onSendMessage}>
                <img src={send} alt="send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FullChat