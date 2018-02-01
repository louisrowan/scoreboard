'use strict';

const React = require('react');

class GameCardInactive extends React.Component {

    constructor (props) {

        super(props)
    };

    render () {

        const { game } = this.props;

        return (
            <span>
                <p>{game.teams[0].name}: {game.teams[0].score}</p>
                <p>{game.teams[1].name}: {game.teams[1].score}</p>
            </span>
        )
    };
};


module.exports = GameCardInactive;
