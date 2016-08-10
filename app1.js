/*first step:
1) define var
2) use get to send a message and show var _type on browser
3) define listen
4) use nodemon to verify if it is working
*/

var express = require('express');
var app = express(); // the application execute express
var PORT = process.argv[2] || 3000; // port receives the 2nd argument or port 3000.

var _type = [
	{
		id: 1,
		name: "my first task",
		completed: false
	},
	{
		id: 2,
		name: "another task",
		completed: false
	},

];

app.get('/home', function(req, res) {
    res.send(_type);
});


app.listen( PORT, function() {
	console.log("Listening to port " + PORT )
} );