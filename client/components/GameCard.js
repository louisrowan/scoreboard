'use strict';

const React = require('react');

class GameCard extends React.Component {

    constructor (props) {

        super(props);
    };


    render () {

        const { game, sendClickToParent, activeGame } = this.props;

        let content;
        if (activeGame) {
            content =
            (<span>
                <h1>active game</h1>
                <p>{game.teams[0].name}: {game.teams[0].score}</p>
                <p>{game.teams[1].name}: {game.teams[1].score}</p>
            </span>)
        }
        else {
            content = 
            (<span>
                <p>{game.teams[0].name}: {game.teams[0].score}</p>
                <p>{game.teams[1].name}: {game.teams[1].score}</p>
            </span>)
        }

        return (
            <div onClick={() => sendClickToParent(game.id)}>
                <hr />
                { content }
            </div>
        )
    };
};


module.exports = GameCard;