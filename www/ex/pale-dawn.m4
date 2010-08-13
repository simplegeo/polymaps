<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Pale Dawn</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");

#map {
  background: #E5E0D9;
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

        <h2>Pale Dawn</h2>

        <p>The &ldquo;Pale Dawn&rdquo; tileset has a calm, restrained style
        designed to work well with lots of data points. It&rsquo;s less about
        the geographical information as such, and more about providing a
        suitable background to foreground information.</p>

        <p>This map is constructed using a single <a href="../docs/#image"
        >image</a> layer of <a href="http://www.cloudmade.com/">CloudMade</a>
        tiles. The tiles are in spherical mercator coordinates, and the map has
        standard interaction controls, so this basic example is a useful
        starting point for customization. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key.</p>

        <h3>Source Code</h3>

m4_include(`../../examples/cloudmade/pale-dawn.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/cloudmade/pale-dawn.js.txt')

      </script>
      <div class="span-5 append-1 credits">
        Polymaps is a project
        from <a class="bold" href="http://simplegeo.com/">SimpleGeo</a>
        and <a class="bold" href="http://stamen.com/">Stamen</a>.
      </div>
    </div>
  </body>
</html>
