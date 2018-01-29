'use strict';

const React = require('react');
const Axios = require('axios');
const GameCard = require('./GameCard');


class GameIndex extends React.Component {

    constructor () {

        super();
        this.state = {
            games: [],
            activeGame: null
        };

        this.handleChildClick = this.handleChildClick.bind(this);
    };

    componentWillMount () {

        Axios.get('/api')
        .then((res) => {

            const data = res.data;
            this.setState({ games: data });
        })
        .catch((err) => {

            console.log('err?', err);
        });
    };

    handleChildClick (id) {

        console.log('in handle', this);

        if (this.state.activeGame === id) {
            this.setState({ activeGame: null })
        }
        else {
            this.setState({ activeGame: id })
        };
    };

    render () {

        const { activeGame, games } = this.state

        const content = games.map((game) => {

            return <GameCard key={game.id} game={game} sendClickToParent={this.handleChildClick} activeGame={game.id === activeGame}/>;
        });

        return (
            <div>
                { games && content } 
            </div>
        )
    };
};


module.exports = GameIndex;
