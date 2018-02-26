'use strict';

const React = require('react');
const Axios = require('axios');
const GameCardActive = require('./GameCardActive');
const GameCardInactive = require('./GameCardInactive');

const { List } = require('semantic-ui-react');

class GameCardContainer extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            data: {},
            renderData: false
        }
    };


    componentWillMount () {

        this.getGameData();
    };


    shouldComponentUpdate (nextProps) {

        if (this.state.renderData) {
            // return false;
        }
        return true;
    }


    getGameData () {

        const { league, id } = this.props;

        const url = `/api/game/${league}/${id}`;

        Axios.get(url)
            .then(res => {

                if (res.status !== 200) console.log('bad request for', url);

                const data = res.data;

                this.setState({ data, renderData: true });
                this.categorizeGame(data);
                this.props.sendStatusInfo(data);
            })
            .catch(err => {
                console.log('err?', err);
            })
    };


    categorizeGame (data) {

        const divisions = [];
        const conferences = [];

        data.teams.forEach((team) => {

            if (team.division) divisions.push(team.division);
            if (team.conference) conferences.push(team.conference);
        })

        this.props.sendInfoToParent({
            id: this.props.id,
            divisions,
            conferences
        });
    };


    render () {

        const {
            id,
            sendClickToParent,
            activeGame
        } = this.props;

        const { data, renderData } = this.state;

        const content =
            renderData ?
                activeGame ?
                    <GameCardActive game={data} />
                : <GameCardInactive game={data} />
            : '';

        return (
            <List.Item onClick={() => sendClickToParent(id)}>
                {content}
            </List.Item>
        )
    };
};


module.exports = GameCardContainer;
