const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log("Response",req.body.arena);
  const bots=Object.entries(req.body.arena.state);
  const opponents=bots.filter(bot=>bot[0]!=="https://nodejs-bot-6evexe43kq-em.a.run.app");
  const me = bots.filter(bot=>bot[0]==="https://nodejs-bot-6evexe43kq-em.a.run.app")[0];

  const myCoordinates = {
    x: me[1].x,
    y: me[1].y
  }
  console.log("My coordinates",myCoordinates);
  const myDirection = me[1].direction;
  console.log("My direction",myDirection);
  const nearByOpponents = opponents.filter(opponent=> (opponent[1].y===myCoordinates.y+1 && opponent[1].x===myCoordinates.x || opponent[1].y===myCoordinates.y-1 && opponent[1].x===myCoordinates.x ));
  console.log("Near by opponents",nearByOpponents);
  if(nearByOpponents.length>0){
    res.send('T');
  }

  const moves = ['F','L', 'R'];
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
