'use strict';

const React = require('react');
const Axios = require('axios');
const GameCardContainer = require('./GameCardContainer');
const {
    Button,
    List
} = require('semantic-ui-react');


class GameIndex extends React.Component {

    constructor () {

        super();
        this.state = {
            leagues: {},
            activeLeague: null,
            activeGame: null
        };

        this.handleChildClick = this.handleChildClick.bind(this);
        this.handleGameCategorizations = this.handleGameCategorizations.bind(this);
    };

    componentWillMount () {

        const url = '/api/gameids?date=today';
        Axios.get(url)
            .then((res) => {

                if (res.status != 200) {
                    console.warn('bad response from GET', url, res);
                    return;
                }

                const data = res.data;

                // TODO: make this an object with key being game id that can later be sorted instead ojust array of ids.

                const leagues = {};
                Object.keys(data).map((index) => {

                    const league = data[index];
                    leagues[league.league] = {};
 
                    league.games.forEach((game) => {

                        leagues[league.league][game] =  {
                            id: game,
                            status: null,
                            divisions: [],
                            conferences: []
                        }
                    })
                });
                this.setState({ leagues });
            })
            .catch((err) => {

                console.log('err?', err);
            });
    };


    handleChildClick (id) {

        if (this.state.activeGame === id) {
            // this.setState({ activeGame: null })
        }
        else {
            this.setState({ activeGame: id })
        };
    };



    handleGameCategorizations (args) {

        // console.log('in handle', args);

        const { leagues, activeLeague } = this.state;
        const { id, status, divisions, conferences } = args;

        const league = Object.assign({}, leagues[activeLeague]);
        const game = league[id];

        const newLeagues = Object.assign(
            {},
            { [activeLeague]: Object.assign(
                {},
                { [id]: args })
            });

        // this.setState({ leagues: newLeagues });
    };

    render () {

        const { activeGame, leagues, activeLeague } = this.state

        const header = leagues ? Object.keys(leagues).map((league) => {

            return <Button
                        key={league}
                        onClick={() => this.setState({ activeLeague: league })}>
                        {league}
                        </Button>
        }) : '';

        const games =
            activeLeague ?
                <List>{Object.keys(leagues[activeLeague]).map((gameId) => {

                    const game = leagues[activeLeague][gameId];

                    return <GameCardContainer
                            key={game.id}
                            id={game.id}
                            league={activeLeague}
                            sendClickToParent={this.handleChildClick}
                            sendInfoToParent={this.handleGameCategorizations}
                            activeGame={game.id === activeGame} />
                }).sort((a, b) => a.active ? 1 : -1)}</List>
            : '';

        return (
            <div>
                { leagues && header } 
                { activeLeague && games }
            </div>
        )
    };
};


module.exports = GameIndex;
