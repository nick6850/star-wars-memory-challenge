import React, { useRef } from 'react';
import hoverSound from '/hover_sound.mp3';
import transitionSound from '/transition.mp3';

export default function Levels({setDifficulty, setGameOn}) {
  const hoverSoundRef = useRef(new Audio(hoverSound));
  const transitionSoundRef = useRef(new Audio(transitionSound));

  const playSound = (soundRef) => {
    soundRef.current.currentTime = 0;
    soundRef.current.play();
  };

  const handleHover = () => {
    playSound(hoverSoundRef);
  };

  const handleClick = (level) => {
    playSound(transitionSoundRef);
    console.log(typeof level)
    setDifficulty(level === 'Easy' ? 5 : level === 'Medium' ? 10 : 15)
    setGameOn(true)
  };



  return (
    <div className="levels">
      <h1>Choose difficulty:</h1>
      {['Easy', 'Medium', 'Hard'].map((level) => (
        <p
          key={level}
          className="level"
          onMouseEnter={handleHover}
          onMouseLeave={hoverSoundRef.current.pause}
          onClick={() => handleClick(level)}
        >
          {level}
        </p>
      ))}
    </div>
  );
}
