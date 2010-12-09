po.hash = function() {
  var hash = {},
      s0, // cached location.hash
      lat = 90 - 1e-8, // allowable latitude range
      map;

  var parse = function(s) {
    return s.split("/").map(Number);
  };

  var format = function(map) {
    var center = map.center(),
        zoom = map.zoom(),
        precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    return "#" + zoom.toFixed(2)
             + "/" + center.lat.toFixed(precision)
             + "/" + center.lon.toFixed(precision);
  };

  function move() {
    var s1 = format(map);
    if (s0 !== s1) location.replace(s0 = s1); // don't recenter the map!
  }

  function hashchange() {
    if (location.hash === s0) return; // ignore spurious hashchange events
    var args = parse((s0 = location.hash).substring(1));
    if (!args || args.length == undefined || args.length < 3 || args.some(isNaN))
      move(); // replace bogus hash
    else {
      var size = map.size();
      map.zoomBy(args[0] - map.zoom(),
          {x: size.x / 2, y: size.y / 2},
          {lat: Math.min(lat, Math.max(-lat, args[1])), lon: args[2]});
    }
  }

  hash.map = function(x) {
    if (!arguments.length) return map;
    if (map) {
      map.off("move", move);
      window.removeEventListener("hashchange", hashchange, false);
    }
    if (map = x) {
      map.on("move", move);
      window.addEventListener("hashchange", hashchange, false);
      location.hash ? hashchange() : move();
    }
    return hash;
  };

  hash.parse = function(x) {
    if (!arguments.length) return parse;
    parse = x;
    return hash;
  };

  hash.format = function(x) {
    if (!arguments.length) return format;
    format = x;
    return hash;
  };

  return hash;
};
