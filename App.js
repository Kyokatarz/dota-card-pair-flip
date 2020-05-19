var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var images = [{
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/d/d4/Invoke_icon.png',
    uniqueId: 1
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/b/bf/Chronosphere_icon.png',
    uniqueId: 2
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/0/07/Divided_We_Stand_icon.png',
    uniqueId: 3
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/1/17/Rolling_Thunder_icon.png',
    uniqueId: 4
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/1/1c/Thundergod%27s_Wrath_icon.png',
    uniqueId: 5
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/4/4a/Wukong%27s_Command_icon.png',
    uniqueId: 6
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/1/1f/Primal_Split_icon.png',
    uniqueId: 7
}, {
    url: 'https://gamepedia.cursecdn.com/dota2_gamepedia/1/16/Time_Lapse_icon.png',
    uniqueId: 8
}];
var frontOfSquareUrl = 'https://data.tooliphone.net/iskin/themes/6125/4055/preview-256.png';

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            firstClickId: null,
            firstClickIndex: null,
            gameState: [],
            gameOver: false
        };
        _this.randomArray = _this.randomArray.bind(_this);
        _this.flipAndCheck = _this.flipAndCheck.bind(_this);
        _this.checkWin = _this.checkWin.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'randomArray',
        value: function randomArray() {
            var array = [].concat(images, images);
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * i);
                var temp = void 0;
                temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
            this.setState({ gameState: array });
        }
    }, {
        key: 'flipAndCheck',
        value: function flipAndCheck(index, currentId) {
            var currentItem = document.querySelectorAll('.square-wrap')[index];
            var firstClickIndex = this.state.firstClickIndex;
            var firstClickId = this.state.firstClickId;

            if (!currentItem.classList.contains('matched') && !currentItem.classList.contains('active')) {
                currentItem.classList.toggle('active');
                if (firstClickId == null) {
                    //check if this is a first click
                    this.setState({ firstClickId: currentId, firstClickIndex: index }); //if so set firstClickId to the element Id
                } else {
                    if (firstClickId == currentId) {
                        //if both the element have the same ID, they matched

                        setTimeout(function () {
                            document.querySelectorAll('.square-wrap')[firstClickIndex].classList.add('matched'); //add 'matched' for the previous click
                            currentItem.classList.add('matched'); //add 'matched' for the current click
                            this.checkWin(); //check if the game ends
                        }.bind(this), 700);
                        this.setState({ firstClickId: null, firstClickIndex: null });
                    } else {
                        //if they don't have the same ID, reset the state and ready for new pair
                        this.setState({ firstClickId: null, firstClickIndex: null });
                        setTimeout(function () {
                            document.querySelectorAll('.square-wrap')[firstClickIndex].classList.toggle('active');
                            currentItem.classList.toggle('active');
                        }, 700);
                    }
                }
            }
        }
    }, {
        key: 'checkWin',
        value: function checkWin() {
            var count = 0;
            for (var i = 0; i < this.state.gameState.length; i++) {
                //if every square is matched, then game ends.
                if (document.querySelectorAll('.square-wrap')[i].classList.contains('matched')) {
                    count++;
                }
            }

            if (count == this.state.gameState.length) {

                this.setState({ gameOver: true });
                setTimeout(function () {
                    return document.querySelector('#big-card').classList.add('active');
                }, 0);
            }
        }
    }, {
        key: 'resetGame',
        value: function resetGame() {
            var _this2 = this;

            console.log('reset button is clicked!');
            for (var i = 0; i < this.state.gameState.length; i++) {
                document.querySelectorAll('.square-wrap')[i].classList = 'square-wrap';
            } //reset everything

            setTimeout(function () {
                return _this2.randomArray();
            }, 100); //reshuffle
            this.setState({ firstClickId: null,
                firstClickIndex: null,
                gameOver: false });
            document.querySelector('#big-card').classList.toggle('active');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.randomArray();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var squares = this.state.gameState.map(function (item, index) {
                return React.createElement(Squares, { uniqueId: item.uniqueId,
                    url: item.url,
                    flipAndCheck: _this3.flipAndCheck.bind(_this3),
                    index: index
                });
            });

            return React.createElement(
                'div',
                { id: 'app-container' },
                React.createElement(
                    'div',
                    { id: 'big-card' },
                    React.createElement(
                        'div',
                        { id: 'square-container', className: 'square-front' },
                        squares
                    ),
                    React.createElement(
                        'div',
                        { id: 'overlay-container', className: 'square-back' },
                        React.createElement(
                            'div',
                            { id: 'overlay' },
                            React.createElement(
                                'p',
                                null,
                                'Game Over'
                            ),
                            React.createElement(
                                'p',
                                { id: 'play-again', onClick: this.resetGame.bind(this) },
                                'Play Again?'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

var Squares = function Squares(props) {
    return React.createElement(
        'div',
        { className: 'square-wrap', onClick: function onClick() {
                return props.flipAndCheck(props.index, props.uniqueId);
            } },
        React.createElement(
            'div',
            { className: 'square' },
            React.createElement(
                'div',
                { className: 'square-front' },
                React.createElement('img', { src: frontOfSquareUrl, alt: '', className: 'img' })
            ),
            React.createElement(
                'div',
                { className: 'square-back' },
                React.createElement('img', { src: props.url, alt: '', className: 'img' })
            )
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#App'));