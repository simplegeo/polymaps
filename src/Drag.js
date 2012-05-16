po.drag = function() {
  var drag = {},
      map,
      container,
      dragging;

  /* confine all inertia related variables to this object. so as not to pollute
     this scope
     */
  var inertia = {
        // in milliseconds, how long a time to use for calculating velocity
        HISTORY_TIME: 200,
        // subtracted from velocity every animation interval, "acceleration"
        ACC: .1,
        // how often to animate.  we basically do it as often as possible
        ANIMATION_PERIOD: 10,
        // percentage to dampen initial acceleration by
        DAMPEN: .8
      };

  function mousedown(e) {
    if (e.shiftKey) return;

    dragging = {
      x: e.clientX,
      y: e.clientY
    };

    /* if the interval exists, then we are animating.  but we just received a mousedown,
       so immediately stop the animation.  allows a user to 'catch' a 'thrown' map */
    if (inertia.interval) {
      inertia.history = null;
      clearInterval(inertia.interval);
    }

    /* if they've turned on inertia, then make sure we have a history object for
       keeping track of how the mouse has moved */
    if (inertia.active) {
      inertia.history = [];
    }

    map.focusableParent().focus();
    e.preventDefault();
    document.body.style.setProperty("cursor", "move", null);
  }

  function mousemove(e) {
    if (!dragging) return;


    /* we have a history object, so update it.  we keep track of all the mouse
       positions we can up until inertia.HISTORY_TIME.  This allows us to
       accurately figure out how quickly the user was moving their mouse when they
       stop a drag */
    if (inertia.history) {
      /* when and where */
      var last = {
        time: new Date(),
        x: e.clientX,
        y: e.clientY
      };

      inertia.history.push(last);

      /* don't bother keeping anything older than inertia.HISTORY_TIME */
      while (inertia.history.length && last.time - inertia.history[0].time > inertia.HISTORY_TIME) {
        inertia.history.shift();
      }
    }

    map.panBy({x: e.clientX - dragging.x, y: e.clientY - dragging.y});
    dragging.x = e.clientX;
    dragging.y = e.clientY;
  }

  function mouseup(e) {
    if (!dragging) return;
    mousemove(e);
    dragging = null;

    /* they have inertia on, and have a mouse movement in our history, so we
       need to calculate the velocity and start the animation */
    if (inertia.active && inertia.history[0]) {
      var ms = new Date() - inertia.history[0].time;
      inertia.velocity = {
        x: (e.clientX - inertia.history[0].x)/ms * inertia.ANIMATION_PERIOD * inertia.DAMPEN,
        y: (e.clientY - inertia.history[0].y)/ms * inertia.ANIMATION_PERIOD * inertia.DAMPEN
      };

      /* make sure they were actually moving */
      if (inertia.velocity.x && inertia.velocity.y) {
        /* break acceleration down into its x and y components */
        var angle = Math.atan2(inertia.velocity.y, inertia.velocity.x);
        inertia.acceleration = {
          x: inertia.ACC * Math.cos(angle),
          y: inertia.ACC * Math.sin(angle)
        };

        /* uncomment this (and later code) to see graphs of the velocity. Useful
           when fine tuning the constants:
        inertia.start = new Date();
        inertia.pointsX = [];
        inertia.pointsY = [];
        */

        /* start animation */
        inertia.interval = setInterval(inertialize, inertia.ANIMATION_PERIOD);
      }
    }
    document.body.style.removeProperty("cursor");
  }

  function inertialize() {
    /* for graphing of velocity:
    inertia.pointsX.push(new Date() - inertia.start);
    inertia.pointsY.push(inertia.velocity.x);
    */

    map.panBy(inertia.velocity);

    /* if the velocity ever changes signs (from negative to positive or vice versa),
       then that means we should stop moving the map (we've moved the velocity down
       to zero, but shouldn't continue out the other side) */
    if (inertia.velocity.x > 0 && inertia.velocity.x < inertia.acceleration.x ||
        inertia.velocity.x < 0 && inertia.velocity.x > inertia.acceleration.x) {
      /* for graphing of velocity:
      var url = 'http://chart.apis.google.com/chart' +
         '?chxr=0,0,' + (inertia.pointsY[0]+.1) +
         '&chxt=y' +
         '&chs=300x225' +
         '&cht=lxy' +
         '&chco=3D7930' +
         '&chds=0,' + (inertia.pointsX[inertia.pointsX.length - 1] + 10) + ',0,' + (inertia.pointsY[0]+.1) +
         '&chd=t:' + inertia.pointsX.join(',') + '|' + inertia.pointsY.join(',') +
         '&chg=14.3,-1,1,1' +
         '&chls=2,4,0' +
         '&chm=B,C5D4B5BB,0,0,0'
         ;
      console.log(url);
      */

      /* reset to default state */
      inertia.history = null;
      clearInterval(inertia.interval);
    }
    else {
      /* update velocity */
      inertia.velocity.x -= inertia.acceleration.x;
      inertia.velocity.y -= inertia.acceleration.y;
    }
  }

  drag.map = function(x) {
    if (!arguments.length) return map;
    if (map) {
      container.removeEventListener("mousedown", mousedown, false);
      container = null;
    }
    if (map = x) {
      container = map.container();
      container.addEventListener("mousedown", mousedown, false);
    }
    return drag;
  };

  drag.inertia = function(x) {
    if (!arguments.length) return inertia.active;
    inertia.active = x;
    return drag;
  };


  window.addEventListener("mousemove", mousemove, false);
  window.addEventListener("mouseup", mouseup, false);

  return drag;
};
