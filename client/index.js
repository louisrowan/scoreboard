const React = require('react');
const ReactDOM = require('react-dom')
const GetGames = require('../getAllGames');

const App = () => {

    return (
        <div>
            <DoStuff />
        </div>
    );
};

class DoStuff extends React.Component {

    constructor () {

        super();
        this.state = { games: [] };
    }

    componentWillMount () {

        GetGames.getAllGames((err, data) => {

            this.setState({ games: data });
        })
    };

    render () {

        return (
            <div>
                { this.state.games &&
                    this.state.games.map((game, i) => {

                        return (
                            <div key={i}>
                                <hr />
                                <p>{game.teams[0].name}: {game.teams[0].score}</p>
                                <p>{game.teams[1].name}: {game.teams[1].score}</p>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);