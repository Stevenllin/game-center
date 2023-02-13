import React, { useState, useEffect, useCallback } from 'react';
import words from './wordList.json';
import { Keyboard } from './data';

const HEAD = (
  <div key="head" className="hang-head" />
)

const BODY = (
  <div key="body" className="hang-body" />
)

const RIGHT_ARM = (
  <div key="rarm" className="hang-right-arm" />
)

const LEFT_ARM = (
  <div key="larm" className="hang-left-arm" />
)

const RIGHT_LEG = (
  <div key="rleg" className="hang-right-leg" />
)

const LEFT_LEG = (
  <div key="lleg" className="hang-left-leg" />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, LEFT_LEG, RIGHT_LEG]

const Hang: React.FC = () => {
  const handleGetRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }
  const [wordToGuess, setWordToGuess] = useState<string>(handleGetRandomWord);
  const [guessedWord, setGuessedWord] = useState<string[]>([]);

  const incorrectLetter = guessedWord.filter(letter => !wordToGuess.includes(letter));
  const isLoser = incorrectLetter.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedWord.includes(letter))

  const handleAddGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedWord.includes(letter)) return
    
      setGuessedWord(currentLetter => [...currentLetter, letter]);
    }, [guessedWord]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/) || isLoser || isWinner) return
      e.preventDefault()
      handleAddGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedWord, isLoser, isWinner])

  return (
    <div id="hang" className="hang-container">
      {/** hangman section */}
      <div className="hang-wrapper">
        {BODY_PARTS.slice(0, incorrectLetter.length)}
        <div className="hang-device1" />
        <div className="hang-device2" />
        <div className="hang-device3" />
        <div className="hang-device4" />
      </div>

      {/** hangman word */}
      <div className="hang-word">
        {wordToGuess.split('').map((letter, index) => {
          const isLose = !guessedWord.includes(letter) && isLoser
          console.log('isLose', isLose);
          return (
            <span key={index} className="hang-word-item d-flex justify-content-center">
              <span
                style={{
                  visibility: guessedWord.includes(letter) || isLose ? 'visible' : 'hidden',
                }}
                className={`${isLose ? 'isLose': ''}`}
              >
                {letter}
              </span>
            </span>
          )
        })}
      </div>

      {/** hangman keyboard */}
      <div className="hang-keyboard mt-5">
        {
          Keyboard.map((key, index) => {
            const isInactive = incorrectLetter.includes(key);
            const inActive = guessedWord.filter(letter => wordToGuess.includes(letter)).includes(key);
            return (
              <button
                key={key}
                type="button"
                className={`hang-keyboard-item p-4 ${inActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                onClick={() => handleAddGuessedLetter(key)}
                disabled={inActive || isInactive || isLoser || isWinner}
              >
                {key}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Hang;
