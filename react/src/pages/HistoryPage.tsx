import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const History = React.lazy(() => import('remote/HistoryList'))
  return(
    <div>
      <div className="usersList__Nav">
        <Link to='/usersPage'>Главная страница</Link>
      </div>
      <Suspense>
        <History />
      </Suspense>
    </div>
  )
}
export default HistoryPage;