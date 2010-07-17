 po.svg = function(type) {
  return document.createElementNS(po.ns.svg, type);
};

po.ns = {
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink"
};
