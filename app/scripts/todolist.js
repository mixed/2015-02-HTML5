TD.UI.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;

  function TodoApp() {
    this.newTodo = $("#new-todo");
  }

  TodoApp.prototype.init = function () {
      this.addtodo();
      this.completetodo();
      this.removetodo();
  };

  TodoApp.prototype.addtodo = function () {
      this.newTodo.keydown(function(e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            title : $(this).val()
          };
          var template = Handlebars.compile( $("#template").html() );
          var temp = $(template(data)).hide();
          $("ul#todo-list").append(temp.addClass("_add"));
          $("ul#todo-list ._add").show("slow").removeClass("_add");
        }
      });
    };
  TodoApp.prototype.completetodo = function () {
    $("ul#todo-list").on("click" , ".toggle", function (e) {
         $(e.target).closest("li").toggleClass("completed");
    });
  };

  TodoApp.prototype.removetodo = function () {
    $("ul#todo-list").on("click" , ".destroy", function (e) {
         $(e.target).closest("li").hide("slow", function() {
            $(this).remove();
         });
       });
  };
  return TodoApp;
})();
