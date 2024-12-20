import React, { useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex); // the index the "B" is at

  function getXY() {

    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  const reset = () => {
    setMessage({...message, message: ''});
    setEmail({...email, email: ''});
    setSteps({...steps, steps: 0})
    setIndex({...index, index: 4})
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    let nextIndex = index
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  const onChange = (evt) => {
    const{id, value} = evt.target
    if (id === 'email'){
      setEmail (value)
    }
  }
    // You will need this to update the value of the input.
  

  const onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    
  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates ${getXYMessage()}`}</h3>
        <h3 id="steps">You moved {steps} time$</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick = {() => move('left')} id="left">LEFT</button>
        <button onClick = {() => move('up')} id="up">UP</button>
        <button onClick = {() => move('right')} id="right">RIGHT</button>
        <button onClick = {() => move('down')} id="down">DOWN</button>
        <button onClick = {() => reset()} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit" value="submit"></input>
      </form>
    </div>
  )
}

