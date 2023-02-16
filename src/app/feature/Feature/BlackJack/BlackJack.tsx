import React, { useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import InputTextField from 'app/common/components/Form/InputTextField';
import { GiClubs } from 'react-icons/gi';
import { BsSuitDiamondFill } from 'react-icons/bs';
import { GiSpades } from 'react-icons/gi';
import { GiHearts } from 'react-icons/gi';
import { CardStateValuesEnum, RoundStateValuesEnum, PlayerTextEnum, SuitsTypeTextEnum } from 'app/core/enum/feature/BlackJack';
import { Player, PokerCard, FormValues, GameState, GameScore } from './types';
import Card from './Card.json';

const BlackJack: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      bet: ''
    },
    onSubmit: (formValues) => {
      setPokerGameState({
        round: RoundStateValuesEnum.Init,
        playerCards: [],
        dealerCards: []
      })
      setPlayerInfo({
        balance: playerInfo.balance - parseInt(formValues.bet),
        bet: parseInt(formValues.bet)
      })
    }
  });
  const [score, setScore] = useState<GameScore>({
    player: 0,
    dealer: 0
  });
  const [playerInfo, setPlayerInfo] = useState<Player>({
    balance: 100,
    bet: 0
  })
  const [pokerGameState, setPokerGameState] = useState<GameState>({
    round: RoundStateValuesEnum.Bet,
    playerCards: [],
    dealerCards: []
  })

  const [pokerCards, setPokerCards] = useState<PokerCard[]>(Card.cards.map(item => {
    return { ...item, state: CardStateValuesEnum.Hidden }
  }));

  useEffect(() => {
    if (pokerGameState.round === RoundStateValuesEnum.Init) {
      handleDrawCard(PlayerTextEnum.Player, CardStateValuesEnum.Revealed)
      handleDrawCard(PlayerTextEnum.Dealer, CardStateValuesEnum.Hidden)
      handleDrawCard(PlayerTextEnum.Player, CardStateValuesEnum.Revealed)
      handleDrawCard(PlayerTextEnum.Dealer, CardStateValuesEnum.Revealed)
    }
  }, [pokerGameState])

  const handleDrawCard = (player: PlayerTextEnum, state: CardStateValuesEnum) => {
    if (pokerCards.length) {
      const ramdomIndex = Math.floor(Math.random() * pokerCards.length);
      const targetCard = pokerCards[ramdomIndex];
      /** remove the target card from poker cards */
      pokerCards.splice(ramdomIndex, 1)
      setPokerCards([...pokerCards])

      handleDealCard(player, state, targetCard)
    }
  }

  const handleDealCard = (player: PlayerTextEnum, cardState: CardStateValuesEnum, targetCard: PokerCard) => {
    const targetCardUpdate = {
      value: targetCard.value,
      suit: targetCard.suit,
      state: cardState
    }

    switch (pokerGameState.round) {
      case (RoundStateValuesEnum.Init): {
        if (player === PlayerTextEnum.Dealer) {
          pokerGameState.dealerCards.push(targetCardUpdate)
          setPokerGameState({
            round: RoundStateValuesEnum.Bet,
            dealerCards: [...pokerGameState.dealerCards],
            playerCards: [...pokerGameState.playerCards]
          })
        } else {
          pokerGameState.playerCards.push(targetCardUpdate)
          setPokerGameState({
            round: RoundStateValuesEnum.Bet,
            dealerCards: [...pokerGameState.dealerCards],
            playerCards: [...pokerGameState.playerCards]
          })
        }
        break;
      }
      case (RoundStateValuesEnum.Dealer): {
        pokerGameState.dealerCards.push(targetCardUpdate)
        setPokerGameState({
          round: RoundStateValuesEnum.Player,
          dealerCards: [...pokerGameState.dealerCards],
          playerCards: [...pokerGameState.playerCards]
        })
        break;
      }
      case (RoundStateValuesEnum.Player): {
        pokerGameState.playerCards.push(targetCardUpdate)
        setPokerGameState({
          round: RoundStateValuesEnum.Dealer,
          dealerCards: [...pokerGameState.dealerCards],
          playerCards: [...pokerGameState.playerCards]
        })
        break;
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('bet', event.target.value)
  }

  return (
    <div id="black-jack" className="black-jack-container">
      <div className="row">
        <div className="col-9">
          <div className="black-jack-board">
            <FormikProvider value={formik}>
              <Form>
                <p>Your money: 
                  <span className={`${playerInfo.balance > 25 ? 'color-blue' : 'color-danger'} ms-3`}>
                    {playerInfo.balance}
                  </span>
                </p>
                <InputTextField
                  name="bet"
                  placeholder="Place a bet"
                  onChange={handleInputChange}
                />
                <button disabled={pokerGameState.round !== RoundStateValuesEnum.Bet} type="submit" className="button-main black-jack-btn">submit</button>
              </Form>
            </FormikProvider>
          </div>
          <div className="black-jack-table">
            <div className="d-flex justify-content-center">
              <p>Dealer's score is {score.dealer}</p>
            </div>
            <div className="d-flex justify-content-center">
              {
                pokerGameState.dealerCards.map((card, index) => (
                  <div key={index} className="black-jack-card my-5 mx-2">
                    {
                      card.suit === SuitsTypeTextEnum.Clubs && (
                        <div className="card-black">
                          <p className="card-value">{card.value}</p>
                          <GiClubs />
                        </div>
                      )
                    }
                    {
                      card.suit === SuitsTypeTextEnum.Diamonds && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <BsSuitDiamondFill />
                        </div>
                      )
                    }
                    {
                      card.suit === SuitsTypeTextEnum.Hearts && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <GiHearts />
                        </div>
                      )
                    }
                    {
                      card.suit === SuitsTypeTextEnum.Spades && (
                        <div className="card-black">
                          <p className="card-value">{card.value}</p>
                          <GiSpades />
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>
            <div className="d-flex justify-content-center my-5">
              <p>Your score is {score.player}</p>
            </div>
            <div className="d-flex justify-content-center">
              {
                pokerGameState.playerCards.map((card, index) => (
                  <div key={index} className="black-jack-card mx-2">
                    {
                      card.suit === SuitsTypeTextEnum.Clubs && (
                        <div className="card-black">
                          <p className="card-value">{card.value}</p>
                          <GiClubs />
                        </div>
                      )
                    }
                    {
                      card.suit === SuitsTypeTextEnum.Diamonds && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <BsSuitDiamondFill />
                        </div>
                      )
                    }
                    {
                      card.suit === SuitsTypeTextEnum.Hearts && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <GiHearts />
                        </div>
                      )
                    }
                    {
                      card.suit === SuitsTypeTextEnum.Spades && (
                        <div className="card-black">
                          <p className="card-value">{card.value}</p>
                          <GiSpades />
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="black-jack-history">
            123
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackJack;
