<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Image Overlay</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.2.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.2.0");

div#map {
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
      </div>
      <div class="span-18 last">

        <h2>Image Overlay</h2>

        <p>Sometimes you just want to throw an image on a map. This example
        shows how to position an image using two locations for the top-right and
        bottom-left corner. The map takes care of panning and zooming! While
        this example requires that the image be axis-aligned, it can be easily
        extended to use an <a href="transform.html">affine transform</a> for
        more flexible projection.</p>

        <p>The map background is an <a href="../docs/#image">image</a>
        layer from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key.</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>The image overlay is implemented using an anonymous subclass
        of <tt>po.layer</tt></a>, which delegates tile creation to
        the <tt>overlay</tt> method.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/overlay/overlay.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/overlay/overlay.min.js')
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
