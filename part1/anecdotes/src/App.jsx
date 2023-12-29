import { useState } from 'react'
import { createLogger } from 'vite';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0));

  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  }

  const vote = (index) => {
    const newScore = [...scores]
    newScore[index]++;
    setScores(newScore)
  }

  const getMostVoted = (anecdotes, scores) => {
    let largest= 0;

    for (let i=0; i<scores.length; i++){
        if (scores[i] > scores[largest]) {
            largest = i;
        }
    }

    return anecdotes[largest];
  }
   

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {scores[selected]} votes</p>
      <div>
        <button onClick={() => vote(selected)}>vote</button>
        <button onClick={()=> setSelected(getRandom(anecdotes.length))}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <p>{getMostVoted(anecdotes, scores)}</p>
    </div>
  )
}

export default App