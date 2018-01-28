const http = require('http');

let count = 0

http.get('http://stats.api.si.com/v1/nba/game_detail?id=1947986&league=nba&box_score=true', (res) => {

    let raw = ''
    res.on('data', (chunk) => {

        count += 1

        raw += chunk;
    })

    res.on('end', (e) => {

        console.log('end', e);
        const result = JSON.parse(raw);
        console.log(JSON.stringify(result, null, 2));
        console.log(count);
    })

    res.on('error', (e) => {

        console.log('err', e);
    })
})

!function t() {

    console.log('true');
}

t()