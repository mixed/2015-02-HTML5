$("document").ready(function() {
	$("#new-todo").on("keydown", addTodo);
});

function addTodo(event) {
	var ENTER_KEYCODE = 13;
	var newTodo = $("#new-todo").get(0);
	if (event.keyCode === ENTER_KEYCODE) {
		var todo = makeTodoItem(newTodo.value);
		newTodo.value = "";
	}
}

function makeTodoItem(todo) {
	var template = $('#template').html();
	Mustache.parse(template);
	var rendered = Mustache.render(template, {title: todo});
	$('#todo-list').append(rendered);
}