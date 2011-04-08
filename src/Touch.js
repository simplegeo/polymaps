po.touch = function() {
  var touch = {},
      map,
      container,
      locations = {}; // touch identifier -> location

  window.addEventListener("touchmove", touchmove, false);

  function touchstart(e) {
    var i = -1,
        n = e.touches.length,
        t;
    while (++i < n) {
      t = e.touches[i];
      locations[t.identifier] = map.pointLocation(map.mouse(t));
    }
  }

  function touchmove(e) {
    switch (e.touches.length) {
      case 1: {
        var t0 = e.touches[0];
        map.zoomBy(0, map.mouse(t0), locations[t0.identifier]);
        e.preventDefault();
        break;
      }
      case 2: { // TODO rotation!
        var t0 = e.touches[0],
            t1 = e.touches[1],
            p0 = map.mouse(t0),
            p1 = map.mouse(t1),
            p2 = {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2}, // center point
            c0 = po.map.locationCoordinate(locations[t0.identifier]),
            c1 = po.map.locationCoordinate(locations[t1.identifier]),
            c2 = {row: (c0.row + c1.row) / 2, column: (c0.column + c1.column) / 2, zoom: 0},
            l2 = po.map.coordinateLocation(c2), // center location
            px = p0.x - p1.x,
            py = p0.y - p1.y,
            dp = Math.sqrt(px * px + py * py) / 256,
            cx = c0.column - c1.column,
            cy = c0.row - c1.row,
            dc = Math.sqrt(cx * cx + cy * cy),
            z2 = Math.log(dp / dc) / Math.log(2); // zoom level
        map.zoomBy(z2 - map.zoom(), p2, l2);
        e.preventDefault();
        break;
      }
    }
  }

  touch.map = function(x) {
    if (!arguments.length) return map;
    if (map) {
      container.removeEventListener("touchstart", touchstart, false);
      container = null;
    }
    if (map = x) {
      container = map.container();
      container.addEventListener("touchstart", touchstart, false);
    }
    return touch;
  };

  return touch;
};
