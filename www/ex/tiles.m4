<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Tiles</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.0.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");

#map {
  font: 10px sans-serif;
}

.map rect {
  fill: #fff;
  fill-opacity: .15;
  stroke: red;
  shape-rendering: crispEdges;
}

.layer rect {
  fill: #000;
  fill-opacity: .15;
  stroke: #E5E0D9;
  shape-rendering: auto;
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
      <div id="map" class="span-24 last"></div>
      <hr class="space"/>
      <div class="span-18 prepend-6 last">

m4_include(`../../examples/grid/tiles.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/grid/tiles.js.txt')

      </script>
    </div>
  </body>
</html>
