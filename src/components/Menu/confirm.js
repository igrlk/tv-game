import React from 'react'

export default function Confirm({ onClick }) {
  return (
    <div onClick={onClick} className="Menu-confirm">
      <div>
        Open fullscreen <small>[F11]</small> & Click me!
      </div>
    </div>
  )
}
