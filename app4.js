/*
1st step:
1) define var
2) use get to send a message and show on browser
3) define listen
4) use nodemon to verify if it is working

2nd step:
1) create "views" folder and "tasks.jade" file
2) install jade module
3) define app.set('views'...), app.set('view engine'...) and express.static
4) define var bodyParser and app.use bodyparser to use POST method.
5) add POST
6) add var counter
7) install npm body-parser
8) put in package.json the dependencies

3rd step:
1) define DELETE request to filter items not to be deleted
2) use Postman/Curl to see results
3) add button at tasks.jade
4) create main.js to define event that links button with DELETE request
5) set publicFolder to set folder 'public'
6) set folder for static files (main.js)

4th step:
1) define PUT request to modify "completed" status to true
2) use Postman/Curl to see results
3) add button done at tasks.jade
4) at main.js add event that links "done" button with PUT request

*/


//define var and modules needed
var express = require('express');
var app = express();
var jade = require('jade')
var bodyParser = require('body-parser')

//define var publicFolder to have acces at "main.js"
var publicFolder = __dirname + '/public';
console.log(publicFolder);

//define var _type to save id, name and task status
var _tasks = [
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
	{
		id: 3,
		name: "and another task one more time",
		completed: false
	}
];

//set counter to start numbering tasks (id)
var counter = 100;

// use Jade for HTML rendering
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// folder for Static Files (css, js, img....)
app.use(express.static(__dirname + '/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// GET request with the '/tasks' path. Renders'tasks.jade' and insert title and tasks from object _tasks
app.get('/tasks', function(req, res) {
    res.render('tasks', {
    	title: "---List tasks ---",
    	tasks: _tasks
    });
});

//POST request to get the inputs of the form
app.post ('/tasks', function(req, res) {
	if (!req.body || !req.body.name123 ) { //in case content is void or there is something that it isn't a name (space, char, etc.)
		res.send ("please, write a task!");
	}else{
		var nameTask = req.body.name123;
		var newTask = {
			id: ++counter,
			name: nameTask,
			completed: false
		}
		_tasks.push(newTask);
		res.redirect ('/tasks'); //redirect to output tasks
	}
});


// DELETE request and filtering tasks to be rendered.
app.delete ('/tasks', function(req, res) {
	//parseInt because req.query.id might send a string
	var idToRemove = parseInt(req.query.id,10);
	_tasks = _tasks.filter(function (item,i) {
		return item.id !== idToRemove; 
	});
	res.send(" '/tasks' => id to remove = " + idToRemove);
});


// PUT request to modify "completed" status
app.put ('/tasks', function(req, res) {

	var idTaskDone = parseInt(req.query.id, 10);
	var myTaskDone = _tasks.filter(function (item,i) {
		return item.id === idTaskDone; 
	})[0];

	myTaskDone.completed = true;

	console.log(_tasks);
	res.send(" Done! task = " + idTaskDone);
});



//app.listen() method returns an http.Server object
app.listen( 3000, function() {
	console.log("Listening to port 3000")
} );

