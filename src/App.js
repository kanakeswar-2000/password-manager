import './App.css'

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Passworditem from './components/PasswordItem'
class App extends Component {
  state = {
    passwordsList: [],
    websiteName: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
    passwordsCount: 0,
  }
  onChangeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  
  addListItem = event => {
    const {websiteName, username, password} = this.state
    event.preventDefault()
    
    const newItem = {
      id: uuidv4(),
      websiteName,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newItem],
      passwordsCount: prevState.passwordsCount + 1,
      websiteName: '',
      username: '',
      password: '',
    }))
  }
  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  ToggleisCheckedStatus = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  updatetheList = id => {
    const {passwordsList} = this.state
    const updatedList = passwordsList.filter(eachitem => {
      if (eachitem.id !== id) {
        return eachitem
      }
    })
    this.setState(prevState => ({
      passwordsList: updatedList,
      passwordsCount: prevState.passwordsCount - 1,
    }))
  }
  getfilteredList = () => {
    const {passwordsList,searchInput}=this.state
    const filteredList = passwordsList.filter(eachitem => {
      if (
        eachitem.websiteName.toUpperCase().includes(searchInput.toUpperCase())
      ) {
        return eachitem
      }
    })
    return filteredList
  }
  render() {
    const {
      
      websiteName,
      username,
      password,
      searchInput,
      isChecked,
      passwordsCount,
    } = this.state
    const filteredpasswordsList = this.getfilteredList()
    let passwordEl
    if (filteredpasswordsList.length > 0) {
      passwordEl = (
        <ul>
          {filteredpasswordsList.map(eachitem => (
            <Passworditem
              Details={eachitem}
              key={eachitem.id}
              ischecked={isChecked}
              updatetheList={this.updatetheList}
            />
          ))}
        </ul>
      )
    } else {
      passwordEl = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="image"
          />
          <p>No Passwords</p>
        </div>
      )
    }
    return (
      <div className="bg-container">
        <div className="app-container">
          <div>
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </div>
          <div className="top-container">
            <h1>Add New Password</h1>
            <form className="form-container" onSubmit={this.addListItem}>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteName}
                  value={websiteName}
                />
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <button type="submit">Add</button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="image"
              />
            </div>
          </div>
          <div className="bottom-container">
            <div className="count-container">
              <h1>Your Passwords</h1>
              <p>{passwordsCount}</p>
            </div>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="icon"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.ToggleisCheckedStatus}
              />
              <label htmlFor="checkbox">Show passwords</label>
            </div>
            {passwordEl}
          </div>
        </div>
      </div>
    )
  }
}

export default App
