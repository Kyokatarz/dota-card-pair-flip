import React, { useState } from 'react'

const PlayArea = () => {
  const [firstClickId, setFirstClickId] = useState<number>()
  const [firstClickIndex, setFirstClickIndex] = useState<number>()
  const [gameState, setGameState] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const flipAndCheck = (index: number, currentId: number) => {
    let currentElement = document.querySelectorAll('.square-wrap')[index]

    if (
      !currentElement.classList.contains('matched') &&
      !currentElement.classList.contains('active')
    ) {
      currentElement.classList.toggle('active')
      if (!firstClickId || !firstClickIndex) {
        //check if this is a first click
        //if so set firstClickId to the element Id
        setFirstClickId(currentId)
        setFirstClickIndex(index)
      } else {
        //If not first click, meaning second click
        if (firstClickId === currentId) {
          //if both of the elements have the same ID, they match.

          setTimeout(function () {
            document
              .querySelectorAll('.square-wrap')
              [firstClickIndex].classList.add('matched') //add 'matched' for the previous click
            currentElement.classList.add('matched') //add 'matched' for the current click
            checkWin() //check if the game ends
          }, 700)
        } else {
          setTimeout(function () {
            document
              .querySelectorAll('.square-wrap')
              [firstClickIndex].classList.toggle('active')
            currentElement.classList.toggle('active')
          }, 700)
        }
        //Matched or not, reset the state and ready for a new pair
        setFirstClickId(undefined)
        setFirstClickIndex(undefined)
      }
    }
  }

  const checkWin = () => {
    const allSquares = (document.querySelectorAll(
      '.square-wrap'
    ) as unknown) as Element[]
    //Game is over if can't find a square that doesn't contain 'matched' (e.g all squares contain 'matched')
    const isGameOver =
      allSquares.map((square) => !square.classList.contains('matched'))
        .length === 0

    if (isGameOver) {
      setGameOver(true)
      setTimeout(
        () => document.querySelector('#big-card')?.classList.add('active'),
        500
      )
    }
  }

  return <div></div>
}

export default PlayArea
