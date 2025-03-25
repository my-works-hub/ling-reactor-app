import PropTypes from 'prop-types'
import './AuthModal.scss'
import { useState } from 'react'

export const AuthModal = ({ closeAuthModal, isLogin, isRegistration }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        cache: 'no-store',
      })

      const data = await response.json()
      if (response.ok) {
        alert('Login successful')
      } else {
        alert(data.message || 'Login failed')
      }
      closeAuthModal()
    } catch (error) {
      alert('Error logging in')
      console.error(error)
    }
  }

  return (
    <div className="auth-modal">
      <button
        className="close-button bgd-img"
        onClick={() => closeAuthModal()}
      />
      {isLogin && (
        <div className="login-content">
          <h2 className="auth-modal__title">Sign in</h2>
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              className="auth-input"
              placeholder="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              className="auth-input"
              placeholder="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit" className="auth-submit-button">
              Login
            </button>
          </form>
        </div>
      )}

      {isRegistration && (
        <div className="sign-up-content">
          <h2 className="auth-modal__title">Sign up</h2>
          <form className="auth-form">
            <input
              type="email"
              id="email"
              name="email"
              className="auth-input"
              placeholder="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="text"
              id="user"
              name="user"
              className="auth-input"
              placeholder="username"
              required
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              className="auth-input"
              placeholder="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit" className="auth-submit-button">
              Add new user
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

AuthModal.propTypes = {
  closeAuthModal: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  isRegistration: PropTypes.bool.isRequired,
}
