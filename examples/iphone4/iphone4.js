var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .add(po.interact()); // built-in touch support

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/998/256/{Z}/{X}/{Y}.png")
    .repeat(false)
    .hosts(["a.", "b.", "c.", ""]))
    .zoom(function(z) { return z + 1; })); // use 2x resolution tiles

// no compass! pinch-to-zoom ftw
