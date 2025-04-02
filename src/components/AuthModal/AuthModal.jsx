import PropTypes from 'prop-types'
import './AuthModal.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
/*import { ClockLoader } from 'react-spinners'*/

export const AuthModal = ({ closeAuthModal, isLogin, isRegistration }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  /*const [isLoading, setIsLoading] = useState(false)*/
  const [, /*isSuccessful*/ setIsSuccessful] = useState(false)
  const navigate = useNavigate()

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
        setIsSuccessful(true)
        closeAuthModal()
        navigate('/profile')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      alert('Error logging in')
      console.error(error)
    } finally {
      //setTimeout(() => setIsLoading(false), 3000)
    }
  }

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password, user }),
        cache: 'no-store',
      })
      const data = await response.json()

      if (response.ok) {
        alert('Registration successful')
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      alert('Error registering')
      console.error(error)
    } finally {
      closeAuthModal()
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
              autoComplete="current-email"
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
              autoComplete="current-password"
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
          <form className="auth-form" onSubmit={handleRegistrationSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              className="auth-input"
              placeholder="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="new-email"
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
              autoComplete="new-user"
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
              autoComplete="new-password"
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
