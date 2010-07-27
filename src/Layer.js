po.layer = function(load, unload) {
  var layer = {},
      origin = {x: 0, y: 0},
      size = {x: 256, y: 256},
      cache = layer.cache = po.cache(load, unload).size(512),
      zoom,
      id,
      map,
      container,
      levels;

  function sizeZoom(zoom) {
    var k = Math.pow(2, 8 + zoom);
    return {x: k, y: k};
  }

  function move() {
    var map = layer.map(), // in case the layer is removed
        mapZoom = map.zoom(),
        mapZoomFraction = mapZoom - (mapZoom = Math.round(mapZoom)),
        mapSize = map.size(),
        tileSize = size || sizeZoom(mapZoom),
        tileCenter = map.locationCoordinate(tileSize, map.center());

    // set the layer zoom levels
    for (var z = -4; z <= 2; z++) {
      levels[z].setAttribute("class", "zoom" + (z < 0 ? "" : "+") + z + " zoom" + (mapZoom + z));
    }

    // set the layer transform
    var k = Math.pow(2, mapZoomFraction);
    if (k) container.setAttribute("transform", "scale(" + k + ")");
    else container.removeAttribute("transform");

    // get the coordinate of the top-left tile
    var c0 = map.pointCoordinate(tileCenter, tileSize, origin);

    // get the coordinate of the bottom-right tile
    var c1 = {
      column: c0.column + mapSize.x / (k * tileSize.x),
      row: c0.row + mapSize.y / (k * tileSize.y),
      zoom: c0.zoom
    };

    // layer-specific zoom transform
    var tileLevel = zoom ? zoom(mapZoom) - mapZoom : 0;
    if (tileLevel) {
      var k = Math.pow(2, tileLevel);
      c0.column *= k;
      c0.row *= k;
      c0.zoom = c1.zoom += tileLevel;
      c1.column *= k;
      c1.row *= k;
    }

    // floor the coordinates
    c0.column = Math.floor(c0.column);
    c0.row = Math.max(0, Math.floor(c0.row));
    c1.column = Math.floor(c1.column);
    c1.row = Math.min((1 << (c0.zoom + 8)) / tileSize.y - 1, Math.floor(c1.row));

    // tile-specific projection
    function projection(c) {
      var zoom = c.zoom,
          max = (1 << (zoom + 8)) / tileSize.x,
          column = c.column % max,
          row = c.row;
      if (column < 0) column += max;
      return {
        coordinateLocation: function(c) {
          return map.coordinateLocation(tileSize, c);
        },
        locationPoint: function(l) {
          var c = map.locationCoordinate(tileSize, l),
              k = Math.pow(2, zoom - c.zoom);
          return {
            x: tileSize.x * (k * c.column - column),
            y: tileSize.y * (k * c.row - row)
          };
        }
      };
    }

    // record which tiles are visible
    var oldLocks = cache.locks(), newLocks = {};

    // reset the proxy counts
    for (var key in oldLocks) {
      oldLocks[key].proxyCount = 0;
    }

    // load the tiles!
    if (tileLevel > -5 && tileLevel < 3) {
      for (var column = c0.column; c0.row <= c1.row; c0.row++) {
        for (c0.column = column; c0.column <= c1.column; c0.column++) {
          var tile = cache.load(c0, projection);
          newLocks[tile.key] = tile;
          if (!tile.ready) {
            tile.proxyRefs = {};
            var c, full, proxy;

            // downsample high-resolution tiles
            for (var dz = 1; dz <= 2; dz++) {
              full = true;
              for (var dy = 0, k = 1 << dz; dy <= k; dy++) {
                for (var dx = 0; dx <= k; dx++) {
                  proxy = cache.peek(c = {
                    column: (c0.column << dz) + dx,
                    row: (c0.row << dz) + dy,
                    zoom: c0.zoom + dz
                  });
                  if (proxy && proxy.ready) {
                    newLocks[proxy.key] = cache.load(c);
                    proxy.proxyCount++;
                    tile.proxyRefs[proxy.key] = proxy;
                  } else {
                    full = false;
                  }
                }
              }
              if (full) break;
            }

            // upsample low-resolution tiles
            if (!full) {
              for (var dz = 1; dz <= 4; dz++) {
                proxy = cache.peek(c = {
                  column: c0.column >> dz,
                  row: c0.row >> dz,
                  zoom: c0.zoom - dz
                });
                if (proxy && proxy.ready) {
                  newLocks[proxy.key] = cache.load(c);
                  proxy.proxyCount++;
                  tile.proxyRefs[proxy.key] = proxy;
                  break;
                }
              }
            }
          }
        }
      }
    }

    // position tiles
    for (var key in newLocks) {
      var tile = newLocks[key],
          k = Math.pow(2, -(tile.level = tile.zoom - mapZoom)),
          x = map.coordinatePoint(tileCenter, tileSize, tile),
          t = "translate(" + Math.round(x.x) + "," + Math.round(x.y) + ")";
      if (tile.level) t += "scale(" + k + ")";
      tile.element.setAttribute("transform", t);
    }

    // remove tiles that are no longer visible
    for (var key in oldLocks) {
      if (!(key in newLocks)) {
        var tile = cache.unload(key);
        tile.element.parentNode.removeChild(tile.element);
        delete tile.proxyRefs;
      }
    }

    // append tiles that are now visible
    for (var key in newLocks) {
      var tile = newLocks[key];
      if (tile.element.parentNode != levels[tile.level]) {
        levels[tile.level].appendChild(tile.element);
        if (layer.show) layer.show(tile);
      }
    }
  }

  // remove proxy tiles when tiles load
  function cleanup(e) {
    if (e.tile.proxyRefs) {
      for (var proxyKey in e.tile.proxyRefs) {
        var proxyTile = e.tile.proxyRefs[proxyKey];
        if ((--proxyTile.proxyCount <= 0) && cache.unload(proxyKey)) {
          proxyTile.element.parentNode.removeChild(proxyTile.element);
        }
      }
      delete e.tile.proxyRefs;
    }
  }

  layer.map = function(x) {
    if (!arguments.length) return map;
    if (map) {
      map.off("move", move).off("resize", move);
      container.parentNode.removeChild(container);
      container = levels = null;
    }
    map = x;
    if (map) {
      container = map.container().appendChild(po.svg("g"));
      if (id) container.setAttribute("id", id);
      container.setAttribute("class", "layer");
      levels = {};
      for (var i = -4; i <= -1; i++) levels[i] = container.appendChild(po.svg("g"));
      for (var i = 2; i >= 0; i--) levels[i] = container.appendChild(po.svg("g"));
      if (layer.init) layer.init(container);
      map.on("move", move).on("resize", move);
      move();
    }
    return layer;
  };

  layer.container = function() {
    return container;
  };

  layer.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return layer;
  };

  layer.id = function(x) {
    if (!arguments.length) return id;
    id = x;
    return layer;
  };

  layer.zoom = function(x) {
    if (!arguments.length) return zoom;
    zoom = typeof x == "function" || x == null ? x : function() { return x; };
    return layer;
  };

  layer.dispatch = po.dispatch(layer);
  layer.on("load", cleanup);

  return layer;
};
