(function() {
  var po = org.polymaps;

  po.kml = function() {
    var kml = po.geoJson(fetch);

    function fetch(url, update) {
      return po.queue.xml(url, function(xml) {
        update(geoJson(xml));
      });
    }

    var types = {

      Point: function(e) {
        var element = e.getElementsByTagName("coordinates")[0],
            text = element.textContent || element.text,
            parts = text.split(','),
            coordinates = parts.map(Number);
        return {
          type: "Point",
          coordinates: coordinates
        };
      },

      LineString: function(e) {
        var element = e.getElementsByTagName("coordinates")[0],
            text = element.textContent || element.text,
            parts = text.trim().split(/\s+/),
            coordinates = parts.map(function(a) { return a.split(",").slice(0, 2).map(Number); });
        return {
          type: "LineString",
          coordinates: coordinates
        };
      }

    };

    function geometry(e) {
      return e && e.tagName in types && types[e.tagName](e);
    }

    function geoJson(xml) {
      if (xml.documentElement) xml = xml.documentElement;
      var features = [],
      placemarks = xml.getElementsByTagName("Placemark");
      for (var i = 0; i < placemarks.length; i++) {
        var e = placemarks[i],
        f = { type: "Feature", id: e.getAttribute("id"), properties: {} };
        for (var c = e.firstChild; c; c = c.nextSibling) {
          switch (c.tagName) {
          case "name": f.properties.name = c.textContent; continue;
          case "description": f.properties.description = c.textContent; continue;
          }
          var g = geometry(c);
          if (g) f.geometry = g;
        }
        if (f.geometry) features.push(f);
      }
      return { type: "FeatureCollection", features: features };
    }

    return kml;
  };
})();
