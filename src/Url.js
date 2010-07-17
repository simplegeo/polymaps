po.url = function(template) {
  var hosts = [];

  function format(c, location) {
    var max = 1 << c.zoom, column = c.column % max; // TODO assumes 256x256
    if (column < 0) column += max;
    return template.replace(/{(.)}/g, function(s, v) {
      switch (v) {
        case "S": return hosts[(c.zoom + c.row + column) % hosts.length];
        case "Z": return c.zoom;
        case "X": return column;
        case "Y": return c.row;
        case "B": {
          var se = location({row: c.row, column: column, zoom: c.zoom}),
              nw = location({row: c.row + 1, column: column + 1, zoom: c.zoom}),
              pn = Math.ceil(Math.log(c.zoom) / Math.LN2);
          return nw.lat.toFixed(pn)
              + "," + se.lon.toFixed(pn)
              + "," + se.lat.toFixed(pn)
              + "," + nw.lon.toFixed(pn);
        }
      }
      return v;
    });
  }

  format.template = function(x) {
    if (!arguments.length) return template;
    template = x;
    return format;
  };

  format.hosts = function(x) {
    if (!arguments.length) return hosts;
    hosts = x;
    return format;
  };

  return format;
};
