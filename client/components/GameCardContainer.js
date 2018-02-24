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


    getGameData () {

        const { league, id } = this.props;

        const url = `/api/game/${league}/${id}`;

        Axios.get(url)
            .then(res => {
                console.log('res?', res);
                return res.data
            })
            .then(data => {
                console.log('data?', data);
                this.setState({ data, renderData: true })
            })
            .catch(err => {
                console.log('err?', err);
            })
    }


    render () {

        const { game, sendClickToParent, activeGame } = this.props;
        const { data, renderData } = this.state;

        const content =
            renderData ?
                activeGame ?
                    <GameCardActive game={data} />
                : <GameCardInactive game={data} />
            : '';

        return (
            <List.Item onClick={() => sendClickToParent(game.id)}>
                {content}
            </List.Item>
        )
    };
};


module.exports = GameCardContainer;
