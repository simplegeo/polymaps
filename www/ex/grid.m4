<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Lat-Lon Grid</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.2"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.2");

div#map {
  background: #E5E0D9;
}

.grid {
  stroke: white;
  stroke-opacity: .4;
  shape-rendering: crispEdges;
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
      <div id="copy" class="span-5 append-1">
        &copy; 2010
        <a href="http://www.cloudmade.com/">CloudMade</a>,
        <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors,
        <a href="http://creativecommons.org/licenses/by-sa/2.0/">CCBYSA</a>.
      </div>
      <div class="span-18 last">

        <h2>Lat-Lon Grid</h2>

        <p>The built-in <tt>grid</tt> control draws lines of constant latitude
        and longitude over the map. The grid reveals that the spherical mercator
        projection is cylindrical: longitudes are uniformly spaced. <a href="#"
        onclick="map.zoom(1.51);">Zoom out</a> to see the exaggeration of
        latitudes near the poles caused by the log-tan transform.</p>

        <p>The lines are subdivided as you zoom in to maintain constant apparent
        density&mdash;useful for debugging tiles! A future enhancement of this
        control might display proper major and minor ticks, as well as labels to
        show the visible latitudes and longitudes.</p>

        <p>The map background is an <a href="../docs/#image">image</a>
        layer from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key.</p>

        <h3>Source Code</h3>

m4_include(`../../examples/grid/grid.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/grid/grid.min.js')
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
