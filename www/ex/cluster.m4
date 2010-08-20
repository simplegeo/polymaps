<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - k-Means Clustering</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.2"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="kmeans.js?2.0.2"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.2");

div#map {
  background: #E6E6E6;
}

.layer circle {
  fill: lightcoral;
  fill-opacity: .5;
  stroke: brown;
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
      <div id="copy" class="span-5 append-1">
        &copy; 2010
        <a href="http://www.cloudmade.com/">CloudMade</a>,
        <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors,
        <a href="http://creativecommons.org/licenses/by-sa/2.0/">CCBYSA</a>.
      </div>
      <div class="span-18 last">

        <h2><i>k</i>-Means Clustering</h2>

        <p>Symbol maps, such as those used
        by <a href="http://oakland.crimespotting.org/">Oakland
        Crimespotting</a>, are great for visualizing discrete events across time
        and space. But what happens if you want to show thousands of points?
        Here we
        use <a href="http://en.wikipedia.org/wiki/K-means_clustering"><i>k</i>-means
        clustering</a> to coalesce dots and visualize the density of crime in
        Oakland.</p>

        <p>The map background is a monochrome <a href="../docs/#image">image</a>
        layer from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key. Crime data is sourced
        from <a href="http://gismaps.oaklandnet.com/crimewatch/">CrimeWatch</a>.</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>This example uses a helper library to compute
        the <a href="kmeans.js"><i>k</i>-means</a> and build
        a <i>kd</i>-tree. These helpers aren&rsquo;t part of the official
        Polymaps release, but they are covered by the same BSD license and you
        are welcome to use them!</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/cluster/cluster.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/cluster/cluster.min.js')
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
