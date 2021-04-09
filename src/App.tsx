import React, { useState } from 'react'
import './App.css'
import BackgroundImage from './components/BackGroundImg'

import PlayArea from './components/PlayArea'
import randomizeNumber from './utils/randomNumber'

function App() {
  const [backgroundNumber, setBackgroundNumber] = useState(
    randomizeNumber(1, 4)
  )

  const changeBackground = () => {
    const num = randomizeNumber(1, 4)
    setBackgroundNumber(num)
  }

  return (
    <div id='App'>
      <BackgroundImage backgroundNumber={backgroundNumber} />
      <PlayArea changeBackground={changeBackground} />
    </div>
  )
}

export default App
