/*var xhr = new XMLHttpRequest();
xhr.open("GET", "", false);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
xhr.addEventListener()
xhr.send(null);
result = xhr.responseText;
result = JSON.parse(xhr);*/

var TODOSync = {
	get : function() {

	},
	add : function(todo, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", "http://128.199.76.9:8002/WooJaeWoo", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.addEventListener("load", function() {
			callback(xhr.responseText);
			//DOM 
		});
		xhr.send("todo="+todo);

	},
	completed : function() {

	},
	remove : function() {

	}
};

var TODO = {
	ENTER_KEYCODE : 13,
	init : function() {
		$("#new-todo").on("keyup", this.build.bind(this));
		$('#todo-list').on("click",this.controller.bind(this));
	},
	build : function(event) {
		var newTodo = $("#new-todo");
		if (event.keyCode === this.ENTER_KEYCODE && newTodo.val()) {
			this.makeItem(newTodo.val());
			newTodo.val("");
		}
	},
	makeItem : function(todo) {
		var template = $('#template').html();
		Mustache.parse(template);
		var rendered = Mustache.render(template, {title: todo});
		$('#todo-list').append(rendered);
		$('#todo-list li:last').css('opacity');
		$('#todo-list li:last').removeClass("appending");
	},
	controller : function(event) {
		var eTarget = event.target;
		if (eTarget.tagName === "INPUT") {
			this.completed(eTarget);
		}
		else if (eTarget.tagName === "BUTTON") {
			this.removeItem(eTarget);
		}
	},
	completed : function(eTarget) {
		var li = $(eTarget).closest("li");
		if (eTarget.checked) {
			li.addClass("completed");
		}
		else {
			li.removeClass("completed");
		}
	},
	removeItem : function(eTarget) {
		var li = $(eTarget).closest("li");
		li.addClass("deleting");
		li.on("transitionend", function() {
			li.remove();
		});
	}
};

$("document").ready(function() {
	TODO.init();
});