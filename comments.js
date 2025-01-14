// Create web server
// Create a new Express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function (req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function (req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    data = JSON.parse(data);
    data.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(data, null, 2), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});