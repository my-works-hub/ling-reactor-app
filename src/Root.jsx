import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { App } from './App'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { MainProvider } from './context/MainContext'

export const Root = () => (
  <Router>
    <MainProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </MainProvider>
  </Router>
)
