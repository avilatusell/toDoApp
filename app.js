var express = require('express');
var app = express();
var PORT = process.argv[2] || 3000; // port receives the 2nd argument or port 3000.

var _type = [];

app.get('/home', function(req, res) {
    res.send('Hi!This is working!!');
});


app.listen( PORT, function() {
	console.log("Listening to port " + PORT )
} );