TD.UTILITY.TypeManager = (function() {
  'use strict';

  function TypeManager() {
    if (this instanceof TypeManager) {

    } else {
      return new TypeManager();
    }
  }

  TypeManager.prototype = (function() {

    return {
      constructor: TypeManager,
      booleanToInteger: function (bool) {
          if (typeof bool === "boolean") {
            if (bool) {
              return "1";
            } else {
              return "0";
            }
          } else {
            return console.error("booleanToInteger: param is not bool.");
          }
        }
      };
  }());

  return TypeManager;
})();
