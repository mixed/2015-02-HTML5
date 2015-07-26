TD.ui.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;

  function TodoApp() {
    this.newTodo = $("#new-todo");
  }

  TodoApp.prototype.init = function () {
      this.addtodo();
      this.completetodo();
  };

  TodoApp.prototype.addtodo = function () {
      this.newTodo.keydown(function(e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            title : $(this).val()
          };
          var template = Handlebars.compile( $("#template").html() );
          $("ul#todo-list").append( template(data));
        }
      });
    };
  TodoApp.prototype.completetodo = function () {
    $("ul#todo-list").on("click" , ".toggle", function (e) {
         $(e.target).closest("li").toggleClass("completed");
    });
  };

  return TodoApp;
})();
