po.wheel = function() {
  var wheel = {},
      timePrev = 0,
      smooth = true,
      location,
      map;

  /* Yikes! Mousewheel speed is totally nonstandard! */
  var speed = 0.01
      / (/WebKit\/534\./.test(navigator.userAgent) ? 9
      : /Chrome\//.test(navigator.userAgent) ? 90
      : /Firefox\//.test(navigator.userAgent) ? .5
      : 360);

  function move(e) {
    location = null;
  }

  function mousewheel(e) {
    var delta = (e.wheelDelta || -e.detail) * speed,
        point = map.mouse(e);
    if (!location) location = map.pointLocation(point);
    map.off("move", move);
    if (smooth) {
      map.zoomBy(delta, point, location);
    } else if (delta) {
      var timeNow = Date.now();
      if (timeNow - timePrev > 200) {
        map.zoomBy(delta > 0 ? +1 : -1, point, location);
        timePrev = timeNow;
      }
    }
    map.on("move", move);
    e.preventDefault();
    return false; // for Firefox
  }

  wheel.smooth = function(x) {
    if (!arguments.length) return smooth;
    smooth = x;
    return wheel;
  };

  wheel.map = function(x) {
    if (!arguments.length) return map;
    (map = x).on("move", move);
    // TODO remove from old map container?
    // TODO update if map container changes?
    var container = map.container();
    container.addEventListener("mousemove", move, false);
    container.addEventListener("mousewheel", mousewheel, false);
    container.addEventListener("DOMMouseScroll", mousewheel, false);
    return wheel;
  };

  return wheel;
};
