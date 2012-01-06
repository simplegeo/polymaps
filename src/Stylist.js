po.stylist = function() {
  var attrs = [],
      styles = [],
      title;

  function stylist(e) {
    var ne = e.features.length,
        na = attrs.length,
        ns = styles.length,
        f, // feature
        d, // data
        o, // element
        x, // attr or style or title descriptor
        v, // attr or style or title value
        i,
        j;
    for (i = 0; i < ne; ++i) {
      if (!(o = (f = e.features[i]).element)) continue;
      d = f.data;
      for (j = 0; j < na; ++j) {
        v = (x = attrs[j]).value;
        if (typeof v === "function") v = v.call(null, d);
        v == null ? (x.name.local
            ? o.removeAttributeNS(x.name.space, x.name.local)
            : o.removeAttribute(x.name)) : (x.name.local
            ? o.setAttributeNS(x.name.space, x.name.local, v)
            : o.setAttribute(x.name, v));
      }
      for (j = 0; j < ns; ++j) {
        v = (x = styles[j]).value;
        if (typeof v === "function") v = v.call(null, d);
        v == null
            ? o.style.removeProperty(x.name)
            : o.style.setProperty(x.name, v, x.priority);
      }
      if (v = title) {
        if (typeof v === "function") v = v.call(null, d);
        if (o.lastChild && o.lastChild.nodeName != 'path' && o.lastChild.nodeName != 'circle') {
            while (o.lastChild) {
                o.removeChild(o.lastChild);
            }
        }
        if (v != null) {
            if (o.children.length) {
               for (var i=0; i < o.children.length; i++) {
                o.children[i].appendChild(po.svg("title")).appendChild(document.createTextNode(v));
               }
            } else {
                o.appendChild(po.svg("title")).appendChild(document.createTextNode(v));
            }
        }
      }
    }
  }

  stylist.attr = function(n, v) {
    attrs.push({name: ns(n), value: v});
    return stylist;
  };

  stylist.style = function(n, v, p) {
    styles.push({name: n, value: v, priority: arguments.length < 3 ? null : p});
    return stylist;
  };

  stylist.title = function(v) {
    title = v;
    return stylist;
  };

  return stylist;
};
