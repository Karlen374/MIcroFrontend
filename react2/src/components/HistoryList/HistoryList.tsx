import React, { useState, useEffect } from "react"
import Skeleton from '@mui/material/Skeleton';
import { IOperation } from "src/types/IOperation"
import axios from "axios";

const arr = [1,2,3,4,5,6,7,8]

const HistoryList = () => {
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState<IOperation[] | null>(null)

  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async() => {
    const res = await axios.get<IOperation[]>('http://localhost:5000/auth/history',{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('registeredUserData')).token}`
      }
    })
    setData(res.data)
    setLoader(false)
  }

  if (loader) return (<div className='spinnerList'>
                          {arr.map((item) => <Skeleton key={item} variant="rounded" height={50} />)}
                      </div>)
  return(
    <div>
      {data?.map((item, id) => {
        return (
          <div style={{ margin: 10 }} key={id}>
            <h5>{item.type === 'send' ? 'Отправление' : 'Получение от'}</h5>
            <p>{`${item.type === 'send' ? item.getName : item.sendName} - ${item.cost}${item.value}`}</p>
          </div>
        )
      })}
    </div>
  )
}
export default HistoryList