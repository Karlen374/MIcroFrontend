import React, { useEffect } from 'react'
import SignUp from '../components/SignUp/SignUp';
import AppAlert from '../components/AppAlert.tsx/AppAlert';
import { useAppSelector } from '../hooks/hooks';
import SignIn from '../components/SignIn/SignIn';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const signUp = useAppSelector((store) => store.userSlice.signUp)
  const registeredUserData = useAppSelector((store) => store.userSlice.registeredUserData)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (registeredUserData) {
      navigate('/usersPage')
    }
  }, [registeredUserData])
  
  return(
    <div className='wrapper'>
      <AppAlert />
      {signUp ? <SignUp /> : <SignIn />}
    </div>
  )
}
export default AuthPage;