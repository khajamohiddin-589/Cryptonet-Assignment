import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/')
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://media.licdn.com/dms/image/C4D0BAQGXzi4vl6P5wA/company-logo_200_200/0/1668908401404/cryptonet_technologies_logo?e=2147483647&v=beta&t=l2dTIXVzNekNdfs2PlkqcTQ4AW1zaqLkcIEBH5uo6o4"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://media.licdn.com/dms/image/C4D0BAQGXzi4vl6P5wA/company-logo_200_200/0/1668908401404/cryptonet_technologies_logo?e=2147483647&v=beta&t=l2dTIXVzNekNdfs2PlkqcTQ4AW1zaqLkcIEBH5uo6o4"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onSubmitSuccess}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
