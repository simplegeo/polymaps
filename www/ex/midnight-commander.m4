<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Midnight Commander</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.1.1"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.1.0");

div#map {
  background: #021019;
}

.compass .back {
  fill: #256574;
}

.compass .fore, .compass .chevron {
  stroke: #1AA398;
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

        <h2>Midnight Commander</h2>

        <p>You know, for when you&rsquo;re Jason Bourne and you&rsquo;re on the
        run from the man and you break into the command center and you pull up
        the secret map interface? That one.</p>

        <p>This map is constructed using a single <a href="../docs/#image"
        >image</a> layer of <a href="http://www.cloudmade.com/">CloudMade</a>
        tiles. The tiles are in spherical mercator coordinates, and the map has
        standard interaction controls, so this basic example is a useful
        starting point for customization. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key.</p>

        <h3>Source Code</h3>

m4_include(`../../examples/cloudmade/midnight-commander.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/cloudmade/midnight-commander.min.js')
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
