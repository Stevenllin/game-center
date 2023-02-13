import React, { useState, useEffect } from 'react';
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
  const [wordToGuess, setWordToGuess] = useState<string>('test');
  const [guessedWord, setGuessedWord] = useState<string[]>([]);
  const incorrectLetter = guessedWord.filter(letter => !wordToGuess.includes(letter));

  console.log('wordToGuess', wordToGuess);

  const handleAddGuessedLetter = (letter: string) => {
    if (guessedWord.includes(letter)) return

    setGuessedWord(currentLetter => [...currentLetter, letter]);
  }


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      handleAddGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedWord])

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
        {wordToGuess.split('').map((letter, index) => (
          <span key={index} className="hang-word-item d-flex justify-content-center">
            <span
              style={{
                visibility: guessedWord.includes(letter) ? 'visible' : 'hidden'
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>

      {/** hangman keyboard */}
      <div className="hang-keyboard mt-5">
        {
          Keyboard.map((key, index) => (
            <div key={index} className="hang-keyboard-item p-4">
              <button>{key}</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Hang;
