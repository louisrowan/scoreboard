'use strict';

const http = require('http');

const internals = {};

const getGame = (options, next) => {

    const { league, id } = options;

    http.get(`http://stats.api.si.com/v1/${league}/game_detail?id=${id}&league=${league}&box_score=true`, (res) => {

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

    switch (league) {
        case 'nba':
            return internals.parseNBA(data);
        case 'ncaab':
            return internals.parseNCAAB(data);
        default:
            console.log('unknown league');
            return null;
    }
}

internals.parseNCAAB = (data) => {

    const result = {};
    result.id = data.id;
    result.league = data.league.abbreviation;
    result.leagueFullname = data.league.name;


    const addStatus = (data) => {

        const s = data.status;

        const status = {};
        status.active =  s.is_active;
        status.name = s.name;

        if (status.active) {
            status.period = s.period.id;
            status.unit = s.period.unit;
            status.time = s.period.time;
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
                _50x50: t.logo['50x50']
            };
            team.colors = {
                primary: t.color.primary,
                secondary: t.color.secondaty
            };
            team.record = {
                wins: t.record.wins,
                losses: t.record.losses
            };
            team.division = t.college_sub_division.name;
            team.conference = t.conference.name;
            team.isWinner = t.is_winner;
            team.score = t.score;

            return team;
        })
    }

    result.teams = addTeams(data);
    result.status = addStatus(data);
    
    return result;
}


internals.parseNBA = (data) => {

    const getPlayerStats = (playerArray) => {

        const formattedPlayers = playerArray.map((p) => {

            const player = {};
            player.name = p.player.name.first + ' ' + p.player.name.last;
            player.number = p.player.uniform;
            player.image = p.player.image.base + p.player.slug;
            player.points = p.points;
            player.assists = p.assists;
            player.steals = p.steals;
            player.blocks = p.blocked_shots;
            player.turnovers = p.turnovers;
            player.fouls = p.personal_fouls;
            player.minutes = p.minutes_played;
            player.plusMinus = p.plus_minus;

            player.offensiveRebounds = p.rebounds.offensive;
            player.defensiveRebounds = p.rebounds.defensive;
            player.totalRebounds = p.rebounds.total;

            player.fgAttemped = p.field_goals.attempted;
            player.fgMade = p.field_goals.made;
            player.fgPercentage = p.field_goals.percentage;

            player.ftAttempted = p.free_throws.attempted;
            player.ftMade = p.free_throws.made;
            player.ftPercentage = p.free_throws.percentage;

            player.threePtAttempted = p.three_point_field_goals.attempted;
            player.threePtMade = p.three_point_field_goals.made;
            player.threePtPercentage = p.three_point_field_goals.percentage;

            return player;
        });

        return formattedPlayers;
    };

    const res = {
        id: data.id,
        start: data.start.utc,
        tvStations: data.tv_stations.map((s) => s.name),
        venue: {
            name: data.venue.name,
            city: data.venue.city,
            state: data.venue.state.name
        },
        status: {
            isActive: data.status.is_active,
            period: data.status.name
        },
        teams: data.teams.map((team) => {

            const stats = data.box_scores.find((b) => {

                return b.team_id === team.id
            });

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
                isWinner: team.is_winner,
                teamStats: {
                    points: stats.team_stats.points,
                    fgAttempts: stats.team_stats.field_goals.attempted,
                    fgMade: stats.team_stats.field_goals.made,
                    offensiveRebounds: stats.team_stats.rebounds.offensive,
                    defensiveRebounds: stats.team_stats.rebounds.defensive,
                    totalRebounds: stats.team_stats.rebounds.total,
                    ftMade: stats.team_stats.free_throws.made,
                    ftAttempted: stats.team_stats.free_throws.attempted,
                    ftPercent: stats.team_stats.free_throws.percentage,
                    threePtMade: stats.team_stats.three_point_field_goals.made,
                    threePtAttempted: stats.team_stats.three_point_field_goals.attempted,
                    threePtPercent: stats.team_stats.three_point_field_goals.percentage,
                    assists: stats.team_stats.assists,
                    steals: stats.team_stats.steals,
                    blocks: stats.team_stats.blocked_shots,
                    turnovers: stats.team_stats.turnovers.total
                },
                playerStats: getPlayerStats(stats.playerstats)
            }
        })
    }
    return res;
}



module.exports = getGame;
