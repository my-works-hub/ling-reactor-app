import PropTypes from 'prop-types'
import './AuthModal.scss'

export const AuthModal = ({ closeAuthModal, isLogin, isRegistration }) => {
  return (
    <div className="auth-modal">
      <button
        className="close-button bgd-img"
        onClick={() => closeAuthModal()}
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
