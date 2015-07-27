TD.DATA.TodoSync = (function() {
    'use strict';
  function TodoSync() {
      if (this instanceof TodoSync) {

      } else {
        return new TodoSync();
      }
  }

  TodoSync.prototype = (function() {

    var _removetodo = function (e) {
      $(e.target).closest("li").hide("slow", function() {
          $(this).remove();
      });
    };

    return {
      constructor: TodoSync,
      get: function () {
          $("#new-todo").keydown(_addtodo);
          $("ul#todo-list").on("change" , ".toggle", _completetodo);
          $("ul#todo-list").on("click" , ".destroy", _removetodo);
        },
      save: function (data, callback) {
        $.ajax({
            method: "POST",
            url: "http://128.199.76.9:8002/HwangJJung",
            data: data
            })
            .done(function(data) {
              if (typeCheck(callback) === "function")  {
                  callback(data);
              }
            })
            .fail(function() {
                alert( "error" );
        });
      }
    };
  })();

  return TodoSync;
})();
