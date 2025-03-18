import { MainLogo } from '../MainLogo'
import './Header.scss'

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <MainLogo />
      </div>
    </header>
  )
}
