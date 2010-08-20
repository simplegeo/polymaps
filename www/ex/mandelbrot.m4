<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Polymaps - Mandelbrot Set</title>
    <script type="text/javascript" src="../modernizr.min.js?1.5"></script>
    <script type="text/javascript" src="../polymaps.min.js?2.0.2"></script>
    <script type="text/javascript" src="../nns.min.js?1.1.0"></script>
    <script type="text/javascript" src="procedural.js?2.0.2"></script>
    <script type="text/javascript" src="mandelbrot-worker.js?2.0.2"></script>
    <style type="text/css">

@import url("../screen.css?0.9");
@import url("../style.css?2.0.2");

div#map {
  background: #000;
}

.compass .back {
  fill: #f66;
}

.compass .fore, .compass .chevron {
  stroke: #600;
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
        Inspired by <a href="http://blogs.msdn.com/b/mikeormond/archive/2008/08/22/deep-zoom-multiscaletilesource-and-the-mandelbrot-set.aspx">Mike Ormond</a>.
      </div>
      <div class="span-18 last">

        <h2>Mandelbrot Set</h2>

        <p>The <a href="http://en.wikipedia.org/wiki/Mandelbrot_set">Mandelbrot
        set</a> is a fractal set popular for its pleasing aesthetics and simple
        definition. Here we generate map tiles procedurally, visualizing points
        in the complex plane with HTML5 Canvas. As you can imagine, this
        approach suggests myriad possibilities both for computational
        visualization and post-processing of raster (image) tiles in the
        client.</p>

        <h3>Source Code</h3>

m4_include(`../../examples/canvas/mandelbrot.js.html')

      </div>
      <script type="text/javascript">

m4_include(`../../examples/canvas/mandelbrot.min.js')
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
