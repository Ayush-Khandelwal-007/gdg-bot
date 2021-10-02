const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log("Response",req.body.arena);
  const bots=Object.entries(req.body.arena.state).filter(bot=>bot[0]!=="https://nodejs-bot-6evexe43kq-em.a.run.app");



  console.log('players = ',Object.entries(req.body.arena.state).length," - 1 = " ,bots.length);

  const moves = ['F', 'T', 'L', 'R'];
  res.send('T');
});

app.listen(process.env.PORT || 8080);
