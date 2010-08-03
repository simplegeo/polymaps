po.hash = function() {
  var hash = {},
      s0, // cached location.hash
      map;

  function move() {
    var center = map.center(),
        zoom = map.zoom(),
        precision = Math.ceil(Math.log(zoom) / Math.LN2),
        s1 = "#" + zoom.toFixed(2)
             + "/" + center.lat.toFixed(precision)
             + "/" + center.lon.toFixed(precision);
    if (s0 !== s1) location.replace(s0 = s1); // don't recenter the map!
  }

  function hashchange() {
    if (location.hash === s0) return; // ignore spurious hashchange events
    var args = (s0 = location.hash).substring(1).split("/").map(Number);
    if (args.length < 3 || args.some(isNaN)) move(); // replace bogus hash
    else map.zoom(args[0]).center({lat: args[1], lon: args[2]});
  }

  hash.map = function(x) {
    if (!arguments.length) return map;
    if (map) map.off("move", move);
    (map = x).on("move", move);
    window.addEventListener("hashchange", hashchange, false);
    location.hash ? hashchange() : move();
    return hash;
  };

  return hash;
};
