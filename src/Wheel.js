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

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  var inner = document.createElement("div"),
      outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.top = "0px";
  outer.style.height = "0px";
  outer.style.width = "0px";
  outer.style.overflowY = "scroll";
  inner.style.height = "2000px";
  inner.style.width = "2000px";
  outer.appendChild(inner);
  document.body.appendChild(outer);

  function mousewheel(e) {
    var deltaY = e.wheelDelta || -e.detail,
        deltaX = 0,
        point;

    /* Detect the pixels that would be scrolled by this wheel event. */
    if (deltaY) {
      /* smooth zooming must be enabled for 'pan' mode */
      if (smooth) {
        /* 1 means horizontal movement, 2 means vertical */
        if (e.axis === 1) {
          deltaX = deltaY;
          deltaY = 0;
        }
        else {
          try {
            outer.scrollTop = 1000;
            outer.scrollLeft = 1000;
            outer.dispatchEvent(e);
            deltaY = 1000 - outer.scrollTop;
            deltaX = 1000 - outer.scrollLeft;
          } catch (error) {
            // Derp! Hope for the best?
          }
        }

        if (zoom !== 'pan') {
          deltaY *= .005;
        }
      }

      /* If smooth zooming is disabled, batch events into unit steps. */
      else {
        var timeNow = Date.now();
        if (timeNow - timePrev > 200) {
          deltaY = deltaY > 0 ? +1 : -1;
          timePrev = timeNow;
        } else {
          deltaY = 0;
        }
      }
    }

    if (deltaY || deltaX) {
      switch (zoom) {
        case "pan": {
          map.panBy({x: deltaX, y: deltaY});
          break;
        }
        case "mouse": {
          point = map.mouse(e);
          if (!location) location = map.pointLocation(point);
          map.off("move", move).zoomBy(deltaY, point, location).on("move", move);
          break;
        }
        case "location": {
          map.zoomBy(deltaY, map.locationPoint(location), location);
          break;
        }
        default: { // center
          map.zoomBy(deltaY);
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
      container.removeEventListener("MozMousePixelScroll", mousewheel, false);
      container = null;
      map.off("move", move);
    }
    if (map = x) {
      if (zoom == "mouse") map.on("move", move);
      container = map.container();
      container.addEventListener("mousemove", move, false);
      container.addEventListener("mousewheel", mousewheel, false);
      container.addEventListener("MozMousePixelScroll", mousewheel, false);
    }
    return wheel;
  };

  return wheel;
};
