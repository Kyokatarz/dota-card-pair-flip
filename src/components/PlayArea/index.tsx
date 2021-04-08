import React, { useCallback, useEffect, useRef, useState } from 'react'

import randomizeArray from '../../utils/randomArray'
import data from '../../data/url.json'
import { GameStateType } from '../../types'
import Square from '../Square'

const PlayArea = () => {
  const firstClickIdRef = useRef<number>()
  const firstClickIndexRef = useRef<number>()
  const [gameState, setGameState] = useState<GameStateType>([])
  const [gameOver, setGameOver] = useState(false)
  const cardBackList = data.cardBackUrlArray

  useEffect(() => {
    const gameArray = randomizeArray([...cardBackList, ...cardBackList])
    setGameState(gameArray)
    console.log('setting new game')
  }, [cardBackList])

  useEffect(() => {
    console.log('rerendered', {
      firstClickIndexRef,
      firstClickIdRef,
      gameState,
    })
  })

  const flipAndCheck = (index: number, currentId: number) => {
    console.log('flipAndChecked: ', { index, currentId })
    console.log(firstClickIdRef, firstClickIndexRef)
    const currentElement = document.querySelectorAll('.square-wrap')[index]

    if (
      !currentElement.classList.contains('matched') &&
      !currentElement.classList.contains('active')
    ) {
      currentElement.classList.toggle('active')
      if (!firstClickIdRef.current || !firstClickIndexRef.current) {
        console.log('is first click')
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
            console.log('firstClickIndexRef element', firstClickIndexRef)
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

  // const resetGame = () => {
  //   //remove 'active' and 'matched'
  //   for (let i = 0; i < gameState.length; i++) {
  //     document
  //       .querySelectorAll('.square-wrap')
  //       [i].classList.remove('matched', 'active')
  //   }
  //   const newGameArray = randomizeArray([...cardBackList, ...cardBackList])
  //   setGameState(newGameArray)
  //   setFirstClickIndex(undefined)
  //   setFirstClickId(undefined)
  //   setGameOver(false)
  //   document.querySelector('#big-card')?.classList.remove('active')
  // }

  return (
    <div id='app-container'>
      aaaa
      <div id='big-card'>
        bbb
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
            <p>Game Over</p>
            <p id='play-again'>Play Again?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PlayArea)
