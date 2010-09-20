(function(po) {
  po.loupe = function() {
    var loupe = po.map(),
        container = po.svg("g"),
        clipId = "org.polymaps." + po.id(),
        clipHref = "url(#" + clipId + ")",
        clipPath = container.appendChild(po.svg("clipPath")),
        clipCircle = clipPath.appendChild(po.svg("circle")),
        visible = true,
        r = 64,
        map,
        m0,
        p0,
        p1 = {x: 0, y: 0},
        repeatInterval,
        repeatRate = 30,
        repeatPan = {x: 0, y: 0};

    loupe
        .size({x: r * 2, y: r * 2})
        .container(container)
        .centerRange(null)
        .zoomRange(null)
        .on("move", move);

    clipCircle.setAttribute("cx", r);
    clipCircle.setAttribute("cy", r);
    clipCircle.setAttribute("r", r);
    clipPath.setAttribute("id", clipId);
    container.setAttribute("clip-path", clipHref);
    container.setAttribute("class", "map loupe");

    container.addEventListener("mousedown", mousedown, false);
    window.addEventListener("mouseup", mouseup, false);
    window.addEventListener("mousemove", mousemove, false);

    function move() {
      var p = map.locationPoint(loupe.center()),
          z0 = map.zoom(),
          z1 = loupe.zoom();
      if (z0 != z1) loupe.off("move", move).zoom(z0).on("move", move);
      container.setAttribute("transform", "translate(" + (p.x - r) + "," + (p.y - r) + ")");
    }

    function mousedown(e) {
      m0 = map.mouse(e);
      p0 = map.locationPoint(loupe.center());
      map.focusableParent().focus();
      return cancel(e);
    }

    function mousemove(e) {
      if (!m0) return;
      var m1 = map.mouse(e),
          size = map.size();

      // determine the new loupe point, and whether it's offscreen
      p1.x = p0.x - m0.x + m1.x;
      p1.y = p0.y - m0.y + m1.y;
      repeatPan.x = p1.x < 0 ? -p1.x : p1.x > size.x ? size.x - p1.x : 0;
      repeatPan.y = p1.y < 0 ? -p1.y : p1.y > size.y ? size.y - p1.y : 0;

      // if the loupe is offscreen, start a new pan interval
      if (repeatPan.x || repeatPan.y) {
        repeatPan.x /= 10;
        repeatPan.y /= 10;
        if (!repeatInterval) repeatInterval = setInterval(mouserepeat, repeatRate);
      } else if (repeatInterval) {
        repeatInterval = clearInterval(repeatInterval);
      }

      loupe.center(map.pointLocation(p1));
      return cancel(e);
    }

    function mouserepeat() {
      map.panBy(repeatPan);
      loupe.center(map.pointLocation(p1));
    }

    function mouseup(e) {
      if (m0) {
        if (repeatInterval) repeatInterval = clearInterval(repeatInterval);
        m0 = null;
        return cancel(e);
      }
    }

    function cancel(e) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    loupe.map = function(x) {
      if (!arguments.length) return map;
      if (map) {
        map.container().removeChild(loupe.container());
        map.off("move", move).off("resize", move);
      }
      if (map = x) {
        map.on("move", move).on("resize", move);
        map.container().appendChild(loupe.container());
        move();
      }
      return loupe;
    };

    loupe.radius = function(x) {
      if (!arguments.length) return r;
      r = x;
      clipCircle.setAttribute("cx", r);
      clipCircle.setAttribute("cy", r);
      clipCircle.setAttribute("r", r);
      if (map) move();
      return loupe;
    };

    loupe.visible = function(x) {
      if (!arguments.length) return visible;
      visible = x;
      if (x) g.removeAttribute("visibility");
      else g.setAttribute("visibility", "hidden");
      return loupe;
    };

    return loupe;
  };
})(org.polymaps);
