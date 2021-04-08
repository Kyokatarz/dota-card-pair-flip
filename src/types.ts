export type FrontOfCardType = string
export type BackOfCardType = {
  url: string
  uniqueId: number
}

export type DataType = {
  frontOfCardUrl: FrontOfCardType
  cardBackUrlArray: BackOfCardType[]
}

export type GameStateType = BackOfCardType[]
