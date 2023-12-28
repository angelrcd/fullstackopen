/* eslint-disable react/prop-types */
import { useState } from 'react'

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  const {good, neutral, bad} = props;

  const all = good+neutral+bad;
  const average = (good - bad)/all;
  const percentagePositive = good / all * 100;

  if(all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average}   />
          <StatisticsLine text="positive" value={percentagePositive} />
        </tbody>
      </table>
    </>
  )
}

const Button =({text, onClick})=> {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text="good" onClick={()=> setGood(good+1)} />
        <Button text="neutral" onClick={()=> setNeutral(neutral+1)} />
        <Button text="bad" onClick={()=> setBad(bad+1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App