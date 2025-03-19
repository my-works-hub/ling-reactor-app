import { Outlet } from 'react-router-dom'
import './App.scss'
import { Header } from './components/Header'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </div>
  )
}
