<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Affine Transform</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?1.6.0"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="nypl.js?1.6.0"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?1.6.0");

#map {
  background: #E5E0D9;
}

#nypl {
  opacity: .5;
  -webkit-transition: opacity 250ms linear;
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

        <h2>Affine Transform</h2>

        <p>Image tiles don&rsquo;t have to be in spherical Mercator coordinates.
        Polymaps can translate, rotate, scale and shear a tileset using an
        <a href="http://en.wikipedia.org/wiki/Affine_transformation">affine
        transformation</a>, so that any zoomable image can be overlaid onto a
        map. In this example, we transform an old map of Brooklyn courtesy of
        the <a href="http://www.nypl.org/">New York Public Library</a>. Use the
        '1' and '2' keys to toggle the opacity of the map overlay.</p>

        <p>The background map is an <a href="../docs/#image">image</a> layer
        from <a href="http://www.cloudmade.com/">CloudMade</a>. Register
        a <a href="http://cloudmade.com/register">developer account</a> with
        CloudMade for your own API key.</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>The affine transform here is hard-coded based on the tile coordinates
        of three locations in image space and Earth space
        (with <a href="http://msdn.microsoft.com/en-us/library/bb259689.aspx">spherical
        mercator</a> projection), respectively.</p>

        <p>There&rsquo;s an additional <a href="nypl.js">helper library</a> used
        by this example to load the image metadata from
        the <a href="http://maps.nypl.org/">NYPL Map Warper</a>. The image
        coordinates are defined such that &#x27e8;0,0&#x27e9; is the top-left
        corner, and &#x27e8;1,1&#x27e9; is the bottom-right corner of the
        smallest square that contains the image.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/transform/transform.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/transform/transform.min.js')
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
