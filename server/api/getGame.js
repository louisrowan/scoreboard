'use strict';

const http = require('http');

const internals = {};

const getGame = (options, next) => {

    const { league, id } = options;

    const sport = league === 'epl' ? 'soccer' : league;

    http.get(`http://stats.api.si.com/v1/${sport}/game_detail?id=${id}&league=${league}&box_score=true`, (res) => {

        let raw = ''
        res.on('data', (chunk) => {

            raw += chunk;
        })

        res.on('end', (e) => {

            const result = JSON.parse(raw);
            return next(null, internals.parse(result.data, league))
        })

        res.on('error', (e) => {

            console.log('err', e);
            return(e);
        })
    });
}


internals.parse = (data, league) => {

    const result = {};
    result.id = data.id;
    result.league = data.league.abbreviation;
    result.leagueFullname = data.league.name;
    result.startTime = new Date(data.start.utc);

    const addStatus = (data) => {

        const s = data.status;
        const status = {};
        status.active =  s.is_active;
        status.name = s.name;

        if (league === 'nhl' && s.period) {
            status.period = s.period.name;
            status.unit = s.period.unit;
            status.time = s.period.time;
        }
        else if (s.period) {
            status.period = s.period.id;
            status.unit = s.period.unit;
            status.time = s.period.time;
        }

        if (s.inning) {
            status.inning = s.inning;
            status.balls = s.balls;
            status.strikes = s.strikes;
            status.outs = s.outs;
            status.runnersOnBase = s.runners_on_base;
        }

        return status;
    }


    const addTeams = (data) => {

        return data.teams.map((t) => {

            const team = {};
            team.id = t.id;
            team.location = t.location.name;
            team.mascot = t.name;
            team.title = t.title;
            team.isHome = t.location.type === 'home';
            team.logos = {
                base: t.logo.base,
                _50x50: t.logo.cuts['50x50']
            };
            team.colors = {
                primary: t.color.primary,
                secondary: t.color.secondaty
            };
            team.record = {
                wins: t.record.wins,
                losses: t.record.losses
            };

            if (league === 'ncaab') {
                team.division = t.college_sub_division.name;
                team.conference = t.conference.name;
            }

            team.isWinner = t.is_winner;
            team.score = t.score;

            return team;
        })
    }

    result.teams = addTeams(data);
    result.status = addStatus(data);
    
    return result;
};


module.exports = getGame;
