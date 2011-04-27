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
        // factor to increase ACC by every animation interval, "acceleration of acceleration"
        ACC_ACC: .09,
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

      /* update acceleration
         this makes it so the map comes to a more abrupt
         stop as opposed to taking forever and sort of petering out.
         this: http://chart.apis.google.com/chart?chxr=0,0,2.7368715083798887&chxt=y&chs=300x225&cht=lxy&chco=3D7930&chds=0,234,0,2.7368715083798887&chd=t:12,25,38,50,65,82,98,115,131,149,166,181,198,209,224|2.6368715083798886,2.5368858689744913,2.427901522022608,2.3091085838450556,2.1796242812315234,2.038486391382773,1.8846460914476353,1.716960164518335,1.5341825041653978,1.3349548543806962,1.1177967161153715,0.8810943454061674,0.623088761333135,0.3418626746935296,0.03532624025635972&chg=14.3,-1,1,1&chls=2,4,0&chm=B,C5D4B5BB,0,0,0
         verses: http://chart.apis.google.com/chart?chxr=0,0,2.542748091603054&chxt=y&chs=300x225&cht=lxy&chco=3D7930&chds=0,356,0,2.542748091603054&chd=t:11,24,36,49,63,75,91,104,117,131,143,155,168,179,195,210,222,237,252,267,282,293,309,328,346|2.442748091603054,2.343520303931687,2.2442925162603204,2.1450647285889537,2.045836940917587,1.9466091532462202,1.8473813655748534,1.7481535779034867,1.64892579023212,1.5496980025607532,1.4504702148893864,1.3512424272180197,1.252014639546653,1.1527868518752862,1.0535590642039194,0.9543312765325527,0.8551034888611859,0.7558757011898192,0.6566479135184524,0.5574201258470857,0.4581923381757189,0.35896455050435216,0.2597367628329854,0.16050897516161866,0.061281187490251895&chg=14.3,-1,1,1&chls=2,4,0&chm=B,C5D4B5BB,0,0,0
         */
      inertia.acceleration.x *= 1+inertia.ACC_ACC;
      inertia.acceleration.y *= 1+inertia.ACC_ACC;
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
