import { useEffect, useState } from 'react'
import { AuthModal } from '../../components/AuthModal/AuthModal'
import './LoginPage.scss'

export const LoginPage = () => {
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isRegistration, setIsRegistration] = useState(false)

  useEffect(() => {
    const modalState = localStorage.getItem('authModalIsOpen')
    if (modalState === 'true') {
      setAuthModalIsOpen(true)
      const isLoginState = localStorage.getItem('isLogin') === 'true'
      const isRegistrationState =
        localStorage.getItem('isRegistration') === 'true'
      setIsLogin(isLoginState)
      setIsRegistration(isRegistrationState)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('authModalIsOpen', authModalIsOpen)
    localStorage.setItem('isLogin', isLogin)
    localStorage.setItem('isRegistration', isRegistration)
  }, [authModalIsOpen, isLogin, isRegistration])

  const closeAuthModal = () => {
    setAuthModalIsOpen(false)
    setIsLogin(false)
    setIsRegistration(false)
  }

  return (
    <div className="login-page">
      {!authModalIsOpen ? (
        <div className="login-page__content">
          <p className="login-page__text text-accent">Hello,</p>
          <h1 className="login-page__title">
            Nice to meet <span>you!</span>
          </h1>
          <div className="auth-container">
            <button
              className="auth-button login"
              onClick={() => {
                setAuthModalIsOpen(true)
                setIsLogin(true)
                setIsRegistration(false)
              }}
            >
              Login
            </button>
            <p>|</p>
            <button
              className="auth-button register"
              onClick={() => {
                setAuthModalIsOpen(true)
                setIsRegistration(true)
                setIsLogin(false)
              }}
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <AuthModal
          closeAuthModal={closeAuthModal}
          isLogin={isLogin}
          isRegistration={isRegistration}
        />
      )}
    </div>
  )
}
