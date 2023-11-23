import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    first: '',
    last: '',
    large: '',
    gender: '',
    phone: '',
  }

  componentDidMount() {
    this.aipCall()
  }

  aipCall = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://randomuser.me/api/?page=1&results=1&seed=abc`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()

      const {name} = fetchedData.results[0]
      const {gender} = fetchedData.results[0]
      const {phone} = fetchedData.results[0]
      const {picture} = fetchedData.results[0]

      const {first, last} = name
      const {large} = picture

      this.setState({
        apiStatus: apiStatusConstants.success,
        first,
        last,
        large,
        gender,
        phone,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderUserDetails = () => {
    const {first, last, phone, gender, large} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="outer-box">
            <div className="image-section">
              <img className="user-image" src={large} alt="Userimage" />
            </div>
            <div className="details-section">
              <div className="name-section">
                <h1 className="first-name">{first}</h1>
                <h1 className="first-name last-name">{last}</h1>
              </div>
              <h1 className="first-name gender">{gender}</h1>
              <h1 className="first-name phone">{phone}</h1>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderFinalCall = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="display-center">{this.renderFinalCall()}</div>
  }
}

export default Home
