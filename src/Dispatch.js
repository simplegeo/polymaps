po.dispatch = function(that) {
  var handlers = {};

  that.on = function(type, handler) {
    var array = handlers[type] || (handlers[type] = []);
    for (var i = 0; i < array.length; i++) {
      if (array[i] == handler) return that; // already registered
    }
    array.push(handler);
    return that;
  };

  that.off = function(type, handler) {
    var array = handlers[type];
    if (array) for (var i = 0; i < array.length; i++) {
      if (array[i] == handler) {
        array.splice(i, 1);
        break;
      }
    }
    return that;
  };

  return function(event) {
    var array = handlers[event.type];
    if (!array) return;
    array = array.slice(); // defensive copy
    for (var i = 0; i < array.length; i++) {
      array[i].call(that, event);
    }
  };
};
