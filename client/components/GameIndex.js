'use strict';

const React = require('react');
const Axios = require('axios');
const GameCardContainer = require('./GameCardContainer');
const { Button } = require('semantic-ui-react');


class GameIndex extends React.Component {

    constructor () {

        super();
        this.state = {
            leagues: {},
            activeLeague: null,
            activeGame: null
        };

        this.handleChildClick = this.handleChildClick.bind(this);
        this.handleLeagueClick = this.handleLeagueClick.bind(this);
    };

    componentWillMount () {

        Axios.get('/api/gameids?date=today')
        .then((res) => {

            if (res.stats === 200) {

                const data = res.data;
                this.setState({ leagues: data })
            }

            const data = res.data;

            const leagues = {};
            Object.keys(data).map((index) => {

                const league = data[index];
                leagues[league.league] = league.games;
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

    handleLeagueClick (league) {

        this.setState({ activeLeague: league });
    }

    render () {

        const { activeGame, leagues, activeLeague } = this.state

        console.log('active league', activeLeague);

        // const content = games.map((game) => {

        //     return <GameCardContainer key={game.id} game={game} sendClickToParent={this.handleChildClick} activeGame={game.id === activeGame}/>;
        // });

        const header = leagues ? Object.keys(leagues).map((league) => {

            return <Button key={league} onClick={() => this.handleLeagueClick(league)}>{league}</Button>
        }) : '';

        const games = activeLeague ? <ul>{leagues[activeLeague].map((gameId) => {

            return <li key={gameId}>{gameId}</li>
        })}</ul> : '';

        return (
            <div>
                { leagues && header } 
                { activeLeague && games }
            </div>
        )
    };
};


module.exports = GameIndex;
