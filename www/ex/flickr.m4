<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Flickr Shapes</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");

#map {
  background: url(dot.gif);
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
      <div id="map" class="span-24 last"></div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">
        Courtesy
        <a href="http://shapetiles.spum.org/about/">Aaron Straup Cope</a>.
      </div>
      <div class="span-18 last">

        <h2>Flickr Shapes</h2>

        <p>Aaron generated <a href="http://shapetiles.spum.org/about/">Flickr
        Shapetiles</a> from geotagged <a href="http://flickr.com/">Flickr</a>
        photos, which have up to six associated <a href="http://woe.spum.org/"
        >Where On Earth</a> (WOE) IDs. These identifiers correspond to the
        hierarchy of places where a photo was taken: the neighbourhood, the
        town, the county, and so on up to continents. If you draw an outline
        around all the locations for a given WOE entity, you infer an
        approximate shape of that place!</p>

        <p>This map is constructed using a single <a href="../docs/#image"
        >image</a> layer pulling tiles from <a href="http://aws.amazon.com/s3/"
        >Amazon S3</a> via <a href="http://tilestache.org/">TileStache</a>.
        Hosting courtesy of <a href="http://www.aaronland.info/">Aaron Straup
        Cope</a>.</p>

        <h3>Source Code</h3>

m4_include(`../../examples/tilestache/flickr.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/tilestache/flickr.min.js')
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
