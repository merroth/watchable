/// <reference path="watchable.ts" />
document.body.appendChild(document.createElement("h1")).innerHTML = 'Modify "person.{name|occupation|alias}" in the console.';
//Object to watch
var person = {
	name: "Clark Kent",
	occupation: "Reporter",
	alias: "Smallville"
};
var watchable = new Watchable(person);
(function stuffThatYouShouldntTouchInTheConsole() {

	//HTML nodes and initial values
	var nameNode = document.body.appendChild(document.createElement("p"));
	nameNode.innerHTML = "name: " + person.name;
	var occupationNode = document.body.appendChild(document.createElement("p"));
	occupationNode.innerHTML = "occupation: " + person.occupation;
	var aliasNode = document.body.appendChild(document.createElement("p"));
	aliasNode.innerHTML = "alias: " + person.alias;
	var descriptionNode = document.body.appendChild(document.createElement("p"));
	descriptionNode.innerHTML = "description: " + person.name + ', ' + person.occupation;;
	var thisIsNode = document.body.appendChild(document.createElement("p"));
	thisIsNode.innerHTML = "this is: " + person.name + ', (' + person.alias + ")";
	//WatchAble instance
	//Callbacks
	var thisIsNodeCB = function (newValue?: string, oldValue?: string) {
		//This callback is run both when name or occupation is changed
		//Called by other listeners
		console.log("thisIsNodeCB");
		thisIsNode.innerHTML = "This is: " + person.name + ', (' + person.alias + ")";
	};
	var nameNodeCB = function (newValue: string, oldValue: string) {
		nameNode.innerHTML = "Name: " + person.name;
		thisIsNodeCB();
	};
	var occupationNodeCB = function (newValue: string, oldValue: string) {
		occupationNode.innerHTML = "Occupation: " + person.occupation;
	};
	var aliasNodeCB = function (newValue: string, oldValue: string) {
		aliasNode.innerHTML = "Alias: " + person.alias;
		thisIsNodeCB();
	};
	var descriptionNodeCB = function (newValue: string, oldValue: string) {
		//This callback is run both when name or occupation is changed
		//Called by its own listener
		console.log("descriptionNodeCB");
		descriptionNode.innerHTML = "Description: " + person.name + ', ' + person.occupation;
	};
	//Register events
	watchable
		.registerListener({
			name: "name change",
			key: "name",
			cb: nameNodeCB
		})
		.registerListener({
			name: "occupation change",
			key: "occupation",
			cb: occupationNodeCB
		})
		.registerListener({
			name: "alias change",
			key: "alias",
			cb: aliasNodeCB
		})
		.registerListener({
			name: "description change",
			key: "name",
			cb: descriptionNodeCB
		})
		.registerListener({
			name: "description change",
			key: "occupation",
			cb: descriptionNodeCB
		})
		;
})();
alert(
	`Watchable allows you to listen for changes on an object.
This is done by overwriting the supplied objects attributes with getter/setter methods and referring a stored clone.
Watchable is a clean way of creating non-DOM event listeners for your code, a little like Angular JS, but without the "dirty checking"*.

We CAN do some "dirty checking" in the sense that we can register listeners for all changes by ommiting a specific key.
This is more of a feature than a bug since it leaves it up to the implementation.

A word of warning: This class does NOT have any protection against infinite loops built in, so beware if you modify attributes from callbacks!`
);