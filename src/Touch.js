po.touch = function() {
  var touch = {},
      map,
      prevPoints = {},
      startDist = null,
      startCenter = null,
      scaleFactor = null,
      center = null;

  touch.map = function(x) {
    if (!arguments.length) return map;
    map = x;
    // TODO remove from old map container?
    // TODO update if map container changes?
    map.container().addEventListener("touchstart", touchstart, false);
    return touch;
  }

  function client(t) {
    return { x: t.clientX, y: t.clientY };
  }

  function distance(p1, p2) {
    var dx = p2.x - p1.x,
        dy = p2.y - p1.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
    
  function interpolate(p1, p2, t) {
    var px = p1.x + (p2.x - p1.x) * t,
        py = p1.y + (p2.y - p1.y) * t;
    return { x: px, y: py };
  }

  function touchstart(e) {
    for (var i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier in prevPoints) continue;
      prevPoints[e.touches[i].identifier] = client(e.touches[i]);
    }
    if (e.touches.length == 2) {
      var p0 = prevPoints[e.touches[0].identifier];
          p1 = prevPoints[e.touches[1].identifier];
      startDist = distance(p0, p1);
      startCenter = interpolate(p0, p1, 0.5);                    
    }
    e.preventDefault();
    return false;
  }
  function touchmove(e) {
    if (e.touches.length == 1) {
      var prevTouch = prevPoints[e.touches[0].identifier],
          thisTouch = client(e.touches[0]);
      map.panBy({ x: thisTouch.x - prevTouch.x, y: thisTouch.y - prevTouch.y });
      prevPoints[e.touches[0].identifier] = thisTouch;
    }
    if (e.touches.length == 2) {
      var p0 = client(e.touches[0]),
          p1 = client(e.touches[1]);
          dist = distance(p0,p1);
      scaleFactor = dist / startDist;
      center = interpolate(p0, p1, 0.5);
      map.container().style.webkitTransformOrigin = startCenter.x + 'px ' + startCenter.y + 'px'; 
      map.container().style.webkitTransform = 'translate3d('+ (center.x-startCenter.x) +'px,' 
                                                      + (center.y-startCenter.y) +'px,0px) '
                                                      + 'scale3d('+ scaleFactor +','+ scaleFactor +',1) ';
      prevPoints[e.touches[0].identifier] = p0;
      prevPoints[e.touches[1].identifier] = p1;
    }
    e.preventDefault();
    return false;
  }
  function touchend(e) {
    if (e.touches.length < 2 && scaleFactor) {
      map.container().style.webkitTransformOrigin = '';
      map.container().style.webkitTransform = '';
      map.panBy({ x: -startCenter.x, y: -startCenter.y });
      map.zoomBy(Math.log(scaleFactor)/Math.LN2, { x: 0, y: 0 });
      map.panBy({ x: center.x-startCenter.x, y: center.y-startCenter.y });
      map.panBy({ x: startCenter.x, y: startCenter.y });
      scaleFactor = undefined;
      center = undefined;
    }
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier in prevPoints) {
        delete prevPoints[e.changedTouches[i].identifier];
      }
    }
  }

  window.addEventListener("touchmove", touchmove, false);
  window.addEventListener("touchend", touchend, false);

  return touch;
};
