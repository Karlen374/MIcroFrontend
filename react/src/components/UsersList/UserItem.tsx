import { IUser } from 'src/types/IUser'
import './UserList.scss'
import React, { FC } from 'react'
import Chip from '@mui/material/Chip'

interface IMoneyItemProps{
  user: IUser

}
const UserItem:FC<IMoneyItemProps> = ({ user }) => {

  return(
    <div className='moneyItem'>
      <Chip label={user.name} variant="outlined" />
      <div className="moneyItem__values">
        {Object.entries(user.moneys).map((item) => <div key={item[0]}>{`${item[0]} - ${item[1]}`}</div>)}
      </div>
    </div>
  )
}
export default UserItem