import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserItem from './UserItem'
import { useAppSelector } from '../../hooks/hooks'
import { Link } from 'react-router-dom'

const arr = [1,2,3,4,5,6,7,8]
const UserList = () => {
  const users = useAppSelector((store) => store.userSlice.users)
  const loader = useAppSelector((store) => store.userSlice.usersLoading)

  if (loader) return (<div className='spinnerList'>
        {arr.map((item) => <Skeleton key={item} variant="rounded" height={50} />)}
                      </div>)

  return (
    <div className="usersList">
      <div className="usersList__Nav">
        <Link to='/exchange'>обменник</Link>/
        <Link to='/history'>история операций</Link>
      </div>
      
      {users?.map((item) => <UserItem user={item} key={item.id}/> )}
    </div>
  )
}

export default UserList