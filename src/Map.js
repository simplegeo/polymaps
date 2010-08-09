po.map = function() {
  var map = {},
      container,
      size,
      sizeActual = zero,
      sizeRadius = zero, // sizeActual / 2
      center = {lat: 37.76487, lon: -122.41948},
      centerRange,
      zoom = 12,
      zoomFraction = 0,
      zoomFactor = 1, // Math.pow(2, zoomFraction)
      zoomRange = [1, 18],
      angle = 0,
      angleCos = 1, // Math.cos(angle)
      angleSin = 0, // Math.sin(angle)
      angleCosi = 1, // Math.cos(-angle)
      angleSini = 0, // Math.sin(-angle)
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

  map.coordinatePoint = function(tileCenter, tileSize, c) {
    var kc = Math.pow(2, zoom - c.zoom),
        kt = Math.pow(2, zoom - tileCenter.zoom),
        dx = (c.column * kc - tileCenter.column * kt) * tileSize.x * zoomFactor,
        dy = (c.row * kc - tileCenter.row * kt) * tileSize.y * zoomFactor;
    return {
      x: sizeRadius.x + angleCos * dx - angleSin * dy,
      y: sizeRadius.y + angleSin * dx + angleCos * dy
    };
  };

  map.pointCoordinate = function(tileCenter, tileSize, p) {
    var kt = Math.pow(2, zoom - tileCenter.zoom),
        dx = (p.x - sizeRadius.x) / (tileSize.x * zoomFactor),
        dy = (p.y - sizeRadius.y) / (tileSize.y * zoomFactor);
    return {
      column: tileCenter.column * kt + angleCosi * dx - angleSini * dy,
      row: tileCenter.row * kt + angleSini * dx + angleCosi * dy,
      zoom: zoom
    };
  };

  map.locationPoint = function(l) {
    var k = Math.pow(2, 5 + zoom + zoomFraction) / 45,
        dx = (l.lon - center.lon) * k,
        dy = (lat2y(center.lat) - lat2y(l.lat)) * k;
    return {
      x: sizeRadius.x + angleCos * dx - angleSin * dy,
      y: sizeRadius.y + angleSin * dx + angleCos * dy
    };
  };

  map.pointLocation = function(p) {
    var k = 45 / Math.pow(2, 5 + zoom + zoomFraction),
        dx = (p.x - sizeRadius.x) * k,
        dy = (p.y - sizeRadius.y) * k;
    return {
      lon: center.lon + angleCosi * dx - angleSini * dy,
      lat: y2lat(lat2y(center.lat) - angleSini * dx - angleCosi * dy)
    };
  };

  function recenter() {
    var k = 45 / Math.pow(2, 5 + zoom + zoomFraction),
        y = Math.max(angleSin * sizeRadius.x + angleCos * sizeRadius.y,
                     angleSini * sizeRadius.x + angleCosi * sizeRadius.y),
        l = Math.max(0, y2lat(180 - y * k));
    center.lat = Math.max(-l, Math.min(+l, center.lat));
  }

  // a place to capture mouse events if no tiles exist
  var rect = po.svg("rect");
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
    var point = (container.ownerSVGElement || container).createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    return point.matrixTransform(container.getScreenCTM().inverse());
  };

  map.size = function(x) {
    if (!arguments.length) return sizeActual;
    size = x;
    return map.resize(); // size tiles
  };

  map.resize = function() {
    if (!size) {
      /*
       * Firefox does not correctly report the dimensions of SVG elements.
       * However, it does correctly report the size of the child rect!
       */
      var e = container.ownerSVGElement || container;
      if (e.offsetWidth == null) {
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        e = rect;
      }
      b = e.getBoundingClientRect();
      sizeActual = {x: b.width, y: b.height};
      resizer.add(map);
    } else {
      sizeActual = size;
      resizer.remove(map);
    }
    rect.setAttribute("width", sizeActual.x);
    rect.setAttribute("height", sizeActual.y);
    sizeRadius = {x: sizeActual.x / 2, y: sizeActual.y / 2};
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
    var k = 45 / Math.pow(2, 5 + zoom + zoomFraction),
        dx = x.x * k,
        dy = x.y * k;
    return map.center({
      lon: center.lon - angleCosi * dx + angleSini * dy,
      lat: y2lat(lat2y(center.lat) + angleSini * dx + angleCosi * dy)
    });
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
    zoomFactor = Math.pow(2, zoomFraction);
    return map.center(center);
  };

  map.zoomBy = function(z, x0, l) {
    if (arguments.length < 2) return map.zoom(zoom + zoomFraction + z);

    // compute the location of x0
    if (arguments.length < 3) l = map.pointLocation(x0);

    // update the zoom level
    zoom = Math.max(zoomRange[0], Math.min(zoomRange[1], zoom + zoomFraction + z));
    zoomFraction = zoom - (zoom = Math.round(zoom));
    zoomFactor = Math.pow(2, zoomFraction);

    // compute the new point of the location
    var x1 = map.locationPoint(l);

    return map.panBy({x: x0.x - x1.x, y: x0.y - x1.y});
  };

  map.zoomRange = function(x) {
    if (!arguments.length) return zoomRange;
    zoomRange = x;
    return map.zoom(zoom + zoomFraction);
  };

  map.angle = function(x) {
    if (!arguments.length) return angle;
    angle = x;
    angleCos = Math.cos(angle);
    angleSin = Math.sin(angle);
    angleCosi = Math.cos(-angle);
    angleSini = Math.sin(-angle);
    recenter();
    event({type: "move"});
    return map;
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
