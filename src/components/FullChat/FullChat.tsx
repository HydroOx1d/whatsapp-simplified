import styles from './FullChat.module.css'
import send from '../../assets/send.svg'

const FullChat = () => {
  return (
    <div className={styles.fullChat}>
      <div className={styles.fullChatWrap}>
        <div className={styles.fullChatHeader}>
          <div className={styles.fullChatUser}>
            <div className={styles.fullChatUserAvatar}>
              <img src="https://pps.whatsapp.net/v/t61.24694-24/315281804_2412280942260830_3394814275392837306_n.jpg?ccb=11-4&oh=01_AdQzbNNvDZWdtR2ewzywCeIKttTMHpFRo9-pCs8Cj3oiTg&oe=647333A8" alt="" />
            </div>
            <div className={styles.fullChatUserInfo}>
              <div className={styles.fullChatUserName}>Murad</div>
            </div>
          </div>
        </div>
        <div className={styles.fullChatMain}></div>
        <div className={styles.fullChatForm}>
          <form>
            <div className={styles.fullChatFormText}>
              <textarea></textarea>
            </div>
            <div className={styles.fullChatFormBtn}><button type='button'><img src={send} alt="send" /></button></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FullChat