import React, { useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import InputTextField from 'app/common/components/Form/InputTextField';
import { GiClubs } from 'react-icons/gi';
import { BsSuitDiamondFill } from 'react-icons/bs';
import { GiSpades } from 'react-icons/gi';
import { GiHearts } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { RootState } from 'app/store/types';
import { useSelector } from 'react-redux';
import WarningDialog from 'app/common/components/Dialogs/WarningDialog';
import { setDialogVisibleAction } from 'app/store/element/action';
import { DialogNamesEnum } from 'app/core/enum/element/dialog';
import { CardStateValuesEnum, RoundStateValuesEnum, PlayerTextEnum, SuitsTypeTextEnum, ErrorMessageTextEnum, ResultTypeValuesEnum } from 'app/core/enum/feature/BlackJack';
import { Player, PokerCard, FormValues, GameState, Record } from './types';
import Card from './Card.json';

const BlackJack: React.FC = () => {
  const dialogState = useSelector((state: RootState) => state.elements.dialogs);
  const reduxDispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues: {
      bet: ''
    },
    onSubmit: (formValues) => {
      if (formValues.bet !== '') {
        if (!(/^[1-9]\d*$/).test(formValues.bet)) {
          setErrorMsg(ErrorMessageTextEnum.Error1);
          reduxDispatch(setDialogVisibleAction(DialogNamesEnum.WarningDialog, true));
        } else if (parseInt(formValues.bet) > playerInfo.balance) {
          setErrorMsg(ErrorMessageTextEnum.Error2);
          reduxDispatch(setDialogVisibleAction(DialogNamesEnum.WarningDialog, true));
        } else {
          setPlayerInfo({
            balance: playerInfo.balance - parseInt(formValues.bet),
            bet: parseInt(formValues.bet)
          })
          setPokerGameState({
            round: RoundStateValuesEnum.Init,
            playerCards: [],
            dealerCards: []
          })
          setErrorMsg('')
        }
      }
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
  const [gameRecord, setGameRecord] = useState<Record[]>([]);
  const [errorMsg, setErrorMsg] = useState<ErrorMessageTextEnum | string>('');

  useEffect(() => {
    if (pokerGameState.round === RoundStateValuesEnum.Init) {
      handleDrawCard(PlayerTextEnum.Player, CardStateValuesEnum.Revealed)
      handleDrawCard(PlayerTextEnum.Dealer, CardStateValuesEnum.Hidden)
      handleDrawCard(PlayerTextEnum.Player, CardStateValuesEnum.Revealed)
      handleDrawCard(PlayerTextEnum.Dealer, CardStateValuesEnum.Revealed)

      setPokerGameState({
        round: RoundStateValuesEnum.Player,
        playerCards: [...pokerGameState.playerCards],
        dealerCards: [...pokerGameState.dealerCards]
      })
    }
    if (pokerGameState.round === RoundStateValuesEnum.Player) {
      handleCheckWin(RoundStateValuesEnum.Player)
    }
    if (pokerGameState.round === RoundStateValuesEnum.Dealer) {
      if (handleCalculateScore(pokerGameState.playerCards) <= 21) {
        if (handleCalculateScore(pokerGameState.dealerCards) >= 17) {
          handleCheckWin(RoundStateValuesEnum.Dealer)
        } else {
          handleDrawCard(PlayerTextEnum.Dealer, CardStateValuesEnum.Revealed)
        }
      }
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
            round: RoundStateValuesEnum.Init,
            dealerCards: [...pokerGameState.dealerCards],
            playerCards: [...pokerGameState.playerCards]
          })
        } else {
          pokerGameState.playerCards.push(targetCardUpdate)
          setPokerGameState({
            round: RoundStateValuesEnum.Init,
            dealerCards: [...pokerGameState.dealerCards],
            playerCards: [...pokerGameState.playerCards]
          })
        }
        break;
      }
      case (RoundStateValuesEnum.Dealer): {
        pokerGameState.dealerCards.push(targetCardUpdate)
        setPokerGameState({
          round: RoundStateValuesEnum.Dealer,
          dealerCards: [...pokerGameState.dealerCards],
          playerCards: [...pokerGameState.playerCards]
        })
        break;
      }
      case (RoundStateValuesEnum.Player): {
        pokerGameState.playerCards.push(targetCardUpdate)
        setPokerGameState({
          round: RoundStateValuesEnum.Player,
          dealerCards: [...pokerGameState.dealerCards],
          playerCards: [...pokerGameState.playerCards]
        })
        break;
      }
    }
  }

  const handleCheckWin = (round: RoundStateValuesEnum) => {
    const playerScore = handleCalculateScore(pokerGameState.playerCards);
    if (playerScore > 21) {
      setGameRecord([...gameRecord, {
        result: ResultTypeValuesEnum.Lose,
        balance: playerInfo.balance,
        bet: playerInfo.bet
      }]);
      setPlayerInfo({
        balance: playerInfo.balance,
        bet: 0
      })
      setPokerGameState({
        round: RoundStateValuesEnum.Dealer,
        playerCards: [...pokerGameState.playerCards],
        dealerCards: [...pokerGameState.dealerCards]
      })
    }
    if (round === RoundStateValuesEnum.Dealer) {
      const dealerScore = handleCalculateScore(pokerGameState.dealerCards);
      if (dealerScore > 21 || playerScore > dealerScore) {
        setGameRecord([...gameRecord, {
          result: ResultTypeValuesEnum.Win,
          balance: playerInfo.balance + 2 * playerInfo.bet,
          bet: playerInfo.bet
        }]);
        setPlayerInfo({
          balance: playerInfo.balance + 2 * playerInfo.bet,
          bet: 0
        })
      } else if (playerScore < dealerScore) {
        setGameRecord([...gameRecord, {
          result: ResultTypeValuesEnum.Lose,
          balance: playerInfo.balance,
          bet: playerInfo.bet
        }]);
        setPlayerInfo({
          balance: playerInfo.balance,
          bet: 0
        })
      } else {
        setGameRecord([...gameRecord, {
          result: ResultTypeValuesEnum.Tie,
          balance: playerInfo.balance + playerInfo.bet,
          bet: playerInfo.bet
        }]);
        setPlayerInfo({
          balance: playerInfo.balance + playerInfo.bet,
          bet: 0
        })
      }
    }
  }

  const handleClickHitBtn = () => {
    handleDrawCard(PlayerTextEnum.Player, CardStateValuesEnum.Revealed)
  }

  const handleClickStandBtn = () => {
    setPokerGameState({
      round: RoundStateValuesEnum.Dealer,
      playerCards: [...pokerGameState.playerCards],
      dealerCards: pokerGameState.dealerCards.map(card => {
        return { ...card, state: CardStateValuesEnum.Revealed }
      })
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('bet', event.target.value)
  }

  const handleCalculateScore = (cards: PokerCard[]) => {
    let total = 0;
    cards.forEach(card => {
      if (card.state === CardStateValuesEnum.Revealed && card.value !== 'A') {
        switch (card.value) {
          case 'K': {
            total += 10;
            break;
          }
          case 'Q': {
            total += 10;
            break;
          }
          case 'J': {
            total += 10;
            break;
          }
          default:
            total += parseInt(card.value)
            break;
        }
      }
    })
    const Aces = cards.filter(card => card.value === 'A');
    Aces.forEach(card => {
      if (card.state === CardStateValuesEnum.Revealed) {
        if ((total + 11) > 21) {
          total += 1;
        } else if ((total + 11) === 21) {
          if (Aces.length > 1) {
            total += 1;
          }
          else {
            total += 11;
          }
        } else {
          total += 11;
        }
      }
    })
    return total;
  }

  const handleRestartGame = () => {
    setPokerGameState({
      round: RoundStateValuesEnum.Bet,
      playerCards: [],
      dealerCards: []
    })
  }

  console.log('gameRecord', gameRecord);

  return (
    <div id="black-jack" className="black-jack-container">
      <div className="row h-100">
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
            {
              pokerGameState.round !== RoundStateValuesEnum.Bet && (
                <div className="d-flex justify-content-center">
                  <p>Dealer's score is {handleCalculateScore(pokerGameState.dealerCards)}</p>
                </div>
              )
            }
            <div className="d-flex justify-content-center">
              {
                pokerGameState.dealerCards.map((card, index) => (
                  <div key={index} className={`black-jack-card my-4 mx-2 ${card.state === CardStateValuesEnum.Hidden ? 'card-hidden' : '' }` }>
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Clubs && (
                        <div className="card-black">
                          <p className="card-value">{card.value}</p>
                          <GiClubs />
                        </div>
                      )
                    }
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Diamonds && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <BsSuitDiamondFill />
                        </div>
                      )
                    }
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Hearts && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <GiHearts />
                        </div>
                      )
                    }
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Spades && (
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
            {
              pokerGameState.round !== RoundStateValuesEnum.Bet && (
                <div className="d-flex justify-content-center my-4">
                  <p>Your score is {handleCalculateScore(pokerGameState.playerCards)}</p>
                </div>
              )
            }
            <div className="d-flex justify-content-center">
              {
                pokerGameState.playerCards.map((card, index) => (
                  <div key={index} className="black-jack-card mx-2">
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Clubs && (
                        <div className="card-black">
                          <p className="card-value">{card.value}</p>
                          <GiClubs />
                        </div>
                      )
                    }
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Diamonds && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <BsSuitDiamondFill />
                        </div>
                      )
                    }
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Hearts && (
                        <div className="card-red">
                          <p className="card-value">{card.value}</p>
                          <GiHearts />
                        </div>
                      )
                    }
                    {
                      card.state === CardStateValuesEnum.Revealed && card.suit === SuitsTypeTextEnum.Spades && (
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
            {
              pokerGameState.round === RoundStateValuesEnum.Player && (
                <div className="d-flex justify-content-center mt-5">
                  <button type="button" className="button-main black-jack-btn mx-4" onClick={handleClickHitBtn}>Hit</button>
                  <button type="button" className="button-main black-jack-btn mx-4" onClick={handleClickStandBtn}>Stand</button>
                </div>
              )
            }
            {
              pokerGameState.round === RoundStateValuesEnum.Dealer && (
                <div className="d-flex justify-content-center">
                  <button type="button" className="text-center mt-5" onClick={handleRestartGame}><p>Next round?</p></button>
                </div>
              )
            }
          </div>
        </div>
        <div className="col-3 h-100">
          <div className="black-jack-record">
            <p className="record-title">Game record</p>
            <div className="record-content">
              {
                gameRecord.map((record, index) => {
                  if (record.result === ResultTypeValuesEnum.Win) {
                    return (
                      <div key={index} className="d-flex justify-content-around my-3">
                        <p>Won</p>
                        <p className="color-blue">+{record.bet}</p>
                        <p>{record.balance}</p>
                      </div>
                    )
                  } else if (record.result === ResultTypeValuesEnum.Lose) {
                    return (
                      <div key={index} className="d-flex justify-content-around my-3">
                        <p>Lost</p>
                        <p className="color-danger">-{record.bet}</p>
                        <p>{record.balance}</p>
                      </div>
                    )                  
                  } else {
                    return (
                      <div key={index} className="d-flex justify-content-center my-3">
                        <p className="color-green">You tie this round!!</p>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
      <WarningDialog
        visible={dialogState.WarningDialog.visible}
        content={errorMsg}
      />
    </div>
  )
}

export default BlackJack;
