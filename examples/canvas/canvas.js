var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .tileSize({x: 512, y: 512})
    .zoomRange([0, 5])
    .zoom(1)
    .center({lat: 0, lon: 0})
    .add(po.interact());

map.add(po.layer(canvas)
    .zoom(function(z) { return Math.min(4, z); }));

map.add(po.compass()
    .pan("none"));

function canvas(tile) {
  if (tile.column < 0 || tile.column >= (1 << tile.zoom)) {
    tile.element = po.svg("g");
    return; // no wrap
  }

  var size = map.tileSize(),
      o = tile.element = po.svg("foreignObject"),
      c = o.appendChild(document.createElement("canvas")),
      g = c.getContext("2d");
  o.setAttribute("width", size.x);
  o.setAttribute("height", size.y);
  c.setAttribute("width", size.x);
  c.setAttribute("height", size.y);

  var z0 = Math.max(0, 4 - tile.zoom),
      z1 = Math.max(0, tile.zoom - 4),
      w = size.x >> z0,
      h = size.y >> z0,
      n = 1 << z0,
      col = tile.column >> z1 << z0,
      row = tile.row >> z1 << z0,
      image = g.createImageData(w, h),
      state = [];

  for (var j = 0, y = 0; j < n; j++, y += h) {
    for (var i = 0, x = 0; i < n; i++, x += w) {
      draw((j | row) | ((i | col) << 4), x, y);
    }
  }

  function draw(r, x, y) {
    for (var i = 0; i < w; i++) {
      state[i] = ~~(Math.random() * 2);
    }
    for (var j = 0, k = 0; j < h; j++) {
      var p = state.slice();
      for (var i = 0; i < w; i++) {
        image.data[k++]
            = image.data[k++]
            = image.data[k++]
            = 255 * state[i];
        image.data[k++] = 255;
        state[i] = (r >> (p[i - 1] << 2 | p[i] << 1 | p[i + 1])) & 1;
      }
    }
    g.putImageData(image, x, y);
  }
}
