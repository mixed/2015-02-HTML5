TD.ui.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;

  function TodoApp() {
    this.newTodo = $("#new-todo");
  }

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
  return TodoApp;
})();
