<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Statehood</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.2.0"></script>
    <script type="text/javascript" src="../protodata.min.js?3.2"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="fips.js?2.0.2"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.1.0");
@import url("../colorbrewer.css?1.0.0");

div#map {
  background: #E6E6E6;
}

.layer path {
  stroke: #fff;
  stroke-width: 1.5px;
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
        Colors by <a href="http://colorbrewer.org/">Cynthia Brewer</a>.
      </div>
      <div class="span-18 last">

        <h2>Statehood</h2>

        <p>This simple visualization uses color to encode the date each of the
        fifty United States joined the union; lighter states joined earlier, and
        darker states joined later. <a href="http://en.wikipedia.org/wiki/Choropleth_map"
        >Choropleth maps</a> are easy with vector tiles and CSS styling. And,
        unlike static images, you can <a href="#"
        onclick="map.zoomBy(9-map.zoom(),{x:700,y:250},{lon:-76.23,lat:38.13});">zoom
        in</a> for higher resolution. You can also experiment with
        different <a href="http://colorbrewer.org/">color scales</a>, such
        as <a href="#" onclick="map.container().setAttribute('class',
        'Reds');">reds</a>,
        <a href="#" onclick="map.container().setAttribute('class',
        'YlGn');">greens</a> and
        <a href="#" onclick="map.container().setAttribute('class',
        'Blues');">blues</a>.</p>

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

        <p>This example also uses a data visualization library
        called <a href="http://protovis.org/">Protovis</a> for computing
        quantiles and formatting dates. Protovis is optional and not required to
        use Polymaps.</p>

        <p>Note that we&rsquo;re not using Protovis to render
        anything&mdash;just data processing.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/statehood/statehood.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/statehood/statehood.min.js')
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
