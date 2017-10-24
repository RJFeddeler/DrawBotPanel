'use strict';

class Name {
	constructor() {
		console.log("NAME THIS");
		console.log(this);
		this.name = "Test";
		this.age = 19;
	}

	sayName() {
		console.log(this.age);
	}
}