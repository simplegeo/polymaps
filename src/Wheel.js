po.wheel = function() {
  var wheel = {},
      timePrev = 0,
      last = 0,
      smooth = true,
      zoom = "mouse",
      location,
      map,
      container;

  function move(e) {
    location = null;
  }

  function mousewheel(e) {
    var delta = (e.wheelDelta / 120 || -e.detail) * .1,
        point;

    /* Detect fast & large wheel events on WebKit. */
    if (bug40441 < 0) {
      var now = Date.now(), since = now - last;
      if ((since > 9) && (Math.abs(e.wheelDelta) / since >= 50)) bug40441 = 1;
      last = now;
    }
    if (bug40441 == 1) delta *= .03;

    /* If smooth zooming is disabled, batch events into unit steps. */
    if (!smooth && delta) {
      var timeNow = Date.now();
      if (timeNow - timePrev > 200) {
        delta = delta > 0 ? +1 : -1;
        timePrev = timeNow;
      } else {
        delta = 0;
      }
    }

    if (delta) {
      switch (zoom) {
        case "mouse": {
          point = map.mouse(e);
          if (!location) location = map.pointLocation(point);
          map.off("move", move).zoomBy(delta, point, location).on("move", move);
          break;
        }
        case "location": {
          map.zoomBy(delta, map.locationPoint(location), location);
          break;
        }
        default: { // center
          map.zoomBy(delta);
          break;
        }
      }
    }

    e.preventDefault();
    return false; // for Firefox
  }

  wheel.smooth = function(x) {
    if (!arguments.length) return smooth;
    smooth = x;
    return wheel;
  };

  wheel.zoom = function(x, l) {
    if (!arguments.length) return zoom;
    zoom = x;
    location = l;
    if (map) {
      if (zoom == "mouse") map.on("move", move);
      else map.off("move", move);
    }
    return wheel;
  };

  wheel.map = function(x) {
    if (!arguments.length) return map;
    if (map) {
      container.removeEventListener("mousemove", move, false);
      container.removeEventListener("mousewheel", mousewheel, false);
      container.removeEventListener("DOMMouseScroll", mousewheel, false);
      container = null;
      map.off("move", move);
    }
    if (map = x) {
      if (zoom == "mouse") map.on("move", move);
      container = map.container();
      container.addEventListener("mousemove", move, false);
      container.addEventListener("mousewheel", mousewheel, false);
      container.addEventListener("DOMMouseScroll", mousewheel, false);
    }
    return wheel;
  };

  return wheel;
};

// https://bugs.webkit.org/show_bug.cgi?id=40441
var bug40441 = /WebKit\/533/.test(navigator.userAgent) ? -1 : 0;
