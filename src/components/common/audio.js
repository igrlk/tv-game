import React from 'react'
import { connect } from 'react-redux'

function Audio({ src, audioRef, isMuted }) {
  return <audio muted={isMuted} ref={audioRef} src={src} preload="true" />
}

function mapStateToProps({ app }) {
  return {
    isMuted: app.isSoundMuted
  }
}

const ConnectedAudio = connect(mapStateToProps)(Audio)

export default React.forwardRef((props, ref) => (
  <ConnectedAudio {...props} ref={ref} />
))
