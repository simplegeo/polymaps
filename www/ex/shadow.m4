<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Shadows &amp; Gradients</title>
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
        Ball by <a href="http://raphaeljs.com/">Dmitry Baranovskiy</a>.
      </div>
      <div class="span-18 last">

        <h2>Shadows &amp; Gradients</h2>

        <p>Polymap&rsquo;s built-in support for GeoJSON provides basic rendering
        of geometric primitives including points, lines and polygons. Sometimes,
        however, you want to take advantage of the raw power of SVG! Polymaps
        produces a clean and well-behaved SVG tree, allowing rich graphical
        effects to be applied through post-processing with JavaScript and
        CSS.</p>

        <p>Inspired by <a href="http://raphaeljs.com/">Rapha&euml;l</a>&rsquo;s
        playful &ldquo;Ball&rdquo; example, here we create a custom translucent
        marker. Complex lighting effects are simulated with two radial gradients
        (one for a surface highlight, and a second for the internal reflection).
        An additional drop shadow is created using a <a
        href="http://en.wikipedia.org/wiki/Gaussian_blur">Gaussian blur</a>
        filter. The marker scales automatically with zoom level, such that it
        appears constant-size over the map!</p>

      </div>
      <hr class="space"/>
      <div id="copy" class="span-5 append-1">

        <p>This example uses a little helper library called <a
        href="http://github.com/mbostock/nns">NNS</a> for creating SVG elements.
        NNS is optional and not required to use Polymaps. We chose to implement
        this example with NNS to simplify the creation of custom SVG
        elements.</p>

        <p>The <tt>n$</tt> method converts a DOM element to a wrapper, which has
        convenience methods for setting attributes (<tt>attr</tt>) and creating
        child elements (<tt>add</tt>). Other libraries, include <a
        href="http://jquery.com/">jQuery</a>, provide similar functionality.</p>

      </div>
      <div class="span-18 last">
        <h3>Source Code</h3>

m4_include(`../../examples/shadow/shadow.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/shadow/shadow.js.txt')

      </script>
    </div>
  </body>
</html>
