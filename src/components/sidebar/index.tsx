import ChatItem from '../chat/ChatItem';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.leftSide}>
      <div className={styles.searchBlock}>
        <div className={styles.input}>
          <input type="text" placeholder='Поиск или новый чат' />
        </div>
      </div>

      <div className={styles.chats}>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
      </div>
    </div>
  )
}

export default Sidebar