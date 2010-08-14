(function() {
  var body = n$(document.body),
      div = n$("#map").style("visibility", "visible"),
      full = false;

  var svg = div.add("svg:svg")
      .attr("width", 32)
      .attr("height", 32)
      .style("position", "absolute")
      .style("right", -16)
      .style("top", -16)
      .style("visibility", "visible")
      .on("mousedown", mousedown);

  svg.add("svg:circle")
      .attr("cx", 16)
      .attr("cy", 16)
      .attr("r", 14)
      .attr("fill", "#fff")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 4)
    .add("svg:title")
      .text("Toggle fullscreen. (ESC)");

  var arrow = svg.add("svg:path")
      .attr("transform", "translate(16,16)rotate(-45)scale(5)translate(-1.85,0)")
      .attr("d", "M0,0L0,.5 2,.5 2,1.5 4,0 2,-1.5 2,-.5 0,-.5Z")
      .attr("pointer-events", "none")
      .attr("fill", "#aaa");

  window.addEventListener("keydown", keydown, false);

  function keydown(e) {
    if (e.keyCode == 27 && full) mousedown();
  }

  function mousedown() {
    full = !full;

    if (full) {

      div
          .style("position", "fixed")
          .style("border-width", "0")
          .style("width", "100%")
          .style("height", "100%")
          .style("top", 0)
          .style("left", 0);

      svg
          .style("position", "fixed")
          .style("right", 16)
          .style("top", 16);

      arrow
          .attr("transform", "translate(16,16)rotate(135)scale(5)translate(-1.85,0)");

      body
          .style("visibility", "hidden")
          .style("overflow", "hidden");

    } else {

      div
          .style("position", null)
          .style("border-width", null)
          .style("width", null)
          .style("height", null)
          .style("top", null)
          .style("left", null);

      svg
          .style("position", "absolute")
          .style("right", -16)
          .style("top", -16)

      arrow
          .attr("transform", "translate(16,16)rotate(-45)scale(5)translate(-1.85,0)");

      body
          .style("visibility", null)
          .style("overflow", null);

    }

    map.resize();
  }
})();
