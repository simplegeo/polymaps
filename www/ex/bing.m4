<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Bing</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");

.compass .chevron, .compass .fore {
  stroke: #666;
}

#map {
  background: #132328;
}

#logo {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
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
      <div id="copy" class="span-5 append-1"></div>
      <div class="span-18 last">

m4_include(`../../examples/bing/map.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/bing/map.js.txt')

      </script>
    </div>
  </body>
</html>
