import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { App } from './App'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { MainProvider } from './context/MainContext'
import { Profile } from './pages/Profile/Profile'

export const Root = () => (
  <Router>
    <MainProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LoginPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </MainProvider>
  </Router>
)
