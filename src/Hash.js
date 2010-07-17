po.hash = function() {
  var hash = {},
      map;

  function move() {
    var center = map.center(),
        zoom = map.zoom(),
        precision = Math.ceil(Math.log(zoom) / Math.LN2);
    location.replace("#" + zoom.toFixed(2)
        + "/" + center.lat.toFixed(precision)
        + "/" + center.lon.toFixed(precision));
  }

  hash.map = function(x) {
    if (!arguments.length) return map;
    if (map) map.off("move", move);
    (map = x).on("move", move);
    if (location.hash) {
      var args = location.hash.substring(1).split("/").map(Number);
      map.zoom(args[0]).center({lat: args[1], lon: args[2]});
    } else {
      move();
    }
    return hash;
  };

  return hash;
};
