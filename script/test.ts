/// <reference path="watchable.ts" />

document.body.appendChild(document.createElement("h1")).innerHTML = 'Modify "person.{name|occupation|alias}" in the console.';

//Object to watch
var person = {
	name: "Clark Kent",
	occupation: "Reporter",
	alias: "Smallville"
}
//HTML nodes and initial values
var nameNode = document.body.appendChild(document.createElement("p"));
nameNode.innerHTML = "name: " + person.name;
var occupationNode = document.body.appendChild(document.createElement("p"));
occupationNode.innerHTML = "occupation: " + person.occupation;
var aliasNode = document.body.appendChild(document.createElement("p"));
aliasNode.innerHTML = "alias: " + person.alias;
var descriptionNode = document.body.appendChild(document.createElement("p"));
descriptionNode.innerHTML = "description: " + person.name + ', ' + person.occupation;;
//WatchAble instance
var watchable = Watchable.instance(person);
//Callbacks
var nameNodeCB = function (newValue: string) {
	nameNode.innerHTML = "Name: " + person.name;
};
var occupationNodeCB = function (newValue: string) {
	occupationNode.innerHTML = "Occupation: " + person.occupation;
};
var aliasNodeCB = function (newValue: string) {
	aliasNode.innerHTML = "Alias: " + person.alias;
};
var descriptionNodeCB = function (newValue: string) {
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
