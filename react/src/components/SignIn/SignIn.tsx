import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { signUp, changeSignUpStatus, signIn } from '../../store/slices/userSlice';
import './SignIn.scss'

const SignIn = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch();

  const signInButton = (name && password) 
          ? <Button onClick={() => dispatch(signIn({name, password}))}variant="outlined">Вход</Button>
          : <Button disabled>Вход</Button>
          
  return(
    <div className="signUp">
      <h1>Вход</h1>
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
        {signInButton}
        <Button variant="text" color="success" onClick={() => dispatch(changeSignUpStatus(true))}>Еще нет Аккаунта ?</Button>
        </div>
    </div>
  )
}

export default SignIn