TD.DATA.TodoSync = (function() {
    'use strict';
  function TodoSync() {
      if (this instanceof TodoSync) {
          this.url = "http://128.199.76.9:8002";
          this.nickname = "HwangJJung";

      } else {
        return new TodoSync();
      }
  }

  TodoSync.prototype = (function() {

    // var _removetodo = function (e) {
    //   $(e.target).closest("li").hide("slow", function() {
    //       $(this).remove();
    //   });
    // };

    return {
      constructor: TodoSync,
      get: function (callback) {
          $.ajax({
              method: "GET",
              url: this.url+"/"+this.nickname,
              data: { "nickname": this.nickname }
              })
              .done(function(data) {
                if ($.isFunction(callback))  {
                    callback(data);
                }
              })
              .fail(function() {
                  alert( "error" );
          });
        },
      save: function (data, callback) {
        $(data).prop("nickname",this.nickname);
        $.ajax({
            method: "PUT",
            url: this.url+"/"+this.nickname,
            data: data
            })
            .done(function(data) {
              if ($.isFunction(callback))  {
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
