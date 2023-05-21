import { useSelector } from 'react-redux'
import { RootState } from '../store/index';
import { Navigate } from 'react-router-dom';

type AuthCheckProps = {
  children: JSX.Element
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)

  if(!isAuth) {
    return <Navigate to={'/login'}/>
  }

  return children
}

export default AuthCheck