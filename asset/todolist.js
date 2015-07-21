$("document").ready(function() {
	$("#new-todo").on("keydown", addTodo);
});

function addTodo(event) {
	var ENTER_KEYCODE = 13;
	var newTodo = $("#new-todo").get(0);
	if (event.keyCode === ENTER_KEYCODE) {
		makeTodoItem(newTodo.value);
		newTodo.value = "";
	}
};

function makeTodoItem(todo) {
	var template = $('#template').html();
	Mustache.parse(template);
	var rendered = Mustache.render(template, {title: todo});
	$('#todo-list').append(rendered);
	var todo = $('#todo-list li:last');
	todo.on("click", controlTodo);
};

function controlTodo(event) {
	var eTarget = event.target;
	if (eTarget.tagName === "INPUT") {
		completedTodo(event);
	}
	else if (eTarget.tagName === "BUTTON") {
		removeTodo(event);
	}
};

function completedTodo(event) {
	var input = event.target;
	var li = event.currentTarget;
	if (input.checked) {
		li.classList.add("completed");
	}
	else {
		li.classList.remove("completed");
	}
};

function removeTodo(event) {
	var li = event.currentTarget;
	li.classList.add("deleting");
	li.addEventListener("transitionend", function() {
		this.remove();
	});
};