export interface IUser {
  id: string;
  name:string;
  moneys: {'EUR': number, 'USD' : number, 'JPY': number, 'RUB': number}
}