import axios from "axios";
import IAuthParams from "src/types/IAuthParams";

const useAuthServices = () => {
  const _apiBase = 'http://localhost:5000/auth';

  const signUpUser = async (params: IAuthParams.ISignUpParams) => {
    const res = await axios.post(`${_apiBase}/signUp`,params)
    return res.data.message
  }

  const signInUser = async (params: IAuthParams.ISignInParams) => {
    const res = await axios.post<IAuthParams.IRegisteredUserData>(`${_apiBase}/signIn`, params)
    return res.data
  }

  return {
    signUpUser,
    signInUser
  }
}

export default useAuthServices