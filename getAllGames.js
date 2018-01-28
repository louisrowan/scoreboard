const Http = require('http');
const { parseGameId } = require('./script');


const date = new Date();
const year = date.getFullYear().toString();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`

const url = `http://stats.api.si.com/v1/all_sports/calendar?start_date=${formattedDate}&end_date=${formattedDate}`

Http.get(url, (res) => {

    let raw = '';

    res.on('data', (chunk) => {

        raw += chunk;
    });

    res.on('error', (e) => {

        console.warn('error', e)
    })

    res.on('end', () => {

        const result = JSON.parse(raw);
        
        parseResult(result);
    });
});

const parseResult = (result) => {

    try {
        const data = result.data;
        const days = data.days[0];
        const leagues = days.leagues;
        const nba = leagues.find((l) => l.league === 'nba');
        const ids = nba.events.map((e) => e.event_id);

        const promises = []
        ids.forEach((id) => {
            promises.push(parseGameId(id));
        });

        Promise.all(promises)
            .then((values) => {

                console.log(JSON.stringify(values, null, 2));
            })
            .catch((err) => {

                console.log('err', err);
            })
    }
    catch (e) {
        console.log('catch err', e);
    }
}