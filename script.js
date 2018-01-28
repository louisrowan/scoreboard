const http = require('http');

exports.parseGameId = (id) => {

    http.get(`http://stats.api.si.com/v1/nba/game_detail?id=${id}&league=nba&box_score=true`, (res) => {

        let raw = ''
        res.on('data', (chunk) => {

            raw += chunk;
        })

        res.on('end', (e) => {

            const result = JSON.parse(raw);
            console.log(result);
        })

        res.on('error', (e) => {

            console.log('err', e);
        })
    });
}

