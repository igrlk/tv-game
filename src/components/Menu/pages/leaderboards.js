import React from 'react'

import Button from '../button'
import Storage from '../../../helpers/storage'

export default class Leaderboards extends React.Component {
  state = {
    leaderboards: []
  }

  componentWillMount() {
    this.setState({
      leaderboards: Storage.getLeaderboards()
    })
  }

  render() {
    const { onExit } = this.props
    return (
      <div onClick={onExit} className="Menu-centered Menu-leaderboards">
        <h1>Leaderboards</h1>

        <ul>
          {this.state.leaderboards.map(el => (
            <li>
              <div>{el.username}</div>
              <div>{el.score}</div>
            </li>
          ))}
        </ul>

        <Button onClick={onExit}>back</Button>
      </div>
    )
  }
}
