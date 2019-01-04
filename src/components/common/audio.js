import React from 'react'
import { connect } from 'react-redux'

const Audio = React.forwardRef((props, ref) => (
  <audio {...props} ref={ref} preload="true" />
))

function mapStateToProps(state) {
  console.log(state)
  return {
    isMuted: state.app.isSoundMuted
  }
}

export default connect(mapStateToProps)(Audio)
