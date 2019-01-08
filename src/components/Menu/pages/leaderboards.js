import React from 'react'

import Button from '../../common/button'
import Storage from '../../../helpers/storage'
import { getNiceScore } from '../../../helpers/score'

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
      <div className="Menu-centered Menu-leaderboards">
        <h1>Leaderboards</h1>

        <ul>
          {this.state.leaderboards.map((el, index) => (
            <li key={index}>
              <div>{el.username}</div>
              <div>{getNiceScore(el.score)}</div>
              <div>
                ...........................................................
              </div>
            </li>
          ))}
        </ul>

        <Button onClick={onExit}>back</Button>
      </div>
    )
  }
}
