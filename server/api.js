'use strict';

const getAllGames = require('../getAllGames');


const api = (req, res, next) => {

    getAllGames.getAllGames((err, result) => {

        res.send(result)
    })
};

module.exports = api;
