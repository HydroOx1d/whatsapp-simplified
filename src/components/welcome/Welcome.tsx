import React from 'react'
import styles from './Welcome.module.css'
import whatsapp from '../../assets/whatsapp.svg'

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.wrap}>
        <div className={styles.vector}>
          <img src={whatsapp} alt="whatsapp" />
        </div>
        <h1 className={styles.title}>Добро пожаловать</h1>
      </div>
    </div>
  )
}

export default Welcome