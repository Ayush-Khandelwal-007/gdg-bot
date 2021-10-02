const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log("Response",req.body.arena);
  const bots=Object.entries(req.body.arena.state);

  console.log('players = ',bots)

  const moves = ['F', 'T', 'L', 'R'];
  res.send('T');
});

app.listen(process.env.PORT || 8080);
