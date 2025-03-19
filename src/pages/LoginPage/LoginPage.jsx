import './LoginPage.scss'

export const LoginPage = () => {
  return (
    <div className="login-page">
      <p className="login-page__text text-accent">Hello,</p>
      <h1 className="login-page__title">
        Nice to meet <span>you!</span>
      </h1>
      <div className="auth-container">
        <button className="auth-button login">Login</button>
        <p>|</p>
        <button className="auth-button register">Register</button>
      </div>
    </div>
  )
}
