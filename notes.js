var myObject = {
	name : "anna",
	sayHi : function() {
		return "Hi my name is " + this.name;
	}
}

myObject.sayHi();

myObject.sayHi.call( { name: "juanma"} );
