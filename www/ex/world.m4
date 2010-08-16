<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Internet Usage</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="tsv.js?2.0.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.0");
@import url("../colorbrewer.css?1.0.0");

#map {
  background: #012;
}

.compass .fore, .compass .chevron {
  stroke: #666;
}

.layer path {
  fill: #ccc;
  fill-opacity: .85;
  stroke: #012;
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
        Courtesy <a href="http://earthobservatory.nasa.gov/">NASA Earth
        Observatory</a>. &copy;
        2009 <a href="http://thematicmapping.org/downloads/world_borders.php"
        >thematicmapping.org</a>. Colors by <a href="http://colorbrewer.org/"
        >Cynthia Brewer</a>.
      </div>
      <div class="span-18 last">

        <h2>Internet Usage</h2>

        <p>The <a href="https://www.cia.gov/library/publications/the-world-factbook/rankorder/rankorderguide.html">CIA
        World Factbook</a> is a useful data source for global country
        comparison. In this example, we combine two tables&mdash;population and
        number of internet users&mdash;to show <i>per capita</i> internet usage.
        The color encoding produces a <a href="http://en.wikipedia.org/wiki/Choropleth_map"
        >choropleth map</a>: countries with higher internet penetration are in
        <span style="color:darkred;">red</span>, while those with less are in
        <span style="color:#DEBE65">orange</span>.</p>

        <p>This example uses a fixed-resolution GeoJSON layer for the world
        country outlines, providing a simple example of custom vector data. Here
        the vectors are from <a href="http://thematicmapping.org/downloads/world_borders.php"
        >thematicmapping.org</a>. (Tiled multi-resolution outlines, such as the
        <a href="statehood.html">state</a> and <a href="unemployment.html"
        >county</a> tiles used in other examples, are preferrable, but more work
        to produce.) The background map is the <a href="blue-marble.html">Blue
        Marble</a> image layer, courtesy the <a href="http://earthobservatory.nasa.gov/"
        >NASA Earth Observatory</a>.</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <hr class="space" style="height:6em;">

        <p>This example uses a helper library to load <a href="tsv.js"
        >tab-separated values</a>, which is the file format used by the CIA
        World Factbook. The country names are used as unique identifiers to
        match GeoJSON features.</p>

        <hr class="space" style="height:47em;">

        <p>The <tt>n$</tt> method comes from a helper library called <a
        href="http://github.com/mbostock/nns">NNS</a>, which makes it easier to
        create custom SVG elements. NNS is optional and not required to use
        Polymaps. Other libraries, including <a href="http://jquery.com/"
        >jQuery</a>, provide similar functionality.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/world/world.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/world/world.min.js')
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
