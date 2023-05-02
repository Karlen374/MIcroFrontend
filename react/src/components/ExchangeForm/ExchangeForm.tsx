import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import './exchangeForm.scss'
import { sendMoneys } from '../../store/slices/userSlice'

const ExchangeForm = () => {
  const [count, setCount] = useState(1)
  const [value, setValue] = useState('EUR')
  const users = useAppSelector((store) => store.userSlice.users)
  const registerdUserData = useAppSelector((store) => store.userSlice.registeredUserData)
  const sendingLoader = useAppSelector((store) => store.userSlice.operationLoading)
  const [friend, setFriend] = useState<string>(users[0].id)
  const values = ['EUR', 'USD', 'JPY', 'RUB']
  const dispatch = useAppDispatch()

  const onChangeSelectedValue = (e: SelectChangeEvent) => {
    setFriend(e.target.value)
  }

  const sendMoney = () => {
    dispatch(sendMoneys({
      sendId: registerdUserData.id,
      getId: friend,
      sendName: registerdUserData.name,
      getName: users.filter((item) => item.id === friend)[0].name,
      cost: count,
      value,
    }))
  }
  return(
    <div className="exchangeForm">

      <div>
        <TextField
          id="filled-number"
          label="Количество денег"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Валюта"
          onChange={(e) => setValue(e.target.value)}
          > 
          {
            values.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)
          }
        </Select>
      </div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={friend}
          label="Кому"
          onChange={onChangeSelectedValue}
          > 
          {
            users.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
          }
        </Select>
        {sendingLoader 
        ? <LoadingButton loading variant="outlined">Submit</LoadingButton>
        : <Button variant="outlined" onClick={sendMoney}>Перевести</Button>}
    </div>)
}
export default ExchangeForm