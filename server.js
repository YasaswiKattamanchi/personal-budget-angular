const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const data = fs.readFileSync('budget.json', 'utf8');

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget',(req, res) => {
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})