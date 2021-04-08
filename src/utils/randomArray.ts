const randomArray = (array: any[]) => {
  const tempArray = [...array]
  for (let i = tempArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp
    temp = tempArray[j]
    tempArray[j] = tempArray[i]
    tempArray[i] = temp
  }
  return tempArray
}

export default randomArray
