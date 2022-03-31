import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    return setGood(good + 1)
  }

  const handleNeutralClick = () => {
    return setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    return setBad(bad + 1)
  }

  return (
    <div>
      <h1> give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

const Statistics = (props) => {
 return (
   <div>
     <h1>statistics</h1>
     <StatisticLine text="good" value ={props.good} />
     <StatisticLine text="neutral" value ={props.neutral} />
     <StatisticLine text="bad" value ={props.bad} />
   </div>
 ) 
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

export default App