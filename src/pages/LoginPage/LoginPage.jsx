import { useState } from 'react'
import { AuthModal } from '../../components/AuthModal/AuthModal'
import './LoginPage.scss'

export const LoginPage = () => {
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isRegistration, setIsRegistration] = useState(false)

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
          setAuthModalIsOpen={setAuthModalIsOpen}
          isLogin={isLogin}
          isRegistration={isRegistration}
        />
      )}
    </div>
  )
}
