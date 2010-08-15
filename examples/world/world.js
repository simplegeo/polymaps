var po = org.polymaps;

// Compute noniles.
var quantile = pv.Scale.quantile()
    .quantiles(9)
    .domain(pv.values(internet))
    .range(0, 8);

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 40, lon: 0})
    .zoomRange([1, 4])
    .zoom(2)
    .add(po.interact());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/999/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.geoJson()
    .url("world.json")
    .tile(false)
    .zoom(3)
    .on("load", load));

map.add(po.compass()
    .pan("none"));

function load(e) {
  for (var i = 0; i < e.features.length; i++) {
    var feature = e.features[i],
        n = feature.data.properties.name,
        v = internet[n];
    n$(feature.element)
        .attr("class", isNaN(v) ? null : "q" + quantile(v) + "-" + 9)
      .add("svg:title")
        .text(n + (isNaN(v) ? "" : ":  " + v + "%"));
  }
}

map.container().setAttribute("class", "YlOrRd");
