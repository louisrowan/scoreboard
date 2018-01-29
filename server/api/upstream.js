'use strict';

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

    getPlayerStats = (playerArray) => {

        const formattedPlayers = playerArray.map((p) => {

            const player = {};
            player.name = p.player.name.first + ' ' + p.player.name.last,
            player.number = p.player.uniform,
            player.image = p.player.image.base + p.player.slug,
            player.points = p.player.points
            player.offensiveRebounds = p.player.rebounds.offensive,
            player.defensiveRebounds = p.player.rebounds.defensive,
            player.totalRebounds = p.player.rebounds.total,
            player.assists = p.player.assists,
            player.steals = p.player.steals,
            player.blocks = p.player.blocked_shots,
            player.turnovers = p.player.turnovers,
            player.fouls = p.player.personal_fouls
            player.fgAttemped = p.player.field_goals.attempted,
            player.fgMade = p.player.field_goals.made,
            player.fgPercentage = p.player.field_goals.percentage,
            player.ftAttempted = p.player.free_throws.attempted,
            player.ftMade = p.player.free_throws.made,
            player.ftPercentage = p.player.free_throws.percentage,
            player.threePtAttempted = p.player.three_point_field_goals.attempted,
            player.threePtMade = p.player.three_point_field_goals.made,
            player.threePtPercentage = p.player.three_point_field_goals.percentage
            player.minutes = p.player.minutes_played
            player.plusMinus = p.player.plus_minus
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

            const stats = data.box_scores.find((b) => b.team_id === team.id);

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
                    blocks: stats.team_stats.blocked_shots
                    turnovers: stats.team_stats.turnovers.total
                },
                playerStats: getPlayerStats(stats.playerstats)
            }
        })
    }
    return res;
}