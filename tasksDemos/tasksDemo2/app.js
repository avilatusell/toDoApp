var express = require('express')
var jade = require('jade')
var bodyParser = require('body-parser')
var app = express();

var publicFolder = __dirname + '/public';

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

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

console.log (publicFolder);
app.use( express.static(publicFolder) )

app.get('/tasks', function(req,res) {
	res.render('tasks', {
		title: "--- Lista tareas ---",
		tasks: _tasks
	});
})

app.post('/tasks', function(req,res) {
	if ( !req.body || !req.body.name ) res.send ("error!");
	var nameTask = req.body.name;
	var newTask = {
		id : ++counter,
		name: nameTask,
		completed: false
	}
	_tasks.push(newTask);
	res.redirect('/tasks')
})

// app.delete('/tasks/:taskId', function(req,res) {
// 	var idToRemove = re.paramsq.taskId;
// 	res.send("'/task/:task-id' => id to remove = " + idToRemove);
// })


app.delete('/tasks', function(req,res) {
	console.log(_tasks);
	var idToRemove = req.query.id; //captura id del element clickat
	_tasks = _tasks.filter(function(item,i) {
		return item.id !== parseInt(idToRemove,10);
	})
	// console.log ("task to remove" + idToRemove);
	console.log(_tasks);
	res.send("'/tasks' => id to remove = " + idToRemove);
	// res.redirect('/tasks')
})


app.listen(3000, function() {
	console.log("Listening on port 3000");
})