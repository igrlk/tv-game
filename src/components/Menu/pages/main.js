import React from 'react'

import Button from '../button'

export default class MenuMainPage extends React.Component {
  render() {
    const { username, history, changeCurrentPage } = this.props
    return (
      <div className="Menu-main-page Menu-centered">
        <h1>
          Space <span>Invaders</span>
        </h1>

        <div className="Menu-main-page__username">
          <h2>{username}</h2>
          <Button onClick={() => console.log('clicked')}>
            change username
          </Button>
        </div>

        <Button onClick={() => history.push('/game')}>new game</Button>

        <Button onClick={changeCurrentPage(3)}>leaderboards</Button>
      </div>
    )
  }
}
