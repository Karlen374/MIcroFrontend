import React, { useState } from 'react'
import './SignUp.scss'
import { Button, TextField } from '@mui/material'
import { useAppDispatch } from '../../hooks/hooks'
import { changeSignUpStatus, signUp } from '../../store/slices/userSlice'

const SignUp = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch();

  const onSignUp = () => {
    setPassword('')
    setName('')
    dispatch(signUp({name, password}))
  }

  const signUpButton = (name && password) 
          ? <Button onClick={onSignUp} variant="outlined">Регистрация</Button>
          : <Button disabled>Регистрация</Button>

  return (
    <div className="signUp">
      <h1>Регистрация</h1>
      <div className="signUp__Form">
      <TextField 
        id="outlined-basic" 
        label="Никнейм" 
        variant="outlined" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
          id="filled-password-input"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div>
        {signUpButton}
        <Button variant="text" color="success" onClick={() => dispatch(changeSignUpStatus(false))}>Уже есть Аккаунт ?</Button>
        </div>
    </div>
  )
}
export default SignUp;