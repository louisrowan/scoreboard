'use strict';

const Http = require('http');
const { parseGameId } = require('./upstream');

const internals = {};


internals.parseResult = (result) => {

    return result.data.days[0].leagues.map((league) => {

        const res = {};
        res.league = league.league;
        res.games = league.events.map((game) => game.event_id);
        return res;
    });
}

module.exports = (next) => {

    const date = new Date();
    const year = date.getFullYear().toString();

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    // const month = '01'
    // const day = '28'

    const formattedDate = `${year}-${month}-${day}`;
    const url = `http://stats.api.si.com/v1/all_sports/calendar?start_date=${formattedDate}&end_date=${formattedDate}`;

    console.log(url);

    Http.get(url, (res) => {

        let raw = '';

        res.on('data', (chunk) => (raw += chunk));

        res.on('error', (e) => {

            console.warn('error in get all games', e)
            return next(e)
        })

        res.on('end', () => {

            const result = JSON.parse(raw);
            const parsed = internals.parseResult(result);
            return next(null, parsed);
        });
    });
};
