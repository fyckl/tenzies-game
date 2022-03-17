import React from 'react'

export default function Roll(props) {
  return (
    <div className='roll-container'>
        <button onClick={props.tenzies ? props.newGame : props.roll} type='button' className='roll-button'>{props.tenzies ? "New Game" : "Roll"}</button>
    </div>
  )
}
