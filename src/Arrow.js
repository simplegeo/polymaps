po.arrow = function() {
  var arrow = {},
      key = {left: 0, right: 0, up: 0, down: 0, plus: 0, minus: 0},
      last = 0,
      repeatTimer,
      repeatDelay = 250,
      repeatInterval = 50,
      speed = 16,
      map;

  function keydown(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var now = Date.now();
    switch (e.keyCode) {
    case 37: if (!key.left) last = now; key.left = 1; break;
    case 39: if (!key.right) last = now; key.right = 1; break;
    case 38: if (!key.up) last = now; key.up = 1; break;
    case 40: if (!key.down) last = now; key.down = 1; break;
    case 109: case 189: if (!key.plus) last = now; key.plus = 1; break;
    case 61: case 187: if (!key.minus) last = now; key.minus = 1; break;
    default: return;
    }
    if (last == now) repeat(true);
    if (!repeatTimer && (key.left | key.right | key.up | key.down)) {
      repeatTimer = setInterval(repeat, repeatInterval);
    }
    e.preventDefault();
  }

  function keyup(e) {
    last = Date.now();
    switch (e.keyCode) {
    case 37: key.left = 0; break;
    case 39: key.right = 0; break;
    case 38: key.up = 0; break;
    case 40: key.down = 0; break;
    case 109: case 189: key.plus = 0; break;
    case 61: case 187: key.minus = 0; break;
    default: return;
    }
    if (repeatTimer && !(key.left | key.right | key.up | key.down)) {
      repeatTimer = clearInterval(repeatTimer);
    }
    e.preventDefault();
  }

  arrow.map = function(x) {
    if (!arguments.length) return map;
    map = x;
    var p = map.focusableParent();
    p.addEventListener("keydown", keydown, false);
    p.addEventListener("keyup", keyup, false);
    return arrow;
  };

  arrow.speed = function(x) {
    if (!arguments.length) return speed;
    speed = x;
    return arrow;
  };

  function repeat(down) {
    if (!map) return;
    if (!down && Date.now() < last + repeatDelay) return;
    var dx = (key.left - key.right) * speed,
        dy = (key.up - key.down) * speed,
        dz = key.minus - key.plus;
    if (dx || dy) map.panBy({x: dx, y: dy});
    if (down && dz) {
      var z = map.zoom();
      map.zoom(dz < 0 ? Math.ceil(z) - 1 : Math.floor(z) + 1);
    }
  }

  return arrow;
};
