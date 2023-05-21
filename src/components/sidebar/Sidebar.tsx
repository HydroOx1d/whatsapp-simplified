import React from 'react';
import styles from './Sidebar.module.css';
import ChatItem from '../chat/ChatItem';
import { checkWhatsapp, getContactInfo } from '../../api';
import { ContactInfoType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getContactsThunk } from '../../store/slices/ChatsSlices';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const searchValueRef = React.useRef<ReturnType<typeof setTimeout>>()
  const [contactInfo, setContactInfo] = React.useState<ContactInfoType | null>(null)

  const {apiTokenInstance, instance} = useSelector((state: RootState) => state.auth)

  const contacts = useSelector((state: RootState) => state.chats.contacts.filter(contact => contact.type !== 'group'))
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const handleSearch = async () => {
    if(searchValue) {
      // оставляем только цифры с поиска
      const phoneNumber = searchValue.replace(/\D+/g, '')
      // проверяем, существует ли аккаунт с таким номером
      const isExist = (await checkWhatsapp(phoneNumber, {apiTokenInstance, instance}))?.existsWhatsapp
      
      // если да, то запрашиваем инфорацию о контакте
      if(isExist) {
        const contactInfo = (await getContactInfo(`${phoneNumber}@c.us`, {apiTokenInstance, instance})) || null

        setContactInfo(contactInfo)
      } else {
        setContactInfo(null)
      }
    }
  }

  const onMoveToChat = (chatId: string) => {
    navigate('/chat/' + chatId.replace('@c.us', ''))
  }

  React.useEffect(() => {
    dispatch(getContactsThunk({apiTokenInstance, instance}))
  }, [])

  React.useEffect(() => {
    searchValueRef.current = setTimeout(() => {
      handleSearch()
    }, 1000)  

    return () => {
      clearTimeout(searchValueRef.current)
    }
  }, [searchValue])
   
  return (
    <div className={styles.leftSide}>
      <div className={styles.searchBlock}>
        <div className={styles.input}>
          <input
           type="text" 
           placeholder='Поиск или новый чат'
           value={searchValue}
           onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.chats} style={searchValue ? {overflow: 'hidden'} : {overflow: 'auto'}}>
        <div className={styles.contacts}>
            {searchValue && (
              <div className={styles.searchResults}>
                <div className={styles.chatsTitle}>Найденные чаты</div>
                {contactInfo ? (
                  <div onClick={() => onMoveToChat(contactInfo.chatId)}><ChatItem name={contactInfo?.name}/></div>
                ) : (
                  <span className={styles.chatsTitle} style={{fontSize: '16px'}}>Пользователь не найден</span>
                )}
              </div>
            )}
            <div className={styles.chatsTitle}>Контакты</div>
            <div className={styles.contactBlock}>
              {
                contacts.map(contact => {
                  return (
                    <div key={contact.id} onClick={() => onMoveToChat(contact.id)}>
                      <ChatItem name={contact.name}/>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Sidebar