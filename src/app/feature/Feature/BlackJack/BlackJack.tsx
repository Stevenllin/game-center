import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import InputTextField from 'app/common/components/Form/InputTextField';
import { CardStateValuesEnum, RoundStateValuesEnum } from 'app/core/enum/feature/BlackJack';
import Card from './Card.json';
import { Player, PokerCard, FormValues, GameState } from './types';

const BlackJack: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      bet: ''
    },
    onSubmit: (formValues) => {
      console.log('formValues', formValues);
    }
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

  const handleDrawCard = () => {
    if (pokerCards.length) {
      const ramdomIndex = Math.floor(Math.random() * pokerCards.length);
      const targetCard = pokerCards[ramdomIndex];
      /** remove the target card from poker cards */
      pokerCards.splice(ramdomIndex, 1)
      setPokerCards([...pokerCards])

      switch (pokerGameState.round) {
        case (RoundStateValuesEnum.Player): {
          handleDealCard(CardStateValuesEnum.Revealed, targetCard)
          break;
        }
        case (RoundStateValuesEnum.Dealer): {
          handleDealCard(CardStateValuesEnum.Revealed, targetCard)
          break;
        }
      }
    }
  }

  const handleDealCard = (cardState: CardStateValuesEnum, targetCard: PokerCard) => {
    const targetCardUpdate = {
      value: targetCard.value,
      suit: targetCard.suit,
      state: cardState
    }

    switch (pokerGameState.round) {
      case (RoundStateValuesEnum.Dealer): {
        setPokerGameState({
          round: RoundStateValuesEnum.Dealer,
          dealerCards: [...pokerGameState.dealerCards, targetCardUpdate],
          playerCards: [...pokerGameState.playerCards]
        })
        break;
      }
      case (RoundStateValuesEnum.Player): {
        setPokerGameState({
          round: RoundStateValuesEnum.Dealer,
          dealerCards: [...pokerGameState.dealerCards],
          playerCards: [...pokerGameState.playerCards, targetCardUpdate]
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
                <button type="submit" className="button-main black-jack-btn">submit</button>
              </Form>
            </FormikProvider>
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
