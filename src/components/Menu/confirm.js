import React from 'react'

export default function Confirm({ onClick }) {
  return (
    <div onClick={onClick} className="Menu-confirm">
      <div>Open fullscreen & Click me!</div>
    </div>
  )
}
