const getRandomElementsFromArray = (
  numberOfElements: 16 | 25 | 36,
  elements: any[]
) => {
  return elements.splice(0, numberOfElements)
}

export default getRandomElementsFromArray
