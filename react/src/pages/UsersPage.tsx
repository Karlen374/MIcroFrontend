import React, { useEffect } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { getAllUsers } from '../store/slices/userSlice'
import UserList from '../components/UsersList/UsersList'
import { Link } from 'react-router-dom'

const UsersPage = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return(
    <div className='wrapper'>
      <UserList />
    </div>
  )
}
export default UsersPage