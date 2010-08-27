po.wheel = function() {
  var wheel = {},
      timePrev = 0,
      smooth = true,
      location,
      map;

  function move(e) {
    location = null;
  }

  function mousewheel(e) {
    var delta = (e.wheelDelta / 120 || -e.detail) * .1,
        point = map.mouse(e);
    if ((bug40441 < 0) && (Math.abs(e.wheelDelta) >= 4800)) bug40441 = 1;
    if (bug40441 == 1) delta *= .03;
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

// https://bugs.webkit.org/show_bug.cgi?id=40441
var bug40441 = /WebKit\/533/.test(navigator.userAgent) ? -1 : 0;
