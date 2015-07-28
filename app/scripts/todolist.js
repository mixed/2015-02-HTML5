TD.UI.TodoApp = (function() {
    'use strict';
    var ENTER_KEYCODE = 13;
    var sync = new TD.DATA.TodoSync();
    var typeManager = new TD.UTILITY.TypeManager();
    var SELECTOR = {
      TODO_UL_ID: "#todo-list",
      TODO_INPUT: "#new-todo"
    };
  function TodoApp() {
      if (this instanceof TodoApp) {

      } else {
        return new TodoApp();
      }
  }

  TodoApp.prototype = (function() {

    var _render = function(todo) {
      var list = {
        "li": todo
      };
      var template = Handlebars.compile( $("#template").html() );
      return template(list);
    };

    var _add =  function (e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            "todo" : $(this).val()
          };
          sync.save(data, function(todo) {
            $(data).prop("id",todo.insertId);
            var html = _render([data]);
            $(html).prependTo($(SELECTOR.TODO_UL_ID));
            $(SELECTOR.TODO_UL_ID +" li:first").show("slow");
          });
        }
      };

    var _complete = function (e) {
      var data = {
        "todo" : $(this).siblings("label").text(),
        "id" : $(this).closest("li").data("id"),
        "completed" : typeManager.booleanToInteger($(this).prop("checked"))
      };
        sync.complete(data, function(todo) {
            $(e.target).closest("li").toggleClass("completed");
        });
    };

    var _update = function (e) {

    };

    var _toggleEdit = function (e) {
        var editable = $(this).prop("contenteditable");
        if(editable === "true"){
          $(this).attr("contenteditable","false");
        } else {
          $(this).attr("contenteditable","true");
          /*
          * contenteditable 속성을 가진 엘리먼트에게 포커스이벤트 발생시
          * 자동으로 커서가 잡히지 않기 때문에 스크립트로 잡아주어야한다.
          */
          $(this).trigger( "focus" );
        }
    };

    var _remove = function (e) {
      var data = {
        "id" : $(this).closest("li").data("id")
      };
        sync.delete(data, function(todo) {
          $(e.target).closest("li").hide("slow", function() {
              $(this).remove();
          });
        });
    };

    var _get = function (e) {
      sync.get(function(todo) {
        var html = _render(todo);
        $(SELECTOR.TODO_UL_ID).append(html);
        $(SELECTOR.TODO_UL_ID + " li").each(function (index) {
          $(this).show("slow").delay(index*50);
        });
      });
    };

    return {
      constructor: TodoApp,
      init: function () {
          _get();
          $(SELECTOR.TODO_INPUT).keydown(_add);
          $(SELECTOR.TODO_UL_ID).on("change" , ".toggle", _complete);
          $(SELECTOR.TODO_UL_ID).on("click" , ".destroy", _remove);
          $(SELECTOR.TODO_UL_ID).on("dblclick" , ".title", _toggleEdit);
        }
      };
  })();

  return TodoApp;
})();
