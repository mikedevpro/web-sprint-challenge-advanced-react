import React, { useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

// Suggested initial states
const initialMessage = '(2, 2)'
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
    response:'',
  })// the index the "B" is at

  const getXY = () => {
    const { index } = state;
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y }
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  const getXYMessage = () => {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  };

  const reset = () => {
    setState({
      ...state,
      message: '',
      email: '',
      index: initialIndex,
      steps: initialSteps,
      response: '',
    });
    
    // Use this helper to reset all states to their initial values.
  };

  const getNextIndex = (direction) => {
    const { index } = state;
    const currentX = index % 3;
    const currentY = Math.floor(index / 3);
    let newX = currentX;
    let newY = currentY;

    if (direction === 'left') {
      nexX = Math.max(currentX - 1, 0);
    } else if (direction === 'up') {
      newY = Math.max(currentY - 1, 0);
    } else if (direction === 'right') {
      newX = Math.min(currentX + 1, 2);
    } else if (direction === 'down') {
      newY = Math.min(currentY + 1, 2)
    }

    const newIndex = newY * 3 + newX;
    return newIndex;
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  };

  const move = (direction) => {
    const newIndex = getNextIndex(direction);

    if (newIndex !== state.index) {
      setState(prevState => ({
        ...prevState,
        index: newIndex,
        steps: prevState.steps + 1,
        response: '',
      }));
    } else {
      let response = '';
      if (direction === 'up') {
        response = "You can't go up";
      } else if (direction === 'down') {
        response = "You can't go down"
      } else if (direction === 'left') {
        response = "You can't go left"
      } else if (direction === 'right') {
        response = "You can't go right"
      }
      setState({ ...state, response });
    }
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  };

  const onChange = (evt) => {
    const { id, value } = evt.target
    setState({ ...state, [id]: value});
    };
  
    // You will need this to update the value of the input.
  

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { x, y } = getXY()
    axios.post('http://localhost:9000/api/result', {...state, x, y})
      .then((res) => {
        setState(prevState => ({
          ...prevState,
          response: res.data.message,
          email: initialEmail,
        }));
      })
      .catch((err) => {
        setState({ ...state, email: '', response: err.response.data.message });
      });

    // Use a POST request to send a payload to the server.
    
  };


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {state.steps} {state.steps !== 1 ? 'times' : 'time'}</h3>
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
        <h3 id="message">{state.response}</h3>
      </div>
      <div id="keypad">
        <button onClick = {() => move('left')} id="left">LEFT</button>
        <button onClick = {() => move('up')} id="up">UP</button>
        <button onClick = {() => move('right')} id="right">RIGHT</button>
        <button onClick = {() => move('down')} id="down">DOWN</button>
        <button onClick = {() => reset()} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
          id="email" 
          type="email" 
          placeholder="type email" 
          onChange={onChange} 
          value={state.email}
          />
        <input 
          id="submit" 
          type="submit" 
          value="submit"
          />
      </form>
    </div>
  )
}

