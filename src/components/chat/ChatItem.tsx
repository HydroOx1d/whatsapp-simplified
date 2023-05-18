import React from 'react'
import styles from './ChatItem.module.css'

const ChatItem = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatAvatar}>
        <img src="https://pps.whatsapp.net/v/t61.24694-24/315281804_2412280942260830_3394814275392837306_n.jpg?ccb=11-4&oh=01_AdQzbNNvDZWdtR2ewzywCeIKttTMHpFRo9-pCs8Cj3oiTg&oe=647333A8" alt="Avatar" />
      </div>
      <div className={styles.chatBlock}>
        <span className={styles.chatName}>Murad</span>
      </div>
    </div>
  )
}

export default ChatItem