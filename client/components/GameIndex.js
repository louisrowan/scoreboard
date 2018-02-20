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

        const url = '/api/gameids?date=today';
        Axios.get(url)
            .then((res) => {

                if (res.status != 200) {
                    console.warn('bad response from GET', url, res);
                    return;
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

        const header = leagues ? Object.keys(leagues).map((league) => {

            return <Button
                        key={league}
                        onClick={() => this.handleLeagueClick(league)}>
                        {league}
                        </Button>
        }) : '';

        const games = activeLeague ? <ul>{leagues[activeLeague].map((gameId) => {

            return <GameCardContainer
                    key={gameid}
                    id={gameid}
                    sendClickToParent={this.handleChildClick}
                    activeGame={gameid === activeGame} />
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
