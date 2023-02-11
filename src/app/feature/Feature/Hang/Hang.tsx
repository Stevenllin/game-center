import React from 'react';
import { Keyboard } from './data';

const Hang: React.FC = () => {
  const word = 'test';

  return (
    <div id="hang" className="hang-container">
      {/** hangman section */}
      <div className="hang-wrapper">
        <div className="hang-head" />
        <div className="hang-body" />
        <div className="hang-right-arm" />
        <div className="hang-left-arm" />
        <div className="hang-right-leg" />
        <div className="hang-left-leg" />

        <div className="hang-device1" />
        <div className="hang-device2" />
        <div className="hang-device3" />
        <div className="hang-device4" />
      </div>

      {/** hangman word */}
      <div className="hang-word">
        {word.split('').map((letter, index) => (
          <span key={index} className="hang-word-item">{letter}</span>
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
