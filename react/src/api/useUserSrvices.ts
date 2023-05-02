import { IUser } from "src/types/IUser"
import { IAddNewFriendParams } from "src/types/IAddNewFriendParams"
import { ISendMoneyParams } from "src/types/IsendMoneyParams"
import axios from "axios"

const useUserServices = () => {

  const _apiBase = 'http://localhost:5000/auth';

  const getAllUsers = async () => {
    const res = await axios.get<IUser[]>(`${_apiBase}/getUsers`,{ 
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('registeredUserData')).token}`
      }
  })
    return res.data
  }

  const sendMoney = async (params: ISendMoneyParams) => {
    const res = await axios.post(`${_apiBase}/sendMoneys`, params)
    return res.data
  }

  return {
    getAllUsers,
    sendMoney
  }
}

export default useUserServices