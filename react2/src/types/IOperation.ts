export interface IOperation {
  type: 'send' | 'get',
  sendName: string,
  sendId: string,
  getName: string,
  getid: string,
  cost: number,
  value: 'EUR' | 'USD' | 'RUB' | 'JPY'
}