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
})();
