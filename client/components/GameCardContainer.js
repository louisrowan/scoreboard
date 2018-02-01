'use strict';

const React = require('react');
const GameCardActive = require('./GameCardActive');
const GameCardInactive = require('./GameCardInactive');

class GameCardContainer extends React.Component {

    constructor (props) {

        super(props);
    };


    render () {

        const { game, sendClickToParent, activeGame } = this.props;

        const content = activeGame ? <GameCardActive game={game} /> : <GameCardInactive game={game} />

        return (
            <div onClick={() => sendClickToParent(game.id)}>
                <hr />
                { content }
            </div>
        )
    };
};


module.exports = GameCardContainer;
