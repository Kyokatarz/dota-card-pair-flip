const images = [
    {
        url :'',
        uniqueId: 1
    },
    {
        url: '',
        uniqueId: 2
    },
    
    {
        url: '',
        uniqueId: 3
    },
    
    {
        url: '',
        uniqueId: 4
    },
    {
        url: '',
        uniqueId: 5,
    },

    {
        url: '',
        uniqueId: 6
    },
    {
        url: '',
        uniqueId: 7
    },
    {
        url: '',
        uniqueId: 8
    },
    
]


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstClickId: null,
            firstClickIndex: null,
            gameState: [],
        }
    this.randomArray = this.randomArray.bind(this);   
    this.flipAndCheck = this.flipAndCheck.bind(this);
    this.checkWin = this.checkWin.bind(this);
    }
    
    randomArray(){
        let array = [...images, ...images];
        console.log('random is called!')
        for (let i = array.length - 1 ; i > 0; i--){
            let j = Math.floor(Math.random()*i);
            let temp;
            temp = array[j];
            array[j] = array[i];
            array[i] = temp;  
        }
        this.setState({gameState: array});
    }

    flipAndCheck(index, currentId){
        let currentItem = document.querySelectorAll('.square-wrap')[index];
        let firstClickIndex = this.state.firstClickIndex;
        let firstClickId = this.state.firstClickId;

        if (!currentItem.classList.contains('matched') && !currentItem.classList.contains('active')){
            currentItem.classList.toggle('active');
            console.log('toggled active');
            if (firstClickId == null){ //check if this is a first click
                this.setState({firstClickId: currentId, firstClickIndex: index}) //if so set firstClickId to the element Id
            } else {
                console.log('This is not a first click!');
                if (firstClickId == currentId){ //if both the element have the same ID, they matched
                    document.querySelectorAll('.square-wrap')[firstClickIndex].classList.add('matched'); //add 'matched' for the previous click
                    currentItem.classList.add('matched'); //add 'matched' for the current click
                    this.setState({firstClickId:null, firstClickIndex:null});
                } else{ //if they don't have the same ID, reset the state and ready for new pair
                    this.setState({firstClickId: null, firstClickIndex: null});
                    setTimeout(function(){
                        document.querySelectorAll('.square-wrap')[firstClickIndex].classList.toggle('active');
                        currentItem.classList.toggle('active');
                    }, 700)
                }
            }
        }
        
        this.checkWin();
        
    }
    
    checkWin(){
        let count = 0;
        for (let i = 0; i < this.state.gameState.length; i++){
            if (document.querySelectorAll('.square-wrap')[i].classList.contains('matched')){
                count++;
            }
        }

        if (count == this.state.gameState.length){
            console.log('gameover');
        }
    };    
    
    componentDidMount(){
        this.randomArray();
    }
    
    render(){
        let squares = this.state.gameState.map((item,index) => <Squares uniqueId = {item.uniqueId} 
                                                        url = {item.url} 
                                                        flipAndCheck = {this.flipAndCheck.bind(this)}
                                                        index = {index}
                                                        /> )

        return(
            <div>
                <div id='square-container'>
                    {squares}
                </div>
                <button className='btn' onClick = {this.randomArray}>Shuffle</button>
            </div>
        )
    }
}
    
const Squares = props => (
        <div className='square-wrap' onClick = {()=>props.flipAndCheck(props.index, props.uniqueId)}>
            <div className='square'>
            <div className='square-front'>front index {props.index} {props.uniqueId}</div>
                <div className="square-back">back {props.uniqueId}</div>
            </div>

        </div>
    )


    ReactDOM.render(<App/>, document.querySelector('#App'))