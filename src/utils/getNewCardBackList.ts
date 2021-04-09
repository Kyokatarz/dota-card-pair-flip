import data from '../data/url.json'
import randomizeArray from './randomArray'
import getXElements from './getRandomElementsFromArray'

const getCardBackList = (numberOfCards: number) => {
  const allCardBacks = [...data.cardBackUrlArray]
  const randomizedAllCardBacks = randomizeArray(allCardBacks)
  const someCards = getXElements(randomizedAllCardBacks, numberOfCards / 2)
  return randomizeArray([...someCards, ...someCards])
}

export default getCardBackList
