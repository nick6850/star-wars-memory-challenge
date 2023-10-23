import { useState, useEffect, useRef } from 'react';
import Cards from './components/Cards';
import gameOverGif from '/game_over.gif';
import victoryGif from '/victory.gif';
import mainTheme from '/main_theme.mp3';
import volumeOn from '/volume_on.svg'
import volumeOff from '/volume_off.svg'

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [newGame, setNewGame] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioRef = useRef(new Audio(mainTheme));

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
      <h1 id="game-title">Star Wars Memory Challenge</h1>
      <Cards
        score={score}
        setScore={setScore}
        newGame={newGame}
        victory={victory}
        setVictory={setVictory}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />

      <div id="score">
        Your score: <span className="bold">{score}</span>
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

      <div>
        <button id='volumeBtn' onClick={handleToggleAudio}>
          <img src= {isAudioPlaying ? volumeOn: volumeOff}/>
        </button>
      </div>
    </>
  );
}

export default App;
