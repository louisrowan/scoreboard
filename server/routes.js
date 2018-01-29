'use strict';

const GetAllGames = require('./api/getAllGames');

const getAllGamesRoute = (req, res, next) => {

    GetAllGames((err, result) => {

        if (err) {
            console.log('error getting all games', err);
            res.send({});
        }

        res.send(result);
    });
};

module.exports = {
    getAllGamesRoute
};
