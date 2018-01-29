'use strict';

const React = require('react');
const ReactDOM = require('react-dom')
const GameIndex = require('./components/GameIndex');

const App = () => {

    return (
        <div>
            <GameIndex />
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
