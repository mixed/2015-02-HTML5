var TODOSync = {
	url : "http://128.199.76.9:8002/WooJaeWoo",
	get : function(callback) {
		$.ajax({
			url: this.url,
			method: "GET",
			success: function(result) {

			}
		});
	},
	add : function(todo, callback) {
		$.ajax({
			url: this.url,
			method: "PUT",
			data: {"todo": todo},
			success: function(result) {
				callback(result.insertId);
			}
		});
	},
	completed : function(key) {
		$.ajax({
			url: this.url,
			method: "PUT",
			data: {"todo": todo},
			success: function(result) {
			}
		});
	},
	remove : function(key) {
		$.ajax({
			url: this.url + "/" + key,
			method: "DELETE",
			success: function(result) {
				console.log(result);
			}
		});
	}
};

var TODO = {
	ENTER_KEYCODE : 13,
	init : function() {
		$("#new-todo").on("keydown", this.build.bind(this));
		$('#todo-list').on("click", ".toggle", this.completed.bind(this));
		$('#todo-list').on("click", ".destroy", this.removeItem.bind(this));
	},
	build : function(event) {
		var newTodo = $("#new-todo");
		if (event.keyCode === this.ENTER_KEYCODE && newTodo.val()) {
			TODOSync.add(newTodo.val(), function(key) {
				this.makeItem(newTodo.val(), key);
				newTodo.val("");
			}.bind(this));
		}
	},
	makeItem : function(todo, key) {
		//Mustache Library
		var template = $('#template').html();
		Mustache.parse(template);
		var rendered = Mustache.render(template, {title: todo});
		$('#todo-list').append(rendered);
		
		var newTodoLi = $('#todo-list li:last');
		newTodoLi.css('opacity');
		newTodoLi.removeClass("appending");

		//Dataset
		newTodoLi[0].dataset.key = key;
	},
	completed : function(event) {
		var li = $(event.target).closest("li");
		li.toggleClass("completed");
	},
	removeItem : function(event) {
		var li = $(event.target).closest("li");
		li.addClass("deleting");

		TODOSync.remove(li[0].dataset.key);

		li.on("transitionend", function() {
			li.remove();
		});
	}*/
	/*controller : function(event) {
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
		li.toggleClass("completed");
	},
	removeItem : function(eTarget) {
		var li = $(eTarget).closest("li");
		li.addClass("deleting");

		TODOSync.remove(li[0].dataset.key);

		li.on("transitionend", function() {
			li.remove();
		});
	}*/
};

$("document").ready(function() {
	TODO.init();
});


//service worker