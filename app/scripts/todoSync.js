TD.DATA.TodoSync = (function() {
    'use strict';
  function TodoSync() {
      if (this instanceof TodoSync) {
          this.baseURI = "http://128.199.76.9:8002";
          this.nickname = "HwangJJung";
          this.url = this.baseURI+"/"+this.nickname;
      } else {
        return new TodoSync();
      }
  }

  TodoSync.prototype = (function() {
    var _todoAjax = function (method,callback,data) {
      var self = this;
      var buffer;
      var url = self.url;

      buffer = { "nickname" : self.nickname };
      if (arguments.length === 3) {
          $(buffer).prop(data);
          if (data.hasOwnProperty("id")) {
            url = self.url + "/" + data.id;
          }
      }
      $.ajax({
          method: method,
          url: url,
          data: buffer
          })
          .done(function(data) {
            if ($.isFunction(callback))  {
                callback(data);
            }
          })
          .fail(function() {
              alert( "error" );
      });
    };
    return {
      constructor: TodoSync,
      get: function (callback) {
        _todoAjax.call(this,"GET",callback);
      },
      save: function (data, callback) {
        _todoAjax.call(this,"PUT",callback,data);
      },
      complete: function (data, callback) {
        _todoAjax.call(this,"POST",callback,data);
      },
      delete: function (data,callback) {
        _todoAjax.call(this,"DELETE",callback,data);
      },
      /*
      * TODO: update는 개발중!
      */
      update: function (data,callback) {

      }
    };
  })();

  return TodoSync;
})();
