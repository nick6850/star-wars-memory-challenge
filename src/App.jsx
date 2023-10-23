import { useState } from 'react'
import Cards from './components/Cards'
import gameOverGif from '/game_over.gif'
import victoryGif from '/victory.gif'

function App() {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [newGame, isNewGame] = useState(true)

  return (
    <>
      <h1 id='game-title'>Star Wars Memory Challenge</h1>
      <Cards score = {score} setScore={setScore} newGame={newGame} victory={victory} setVictory={setVictory} gameOver={gameOver} setGameOver={setGameOver}/>

      <div id="score">Your score: <span className='bold'>{score}</span></div>
      {gameOver && <div id="gameover">
      <img src={gameOverGif} alt="" />
      <p>Game over!</p>
      <button onClick={() => isNewGame(prev => !prev)}>New Game</button>
      </div>}

      {victory && <div id="victory">
      <img src={victoryGif} alt="" />
      <p>You won!</p>
      <button onClick={() => isNewGame(prev => !prev)}>New Game</button>
      </div>}
    </>
  )
}

export default App
