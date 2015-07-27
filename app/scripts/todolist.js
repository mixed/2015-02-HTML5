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
    var _addtodo =  function (e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            nickname : "Hwangjjung",
            title : $(this).val()
          };

          sync.save(data, function(data) {
            $("ul#todo-list").append(temp.addClass("_add").attr("data-key",data.insertId));
            $("ul#todo-list ._add").show("slow").removeClass("_add");
          }.bind(this));

          var template = Handlebars.compile( $("#template").html() );
          var temp = $(template(data)).hide();
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
          $("ul#todo-list").on("change" , ".toggle", _completetodo);
          $("ul#todo-list").on("click" , ".destroy", _removetodo);
        }
      };
  })();

  return TodoApp;
})();
