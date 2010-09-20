(function(po) {
  po.loupe = function() {
    var loupe = po.map(),
        container = po.svg("g"),
        clipId = "org.polymaps." + po.id(),
        clipHref = "url(#" + clipId + ")",
        clipPath = container.appendChild(po.svg("clipPath")),
        clipCircle = clipPath.appendChild(po.svg("circle")),
        back = po.svg("circle"),
        fore = po.svg("circle"),
        visible = true,
        r = 128,
        rr = [64, 384],
        k = 1,
        map,
        f0,
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

    container.appendChild(back).setAttribute("class", "back");
    container.appendChild(fore).setAttribute("class", "fore");
    clipPath.setAttribute("id", clipId);
    container.setAttribute("class", "map loupe");

    back.addEventListener("mousedown", mousedown, false);
    fore.addEventListener("mousedown", foredown, false);
    fore.setAttribute("cursor", "ew-resize");
    window.addEventListener("mouseup", mouseup, false);
    window.addEventListener("mousemove", mousemove, false);

    function move() {
      var p = map.locationPoint(loupe.center()),
          z0 = map.zoom(),
          z1 = loupe.zoom();
      if (z0 != z1) {
        loupe.off("move", move).zoom(z0).on("move", move);
        clipCircle.setAttribute("r", r * (k = Math.pow(2, Math.round(z0) - z0)));
      }
      container.setAttribute("transform", "translate(" + (p.x - r) + "," + (p.y - r) + ")");
    }

    function foredown(e) {
      f0 = true;
      document.body.style.setProperty("cursor", "ew-resize", null);
      map.focusableParent().focus();
      return cancel(e);
    }

    function foremove(e) {
      var p0 = map.mouse(e),
          p1 = map.locationPoint(loupe.center()),
          dx = p1.x - p0.x,
          dy = p1.y - p0.y,
           r = Math.sqrt(dx * dx + dy * dy);
      loupe.radius(r ^ (r & 1));
      return cancel(e);
    }

    function mousedown(e) {
      m0 = map.mouse(e);
      p0 = map.locationPoint(loupe.center());
      map.focusableParent().focus();
      return cancel(e);
    }

    function mousemove(e) {
      if (f0) return foremove(e);
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
      if (f0) {
        f0 = null;
        document.body.style.removeProperty("cursor");
      }
      if (m0) {
        if (repeatInterval) repeatInterval = clearInterval(repeatInterval);
        m0 = p0 = null;
      }
      return cancel(e);
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

    var __add__ = loupe.add;
    loupe.add = function(x) {
      x.map(loupe);
      if (x.container) {
        x = x.container();
        x.setAttribute("clip-path", clipHref);
        x.setAttribute("pointer-events", "none");
      }
      container.appendChild(fore); // move to end
      return loupe;
    };

    loupe.radiusRange = function(x) {
      if (!arguments.length) return rr;
      rr = x;
      return loupe.radius(r);
    };

    loupe.radius = function(x) {
      if (!arguments.length) return r;
      r = rr ? Math.max(rr[0], Math.min(rr[1], x)) : x;
      back.setAttribute("cx", r);
      back.setAttribute("cy", r);
      back.setAttribute("r", r);
      fore.setAttribute("cx", r);
      fore.setAttribute("cy", r);
      fore.setAttribute("r", r);
      clipCircle.setAttribute("r", r * k);
      loupe.size({x: r * 2, y: r * 2})
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

    loupe.radius(r); // initialize circles

    return loupe;
  };
})(org.polymaps);
