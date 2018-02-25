'use strict';

const React = require('react');

const {
    Grid,
    Segment
} = require('semantic-ui-react');

class GameCardInactive extends React.Component {

    constructor (props) {

        super(props)
    };

    render () {

        const { game } = this.props;

        const team1 = game.teams[0];
        const team2 = game.teams[1];

        const statusDisplay = gameActive ?
                                game.status.period
                            : game.status.name


        const gameActive = game.status.active;

        return (
            <Segment inverted={!!gameActive} color={gameActive ? 'teal' : ''}>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            {statusDisplay}
                        </Grid.Column>
                        <Grid.Column>
                            {team1.title}
                        </Grid.Column>
                        <Grid.Column>
                            {team1.score}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {gameActive ? game.status.time : ''}
                        </Grid.Column>
                        <Grid.Column>
                            {team2.title}
                        </Grid.Column>
                        <Grid.Column>
                            {team2.score}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    };
};


module.exports = GameCardInactive;
