import React from 'react'
import './appHeader.scss'
import { Button, Chip } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { signOut } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const registeredUserData = useAppSelector((store) => store.userSlice.registeredUserData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSignOut =() => {
    dispatch(signOut())
    navigate('/')
  }

  return (
    <div className='header'>
      <h2>MicroFrontends</h2>
      {registeredUserData && 
      <div>
        <Chip icon={<FaceIcon />} label={registeredUserData.name} variant="outlined" />
        <Button onClick={onSignOut}color="error">Выйти</Button>
      </div>}
    </div>
  )
}
export default AppHeader