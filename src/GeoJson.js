po.geoJson = function(fetch) {
  var geoJson = po.layer(load, unload),
      url = "about:blank",
      clip = true,
      clipId,
      zoom = null,
      tiles = {},
      features;

  if (!arguments.length) fetch = po.queue.json;

  function geometry(o, proj) {
    return o && o.type in types && types[o.type](o, proj);
  }

  function point(coordinates, proj) {
    var p = proj({lat: coordinates[1], lon: coordinates[0]}),
        c = po.svg("circle");
    c.setAttribute("r", 4.5);
    c.setAttribute("cx", p.x);
    c.setAttribute("cy", p.y);
    return c;
  }

  function line(coordinates, closed, proj, d) {
    d.push("M");
    for (var i = 0; i < coordinates.length - closed; i++) {
      p = proj({lat: coordinates[i][1], lon: coordinates[i][0]});
      d.push(p.x);
      d.push(",");
      d.push(p.y);
      d.push("L");
    }
    d.pop();
  }

  function polygon(coordinates, closed, proj, d) {
    for (var i = 0; i < coordinates.length; i++) {
      line(coordinates[i], closed, proj, d);
    }
    if (closed) d.push("Z");
  }

  function multi(type, coordinates, closed, proj) {
    var d = [];
    for (var i = 0; i < coordinates.length; i++) {
      type(coordinates[i], closed, proj, d);
    }
    if (!d.length) return;
    var path = po.svg("path");
    path.setAttribute("d", d.join(""));
    return path;
  }

  var types = {

    Point: function(o, proj) {
      return point(o.coordinates, proj);
    },

    MultiPoint: function(o, proj) {
      var g = po.svg("g");
      for (var i = 0; i < o.coordinates.length; i++) {
        g.appendChild(point(o.coordinates[i], proj));
      }
      return g;
    },

    LineString: function(o, proj) {
      return multi(line, [o.coordinates], 0, proj);
    },

    MultiLineString: function(o, proj) {
      return multi(line, o.coordinates, 0, proj);
    },

    Polygon: function(o, proj) {
      return multi(polygon, [o.coordinates], 1, proj);
    },

    MultiPolygon: function(o, proj) {
      return multi(polygon, o.coordinates || o.coords, 1, proj); // TODO coords
    },

    GeometryCollection: function(o, proj) {
      var g = po.svg("g");
      for (var i = 0; i < o.geometries.length; i++) {
        var element = geometry(o.geometries[i], proj);
        if (element) g.appendChild(element);
      }
      return g;
    }

  };

  function load(tile, proj) {
    var g = tile.element = po.svg("g");

    proj = proj(tile);

    function update(data) {
      var features = tiles[tile.key] || (tiles[tile.key] = []), updated = [];
      if (data.next) tile.request = fetch(data.next.href, update);
      for (var i = 0; i < data.features.length; i++) {
        var feature = data.features[i],
            element = geometry(feature.geometry, proj.locationPoint);
        if (element) {
          var entry = {element: g.appendChild(element), data: feature};
          features.push(entry);
          updated.push(entry);
        }
      }
      tile.ready = true;
      geoJson.dispatch({type: "load", tile: tile, features: updated});
    }

    if (features) {
      update({features: features});
    } else {
      tile.request = fetch(typeof url == "function" ? url(tile) : url, update);
    }

    if (clipId) g.setAttribute("clip-path", "url(#" + clipId + ")");
  }

  function unload(tile) {
    if (tile.request) tile.request.abort(true);
    delete tiles[tile.key];
  }

  geoJson.url = function(x) {
    if (!arguments.length) return url;
    url = typeof x == "string" && /{.}/.test(x) ? po.url(x) : x;
    if (typeof url == "string") geoJson.tile(false);
    return geoJson;
  };

  geoJson.features = function(x) {
    if (!arguments.length) return features;
    if (x) geoJson.tile(false);
    features = x;
    return geoJson;
  };

  geoJson.clip = function(x) {
    if (!arguments.length) return clip;
    clip = x;
    return geoJson;
  };

  geoJson.init = function(g) {
    if (clip && geoJson.tile()) {
      var size = geoJson.map().tileSize(),
          clipPath = g.insertBefore(po.svg("clipPath"), g.firstChild),
          rect = clipPath.appendChild(po.svg("rect"));
      clipPath.setAttribute("id", clipId = "org.polymaps." + po.id());
      rect.setAttribute("width", size.x);
      rect.setAttribute("height", size.y);
    }
    g.setAttribute("fill-rule", "evenodd");
  };

  geoJson.show = function(tile) {
    geoJson.dispatch({type: "show", tile: tile, features: tiles[tile.key] || []});
  };

  geoJson.reshow = function() {
    var locks = geoJson.cache.locks();
    for (var key in locks) geoJson.show(locks[key]);
  };

  return geoJson;
};
