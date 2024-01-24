const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('./express app/public'));  // setup static and middleware

app.get('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/about', (_req, res) => {
    res.sendFile(path.resolve(__dirname, './public/about.html'));
});

app.all('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, './public/404.html'));
});

app.listen(3000, () => {
    console.log('app is listening on localhost:3000...');
});