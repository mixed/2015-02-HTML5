document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("new-todo").addEventListener("keydown", addTodo);
});

function addTodo(event) {
	var ENTER_KEYCODE = 13;
	var newTodo = document.getElementById("new-todo");
	if (event.keyCode === ENTER_KEYCODE) {
		var todo = makeTodoItem(newTodo.value);
		document.getElementById("todo-list").appendChild(todo);
		newTodo.value = "";
	}
}

function makeTodoItem(todo) {
	var newItem = document.createElement("li");
	var div = document.createElement("div");
	div.className = "view";
	var input = document.createElement("input");
	input.className = "toggle";
	input.setAttribute("type", "checkbox");
	var label = document.createElement("label");
	label.innerText = todo;
	var button = document.createElement("button");
	button.className = "destroy";

	div.appendChild(input);
	div.appendChild(label);
	div.appendChild(button);
	newItem.appendChild(div);

	return newItem;
}