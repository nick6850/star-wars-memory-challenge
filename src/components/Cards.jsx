import { useState, useEffect } from 'react'
import charactersData from '../characters.json'
import { shuffle } from 'lodash'
import cardBackImg from '/card-back.jpg'
import cardFlip from '/card-flip.mp3'
import loadingGif from '/loading.gif'

export default function Cards({ score, setScore, gameOver, setGameOver, newGame, victory, setVictory }) {
  const [characters, setCharacters] = useState([])
  const [charEl, setCharEl] = useState([])

  function pickCharacters(level = 5) {
    let randomNumbers = [];
    while (randomNumbers.length < level) {
      let randomNum = Math.floor(Math.random() * (charactersData.length - 1));
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
      }
    }
    let tempCharArr = randomNumbers.map(num => ({
      name: charactersData[num].name,
      image: `https://starwars-visualguide.com/assets/img/characters/${charactersData[num].id}.jpg`,
      isSelected: false,
      id: charactersData[num].id
    }));
    setCharacters(tempCharArr);
  }

  useEffect(() => {
    setGameOver(false);
    setScore(0);
    setVictory(false);
    pickCharacters();
  }, [newGame]);


  function generateCardBacks(){
    const cardBack = <div className='card' id='cardback'><img src={cardBackImg} alt="" /></div>
    const cardBacks = []
    for (let index = 0; index < 5; index++) {
      cardBacks.push(cardBack)
    }
    cardBacks.push(<audio src={cardFlip} volume={0.3} autoPlay/>)
    return cardBacks
  }

  function generateLoading(){
    return <div className="loading">
      <p>Loading ...</p>
      <img src={loadingGif} alt="" />
    </div>
  }


  useEffect(() => {
    score != 0 && setCharEl(generateCardBacks())
    score === 0 && setCharEl(generateLoading)
    setTimeout(() => {
      setCharEl(
        shuffle(characters).slice(0, 5).map(char => (
          <div className='card' key={char.id} onClick={() => toggleSelected(char.id)}>
            <img src={char.image} alt="" />
            <p className='charName'>{char.name}</p>
          </div>
        ))
      )
    }, score === 0 ? 3000 : 1000)
  }, [characters, score, newGame])

  function toggleSelected(id) {
    setCharacters(prev => {
      return prev.map(char => {
        if (char.id === id) {
          if (char.isSelected) {
            setGameOver(true);
            return char;
          } else {
            setScore(prev => {
              if (prev === 4) {
                setVictory(true);
              }
              return prev + 1;
            });
            return {
              ...char,
              isSelected: !char.isSelected
            };
          }
        }
        return char;
      });
    });
  }

  return (
    <>
      <div className='cards'>
        {victory | gameOver ? generateCardBacks() : charEl}
      </div>
    </>
  )
}
