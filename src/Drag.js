po.drag = function() {
  var drag = {},
      map,
      cursor,
      dragging;

  function mousedown(e) {
    dragging = {
      x: e.clientX,
      y: e.clientY
    };
    map.focusableParent().focus();
    e.preventDefault();
    cursor = document.body.style.cursor;
    document.body.style.cursor = "move";
  }

  function mousemove(e) {
    if (!dragging) return;
    map.panBy({x: e.clientX - dragging.x, y: e.clientY - dragging.y});
    dragging.x = e.clientX;
    dragging.y = e.clientY;
  }

  function mouseup(e) {
    if (!dragging) return;
    mousemove(e);
    dragging = null;
    document.body.style.cursor = cursor;
  }

  drag.map = function(x) {
    if (!arguments.length) return map;
    map = x;
    // TODO remove from old map container?
    // TODO update if map container changes?
    map.container().addEventListener("mousedown", mousedown, false);
    return drag;
  };

  window.addEventListener("mousemove", mousemove, false);
  window.addEventListener("mouseup", mouseup, false);

  return drag;
};
