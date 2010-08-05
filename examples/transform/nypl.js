function nypl(id, size) {
  var template = "http://dev.maps.nypl.org/warper/mapscans/wms"
      + "/" + id
      + "?FORMAT=image%2Fjpeg"
      + "&STATUS=unwarped"
      + "&SERVICE=WMS"
      + "&VERSION=1.1.1"
      + "&REQUEST=GetMap"
      + "&STYLES="
      + "&EXCEPTIONS=application%2Fvnd.ogc.se_inimage"
      + "&SRS=EPSG%3A4326"
      + "&WIDTH=256"
      + "&HEIGHT=256"
      + "&BBOX={B}";
  return function(c) {
    var x = c.column << 13 - c.zoom,
        y = ((1 << c.zoom) - c.row - 1) << 13 - c.zoom,
        z = 1 << 13 - c.zoom;
    if (x < 0 || x > size.x || y < 0 || y > size.y) return "transparent.png";
    return template.replace(/{(.)}/g, function(s, v) {
      switch (v) {
        case "B": return [x, y, x + z, y + z].join(",");
      }
      return v;
    });
  };
}

function derive(a0, a1, b0, b1, c0, c1) {

  function solve(r1, s1, t1, r2, s2, t2, r3, s3, t3) {
    var a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3)))
          / (((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3))),
        b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3)))
          / (((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3)));
        c = t1 - (r1 * a) - (s1 * b);
    return [a, b, c];
  }

  function normalize(c) {
    var k = Math.pow(2, -c.zoom);
    return {
      x: c.column * k,
      y: c.row * k
    };
  }

  a0 = normalize(a0);
  a1 = normalize(a1);
  b0 = normalize(b0);
  b1 = normalize(b1);
  c0 = normalize(c0);
  c1 = normalize(c1);

  var x = solve(a0.x, a0.y, a1.x,
                b0.x, b0.y, b1.x,
                c0.x, c0.y, c1.x),
      y = solve(a0.x, a0.y, a1.y,
                b0.x, b0.y, b1.y,
                c0.x, c0.y, c1.y);

  return po.transform(x[0], y[0], x[1], y[1], x[2], y[2]);
}
