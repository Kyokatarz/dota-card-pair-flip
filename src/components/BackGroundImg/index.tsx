import React from 'react'
import './styles.css'

type Props = {
  backgroundNumber: number
}
const BackgroundImage = ({ backgroundNumber }: Props) => {
  return (
    <img
      id='bg-img'
      src={`/assets/background-img/bg-${backgroundNumber}.png`}
      alt=''
    />
  )
}

export default BackgroundImage
