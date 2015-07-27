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
      this.addAnimation();
  };

  TodoApp.prototype.addtodo = function () {
      this.newTodo.keydown(function(e) {
        if(e.keyCode === ENTER_KEYCODE){
          var data = {
            title : $(this).val()
          };
          var template = Handlebars.compile( $("#template").html() );
          var temp = $(template(data));
          var heightBuffer = temp.css("height");
          $("ul#todo-list").append(temp.addClass("blind"));

            $("ul#todo-list .blind").removeClass().height("60px");
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
         $(e.target).closest("li").css("opacity","0");
         $(e.target).closest("li").remove();
       });
  };
  TodoApp.prototype.addAnimation = function () {
    $("ul#todo-list li").CSSAnimate("height","1s","ease-out");
  };

  return TodoApp;
})();
