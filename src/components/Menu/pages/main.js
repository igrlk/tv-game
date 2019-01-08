import React from 'react'

import Button from '../../common/button'

export default class MenuMainPage extends React.Component {
  state = {
    isUsernameIsEditing: false,
    username: ''
  }

  onChangeHandler = ({ target }) => {
    const { value } = target
    if (value.length > 0) {
      this.setState({ username: target.value })
    }
  }

  componentDidMount() {
    this.setState({
      username: this.props.username
    })
  }

  render() {
    const { setUsername, history, changeCurrentPage } = this.props
    const { isUsernameIsEditing, username } = this.state
    return (
      <div className="Menu-main-page Menu-centered">
        <h1>
          Space <span>Invaders</span>
        </h1>

        <div className="Menu-main-page__username">
          {isUsernameIsEditing && (
            <input
              maxLength="20"
              type="text"
              value={username}
              onChange={this.onChangeHandler}
            />
          )}
          <h2>{username}</h2>
          {isUsernameIsEditing ? (
            <Button
              onClick={() => {
                this.setState({
                  isUsernameIsEditing: false
                })
                setUsername(username)
              }}
            >
              save username
            </Button>
          ) : (
            <Button
              onClick={() =>
                this.setState({
                  isUsernameIsEditing: true
                })
              }
            >
              change username
            </Button>
          )}
        </div>

        <Button onClick={() => history.push('/game')}>new game</Button>

        <Button onClick={changeCurrentPage(3)}>leaderboards</Button>
      </div>
    )
  }
}
