po.dblclick = function() {
  var dblclick = {},
      map;

  function handle(e) {
    var z = map.zoom();
    if (e.shiftKey) z = Math.ceil(z) - z - 1;
    else z = 1 - z + Math.floor(z);
    map.zoomBy(z, map.mouse(e));
  }

  dblclick.map = function(x) {
    if (!arguments.length) return map;
    map = x;
    // TODO remove from old map container?
    // TODO update if map container changes?
    map.container().addEventListener("dblclick", handle, false);
    return dblclick;
  };

  return dblclick;
};
