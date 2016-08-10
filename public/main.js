console.log ("hello from main.js")

//code from DELETE request
$(".tasks li a.remove").on('click', function(event) {

	event.preventDefault();
//	console.log(this); // this es el objeto que captura el evento cuando clickamos

	var url = $(this).attr("href"); // capturamos la href que será nuestra url
//	console.log(url);

	var $self = $(this);

	$.ajax({
		url: url,
		type: 'delete'
	})
	.done(function (msg) {
		//console.log(msg);
		$self.parent().remove();
	})

	//console.log("continue doing this...")

})


//code from PUT request to change completed status
$(".tasks li a.done").on('click', function(event) {

	event.preventDefault();
	//console.log(this); // this es el objeto que captura el evento cuando clickamos

	var url = $(this).attr("href"); // capturamos la href que será nuestra url
	//console.log(url);

	$.ajax({
		url: url,
		type: 'put'
	})
	.done(function (urlDone) {
	//	console.log(urlDone);
	})

	//console.log("continue doing this...")

})
