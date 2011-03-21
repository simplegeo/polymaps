po.touch = function() {
  var touch = {},
      map,
      last;
  
  function container(c) {
    if (c['old']) {
      c['old'].removeEventListener("touchstart", touchstart, false);
      c['old'].removeEventListener("touchmove", touchmove, false);
      c['old'].removeEventListener("touchend", touchend, false);
      c['old'].removeEventListener("touchcancel", touchend, false);
    }
    if (c['new']) {
      console.log(c['new']);
      c['new'].addEventListener("touchstart", touchstart, false);
      c['new'].addEventListener("touchmove", touchmove, false);
      c['new'].addEventListener("touchend", touchend, false);
      c['new'].addEventListener("touchcancel", touchend, false);
    }
  }
  
  touch.map = function(x) {
    if (!arguments.length) return map;
    
    if (map) {
      map.off("container", container);
    }
    
    container({'old':(map && map.container()), 'new':(x && x.container())});
    map = x;
    
    if (map) {
      map.on("container", container);
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
