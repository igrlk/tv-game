import React from 'react'

import Button from '../button'

export default class Leaderboards extends React.Component {
  render() {
    const { onExit } = this.props
    return (
      <div onClick={onExit} className="Menu-leaderboards">
        <Button onClick={onExit}>back</Button>
      </div>
    )
  }
}
