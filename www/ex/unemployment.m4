<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Unemployment</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="../protodata.min.js?3.2"></script>
    <script type="text/javascript" src="unemployment-data.js?2.0.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.0");
@import url("../colorbrewer.css?1.0.0");

#map {
  background: #E6E6E6;
}

.layer path {
  fill: none;
  stroke: #aaa;
  stroke-width: .25px;
  vector-effect: non-scaling-stroke;
}

#state path {
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
        <a href="http://github.com/simplegeo/polymaps">Download</a>
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

        <h2>Unemployment</h2>

        <p>The <a href="http://www.census.gov/">Census Bureau</a> publishes a
        treasure trove of interesting data about these United States. Here we
        show unemployment rates (as of September, 2009) of 3,134 counties using
        a <a href="http://en.wikipedia.org/wiki/Choropleth_map">choropleth
        map</a>; darker counties have higher unemployment. Unlike static maps,
        you can <a href="#"
        onclick="map.zoomBy(9-map.zoom(),{x:700,y:250},{lon:-76.23,lat:38.13});">zoom
        in</a> for higher resolution, and mouseover to read county names and
        values. You can also experiment with
        different <a href="http://colorbrewer.org/">color scales</a>, such
        as <a href="#" onclick="map.container().setAttribute('class',
        'OrRd');">OrRd</a>,
        <a href="#" onclick="map.container().setAttribute('class',
        'YlGnBu');">YlGnBu</a> and
        <a href="#" onclick="map.container().setAttribute('class',
        'RdBu');">RdBu</a>.</p>

        <p>The map background is a monochrome <a href="../docs/#image">image</a>
        layer from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key. We&rsquo;re hosting GeoJSON tiles for
        states and counties
        on <a href="http://code.google.com/appengine/">Google App Engine</a>,
        and as with image tiles, you can always roll your own! Thanks to Nathan
        Yau
        of <a href="http://flowingdata.com/2009/11/12/how-to-make-a-us-county-thematic-map-using-free-tools/">FlowingData</a>
        for the inspiration and nicely-formatted CSV data source.</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>This example also uses a data visualization library
        called <a href="http://protovis.org/">Protovis</a> for computing
        quantiles. Protovis is optional and not required to use Polymaps.</p>

        <p>Note that we&rsquo;re not using Protovis to render
        anything&mdash;just data processing.</p>

      </div>
      <div class="span-18 last">

        <h3>Source Code</h3>

m4_include(`../../examples/unemployment/unemployment.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/unemployment/unemployment.min.js')
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
