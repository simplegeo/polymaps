<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Satellite</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.0");

.compass .chevron, .compass .fore {
  stroke: #666;
}

#map {
  background: #132328;
}

#logo {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
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
        <a href="http://github.com/simplegeo/polymaps">Download</a>
      </div>
      <hr class="space"/>
      <div id="map" class="span-24 last">
        <img id="logo"/>
      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1"></div>
      <div class="span-18 last">

      <h2>Satellite</h2>

      <p>Want to show what Earth looks like from space? The Bing
      Maps <a href="http://msdn.microsoft.com/en-us/library/ff701716.aspx">imagery
      metadata API</a> provides beautiful aerial (satellite) image tiles at a
      wide range of zoom levels, with optional labels. The &ldquo;Road&rdquo;
      tileset is a more traditional alternative to <a href="pale-dawn.html">Pale
      Dawn</a>. Also? <a href="#" onclick="map.zoomBy(18-map.zoom(),{x:475,y:100},{lon:-122.49,lat:37.67});">ZOMG
      PLANE!</a></p>

      <p>This map is constructed using a single <a href="../docs/#image"
      >image</a> layer. The tiles are in spherical mercator coordinates, and the
      map has standard interaction controls. This example implements a
      custom <a href="../docs/#url">URL template</a> because Bing requires
      coordinate &ldquo;quadkeys&rdquo; (a bit-wise encoding) rather than the
      traditional <tt>{Z}/{X}/{Y}</tt>. Register
      a <a href="https://www.bingmapsportal.com/">Bing Maps account</a> for your
      own API key.</p>

      <h3>Source Code</h3>

m4_include(`../../examples/bing/map.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/bing/map.min.js')
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
