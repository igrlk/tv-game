import React from 'react'

import Button from '../../common/button'

export default class MenuMainPage extends React.Component {
  usernameInput = React.createRef()

  state = {
    isUsernameIsEditing: false,
    username: ''
  }

  onChangeHandler = ({ target }) => {
    this.setState({ username: target.value })
  }

  saveUsername = () => {
    if (this.state.username.length > 0) {
      this.setState({
        isUsernameIsEditing: false
      })
      this.props.setUsername(this.state.username)
    }
  }

  allowUsernameEditing = () => {
    this.setState({
      isUsernameIsEditing: true
    })
    setTimeout(() => {
      this.usernameInput.current.focus()
    })
  }

  componentDidMount() {
    this.setState({
      username: this.props.username
    })
  }

  render() {
    const { history, changeCurrentPage } = this.props
    const { isUsernameIsEditing, username } = this.state
    return (
      <div className="Menu-main-page Menu-centered">
        <h1>
          Space <span>Invaders</span>
        </h1>

        <div className="Menu-main-page__username">
          {isUsernameIsEditing && (
            <input
              ref={this.usernameInput}
              maxLength="20"
              type="text"
              value={username}
              onChange={this.onChangeHandler}
            />
          )}
          <h2>{this.props.username}</h2>
          {isUsernameIsEditing ? (
            <Button onClick={this.saveUsername}>save username</Button>
          ) : (
            <Button onClick={this.allowUsernameEditing}>change username</Button>
          )}
        </div>

        <Button onClick={() => history.push('/game')}>new game</Button>

        <Button onClick={changeCurrentPage(3)}>leaderboards</Button>
      </div>
    )
  }
}
