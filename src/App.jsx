import { useState, useEffect, useRef } from 'react';
import Cards from './components/Cards';
import gameOverGif from '/game_over.gif';
import victoryGif from '/victory.gif';
import mainTheme from '/main_theme.mp3';
import volumeOn from '/volume_on.svg'
import volumeOff from '/volume_off.svg'
import Levels from './components/Levels';
import backIcon from '/back_icon.png';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem('bestScore')) | 0 )
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [newGame, setNewGame] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [gameOn, setGameOn] = useState(false)
  const [difficulty, setDifficulty] = useState('')



  const audioRef = useRef(new Audio(mainTheme));

  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem('bestScore', JSON.stringify(score))
      setBestScore(score)
    }
  }, [score])


  useEffect(() => {
    const audio = audioRef.current;

    if (isAudioPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [isAudioPlaying]);

  const handleToggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };


  return (
    <>
    {gameOn && <img className='icon back' onClick={() => setGameOn(false)} src={backIcon} alt="" />}
    <h1 id="game-title">Star Wars Memory Challenge</h1>
      {!gameOn ?  
      
      <Levels 
        setDifficulty={setDifficulty}
        setGameOn={setGameOn}
      />
      : 
     
      <>
       <div className="round">{score} / {difficulty}</div>
      <Cards
        score={score}
        setScore={setScore}
        newGame={newGame}
        victory={victory}
        setVictory={setVictory}
        gameOver={gameOver}
        setGameOver={setGameOver}
        difficulty={difficulty}
      />
      
      <div id="score">
        <p>Your score: <span className="bold">{score}</span></p>
        <p>Best score: <span className="bold">{bestScore}</span></p>
      </div>
      {gameOver && (
        <div id="gameover">
          <img src={gameOverGif} alt="" />
          <p>Game over!</p>
          <button onClick={() => setNewGame((prev) => !prev)}>New Game</button>
        </div>
      )}

      {victory && (
        <div id="victory">
          <img src={victoryGif} alt="" />
          <p>You won!</p>
          <button onClick={() => setNewGame((prev) => !prev)}>New Game</button>
        </div>
      )}
      </>
      }
       <div>
        <button className='icon audio' onClick={handleToggleAudio}>
          <img src= {isAudioPlaying ? volumeOn: volumeOff}/>
        </button>
      </div>
    </>
  );
}

export default App;
