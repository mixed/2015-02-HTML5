(function() {
  'use strict';

  $.fn.CSSAnimate = function (style, duration, animation) {
    $( this ).css({
    "transition": style + " " + duration,
    "-webkit-transition": style + " " + duration,
    "-o-transition": style + " " + duration,
    "-moz-transition": style + " " + duration
    });
    if ( animation !== undefined) {
      $( this ).css({
      "transition-timing-function": animation,
      "-webkit-transition-timing-function": animation,
      "-o-transition-timing-function": animation,
      "-moz-transition-timing-function": animation
      });
    }
  };

  TD.DATA.typeCheck = function (object) {
        var rtn = '';
        if (typeof object === 'object') {
            rtn = Object.prototype.toString
                .call(Object)
                .split(' ')[1]
                .replace(']', '');
        } else {
            rtn = typeof object;
        }
        return rtn;
    };

})();
