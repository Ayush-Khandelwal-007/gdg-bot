const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
  const bots=Object.entries(req.body.arena.state);
  const myBotName=req.body._links.self.href;
  const opponents=bots.filter(bot=>bot[0]!==myBotName);
  const me = bots.filter(bot=>bot[0]===myBotName)[0];

  const myCoordinates = {
    x: me[1].x,
    y: me[1].y
  }
  const moves = ['F','L', 'R'];
  console.log("My coordinates",myCoordinates);
  const myDirection = me[1].direction;
  console.log("My direction",myDirection);
  const nearByOpponents = opponents.filter(opponent=> ((opponent[1].y===myCoordinates.y+1 && opponent[1].x===myCoordinates.x) || (opponent[1].y===myCoordinates.y-1 && opponent[1].x===myCoordinates.x) || (opponent[1].x===myCoordinates.x+1 && opponent[1].y===myCoordinates.y) || (opponent[1].x===myCoordinates.x-1 && opponent[1].y===myCoordinates.y) ));
  console.log("Near by opponents",nearByOpponents);
  if(nearByOpponents.length>0){
    if(myDirection==="N"){
      nearByOpponents.forEach(element => {
        if(myCoordinates.x==element[1].x && myCoordinates.y+1==element[1].y)res.send('T');
        
        if(myCoordinates.y==element[1].y && myCoordinates.x+1==element[1].x && element[1].direction==-'W')res.send('R');
        if(myCoordinates.y==element[1].y && myCoordinates.x-1==element[1].x && element[1].direction==-'E')res.send('L');

        else res.send('F');
      });
    }
    if(myDirection==="S"){
      nearByOpponents.forEach(element => {
        if(myCoordinates.x==element[1].x && myCoordinates.y-1==element[1].y)res.send('T');

        if(myCoordinates.y==element[1].y && myCoordinates.x+1==element[1].x && element[1].direction==-'W')res.send('L');
        if(myCoordinates.y==element[1].y && myCoordinates.x-1==element[1].x && element[1].direction==-'E')res.send('R');

        else res.send('F');
      });
    }
    if(myDirection==="E"){
      nearByOpponents.forEach(element => {
        if(myCoordinates.x+1==element[1].x && myCoordinates.y==element[1].y)res.send('T');

        if(myCoordinates.y+1==element[1].y && myCoordinates.x==element[1].x && element[1].direction==-'W')res.send('L');
        if(myCoordinates.y-1==element[1].y && myCoordinates.x==element[1].x && element[1].direction==-'N')res.send('R');

        else res.send('F');
      });
    }
    if(myDirection==="S"){
      nearByOpponents.forEach(element => {
        if(myCoordinates.x-1==element[1].x && myCoordinates.y==element[1].y)res.send('T');

        if(myCoordinates.y+1==element[1].y && myCoordinates.x==element[1].x && element[1].direction==-'W')res.send('R');
        if(myCoordinates.y-1==element[1].y && myCoordinates.x==element[1].x && element[1].direction==-'N')res.send('L');

        else res.send('F');
      });
    }
  }
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
