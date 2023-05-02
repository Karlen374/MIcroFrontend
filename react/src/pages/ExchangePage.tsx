import React, { Suspense, useEffect } from 'react'
import ExchangeForm from '../components/ExchangeForm/ExchangeForm'
import AppAlert from '../components/AppAlert.tsx/AppAlert'
import { Link } from 'react-router-dom'

const ExchangePage = () => {
  return(
    <div className='wrapper'>
      <AppAlert />
      <div className="usersList__Nav">
        <Link to='/usersPage'>Главная страница</Link>/
        <Link to='/history'>история операций</Link>
      </div>
      <ExchangeForm />
    </div>
  )
}
export default ExchangePage