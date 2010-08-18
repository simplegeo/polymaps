<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Blue Marble</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.1"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.1");

.compass .chevron, .compass .fore {
  stroke: #666;
}

#map {
  background: #012;
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
        Courtesy <a href="http://earthobservatory.nasa.gov/">NASA Earth
        Observatory</a>.
      </div>
      <div class="span-18 last">

        <h2>Blue Marble</h2>

        <p>The <a href="http://earthobservatory.nasa.gov/">NASA Earth
        Observatory</a> published a series of 500-meter resolution satellite
        imagery in 2005, in true color showing seasonal dynamics at monthly
        intervals. This tileset is a free alternative
        to <a href="satellite.html">Bing Maps</a>, and demonstrates how custom
        image tiles can be used with Polymaps.</p>

        <p>This map is constructed using a single <a href="../docs/#image"
        >image</a> layer pulling tiles from <a href="http://aws.amazon.com/s3/"
        >Amazon S3</a>. (Hosting courtesy of the folks
        behind <a href="http://modestmaps.com/">Modest Maps</a>.) The tiles are
        in spherical mercator coordinates, and the map has standard interaction
        controls, so this basic example is a useful starting point for
        customization.</p>

        <h3>Source Code</h3>

m4_include(`../../examples/nasa/blue-marble.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/nasa/blue-marble.min.js')
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
