TD.UI.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;
    var sync = new TD.DATA.TodoSync();
    var typeManager = new TD.UTILITY.TypeManager();

  function TodoApp() {
      if (this instanceof TodoApp) {

      } else {
        return new TodoApp();
      }
  }

  TodoApp.prototype = (function() {

    var _renderTodo = function(todo) {
      var list = {
        "li": todo
      };
      var template = Handlebars.compile( $("#template").html() );
      return template(list);
    };

    var _addTodo =  function (e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            "todo" : $(this).val()
          };
          sync.save(data, function(todo) {
            $(data).prop("id",todo.insertId);
            var html = _renderTodo(data);
            $(html).prependTo($("ul#todo-list"));
            $("ul#todo-list li:first").show("slow");
          });
        }
      };

    var _completeTodo = function (e) {
      var data = {
        "todo" : $(this).siblings("label").text(),
        "id" : $(this).closest("li").data("id"),
        "completed" : typeManager.booleanToInteger($(this).prop("checked"))
      };
        sync.complete(data, function(todo) {
            $(e.target).closest("li").toggleClass("completed");
        });
    };

    var _updateTodo = function (e) {

    };

    var _removeTodo = function (e) {
      var data = {
        "id" : $(this).closest("li").data("id")
      };
        sync.delete(data, function(todo) {
          $(e.target).closest("li").hide("slow", function() {
              $(this).remove();
          });
        });
    };

    var _getTodo = function (e) {
      sync.get(function(todo) {
        var html = _renderTodo(todo);
        $("ul#todo-list").append(html);
        $("ul#todo-list li").each(function (index) {
          $(this).show("slow").delay(index*50);
        });
      });
    };

    return {
      constructor: TodoApp,
      init: function () {
          _getTodo();
          $("#new-todo").keydown(_addTodo);
          $("ul#todo-list").on("change" , ".toggle", _completeTodo);
          $("ul#todo-list").on("click" , ".destroy", _removeTodo);
        }
      };
  })();

  return TodoApp;
})();
