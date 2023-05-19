import ChatItem from '../chat/ChatItem';
import styles from './Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import React from 'react';
import { getContactsThunk } from '../../store/slices/ChatsSlices';

const Sidebar = () => {
  const contacts = useSelector((state: RootState) => state.chats.contacts.filter(contact => contact.type !== 'group'))
  const dispatch: AppDispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getContactsThunk())
  }, [dispatch])

  console.log(contacts)

  return (
    <div className={styles.leftSide}>
      <div className={styles.searchBlock}>
        <div className={styles.input}>
          <input type="text" placeholder='Поиск или новый чат' />
        </div>
      </div>

      <div className={styles.chats}>
        {
          contacts.map(contact => {
            return (
              <ChatItem name={contact.name} key={contact.id}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Sidebar