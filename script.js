const http = require('http');

const internals = {};

exports.parseGameId = (id) => {

    return new Promise((resolve, reject) => {

        http.get(`http://stats.api.si.com/v1/nba/game_detail?id=${id}&league=nba&box_score=true`, (res) => {

            let raw = ''
            res.on('data', (chunk) => {

                raw += chunk;
            })

            res.on('end', (e) => {

                const result = JSON.parse(raw);
                resolve(internals.parse(result.data))
            })

            res.on('error', (e) => {

                console.log('err', e);
                reject(e);
            })
        });
    })
}

internals.parse = (data) => {

    const res = {
        start: data.start.utc,
        tvStations: data.tv_stations.map((s) => s.name),
        venue: {
            name: data.venue.name,
            city: data.venue.city,
            state: data.venue.state.name
        },
        teams: data.teams.map((team) => {

            return {
                name: team.title,
                logo: team.logo.base,
                color1: team.color.primary,
                color2: team.color.secondary,
                record: {
                    wins: team.record.wins,
                    losses: team.record.losses,
                    winPercent: team.record.percentage
                },
                score: team.score,
                isWinner: team.is_winner
            }
        })
    }
    console.log('res?', res);
    return res;
}