// app.js

var express = require('express');
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();
var app = express();

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    console.log(req.query.term)
    var queryString = req.query.term; //ask
    // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
    var term = encodeURIComponent(queryString);
    // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    http.get(url, function(response) {
        // SET ENCODING OF RESPONSE TO UTF8
        response.setEncoding('utf8'); //ask
        var body = '';

    response.on('data', function(d) {
      // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
      body += d;
    });

    response.on('end', function() {
      // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
      var parsed = JSON.parse(body);
      // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
      res.render('home', {gifs: parsed.data})
    });
  });
})

app.get('/hello-gif', function (req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/hello-squirrel', function (req, res) {
    res.send('Hello Squirrel')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
