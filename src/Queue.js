po.queue = (function() {
  var queued = [], active = 0, size = 6;

  function process() {
    if ((active >= size) || !queued.length) return;
    active++;
    queued.pop()();
  }

  function dequeue(send) {
    for (var i = 0; i < queued.length; i++) {
      if (queued[i] == send) {
        queued.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  function request(url, callback, mimeType) {
    var req;

    function send() {
      req = new XMLHttpRequest();
      if (mimeType && req.overrideMimeType) {
        req.overrideMimeType(mimeType);
      }
      // withCredentials is the recommended check for CORS in XMLHttpRequest
      // http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
      // but we'll also use XMLHttpRequest if it's not a full URL 
      if (!url.match(/^http/) || "withCredentials" in req){
        req.open("GET", url, true);
        req.onreadystatechange = function(e) {
          if (req.readyState == 4) {
            active--;
            if (req.status < 300) { 
              // if we couldn't override the mimeType but we wanted xml:
              if (!req.overrideMimeType && ActiveXObject && req.responseText && mimeType == "application/xml") {
                var responseXML = new ActiveXObject("Microsoft.XMLDOM");
                responseXML.async = false;
                responseXML.loadXML(req.responseText);
                callback({ responseXML: responseXML });
              }
              else {
                callback(req);
              }
            }
            process();
          }
        };
      } else if (typeof XDomainRequest != "undefined"){
        req = new XDomainRequest();
        req.open("GET", url);
        req.onload = function(e) {
          // XDomainRequest doesn't handle XML automatically
          if (req.responseText && mimeType == "application/xml") {
            req.responseXML = new ActiveXObject("Microsoft.XMLDOM");
            req.responseXML.async = false;
            req.responseXML.loadXML(req.responseText);
          }
          active--;
          callback(req);
          process();
        };
      }
      req.send(null);
    }

    function abort(hard) {
      if (dequeue(send)) return true;
      if (hard && req) { req.abort(); return true; }
      return false;
    }

    queued.push(send);
    process();
    return {abort: abort};
  }

  function text(url, callback, mimeType) {
    return request(url, function(req) {
      if (req.responseText) callback(req.responseText);
    }, mimeType);
  }

  /*
   * We the override MIME type here so that you can load local files; some
   * browsers don't assign a proper MIME type for local files.
   * Internet Explorer doesn't support overrideMimeType.
   */

  function json(url, callback) {
    return request(url, function(req) {
      if (req.responseText) callback(JSON.parse(req.responseText));
    }, "application/json");
  }

  function xml(url, callback) {
    return request(url, function(req) {
      if (req.responseXML) callback(req.responseXML);
    }, "application/xml");
  }

  function image(image, src, callback) {
    var img;

    function send() {
      img = document.createElement("img");
      img.onerror = function() {
        active--;
        process();
      };
      img.onload = function() {
        active--;
        callback(img);
        process();
      };
      img.src = src;
      image.setAttributeNS(po.ns.xlink, "href", src);
    }

    function abort(hard) {
      if (dequeue(send)) return true;
      if (hard && img) { img.src = "about:"; return true; } // cancels request
      return false;
    }

    queued.push(send);
    process();
    return {abort: abort};
  }

  return {text: text, xml: xml, json: json, image: image};
})();
