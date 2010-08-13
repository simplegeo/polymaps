var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 37.787, lon: -122.228})
    .zoom(14)
    .zoomRange([12, 16])
    .add(po.interact());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/20760/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.geoJson()
    .url(crimespotting("http://oakland.crimespotting.org"
        + "/crime-data"
        + "?count=1000"
        + "&format=json"
        + "&bbox={B}"
        + "&dstart=2010-04-01"
        + "&dend=2010-04-07"))
    .on("load", load)
    .clip(false)
    .zoom(14));

map.add(po.compass()
    .pan("none"));

function crimespotting(template) {
  return function(c, location) {
    var max = 1 << c.zoom, column = c.column % max; // TODO assumes 256x256
    if (column < 0) column += max;
    return template.replace(/{(.)}/g, function(s, v) {
      switch (v) {
        case "B": {
          var nw = location({row: c.row, column: column, zoom: c.zoom}),
              se = location({row: c.row + 1, column: column + 1, zoom: c.zoom}),
              pn = Math.ceil(Math.log(c.zoom) / Math.LN2);
          return nw.lon.toFixed(pn)
              + "," + se.lat.toFixed(pn)
              + "," + se.lon.toFixed(pn)
              + "," + nw.lat.toFixed(pn);
        }
      }
      return v;
    });
  };
}

function load(e) {
  var cluster = e.tile.cluster || (e.tile.cluster = kmeans()
      .iterations(16)
      .size(64));

  for (var i = 0; i < e.features.length; i++) {
    var feature = e.features[i];
    cluster.add({
      x: Number(feature.element.getAttribute("cx")),
      y: Number(feature.element.getAttribute("cy"))
    });
  }

  var tile = e.tile, g = tile.element;
  while (g.lastChild) g.removeChild(g.lastChild);

  var means = cluster.means();
  means.sort(function(a, b) { return b.size - a.size; });
  for (var i = 0; i < means.length; i++) {
    var mean = means[i], point = g.appendChild(po.svg("circle"));
    point.setAttribute("cx", mean.x);
    point.setAttribute("cy", mean.y);
    point.setAttribute("r", Math.pow(2, tile.zoom - 11) * Math.sqrt(mean.size));
  }
}
