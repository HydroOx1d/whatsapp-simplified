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

  const contacts = useSelector((state: RootState) => state.chats.contacts.filter(contact => contact.type !== 'group'))
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const handleSearch = async () => {
    if(searchValue) {
      // оставляем только цифры с поиска
      const phoneNumber = searchValue.replace(/\D+/g, '')
      // проверяем, существует ли аккаунт с таким номером
      const isExist = (await checkWhatsapp(phoneNumber))?.existsWhatsapp
      
      // если да, то запрашиваем инфорацию о контакте
      if(isExist) {
        const contactInfo = (await getContactInfo(`${phoneNumber}@c.us`)) || null

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
    dispatch(getContactsThunk())
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

      <div className={styles.chats}>
        <div className={styles.contacts}>
            <div className={styles.contactsTitle}>Контакты</div>
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
          {searchValue && (
            <div className={styles.searchResults}>
              {contactInfo ? (
                <div onClick={() => onMoveToChat(contactInfo.chatId)}><ChatItem name={contactInfo?.name}/></div>
              ) : (
                <span>Пользователь не найден</span>
              )}
            </div>
          )}
      </div>
    </div>
  )
}

export default Sidebar