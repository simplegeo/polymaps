<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Tile Grid</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.1.1"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.1.0");

div#map {
  font: 10px sans-serif;
}

.map rect {
  fill: #fff;
  fill-opacity: .15;
  stroke: red;
  shape-rendering: crispEdges;
}

.layer rect {
  fill: #000;
  fill-opacity: .15;
  stroke: #E5E0D9;
  shape-rendering: auto;
  vector-effect: non-scaling-stroke;
}

    </style>
  </head>
  <body>
    <div class="container">
      <hr class="space"/>
      <div class="span-5 append-1 logo">
        <a href="../">
          <img src="../logo-small.png"/>
          <script type="text/javascript" src="../logo-small.js"></script>
        </a>
      </div>
      <div class="span-18 last top">
        <a href="../">Overview</a>
        <a class="active" href="./">Examples</a>
        <a href="../docs/">Documentation</a>
        <a href="../download.html">Download</a>
      </div>
      <hr class="space"/>
      <div id="map" class="span-24 last"></div>
      <hr class="space"/>
      <div class="span-18 prepend-6 last">

        <h2>Tile Grid</h2>

        <p>Use this lightweight layer implementation to explore the tile
        grid. Polymaps uses
        a <a href="http://en.wikipedia.org/wiki/Scanline_rendering">polygon-fill
        algorithm</a> to determine exactly which tiles are visible, given
        arbitrary zooming, panning and affine transforms.</p>

        <p>As you pan and zoom with the mouse, watch how tiles outside the
        viewport (the red border) are removed. Tiles that come into view are
        dynamically generated and cached using the layer. Use the 'A' and 'D'
        keys to rotate the map!</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>The tile overlay is implemented using an anonymous subclass
        of <tt>po.layer</tt>, which delegates tile creation to the <tt>grid</tt>
        method. You can copy-and-paste this lightweight layer implementation
        into your own example for debugging!</p>

        <p>The <tt>resize</tt> method isn&rsquo;t strictly needed for this
        example, but we wanted to show how Polymaps recomputes the visible tiles
        as the map changes size.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/grid/tiles.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/grid/tiles.min.js')
m4_include(`fullscreen.min.js')

      </script>
      <div class="span-5 append-1 credits">
        Polymaps is a project
        from <a class="bold" href="http://simplegeo.com/">SimpleGeo</a>
        and <a class="bold" href="http://stamen.com/">Stamen</a>.
      </div>
    </div>
  </body>
</html>
