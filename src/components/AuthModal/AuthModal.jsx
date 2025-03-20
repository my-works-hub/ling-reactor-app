import PropTypes from 'prop-types'
import './AuthModal.scss'

export const AuthModal = ({ setAuthModalIsOpen, isLogin, isRegistration }) => {
  console.log(isLogin)
  return (
    <div className="auth-modal">
      <button
        className="close-button"
        onClick={() => setAuthModalIsOpen(false)}
      />
      {isLogin && (
        <div className="login-content">
          <h2 className="auth-modal__title">Sign in</h2>
          <form className="auth-form">
            <input
              type="text"
              id="user"
              name="user"
              className="auth-input"
              placeholder="username"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              className="auth-input"
              placeholder="password"
              required
            />

            <button type="submit" className="auth-button">
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
            />
            <input
              type="text"
              id="user"
              name="user"
              className="auth-input"
              placeholder="username"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              className="auth-input"
              placeholder="password"
              required
            />

            <button type="submit" className="auth-button">
              Add new user
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

AuthModal.propTypes = {
  setAuthModalIsOpen: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  isRegistration: PropTypes.bool.isRequired,
}
