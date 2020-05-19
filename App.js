var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var images = [{
    url: '',
    uniqueId: 1
}, {
    url: '',
    uniqueId: 2
}, {
    url: '',
    uniqueId: 3
}, {
    url: '',
    uniqueId: 4
}, {
    url: '',
    uniqueId: 5
}, {
    url: '',
    uniqueId: 6
}, {
    url: '',
    uniqueId: 7
}, {
    url: '',
    uniqueId: 8
}];

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            firstClickId: null,
            firstClickIndex: null,
            gameState: []
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
            console.log('random is called!');
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
                console.log('toggled active');
                if (firstClickId == null) {
                    //check if this is a first click
                    this.setState({ firstClickId: currentId, firstClickIndex: index }); //if so set firstClickId to the element Id
                } else {
                    console.log('This is not a first click!');
                    if (firstClickId == currentId) {
                        //if both the element have the same ID, they matched
                        document.querySelectorAll('.square-wrap')[firstClickIndex].classList.add('matched'); //add 'matched' for the previous click
                        currentItem.classList.add('matched'); //add 'matched' for the current click
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

            this.checkWin();
        }
    }, {
        key: 'checkWin',
        value: function checkWin() {
            var count = 0;
            for (var i = 0; i < this.state.gameState.length; i++) {
                if (document.querySelectorAll('.square-wrap')[i].classList.contains('matched')) {
                    count++;
                }
            }

            if (count == this.state.gameState.length) {
                console.log('gameover');
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.randomArray();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var squares = this.state.gameState.map(function (item, index) {
                return React.createElement(Squares, { uniqueId: item.uniqueId,
                    url: item.url,
                    flipAndCheck: _this2.flipAndCheck.bind(_this2),
                    index: index
                });
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'square-container' },
                    squares
                ),
                React.createElement(
                    'button',
                    { className: 'btn', onClick: this.randomArray },
                    'Shuffle'
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
                'front index ',
                props.index,
                ' ',
                props.uniqueId
            ),
            React.createElement(
                'div',
                { className: 'square-back' },
                'back ',
                props.uniqueId
            )
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#App'));