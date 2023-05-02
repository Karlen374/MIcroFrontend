namespace IAuthParams{
  export interface ISignUpParams {
    name: string
    password: string
  }
  export type ISignInParams = ISignUpParams

  export interface IRegisteredUserData {
    name: string
    moneys: {'EUR': number, 'USD' : number, 'JPY': number, 'RUB': number}
    id: string
  }
}
export default IAuthParams