import React from 'react'
import styles from './Login.module.css'
import whatsapp from '../../assets/whatsapp.svg'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/AuthSlice'
import { getStateInstance } from '../../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loginData, setLoginData] = React.useState({
    instance: '',
    apiTokenInstance: ''
  })
  const [error, setError] = React.useState('')
  const dispatch = useDispatch()
  const naviagte = useNavigate()

  const handleSumbit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getStateInstance({instance: loginData.instance, apiTokenInstance: loginData.apiTokenInstance}).then((resultStateInstance) => {
      switch(resultStateInstance?.stateInstance) {
        
        case "authorized": { 
          dispatch(login({
            instance: loginData.instance,
            apiInstanceToken: loginData.apiTokenInstance
          }))
          naviagte('/', {replace: true})
          return;
        }

        case 'notAuthorized': {
          return setError('Вы не авторизованы в кабинете Green Api')
        }
      }
    }).catch(() => {
      setError('Некорректные данные')
    })
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrap}>
        <div className={styles.logo}>
          <img src={whatsapp} alt="whatsapp" />
        </div>
        <form onSubmit={handleSumbit}>
          <div className={styles.input}>
            <input type="text" placeholder='Введите instance' value={loginData.instance} onChange={(e) => setLoginData(prev => ({...prev, instance: e.target.value}))} />
          </div>
          <div className={styles.input}>
            <input type="text" placeholder='Введите apiTokenInstance' value={loginData.apiTokenInstance} onChange={(e) => setLoginData(prev => ({...prev, apiTokenInstance: e.target.value}))}/>
          </div>
          {error && (<span style={{margin: '5px 0', display: 'block'}}>{error}</span>)}
          <button type='submit' className={styles.btn}>Войти</button>
        </form>
      </div>
    </div>
  )
}

export default Login