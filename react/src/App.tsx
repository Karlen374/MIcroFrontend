import React from 'react'
import AppHeader from './components/appHeader/appHeader'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import FriendsPage from './pages/ExchangePage'
import UsersPage from './pages/UsersPage'
import HistoryPage from './pages/HistoryPage'
import './index.scss'

const App = () => {

  return(
    <Router>      
        <AppHeader />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/exchange" element={<FriendsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/usersPage" element={<UsersPage />} />
        </Routes>
    </Router>
  )
}
export default App;