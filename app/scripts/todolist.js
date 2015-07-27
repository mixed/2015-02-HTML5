TD.UI.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;

  function TodoApp() {
    this.newTodo = $("#new-todo");
  }

  TodoApp.prototype = (function() {
    var _addtodo =  function (e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            title : $(this).val()
          };
          var template = Handlebars.compile( $("#template").html() );
          var temp = $(template(data)).hide();
          $("ul#todo-list").append(temp.addClass("_add"));
          $("ul#todo-list ._add").show("slow").removeClass("_add");
        }
      };

    var _completetodo = function (e) {
      $(e.target).closest("li").toggleClass("completed");
    };

    var _removetodo = function (e) {
      $(e.target).closest("li").hide("slow", function() {
          $(this).remove();
      });
    };

    return {
      constructor: TodoApp,
      init: function () {
          $("#new-todo").keydown(_addtodo);
          $("ul#todo-list").on("click" , ".toggle", _completetodo);
          $("ul#todo-list").on("click" , ".destroy", _removetodo);
        }
      };
  })();

  return TodoApp;
})();
