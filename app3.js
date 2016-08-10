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
1) delete request to filter items not to be deleted
2) use Postman to see results
3) add button at tasks.jade
4) create main.js to define event that links button with delete request
5) set publicFolder to set folder 'public'
6) set folder for static files (main.js)

*/
var express = require('express');
var app = express();
var jade = require('jade')
var bodyParser = require('body-parser')

//define var publicFolder to get to that folder
var publicFolder = __dirname + '/public';
console.log(publicFolder);

//define var _type to save id, name and if complete task.
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

var counter = 100;

// Use Jade for HTML rendering
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Folder for Static Files (css, js, img....)
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


app.post ('/tasks', function(req, res) {
	if (!req.body || !req.body.name ) { //si no hi ha res o un espai per exemple (que no sigui un nom)
		res.send ("please, write a task!");
	}else{	
		var nameTask = req.body.name;
		var newTask = {
			id: ++counter,
			name: nameTask,
			completed: false
		}
		_tasks.push(newTask);
		res.redirect ('/tasks'); //redirigeix ouput a tasks
	}
});

// Li estem dient a la 'app' de express que quan arribi un PUT per a l'adreça
// /tasks/{id} volem que executi aquest tros de codi.
// app.put('/tasks/:idreq', function (req, res) {
// 	var found = _tasks.filter (function (obj){
// 		return obj.id === idreq;
// 	}).length == 1;

// 	if (!req.body || req.body.completed == undefined || !found ){
// 		res.send ("Invalid request or task_id not found.");
// 	}else{
// 		_tasks
// 			.filter (function (obj) {
// 				return obj.id === idreq;
// 			})
// 			.map(function (obj){
// 				obj.completed = req.body.completed;
// 				return obj;
// 			});
// 		res.redirect ('/tasks');
// 	}
//});

// Delete request and filtering tasks to be rendered.
app.delete ('/tasks', function(req, res) {
	console.log(_tasks);
	var idToRemove = req.body.id; //captures ID selected task
	_tasks = _tasks.filter(function (item,i) {
		return item.id !== parseInt(idToRemove,10); //parseInt because req.body might send a string
	}); //returns the list excluding ID selected task
	console.log(_tasks); // to verify if result is ok
	res.send(" '/tasks' => id to remove = " + idToRemove);
	});


//app.listen() method returns an http.Server object
app.listen( 3000, function() {
	console.log("Listening to port 3000")
} );