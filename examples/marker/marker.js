var po = org.polymaps;

var svg = document.getElementById("map").appendChild(po.svg("svg")),
    defs = svg.appendChild(po.svg("defs"));

/* Create three linear gradients for each category. */
defs.appendChild(gradient("#D90000", "#A30000")).setAttribute("id", "gradient-violent");
defs.appendChild(gradient("#23965E", "#1A7046")).setAttribute("id", "gradient-property");
defs.appendChild(gradient("#3489BA", "#27678B")).setAttribute("id", "gradient-quality");

/* Create a marker path. */
defs.appendChild(icons.marker()).setAttribute("id", "marker");

var map = po.map()
    .container(svg)
    .center({lat: 37.787, lon: -122.228})
    .zoomRange([12,12])
    .add(po.interact());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/998/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.geoJson()
    .url(crimespotting("http://oakland.crimespotting.org"
        + "/crime-data"
        + "?count=100"
        + "&format=json"
        + "&bbox={B}"
        + "&dstart=2010-04-01"
        + "&dend=2010-04-01"))
    .on("load", load)
    .clip(false)
    .zoom(12));

/* Post-process the GeoJSON points and replace them with markers! */
function load(e) {
  for (var i = 0; i < e.features.length; i++) {
    var f = e.features[i],
        d = f.data,
        c = f.element,
        u = po.svg("use");
    u.setAttributeNS(po.ns.xlink, "href", "url(#marker)");
    u.setAttribute("x", c.getAttribute("cx"));
    u.setAttribute("y", c.getAttribute("cy"));
    u.setAttribute("fill", "url(#gradient-" + crimespotting.categorize(d) + ")");
    c.parentNode.replaceChild(u, c);
  }
}

/* Helper method for constructing a linear gradient. */
function gradient(a, b) {
  var g = po.svg("linearGradient");
  g.setAttribute("x1", 0);
  g.setAttribute("y1", 1);
  g.setAttribute("x2", 0);
  g.setAttribute("y2", 0);
  var s0 = g.appendChild(po.svg("stop"));
  s0.setAttribute("offset", "0%");
  s0.setAttribute("stop-color", a);
  var s1 = g.appendChild(po.svg("stop"));
  s1.setAttribute("offset", "100%");
  s1.setAttribute("stop-color", b);
  return g;
}
