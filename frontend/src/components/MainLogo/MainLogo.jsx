import React from 'react'
import './MainLogo.scss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useMainContext } from '../../context/MainContext'

export const MainLogo = () => {
  const { theme } = useMainContext()
  return (
    <Link
      to="/"
      className={classNames('main-logo bgd-img', {
        'main-logo--dark': theme === 'dark',
        'main-logo--light': theme === 'light',
      })}
    />
  )
}
