var po = org.polymaps;

var color = pv.Scale.linear()
    .domain(0, 99)
    .range("red", "white");

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 37.76, lon: -122.44})
    .zoom(13)
    .zoomRange([12, 16])
    .add(po.interact());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/999/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.geoJson()
    .url("streets.json")
    .zoom(12)
    .size(null)
    .clip(false)
    .on("load", load)
    .id("streets"));

map.add(po.compass()
    .pan("none"));

function pci(feature) {
  return Number(feature.data.properties.PCI);
}

function load(e) {
  for (var i = 0; i < e.features.length; i++) {
    var feature = e.features[i], d = pci(feature);
    if (!feature.element) continue;
    feature.element.setAttribute("stroke", color(d).color);
    feature.element.appendChild(po.svg("title").appendChild(
        document.createTextNode(feature.data.properties.STREET + ": " + d + " PCI"))
        .parentNode);
  }
}
