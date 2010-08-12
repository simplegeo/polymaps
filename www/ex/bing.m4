<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Bing</title>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.0.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");

.compass .chevron, .compass .fore {
  stroke: #666;
}

#logo {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

#copy {
  width: 600px;
  color: #ccc;
  pointer-events: none;
}

    </style>
  </head>
  <body>
    <div class="container">
      <hr class="space"/>
      <div class="span-5 append-1">
        <script type="text/javascript" src="../logo-small.js"></script>
      </div>
      <div class="span-18 last top">
        <a href="../">Overview</a>
        <a href="./">Examples</a>
        <a href="../docs/">Documentation</a>
        <a href="http://github.com/simplegeo/polymaps">Download</a>
      </div>
      <hr class="space"/>
      <div class="span-18 prepend-6 last">
        <div id="map" style="height:500px;"></div>
        <script type="text/javascript">

m4_include(`bing.js.txt')

        </script>

m4_include(`bing.js.html')

      </div>
    </div>
  </body>
</html>
