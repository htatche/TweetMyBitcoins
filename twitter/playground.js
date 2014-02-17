var Human = function() {
	var name = "Android";

	this.Child = function() {
		console.log(name);
	}
};

var human = new Human();
console.log(human.name)