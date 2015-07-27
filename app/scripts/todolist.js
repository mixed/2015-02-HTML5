TD.UI.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;
    var sync = new TD.DATA.TodoSync();

  function TodoApp() {
      if (this instanceof TodoApp) {

      } else {
        return new TodoApp();
      }
  }

  TodoApp.prototype = (function() {
    var _addTodo =  function (e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            todo : $(this).val()
          };
          sync.save(data, function(todo) {
            $(data).prop("id",todo.insertId);
            var list = {
              li: [data]
            };
            var template = Handlebars.compile( $("#template").html() );
            var html = template(list);
            $(html).addClass("_add").prependTo($("ul#todo-list li:first"));
            $("ul#todo-list ._add").show("slow").removeClass("");
          });
        }
      };

    var _completeTodo = function (e) {
      $(e.target).closest("li").toggleClass("completed");
    };

    var _removeTodo = function (e) {
      $(e.target).closest("li").hide("slow", function() {
          $(this).remove();
      });
    };

    var _getTodo = function (e) {
      sync.get(function(todo) {
        var list = {
          li: todo
        };
        var template = Handlebars.compile( $("#template").html() );
        var html = template(list);
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
