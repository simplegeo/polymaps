(function() {
  var setup, teardown;
  if (navigator.userAgent.search(/Gecko\/(\S*)/) >= 0) { // mozilla
    setup = mozSetup;
  }
  else { // IE, Opera, safari, chrome
    setup = otherSetup;
  }

  po.wheelPan = function() {
    var wheelPan = {},
        map,
        container;

    wheelPan.map = function(x) {
      if (!arguments.length) return map;
      if (map && teardown) {
        teardown();
        container = null;
      }
      if (map = x) {
        container = map.container();
        setup(container, map);
      }
      return wheelPan;
    };

    return wheelPan;
  };

  function mozSetup(container, map) {
    var listenerRemoved = false;

    container.addEventListener('MozMousePixelScroll', pixelListener, false);
    container.addEventListener('DOMMouseScroll', domListener, false);

    teardown = function mozTeardown() {
      container.removeEventListener('MozMousePixelScroll', pixelListener, false);
      container.removeEventListener('DOMMouseScroll', domListener, false);
    }

    function pixelListener(e) {
      if (!listenerRemoved) {
        listenerRemoved = true;
        container.removeEventListener('DOMMouseScroll', domListener, false);
      }
      map.panBy({x: e.axis === 1 ? -e.detail : 0, y: e.axis === 2 ? -e.detail : 0});

      if (e.preventDefault) { e.preventDefault(); }
      else e.returnValue = false;
      return false;
    }

    function domListener(e) {
      map.panBy({x: e.axis === 1 ? -e.detail*40 : 0, y: e.axis === 2 ? -e.detail*40 : 0});

      if (e.preventDefault) { e.preventDefault(); }
      else e.returnValue = false;
      return false;
    }
  }

  function otherSetup(container, map) {
    var hidden;

    createHidden();
    container.addEventListener('mousewheel', webkitListener, false);

    teardown = function otherTeardown() {
      container.removeEventListener('mousewheel', webkitListener, false);
      container.removeEventListener('mousewheel', otherListener, false);
      destroyHidden();
    }

    function createHidden() {
      hidden = document.createElement('div');
      hidden.setAttribute('style', 'visibility: hidden; overflow: auto; height: 0px; width: 0px;');
      hidden.appendChild(document.createElement('div'));
      hidden.firstChild.setAttribute('style', 'width: 1200px; height: 1200px;');
      document.body.appendChild(hidden);

      hidden.scrollTop = 450;
      hidden.scrollLeft = 450;
    }

    function destroyHidden() {
      hidden.parentNode.removeChild(hidden);
      hidden = null;
    }

    function webkitListener(e) {
      try {
        // webkit supports this, IE and Opera don't
        hidden.dispatchEvent(e);
      }
      catch(err) {
        // oops switch to most basic listener
        destroyHidden();
        container.removeEventListener('mousewheel', webkitListener, false);
        container.addEventListener('mousewheel', otherListener, false);
        //otherListener(e);
        return;
      }

      map.panBy({ x: 450 - hidden.scrollLeft, y: 450 - hidden.scrollTop });
      hidden.scrollTop = 450;
      hidden.scrollLeft = 450;

      if (e.preventDefault) { e.preventDefault(); }
      else e.returnValue = false;
      return false;
    }

    function otherListener(e) {
      map.panBy({ x: 0, y: e.wheelDelta});

      if (e.preventDefault) { e.preventDefault(); }
      else e.returnValue = false;
      return false;
    }
  }
})();
