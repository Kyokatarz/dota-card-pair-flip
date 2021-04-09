const randomizeNumber = (minNumber: number = 0, maxNumber: number) => {
  return Math.floor(Math.random() * maxNumber + minNumber)
}

export default randomizeNumber
