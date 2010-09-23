po.geoJson = function(fetch) {
  var geoJson = po.layer(load, unload),
      container = geoJson.container(),
      url,
      clip = true,
      clipId = "org.polymaps." + po.id(),
      clipHref = "url(#" + clipId + ")",
      clipPath = container.insertBefore(po.svg("clipPath"), container.firstChild),
      clipRect = clipPath.appendChild(po.svg("rect")),
      scale = "auto",
      zoom = null,
      features;

  container.setAttribute("fill-rule", "evenodd");
  clipPath.setAttribute("id", clipId);

  if (!arguments.length) fetch = po.queue.json;

  function projection(proj) {
    var l = {lat: 0, lon: 0};
    return function(coordinates) {
      l.lat = coordinates[1];
      l.lon = coordinates[0];
      var p = proj(l);
      coordinates.x = p.x;
      coordinates.y = p.y;
      return p;
    };
  }

  function geometry(o, proj) {
    return o && o.type in types && types[o.type](o, proj);
  }

  function point(coordinates, proj) {
    var p = proj(coordinates),
        c = po.svg("circle");
    c.setAttribute("r", 4.5);
    c.setAttribute("transform", "translate(" + p.x + "," + p.y + ")");
    return c;
  }

  function line(coordinates, closed, proj, d) {
    d.push("M");
    for (var i = 0; i < coordinates.length - closed; i++) {
      var p = proj(coordinates[i]);
      d.push(p.x, ",", p.y, "L");
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
    tile.features = [];

    proj = projection(proj(tile).locationPoint);

    function update(data) {
      var updated = [];

      /* Fetch the next batch of features, if so directed. */
      if (data.next) tile.request = fetch(data.next.href, update);

      /* Convert the GeoJSON to SVG. */
      switch (data.type) {
        case "FeatureCollection": {
          for (var i = 0; i < data.features.length; i++) {
            var feature = data.features[i],
                element = geometry(feature.geometry, proj);
            if (element) updated.push({element: g.appendChild(element), data: feature});
          }
          break;
        }
        case "Feature": {
          var element = geometry(data.geometry, proj);
          if (element) updated.push({element: g.appendChild(element), data: data});
          break;
        }
        default: {
          var element = geometry(data, proj);
          if (element) updated.push({element: g.appendChild(element), data: {type: "Feature", geometry: data}});
          break;
        }
      }

      tile.ready = true;
      updated.push.apply(tile.features, updated);
      geoJson.dispatch({type: "load", tile: tile, features: updated});
    }

    if (url != null) {
      tile.request = fetch(typeof url == "function" ? url(tile) : url, update);
    } else {
      update({type: "FeatureCollection", features: features || []});
    }
  }

  function unload(tile) {
    if (tile.request) tile.request.abort(true);
  }

  function rezoom() {
    if (scale != "fixed") return; // TODO clear scale
    var locks = geoJson.cache.locks(),
        zoom = geoJson.map().zoom(),
        transform = ["translate(", null, ",", null, null],
        i,
        j,
        key, // key in locks
        tile, // locks[key]
        features, // tile.features
        feature, // tile.features[i]
        geometry, // feature.data.geometry
        element, // feature.element
        coordinates, // geometry.coordinates
        coordinate; // coordinates[j]
    for (key in locks) {
      transform[4] = ")scale(" + Math.pow(2, (tile = locks[key]).zoom - zoom) + ")";
      features = tile.features;
      for (i = 0; i < features.length; i++) {
        element = (feature = features[i]).element;
        coordinates = (geometry = feature.data.geometry).coordinates;
        switch (geometry.type) {
          case "Point": {
            transform[1] = coordinates.x;
            transform[3] = coordinates.y;
            element.setAttribute("transform", transform.join(""));
            break;
          }
          case "MultiPoint": {
            for (j = 0, element = element.firstChild;
                 j < coordinates.length;
                 j++, element = element.nextSibling) {
              transform[1] = (coordinate = coordinates[j]).x;
              transform[3] = coordinate.y;
              element.setAttribute("transform", transform.join(""));
            }
            break;
          }
        }
      }
    }
  }

  geoJson.url = function(x) {
    if (!arguments.length) return url;
    url = typeof x == "string" && /{.}/.test(x) ? po.url(x) : x;
    if (url != null) features = null;
    if (typeof url == "string") geoJson.tile(false);
    return geoJson.reload();
  };

  geoJson.features = function(x) {
    if (!arguments.length) return features;
    if (features = x) {
      url = null;
      geoJson.tile(false);
    }
    return geoJson.reload();
  };

  geoJson.clip = function(x) {
    if (!arguments.length) return clip;
    if (clip) container.removeChild(clipPath);
    if (clip = x) container.insertBefore(clipPath, container.firstChild);
    var locks = geoJson.cache.locks();
    for (var key in locks) {
      if (clip) locks[key].element.setAttribute("clip-path", clipHref);
      else locks[key].element.removeAttribute("clip-path");
    }
    return geoJson;
  };

  var __tile__ = geoJson.tile;
  geoJson.tile = function(x) {
    if (arguments.length && !x) geoJson.clip(x);
    return __tile__.apply(geoJson, arguments);
  };

  var __map__ = geoJson.map;
  geoJson.map = function(x) {
    if (x && clipRect) {
      var size = x.tileSize();
      clipRect.setAttribute("width", size.x);
      clipRect.setAttribute("height", size.y);
    }
    return __map__.apply(geoJson, arguments);
  };

  geoJson.scale = function(x) {
    if (!arguments.length) return scale;
    if (scale = x) geoJson.on("zoom", rezoom);
    else geoJson.off("zoom", rezoom);
    return geoJson;
  };

  geoJson.show = function(tile) {
    if (clip) tile.element.setAttribute("clip-path", clipHref);
    else tile.element.removeAttribute("clip-path");
    geoJson.dispatch({type: "show", tile: tile, features: tile.features});
    return geoJson;
  };

  geoJson.reshow = function() {
    var locks = geoJson.cache.locks();
    for (var key in locks) geoJson.show(locks[key]);
    return geoJson;
  };

  return geoJson;
};
