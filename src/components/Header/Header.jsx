import { MainLogo } from '../MainLogo'
import { ThemeToggle } from '../UI/ThemeToggle/ThemeToggle'
import './Header.scss'

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <MainLogo />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
