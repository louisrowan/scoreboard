/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/vn0qt75/Desktop/tmp/scoreboard/node_modules/react/index.js'");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/vn0qt75/Desktop/tmp/scoreboard/node_modules/stream-http/index.js'");

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(13);
var ReactDOM = __webpack_require__(52);
var GetGames = __webpack_require__(33);

var App = function App() {

    return React.createElement(
        'div',
        null,
        React.createElement(DoStuff, null)
    );
};

var DoStuff = function (_React$Component) {
    _inherits(DoStuff, _React$Component);

    function DoStuff() {
        _classCallCheck(this, DoStuff);

        var _this = _possibleConstructorReturn(this, (DoStuff.__proto__ || Object.getPrototypeOf(DoStuff)).call(this));

        _this.state = { games: [] };
        return _this;
    }

    _createClass(DoStuff, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            GetGames.getAllGames(function (err, data) {

                _this2.setState({ games: data });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                this.state.games && this.state.games.map(function (game, i) {

                    return React.createElement(
                        'div',
                        { key: i },
                        React.createElement('hr', null),
                        React.createElement(
                            'p',
                            null,
                            game.teams[0].name,
                            ': ',
                            game.teams[0].score
                        ),
                        React.createElement(
                            'p',
                            null,
                            game.teams[1].name,
                            ': ',
                            game.teams[1].score
                        )
                    );
                })
            );
        }
    }]);

    return DoStuff;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Http = __webpack_require__(23);

var _require = __webpack_require__(34),
    parseGameId = _require.parseGameId;

exports.getAllGames = function (cb) {

    console.log('http?', Http);

    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    var formattedDate = year + '-' + month + '-' + day;

    var url = 'http://stats.api.si.com/v1/all_sports/calendar?start_date=' + formattedDate + '&end_date=' + formattedDate;

    Http.get(url, function (res) {

        var raw = '';

        res.on('data', function (chunk) {

            raw += chunk;
        });

        res.on('error', function (e) {

            console.warn('error', e);
            return cb(e);
        });

        res.on('end', async function () {

            var result = JSON.parse(raw);
            var parsed = await parseResult(result);
            return cb(null, parsed);
        });
    });
};

var parseResult = function parseResult(result) {

    return new Promise(function (resolve, reject) {

        try {
            var data = result.data;
            var days = data.days[0];
            var leagues = days.leagues;
            var nba = leagues.find(function (l) {
                return l.league === 'nba';
            });
            var ids = nba.events.map(function (e) {
                return e.event_id;
            });

            var promises = [];
            ids.forEach(function (id) {
                promises.push(parseGameId(id));
            });

            Promise.all(promises).then(function (values) {

                resolve(values);
            }).catch(function (err) {

                console.log('err', err);
                reject(err);
            });
        } catch (e) {
            console.log('catch err', e);
        }
    });
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var http = __webpack_require__(23);

var internals = {};

exports.parseGameId = function (id) {

    return new Promise(function (resolve, reject) {

        http.get('http://stats.api.si.com/v1/nba/game_detail?id=' + id + '&league=nba&box_score=true', function (res) {

            var raw = '';
            res.on('data', function (chunk) {

                raw += chunk;
            });

            res.on('end', function (e) {

                var result = JSON.parse(raw);
                resolve(internals.parse(result.data));
            });

            res.on('error', function (e) {

                console.log('err', e);
                reject(e);
            });
        });
    });
};

internals.parse = function (data) {

    var res = {
        start: data.start.utc,
        tvStations: data.tv_stations.map(function (s) {
            return s.name;
        }),
        venue: {
            name: data.venue.name,
            city: data.venue.city,
            state: data.venue.state.name
        },
        teams: data.teams.map(function (team) {

            return {
                name: team.title,
                logo: team.logo.base,
                color1: team.color.primary,
                color2: team.color.secondary,
                record: {
                    wins: team.record.wins,
                    losses: team.record.losses,
                    winPercent: team.record.percentage
                },
                score: team.score,
                isWinner: team.is_winner
            };
        })
    };
    return res;
};

/***/ }),

/***/ 52:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/vn0qt75/Desktop/tmp/scoreboard/node_modules/react-dom/index.js'");

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(32);


/***/ })

/******/ });