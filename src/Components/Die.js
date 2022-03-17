import React from 'react'

export default function Die(props){
    return(
        <div 
            onClick={()=>props.hold(props.id)} 
            style={{backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"}} 
            className='die-container'
        >
            <h1>{props.value}</h1>
        </div>
    )
}