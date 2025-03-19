import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { App } from './App'
import { LoginPage } from './pages/LoginPage/LoginPage'

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  </Router>
)
