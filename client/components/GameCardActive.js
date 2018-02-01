'use strict';

const React = require('react');

class GameCardActive extends React.Component {

    constructor (props) {

        super(props)
    };

    render () {

        const { game } = this.props;

        return (
            <span>
                <h1>active game</h1>
                <p>{game.teams[0].name}: {game.teams[0].score}</p>
                <p>{game.teams[1].name}: {game.teams[1].score}</p>
                <pre>{ JSON.stringify(game.teams[0], null, 2) }</pre>
            </span>
        )
    };
};


module.exports = GameCardActive;
