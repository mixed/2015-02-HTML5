var TODO = {
	ENTER_KEYCODE : 13,
	selectedIndex : 0,
	init : function() {
		$("#new-todo").on("keydown", this.build.bind(this));
		$("#todo-list").on("click", ".toggle", this.completed.bind(this));
		$("#todo-list").on("click", ".destroy", this.removeItem.bind(this));
        $("#filters").on("click", this.changeStateFilter.bind(this));
        $(window).on("popstate", this.changeURLFilter.bind(this));
        
        //ajax get
        TODOSync.get(function(todo, key, completed) {
            this.makeItem(todo, key, completed);
        }.bind(this));
	},
	changeURLFilter : function(event) {
		if (event.state) {
			var method = event.state.method;
			if (method === "all") {
				this.viewAll();
			}
			else if (method === "active") {
				this.viewActive();
			}
			else if (method === "completed") {
				this.viewCompleted();
			}
		}
		else {
			this.viewAll();
		}
	},
	changeStateFilter : function(event) {
		var target = $(event.target);
		if (target.is("a")) {
			var href = target.attr("href");
			$("#todo-list").removeClass();
			if (href === "index.html") {
				this.viewAll();
				history.pushState({"method":"all"}, null, "index.html");
			}
			else if (href === "active") {
				this.viewActive();
				history.pushState({"method":"active"}, null, "active");
			}
			else if (href === "completed") {
				this.viewCompleted();
				history.pushState({"method":"completed"}, null, "completed");
			}
		}
		event.preventDefault();
	},
	viewAll : function() {
		this.selectNavigator(0);
	},
	viewActive : function() {
		$("#todo-list").addClass("all-active");
		this.selectNavigator(1);
	},
	viewCompleted : function() {
		$("#todo-list").addClass("all-completed");
		this.selectNavigator(2);
	},
	selectNavigator : function(index) {
		$("#filters a").eq(this.selectedIndex).removeClass("selected");
		$("#filters a").eq(index).addClass("selected");
		this.selectedIndex = index;
	},
	build : function(event) {
		var newTodo = $("#new-todo");
		if (event.keyCode === this.ENTER_KEYCODE && newTodo.val()) {
			//ajax post
            TODOSync.add(newTodo.val(), function(key) {
				this.makeItem(newTodo.val(), key, 0);
				newTodo.val("");
			}.bind(this));
		}
	},
	makeItem : function(todo, key, completed) {
		//Mustache Library
		var template = $('#template').html();
		Mustache.parse(template);
		var rendered = Mustache.render(template, {title: todo});
		$("#todo-list").append(rendered);
		
		var newTodoLi = $("#todo-list li:last");
		newTodoLi.css("opacity");
		newTodoLi.removeClass("appending");
		if (completed) {
			newTodoLi.addClass("completed");
		}

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


//Service code
$("document").ready(function() {
	TODO.init();
	TODOSync.init();
});