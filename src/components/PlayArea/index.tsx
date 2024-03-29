import React, { useEffect, useRef, useState } from 'react'
import { GameStateType } from '../../types'
import Square from '../Square'
import getCardBackList from '../../utils/getNewCardBackList'

type Props = {
  changeBackground: () => void
}

const PlayArea = ({ changeBackground }: Props) => {
  const firstClickIdRef = useRef<number>()
  const firstClickIndexRef = useRef<number>()
  const [gameState, setGameState] = useState<GameStateType>([])

  useEffect(() => {
    const gameArray = getCardBackList(16)
    setGameState(gameArray)
    console.log('setting new game')
  }, [])

  const flipAndCheck = (index: number, currentId: number) => {
    const currentElement = document.querySelectorAll('.square-wrap')[index]

    if (
      !currentElement.classList.contains('matched') &&
      !currentElement.classList.contains('active')
    ) {
      currentElement.classList.toggle('active')
      if (!firstClickIdRef.current ?? !firstClickIndexRef.current) {
        //check if this is a first click
        //if so set firstClickId to the element Id
        firstClickIdRef.current = currentId
        firstClickIndexRef.current = index
      } else {
        //If not first click, meaning on second click
        if (firstClickIdRef.current === currentId) {
          let firstClickIndex = firstClickIndexRef.current
          //if both of the elements have the same ID, they match.
          setTimeout(function () {
            document
              .querySelectorAll('.square-wrap')
              [firstClickIndex].classList.add('matched') //add 'matched' for the previous click
            currentElement.classList.add('matched') //add 'matched' for the current click
            checkWin() //check if the game ends
          }, 700)
        } else {
          const firstClickIndex = firstClickIndexRef.current
          setTimeout(function () {
            document
              .querySelectorAll('.square-wrap')
              [firstClickIndex].classList.remove('active')
            currentElement.classList.remove('active')
          }, 700)
        }
        //Matched or not, reset the state and ready for a new pair
        firstClickIdRef.current = undefined
        firstClickIndexRef.current = undefined
      }
    }
  }

  const checkWin = () => {
    const allSquares = document.querySelectorAll('.square-wrap')
    let count = 0
    allSquares.forEach((el) => {
      if (el.classList.contains('matched')) count++
    })
    const isGameOver = count === gameState.length
    if (isGameOver) {
      setTimeout(
        () => document.querySelector('#big-card')?.classList.add('active'),
        500
      )
    }
  }

  const resetGame = () => {
    const newGameState = getCardBackList(16)
    document.querySelectorAll('.square-wrap').forEach((el) => {
      el.classList.remove('matched', 'active')
    })
    setGameState(newGameState) //reshuffle
    firstClickIndexRef.current = undefined
    firstClickIdRef.current = undefined
    document.querySelector('#big-card')?.classList.remove('active')
    changeBackground()
  }

  return (
    <div id='app-container'>
      <div id='big-card'>
        <div id='square-container' className='square-front'>
          {gameState.map((item, index) => (
            <Square
              key={Math.random()}
              flipAndCheck={flipAndCheck}
              cardBackImgUrl={item.url}
              index={index}
              uniqueId={item.uniqueId}
            />
          ))}
        </div>
        <div id='overlay-container' className='square-back'>
          <div id='overlay'>
            <h1>Game Over</h1>
            <div id='play-again-button' onClick={resetGame}>
              Play Again?
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PlayArea)
