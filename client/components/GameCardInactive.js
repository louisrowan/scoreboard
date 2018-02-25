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
        const { status } = game;

        const team1 = game.teams[0];
        const team2 = game.teams[1];

        
        const active = status.name === 'In-Progress';
        const final = status.name === 'Final';
        const inverted = !!active || !!final;

        const color = active ? 'teal' :
                        final ? 'red' : '';

        const formatHours = (num) => num > 12 ? num - 12 : num;

        const start = new Date(game.startTime)
        const formattedStart = formatHours(start.getHours()).toString().padStart(2, '0') + ':' + start.getMinutes().toString().padStart(2, '0');

        const time = active ? status.active ? status.time :
                    'Half'
                    : final ? '' : formattedStart;



        return (
            <Segment inverted={inverted} color={color}>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            {active ? `${status.period} ${status.unit}`: status.name}
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
                            {time}
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
