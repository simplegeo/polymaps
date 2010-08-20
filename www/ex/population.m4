<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Population Density</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.2"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.2");
@import url("population.css?2.0.2");

div#map {
  background: #E6E6E6;
}

.layer path {
  fill: none;
  vector-effect: non-scaling-stroke;
}

#county path {
  stroke: rgb(192, 192, 192);
  stroke-opacity: .25;
  shape-rendering: crispEdges;
}

#state path {
  stroke: #fff;
  stroke-width: 1.5px;
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
        Colors by <a href="http://colorbrewer.org/">Cynthia Brewer</a>.
      </div>
      <div class="span-18 last">

        <h2>Population Density</h2>

        <p>The <a href="http://www.census.gov/">Census Bureau</a> publishes a
        treasure trove of interesting data about these United States.  Here we
        show population density of 3,134 counties using
        a <a href="http://en.wikipedia.org/wiki/Choropleth_map">choropleth
        map</a>; darker counties have higher population densities. A GeoJSON
        layer containing state boundaries is drawn over the counties using a
        thick white border. Try <a href="#"
        onclick="map.zoomBy(9-map.zoom(),{x:700,y:250},{lon:-76.23,lat:38.13});">zooming
        in</a> for higher resolution.</p>

        <p>The map background is a monochrome <a href="../docs/#image">image</a>
        layer from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key. We&rsquo;re hosting GeoJSON tiles for
        states and counties
        on <a href="http://code.google.com/appengine/">Google App Engine</a>,
        and as with image tiles, you can always roll your own!</p>
      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>Where&rsquo;s the data? Everything is styled, as if by magic, using a
        <a href="population.css">precompiled stylesheet</a>! Each GeoJSON
        feature (i.e., county) is given a unique ID via
        its <a href="http://en.wikipedia.org/wiki/FIPS_county_code">FIPS
        code</a>.</p>

        <p>A dynamic&mdash;and more flexible&mdash;approach to styling
        choropleth maps can be seen in
        the <a href="statehood.html">Statehood</a>
        and <a href="unemployment.html">Unemployment</a> examples.</p>

      </div>
      <div class="span-18 last">

        <h3>Source Code</h3>

m4_include(`../../examples/population/population.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/population/population.min.js')
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
