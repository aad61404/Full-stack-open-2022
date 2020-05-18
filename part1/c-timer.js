import React, { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  console.log('rendering...', counter)

  return (
    <div style={ {padding: "15px"} }>{counter}</div>
  )
}

export default App;
