'use strict';

const React = require('react');
const { Table } = require('semantic-ui-react');

class TeamBoxScore extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            stats: {}
        };
    };


    componentWillMount () {

        const { playerStats } = this.props.team;

        const stats = {};
        Object.keys(playerStats[0]).forEach((key) => {
            if (typeof playerStats[0][key] === 'number') {
                stats[key] = true;
            }
        });

        this.setState({ stats });
    };


    render () {

        const { playerStats } = this.props.team || {};
        const { stats } = this.state || {};

        const headers = 
        <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {Object.keys(stats).map((stat) => {

                return <Table.HeaderCell key={stat}>{stat}</Table.HeaderCell>
            })}
        </Table.Row>

        const box = Object.keys(playerStats).map((index) => {

            const player = playerStats[index];

            return <Table.Row key={player.name}>
            <Table.Cell>{player.name}</Table.Cell>
            {Object.keys(stats).map((stat) => {

                return <Table.Cell key={stat}>{player[stat]}</Table.Cell>
            })}</Table.Row>
        })

        return (
            <Table celled compact>
                <Table.Body>
                    {stats && headers}
                    {stats && box}
                </Table.Body>
            </Table>
        )
    };
};

module.exports = TeamBoxScore;
