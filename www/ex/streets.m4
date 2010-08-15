<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Pavement Quality</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="../protodata.min.js?3.2"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.0");

#map {
  background: #021019;
}

.compass .back {
  fill: #256574;
}

.compass .fore, .compass .chevron {
  stroke: #1AA398;
}

#streets path {
  fill: none;
  stroke-linecap: round;
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
      </div>
      <div class="span-18 last">

        <h2>Pavement Quality</h2>

        <p>This visualization shows the pavement quality of San Francisco
        streets, mashing up two datasets
        from <a href="http://www.datasf.org/">DataSF</a>: <a href="http://datasf.org/story.php?title=paving-pci-scores">paving
        PCI scores</a>
        and <a href="http://datasf.org/story.php?title=street-centerlines-">street
        centerlines</a>. (You can even peek at
        Shawn&rsquo;s <a href="http://gist.github.com/448063">Python script</a>
        for merging the two into GeoJSON.) Streets with high pavement quality
        are shown in <span style="color:darkgreen;">green</span>, while those in
        the worst quality are <span style="color:darkred;">red</span>.</p>

        <p>The map background is an <a href="../docs/#image">image</a> layer
        from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key. The <a href="../docs/#geoJson">GeoJSON
        data</a> for this example is hosted as a <a href="streets.json">static
        file</a>.</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>This example also uses a data visualization library
        called <a href="http://protovis.org/">Protovis</a> for color
        interpolation. Protovis is optional and not required to use
        Polymaps.</p>

        <p>Note that we&rsquo;re not using Protovis to render
        anything&mdash;just data processing.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/streets/streets.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/streets/streets.min.js')
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
