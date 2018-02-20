'use strict';

const React = require('react');
const TeamBoxScore = require('./TeamBoxScore');

class GameCardActive extends React.Component {

    constructor (props) {

        super(props);
    };

    render () {

        const { game } = this.props;

        return (
            <span>
                <h1>active game</h1>
                <p>{game.teams[0].name}: {game.teams[0].score}</p>
                <p>{game.teams[1].name}: {game.teams[1].score}</p>
                <TeamBoxScore team={game.teams[0]} />
                <TeamBoxScore team={game.teams[1]} />
            </span>
        )
    };
};


module.exports = GameCardActive;
