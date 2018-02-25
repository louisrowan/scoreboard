'use strict';

const React = require('react');
const Axios = require('axios');
const GameCardContainer = require('./GameCardContainer');
const {
    Button,
    List
} = require('semantic-ui-react');


let count = 0;


const sortedGames = (league) => {

    const sorted = Object.keys(league).sort((a, b) => {

        a = league[a];
        b = league[b];

        return a.statusInt < b.statusInt ? -1 : 1;
    })

    return sorted;
}


class GameIndex extends React.Component {

    constructor () {

        super();
        this.state = {
            leagues: {},
            activeLeague: null,
            activeGame: null,
            divisions: {},
            conferences: {}
        };

        this.handleChildClick = this.handleChildClick.bind(this);
        this.handleGameCategorizations = this.handleGameCategorizations.bind(this);
        this.handleDivisionConferenceButtonClick = this.handleDivisionConferenceButtonClick.bind(this);
        this.handleChildStatusUpdate = this.handleChildStatusUpdate.bind(this);
        this.filteredGames = this.filteredGames.bind(this);
    };

    componentWillMount () {

        const url = '/api/gameids?date=today';
        Axios.get(url)
            .then((res) => {

                if (res.status != 200) {
                    console.warn('bad response from GET', url, res);
                    return;
                }

                const data = res.data;

                const leagues = {};
                Object.keys(data).map((index) => {

                    const league = data[index];
                    leagues[league.league] = {};
 
                    league.games.forEach((game) => {

                        leagues[league.league][game] =  {
                            id: game,
                            divisions: [],
                            conferences: []
                        }
                    })
                });
                this.setState({ leagues });
            })
            .catch((err) => {

                console.log('err?', err);
            });
    };


    handleChildClick (id) {

        if (this.state.activeGame === id) {
            // this.setState({ activeGame: null })
        }
        else {
            this.setState({ activeGame: id })
        };
    };



    handleGameCategorizations (args) {

        const { leagues, activeLeague } = this.state;
        const { id, divisions, conferences } = args;

        const newDivisions = Object.assign({}, this.state.divisions);
        const newConferences = Object.assign({}, this.state.conferences);

        divisions.forEach((d) => {

            if (!newDivisions[d]) {
                newDivisions[d] = {
                    division: d,
                    active: false
                };
            }
        });

        conferences.forEach((c) => {

            if (!newConferences[c]) {
                newConferences[c] = {
                    conference: c,
                    active: false
                };
            }
        });

        const league = Object.assign({}, leagues[activeLeague]);
        const game = league[id];

        const newLeagues = Object.assign(
            {},
            leagues,
            { [activeLeague]: Object.assign(
                {},
                leagues[activeLeague],
                { [id]: args })
            });

        this.setState({
            leagues: newLeagues,
            divisions: newDivisions,
            conferences: newConferences
        });
    };


    handleDivisionConferenceButtonClick (group, type) {

        if (type === 'division') {

            const division = group;
            const d = this.state.divisions[division];

            this.setState({ divisions: Object.assign(
                {},
                this.state.divisions,
                { [division]: {
                    division: division,
                    active: !d.active
                }}
            )})

        } else if (type === 'conference') {

            const conference = group;
            const c = this.state.conferences[conference];

            this.setState({ conferences: Object.assign(
                {},
                this.state.conferences,
                { [conference]: {
                    conference: conference,
                    active: !c.active
                }}
            )})

        } else {
            console.log('mismatch in division confere', type);
        }

    };


    handleChildStatusUpdate (childData) {

        const { leagues, activeLeague } = this.state;
        const { status } = childData;
        const league = leagues[activeLeague];

        let game = league[childData.id];
        game = Object.assign({}, game);
        game.status = status.name;

        switch (game.status) {
            case 'In-Progress':
                game.statusInt = 1;
                break;
            case 'Pre-Game':
                game.statusInt = 2;
                break;
            case 'Final':
                game.statusInt = 3;
                break;
        }

        const newLeagues = Object.assign(
            {},
            leagues,
            { [activeLeague]: Object.assign(
                {},
                leagues[activeLeague],
                { [childData.id]: Object.assign(
                    {},
                    leagues[activeLeague][childData.id],
                    game)
                })
            });

        this.setState({ leagues: newLeagues })
    };


    filteredGames (game) {

        const { leagues, activeLeague, divisions, conferences } = this.state;

        const league = leagues[activeLeague];

        const activeDivisions = Object.keys(divisions).filter((d) => {

            d = divisions[d];
            return d.active;
        });

        const activeConferences = Object.keys(conferences).filter((c) => {
            c = conferences[c];
            return c.active
        });

        game = league[game.key];

        if (activeDivisions.length) {
            let hasDivision = false;
            activeDivisions.forEach((d) => {
                if (game.divisions.includes(d)) {
                    hasDivision = true;
                }
            })
            if (!hasDivision) return false;
        }

        if (activeConferences.length) {
            let hasConference = false;
            activeConferences.forEach((d) => {
                if (game.conferences.includes(d)) {
                    hasConference = true;
                }
            })
            if (!hasConference) return false;
        }

        return true;
    }


    render () {

        const {
            activeGame,
            leagues,
            activeLeague,
            divisions,
            conferences
        } = this.state

        const header = leagues ? Object.keys(leagues).map((league) => {

            return <Button
                        key={league}
                        onClick={() => this.setState({ activeLeague: league })}>
                        {league}
                        </Button>
        }) : '';

        const divisionButtons =
        <Button.Group>
            {Object.keys(divisions).map((division) => {

                const d = divisions[division];

                return <Button
                        onClick={() => this.handleDivisionConferenceButtonClick(d.division, 'division')}
                        key={d.division}
                        active={d.active}>
                        {d.division}</Button>
            })}
        </Button.Group>;

        const conferenceButtons =
        <Button.Group>
            {Object.keys(conferences).map((conference) => {

                const c = conferences[conference];

                return <Button
                        onClick={() => this.handleDivisionConferenceButtonClick(c.conference, 'conference')}
                        key={c.conference}
                        active={c.active}>
                        {c.conference}</Button>
            })}
        </Button.Group>;

        const games =
            activeLeague ?
                <List>{sortedGames(leagues[activeLeague]).map((gameId) => {

                    const game = leagues[activeLeague][gameId];

                    return <GameCardContainer
                            key={game.id}
                            id={game.id}
                            league={activeLeague}
                            sendClickToParent={this.handleChildClick}
                            sendInfoToParent={this.handleGameCategorizations}
                            sendStatusInfo={this.handleChildStatusUpdate}
                            activeGame={game.id === activeGame} />
                }).filter(this.filteredGames)}</List>
            : '';

        return (
            <div>
                { leagues && header }
                <br />
                { divisions && divisionButtons }
                <br />
                { conferences && conferenceButtons }
                { activeLeague && games }
            </div>
        )
    };
};


module.exports = GameIndex;
