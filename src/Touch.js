po.touch = function() {
  var touch = {},
      map,
      last;

  touch.map = function(x) {
    if (!arguments.length) return map;
    
    if (map) {
      var container = map.container();
      container.removeEventListener("touchstart", touchstart, false);
      container.removeEventListener("touchmove", touchmove, false);
      container.removeEventListener("touchend", touchend, false);
      container.removeEventListener("touchcancel", touchend, false);
    }
    
    map = x;
    
    if (map) {
      var container = map.container();
      container.addEventListener("touchstart", touchstart, false);
      container.addEventListener("touchmove", touchmove, false);
      container.addEventListener("touchend", touchend, false);
      container.addEventListener("touchcancel", touchend, false);
      // TODO update if map container changes?
    }
    
    return touch;
  }
  
  function updateMap(last, now) {
    var delta = {
      x: now.clientX - last.clientX,
      y: now.clientY - last.clientY,
      scale: now.scale - last.scale
    };
		if (delta.x || delta.y || delta.scale) {
      var oldPoint = map.mouse(last),
          location = map.pointLocation(oldPoint);
      map.zoomBy(delta.scale, map.mouse(now), location);
		}
  }
  
  function touchstart(e) {
		if (last) {
			// if new finger being added, finish current move sequence first
			touchend();
		}
    e.preventDefault();
    
		last = touchesCenter(e);
	}

	function touchmove(e) {
		if (!last) {
			// if finger was lifted, start new move sequence instead
			return touchstart(e);
		}
    e.preventDefault();
    
		var now = touchesCenter(e);
    updateMap(last, now);
    last = now;
  }

	function touchend(e) {
		last = null;
	}

	function touchesCenter(e) {
		var touches = e.touches;
		var sumX = 0, sumY = 0;
		for (var i = 0; i < touches.length; ++i) {
			var touch = touches[i];
			sumX += touch.clientX;
			sumY += touch.clientY;
		}
		return {
			clientX: sumX / touches.length,
      clientY: sumY / touches.length,
      scale: e.scale
    };
	}
  
  return touch;
};
