<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Population Density</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../protodata.min.js?3.2"></script>
    <script type="text/javascript" src="../nns.min.js?1.0.0"></script>
    <script type="text/javascript" src="fips.js?1.6.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");
@import url("../colorbrewer.css?1.0.0");

#map {
  background: #E6E6E6;
}

.layer path {
  fill: none;
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
          <script type="text/javascript" src="../logo-small.js"></script>
        </a>
      </div>
      <div class="span-18 last top">
        <a href="../">Overview</a>
        <a href="./">Examples</a>
        <a href="../docs/">Documentation</a>
        <a href="http://github.com/simplegeo/polymaps">Download</a>
      </div>
      <hr class="space"/>
      <div id="map" class="span-24 last">
        <img id="logo"/>
      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">
        &copy; 2010
        <a href="http://www.cloudmade.com/">CloudMade</a>,
        <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors,
        <a href="http://creativecommons.org/licenses/by-sa/2.0/">CCBYSA</a>.
        Colors by <a href="http://colorbrewer.org/">Cynthia Brewer</a>.
      </div>
      <div class="span-18 last">

m4_include(`../../examples/statehood/statehood.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/statehood/statehood.js.txt')

      </script>
    </div>
  </body>
</html>
