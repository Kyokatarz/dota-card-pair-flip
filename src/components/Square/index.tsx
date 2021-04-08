import data from '../../data/url.json'

type Props = {
  flipAndCheck: (index: number, uniqueId: number) => void
  cardBackImgUrl: string
  index: number
  uniqueId: number
}

const Square = ({ flipAndCheck, cardBackImgUrl, index, uniqueId }: Props) => (
  <div className='square-wrap' onClick={() => flipAndCheck(index, uniqueId)}>
    <div className='square'>
      <div className='square-front'>
        <img src={data.frontOfCardUrl} alt='' className='img' />
      </div>
      <div className='square-back'>
        <img src={cardBackImgUrl} alt='' className='img' />
      </div>
    </div>
  </div>
)

export default Square
