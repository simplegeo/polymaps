po.map = function() {
  var map = {},
      container,
      size,
      sizeActual = {x: 0, y: 0},
      sizeScale = sizeActual,
      sizeOne = {x: 1, y: 1},
      center = {lat: 37.76487, lon: -122.41948},
      centerRange,
      zoom = 12,
      zoomFraction = 0,
      zoomRange = [1, 18],
      event = po.dispatch(map);

  // See http://wiki.openstreetmap.org/wiki/Mercator

  function y2lat(y) {
    return 360 / Math.PI * Math.atan(Math.exp(y * Math.PI / 180)) - 90;
  }

  function lat2y(lat) {
    return 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
  }

  map.locationCoordinate = function(tileSize, l) {
    var k = Math.pow(2, 5 + zoom) / 45;
    return {
      column: k * (l.lon + 180) / tileSize.x,
      row: k * (180 - lat2y(l.lat)) / tileSize.y,
      zoom: zoom
    };
  };

  map.coordinateLocation = function(tileSize, c) {
    var k = 45 / Math.pow(2, 5 + c.zoom);
    return {
      lon: k * c.column * tileSize.x - 180,
      lat: y2lat(180 - k * c.row * tileSize.y)
    };
  };

  // Note: assumes that tileCenter.zoom == map.zoom!
  map.coordinatePoint = function(tileCenter, tileSize, c) {
    var k = Math.pow(2, zoom - c.zoom);
    return {
      x: sizeScale.x / 2 + tileSize.x * (k * c.column - tileCenter.column),
      y: sizeScale.y / 2 + tileSize.y * (k * c.row - tileCenter.row)
    };
  };

  // Note: assumes that tileCenter.zoom == map.zoom!
  map.pointCoordinate = function(tileCenter, tileSize, p) {
    return {
      column: tileCenter.column + (p.x - sizeScale.x / 2) / tileSize.x,
      row: tileCenter.row + (p.y - sizeScale.y / 2) / tileSize.y,
      zoom: zoom
    };
  };

  map.locationPoint = function(l) {
    var k = Math.pow(2, 5 + zoom + zoomFraction) / 45;
    return {
      x: (l.lon - center.lon) * k + sizeActual.x / 2,
      y: (lat2y(center.lat) - lat2y(l.lat)) * k + sizeActual.y / 2
    };
  };

  map.pointLocation = function(p) {
    var k = 45 / Math.pow(2, 5 + zoom + zoomFraction);
    return {
      lat: y2lat(lat2y(center.lat) - (p.y - sizeActual.y / 2) * k),
      lon: center.lon + (p.x - sizeActual.x / 2) * k
    };
  };

  function recenter() {
    var k = 45 / Math.pow(2, 5 + zoom + zoomFraction),
        l = Math.max(0, y2lat(180 - sizeActual.y / 2 * k));
    center.lat = Math.max(-l, Math.min(+l, center.lat));
  }

  /*
   * In Firefox, SVG elements do not report their dimensions correctly. However,
   * Firefox does correctly report the bounding box of the first child rect!
   */
  function bounds() {
    var svg = container.ownerSVGElement || container;
    return (typeof svg.offsetWidth == "undefined"
        ? svg.firstChild
        : svg).getBoundingClientRect();
  }

  // a place to capture mouse events if no tiles exist
  var rect = po.svg("rect");
  rect.setAttribute("width", "100%");
  rect.setAttribute("height", "100%");
  rect.setAttribute("visibility", "hidden");
  rect.setAttribute("pointer-events", "all");

  map.container = function(x) {
    if (!arguments.length) return container;
    container = x;
    container.setAttribute("class", "map");
    container.appendChild(rect);
    return map.resize(); // infer size
  };

  map.focusableParent = function() {
    for (var p = container; p; p = p.parentNode) {
      if (p.tabIndex >= 0) return p;
    }
    return window;
  };

  map.mouse = function(e) {
    var x = e.clientX, y = e.clientY, b = bounds();
    return {x: x - b.left, y: y - b.top};
  };

  map.size = function(x) {
    if (!arguments.length) return sizeActual;
    size = x;
    return map.resize(); // size tiles
  };

  map.resize = function() {
    if (!size) {
      var b = bounds();
      sizeActual = {x: b.width, y: b.height};
      resizer.add(map);
    } else {
      sizeActual = size;
      resizer.remove(map);
    }
    var k = Math.pow(2, -zoomFraction);
    sizeScale = {x: sizeActual.x * k, y: sizeActual.y * k};
    recenter();
    event({type: "resize"});
    return map;
  };

  map.center = function(x) {
    if (!arguments.length) return center;
    center = centerRange ? {
      lat: Math.max(centerRange[0].lat, Math.min(centerRange[1].lat, x.lat)),
      lon: Math.max(centerRange[0].lon, Math.min(centerRange[1].lon, x.lon))
    } : x;
    recenter();
    event({type: "move"});
    return map;
  };

  map.panBy = function(x) {
    var p = map.locationPoint(center);
    p.x -= x.x;
    p.y -= x.y;
    return map.center(map.pointLocation(p));
  };

  map.centerRange = function(x) {
    if (!arguments.length) return centerRange;
    centerRange = x;
    return map.center(center);
  };

  map.zoom = function(x) {
    if (!arguments.length) return zoom + zoomFraction;
    zoom = Math.max(zoomRange[0], Math.min(zoomRange[1], x));
    zoomFraction = zoom - (zoom = Math.round(zoom));
    var k = Math.pow(2, -zoomFraction);
    sizeScale = {x: sizeActual.x * k, y: sizeActual.y * k};
    return map.center(center);
  };

  map.zoomBy = function(z, x0) {
    if (arguments.length < 2) return map.zoom(zoom + zoomFraction + z);

    // compute the location of x0
    var l = map.pointLocation(x0);

    // update the zoom level
    zoom = Math.max(zoomRange[0], Math.min(zoomRange[1], zoom + zoomFraction + z));
    zoomFraction = zoom - (zoom = Math.round(zoom));
    k = Math.pow(2, -zoomFraction);
    sizeScale = {x: sizeActual.x * k, y: sizeActual.y * k};

    // compute the new point of the location
    var x1 = map.locationPoint(l);

    return map.panBy({x: x0.x - x1.x, y: x0.y - x1.y});
  };

  map.zoomRange = function(x) {
    if (!arguments.length) return zoomRange;
    zoomRange = x;
    return map.zoom(zoom + zoomFraction);
  };

  map.add = function(x) {
    x.map(map);
    return map;
  };

  map.remove = function(x) {
    x.map(null);
    return map;
  };

  return map;
};

function resizer(e) {
  for (var i = 0; i < resizer.maps.length; i++) {
    resizer.maps[i].resize();
  }
}

resizer.maps = [];

resizer.add = function(map) {
  for (var i = 0; i < resizer.maps.length; i++) {
    if (resizer.maps[i] == map) return;
  }
  resizer.maps.push(map);
};

resizer.remove = function(map) {
  for (var i = 0; i < resizer.maps.length; i++) {
    if (resizer.maps[i] == map) {
      resizer.maps.splice(i, 1);
      return;
    }
  }
};

// Note: assumes single window (no frames, iframes, etc.)!
window.addEventListener("resize", resizer, false);
