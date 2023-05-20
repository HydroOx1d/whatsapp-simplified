import React from 'react'
import styles from './ChatItem.module.css'

type ChatItemProps = {
  name: string | undefined
}

const ChatItem: React.FC<ChatItemProps> = ({name}) => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatBlock}>
        <span className={styles.chatName}>{name || 'Безымянный'}</span>
      </div>
    </div>
  )
}

export default ChatItem