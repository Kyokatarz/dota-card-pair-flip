const images = [
  {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/d/d4/Invoke_icon.png',
    uniqueId: 1,
  },
  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/b/bf/Chronosphere_icon.png',
    uniqueId: 2,
  },

  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/0/07/Divided_We_Stand_icon.png',
    uniqueId: 3,
  },

  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/1/17/Rolling_Thunder_icon.png',
    uniqueId: 4,
  },
  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/1/1c/Thundergod%27s_Wrath_icon.png',
    uniqueId: 5,
  },

  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/4/4a/Wukong%27s_Command_icon.png',
    uniqueId: 6,
  },
  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/1/1f/Primal_Split_icon.png',
    uniqueId: 7,
  },
  {
    url:
      'https://gamepedia.cursecdn.com/dota2_gamepedia/1/16/Time_Lapse_icon.png',
    uniqueId: 8,
  },
]
const frontOfSquareUrl =
  'https://data.tooliphone.net/iskin/themes/6125/4055/preview-256.png'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstClickId: null,
      firstClickIndex: null,
      gameState: [],
      gameOver: false,
    }
    this.randomArray = this.randomArray.bind(this)
    this.flipAndCheck = this.flipAndCheck.bind(this)
    this.checkWin = this.checkWin.bind(this)
  }

  randomArray() {
    let array = [...images, ...images]
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let temp
      temp = array[j]
      array[j] = array[i]
      array[i] = temp
    }
    this.setState({ gameState: array })
  }

  checkWin() {
    let count = 0
    for (let i = 0; i < this.state.gameState.length; i++) {
      //if every square is matched, then game ends.
      if (
        document
          .querySelectorAll('.square-wrap')
          [i].classList.contains('matched')
      ) {
        count++
      }
    }

    if (count == this.state.gameState.length) {
      this.setState({ gameOver: true })
      setTimeout(
        () => document.querySelector('#big-card').classList.add('active'),
        500
      )
    }
  }

  resetGame() {
    console.log('reset button is clicked!')
    for (let i = 0; i < this.state.gameState.length; i++) {
      document.querySelectorAll('.square-wrap')[i].classList = 'square-wrap'
    } //reset everything

    setTimeout(() => this.randomArray(), 100) //reshuffle
    this.setState({
      firstClickId: null,
      firstClickIndex: null,
      gameOver: false,
    })
    document.querySelector('#big-card').classList.toggle('active')
  }

  componentDidMount() {
    this.randomArray()
  }

  render() {
    let squares = this.state.gameState.map((item, index) => (
      <Squares
        uniqueId={item.uniqueId}
        url={item.url}
        flipAndCheck={this.flipAndCheck.bind(this)}
        index={index}
      />
    ))

    return (
      <div id='app-container'>
        <div id='big-card'>
          <div id='square-container' className='square-front'>
            {squares}
          </div>

          <div id='overlay-container' className='square-back'>
            <div id='overlay'>
              <p>Game Over</p>
              <p id='play-again' onClick={this.resetGame.bind(this)}>
                Play Again?
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Squares = (props) => (
  <div
    className='square-wrap'
    onClick={() => props.flipAndCheck(props.index, props.uniqueId)}
  >
    <div className='square'>
      <div className='square-front'>
        <img src={frontOfSquareUrl} alt='' className='img' />
      </div>
      <div className='square-back'>
        <img src={props.url} alt='' className='img' />
      </div>
    </div>
  </div>
)

ReactDOM.render(<App />, document.querySelector('#App'))
