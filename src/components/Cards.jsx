import { useState, useEffect } from 'react';
import charactersData from '../characters.json';
import { shuffle } from 'lodash';
import cardBackImg from '/card-back.jpg';
import cardFlip from '/card-flip.mp3';
import loadingGif from '/loading.gif';

export default function Cards({ score, setScore, gameOver, setGameOver, newGame, victory, setVictory, difficulty }) {
  const [characters, setCharacters] = useState([]);
  const [charEl, setCharEl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function pickCharacters() {
    let randomNumbers = [];
    while (randomNumbers.length < difficulty) {
      let randomNum = Math.floor(Math.random() * (charactersData.length - 1));
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
      }
    }
    let tempCharArr = randomNumbers.map((num) => ({
      name: charactersData[num].name,
      image: `https://starwars-visualguide.com/assets/img/characters/${charactersData[num].id}.jpg`,
      isSelected: false,
      id: charactersData[num].id,
    }));
    setCharacters(tempCharArr);
  }

  useEffect(() => {
    pickCharacters();
    setIsLoading(true);
    setGameOver(false);
    setScore(0);
    setVictory(false);
  }, [newGame]);

  useEffect(() => {
    score !== 0 && setCharEl(cardBacks);
    let newEl = shuffle(characters).slice(0, 5).map((char) => (
      <div
        key={char.id}
        className={`card`}
        onClick={() => toggleSelected(char.id)}
      >
        <img src={char.image} alt='' />
        <p className='charName'>{char.name}</p>
      </div>
    ))
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setCharEl(newEl);
    }, score === 0 ? 3000 : 500);

    return () => clearTimeout(timeout);
  }, [score, newGame, isLoading]);

    const cardBack = <div className='card' id='cardback'><img src={cardBackImg} alt='' /></div>;
    const cardBacks = [<audio key='cardflip' src={cardFlip} autoPlay />];
    for (let index = 0; index < 5; index++) {
      cardBacks.push(cardBack);
    }


  function toggleSelected(id) {
      setCharacters((prev) => {
        return prev.map((char) => {
          if (char.id === id) {
            if (char.isSelected) {
              setGameOver(true);
              return char;
            } else {
              setScore((prev) => {
                if (prev === difficulty - 1) {
                  setVictory(true);
                }
                return prev + 1;
              });
              return {
                ...char,
                isSelected: !char.isSelected,
              };
            }
          }
          return char;
        });
      });
  }

  const Loading =(
      <div className='loading'>
        <p>Loading ...</p>
        <img src={loadingGif} alt='' />
      </div>
    );

  return (
    <div className='cards'>
      {isLoading ? Loading : victory || gameOver ? cardBacks : charEl}
    </div>
  );
}