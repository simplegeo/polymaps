var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .zoomRange([2, 5])
    .zoom(2)
    .center({lat: 0, lon: 0})
    .add(po.interact());

map.add(po.layer(canvas)
    .zoom(4));

map.add(po.compass()
    .pan("none"));

function canvas(tile) {
  if (tile.column < 0 || tile.column >= (1 << tile.zoom)) {
    tile.element = po.svg("g");
    return; // no wrap
  }

  var size = map.tileSize(),
      r = tile.row | (tile.column << tile.zoom),
      o = tile.element = po.svg("foreignObject"),
      c = o.appendChild(document.createElement("canvas")),
      g = c.getContext("2d"),
      image = g.createImageData(size.x, size.y);
  o.setAttribute("width", size.x);
  o.setAttribute("height", size.y);
  c.setAttribute("width", size.x);
  c.setAttribute("height", size.y);
  g.fillRect(0, 0, size.x, size.y);

  var state = [];
  for (var i = 0; i < size.x; i++) {
    state[i] = ~~(Math.random() * 2);
  }
  for (var j = 0, k = 0; j < size.y; j++) {
    var p = state.slice();
    for (var i = 0; i < size.x; i++) {
      image.data[k++]
          = image.data[k++]
          = image.data[k++]
          = 255 * state[i];
      image.data[k++] = 255;
      state[i] = (r >> (p[i - 1] << 2 | p[i] << 1 | p[i + 1])) & 1;
    }
  }
  g.putImageData(image, 0, 0);
}
