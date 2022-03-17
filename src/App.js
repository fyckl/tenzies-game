import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import React from 'react'
import Die from './Components/Die';
import Roll from './Components/Roll';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(allNewDice())  
  const [tenzies, setTenzies] = useState(false)
  

  function allNewDice(){
    const newArray = []
    for(let i = 0 ; i < 10 ; i++){
        newArray.push({
          value: Math.floor(Math.random() * (6 - 1 + 1) + 1), 
          isHeld: false, 
          id: nanoid()
        })
      }
      return newArray
  }

  function rollDice(){
    setDice(prevState => prevState.map(item=>{
      return item.isHeld ? item : {...item, value: Math.floor(Math.random() * (6 - 1 + 1) + 1), id: nanoid()}
    }))
  }

  function holdDice(id){
        setDice((prevState)=> 
            prevState.map(item=>{
            return item.id === id ? {...item, isHeld: !item.isHeld} : item
          })
        )
  }
  
  useEffect(()=>{
    console.log('Dice state has changed')
    if(dice.every((item)=>{return item.isHeld}) && dice.every((item)=>{return dice[0].value === item.value})){
      setTenzies(true)
    }
  }, [dice])

  const newDiceElements = dice.map((face)=>{
    return (
      <Die 
        value={face.value}
        isHeld={face.isHeld}
        key={face.id}
        id={face.id}
        hold={holdDice}
      />
    ) 
  })

  function newGame(){
    setTenzies(false)
    setDice(allNewDice())
  }
  
  return (
    <main className='container'>
        {tenzies && <Confetti />}
        <div className='main'>
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice-container'>
            {newDiceElements}
          </div>
          <Roll 
            roll={rollDice}
            newGame={newGame}
            tenzies={tenzies}
          />
        </div>
    </main>
  );
}

export default App;
