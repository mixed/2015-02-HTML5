var TODO = {
	ENTER_KEYCODE : 13,
	init : function() {
		$("#new-todo").on("keydown", this.build.bind(this));
		$('#todo-list').on("click", ".toggle", this.completed.bind(this));
		$('#todo-list').on("click", ".destroy", this.removeItem.bind(this));
        
        //ajax get
        TODOSync.get(function(todo, key) {
            this.makeItem(todo, key);
        }.bind(this));
	},
	build : function(event) {
		var newTodo = $("#new-todo");
		if (event.keyCode === this.ENTER_KEYCODE && newTodo.val()) {
			//ajax post
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
        newTodoLi.attr("data-key", key);
	},
	completed : function(event) {
		var li = $(event.target).closest("li");
		var complete;
        if (li.hasClass("completed")) {
            complete = 0;
        }
        else {
            complete = 1;
        }
        
        //ajax complete
        TODOSync.completed(li.attr("data-key"), complete, function() {
            li.toggleClass("completed");
        }.bind(this));
	},
	removeItem : function(event) {
		var li = $(event.target).closest("li");
        //ajax delete
        TODOSync.remove(li.attr("data-key"), function() {
            li.addClass("deleting");
            li.on("transitionend", function() {
                this.remove();
            });
        }.bind(this));
	}
};



var TODOSync = {
	url : "http://128.199.76.9:8002/WooJaeWoo",
	get : function(callback) {
		$.ajax({
			url: this.url,
			method: "GET",
			success: function(result) {
                $.each(result.reverse(), function(index, item) {
                    callback(item.todo, item.id);
                });
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
	completed : function(key, complete, callback) {
		$.ajax({
			url: this.url + "/" + key,
			method: "POST",
			data: {"completed": complete},
			success: function(result) {
                callback();
			}
		});
	},
	remove : function(key, callback) {
		$.ajax({
			url: this.url + "/" + key,
			method: "DELETE",
			success: function(result) {
                callback();
			}
		});
	}
};




$("document").ready(function() {
	TODO.init();
});

//service worker??