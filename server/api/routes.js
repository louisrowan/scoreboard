'use strict';

const ApiRoutes = require('express').Router();
const GetAllGames = require('./getAllGames');
const GetGame = require('./getGame');


// get all gameIds
ApiRoutes.get('/gameids', (req, res) => {

    GetAllGames((err, result) => {

        if (err) {
            console.log('error getting all games', err);
            res.send({});
        }

        res.send(result);
    });
});

// get game info by id
ApiRoutes.get('/game/:league/:id', (req, res) => {

    const options = req.params;
    if (!options.league || !options.id) {
        res.status(400);
        return res.send({ message: 'missing league or game id'});
    }

    GetGame(options, (err, result) => {

        if (err) {
            console.log('error getting game', err)
            res.send({});
        }

        res.send(result);
    });
});





module.exports = ApiRoutes;

