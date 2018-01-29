const express = require('express');
const path = require('path');
const port = 8080;
const routes = require('./routes')
const app = express();

app.use(express.static(__dirname + '/../dist'));

// route backend
app.get('/api', routes.getAllGamesRoute);

// route frontend
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
});

app.listen(port, (err) => {

    if (err) {
        console.log('Error starting server', err)
        process.exit(1);
    }
    console.log('Server Started on port', port);
});
