import classNames from 'classnames'
import { useMainContext } from '../../../context/MainContext'
import './ThemeToggle.scss'

export const ThemeToggle = () => {
  const { theme, setTheme } = useMainContext()

  return (
    <button
      className={classNames('theme-toggle-button bgd-img', {
        'dark-mode': theme === 'dark',
        'light-mode': theme === 'light',
      })}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  )
}
