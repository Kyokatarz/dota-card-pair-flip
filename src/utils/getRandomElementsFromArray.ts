const getRandomElementsFromArray = (
  elements: any[],
  numberOfElements: number
) => {
  return elements.splice(0, numberOfElements)
}

export default getRandomElementsFromArray
