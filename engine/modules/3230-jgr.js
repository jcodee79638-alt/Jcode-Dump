
var jgr = Ie(function (XMi) {
  var qMi = Ebe(),
    m$a = Sgr(),
    _$a = kD(),
    h$a = Sxt(),
    L$a = (XMi.elements = {}),
    GMi = Object.create(null);
  XMi.createElement = function (e, t, r) {
    var s = GMi[t] || bgr;
    return new s(e, t, r);
  };
  function vgr(e) {
    return m$a(e, bgr, L$a, GMi);
  }
  var bgr = vgr({
    superclass: qMi,
    name: "SVGElement",
    ctor: function (t, r, s) {
      qMi.call(this, t, r, _$a.NAMESPACE.SVG, s);
    },
    props: {
      style: {
        get: function () {
          if (!this._style) this._style = new h$a(this);
          return this._style;
        },
      },
    },
  });
  vgr({
    name: "SVGSVGElement",
    ctor: function (t, r, s) {
      bgr.call(this, t, r, s);
    },
    tag: "svg",
    props: {
      createSVGRect: {
        value: function () {
          return XMi.createElement(this.ownerDocument, "rect", null);
        },
      },
    },
  });
  vgr({
    tags: [
      "a",
      "altGlyph",
      "altGlyphDef",
      "altGlyphItem",
      "animate",
      "animateColor",
      "animateMotion",
      "animateTransform",
      "circle",
      "clipPath",
      "color-profile",
      "cursor",
      "defs",
      "desc",
      "ellipse",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "filter",
      "font",
      "font-face",
      "font-face-format",
      "font-face-name",
      "font-face-src",
      "font-face-uri",
      "foreignObject",
      "g",
      "glyph",
      "glyphRef",
      "hkern",
      "image",
      "line",
      "linearGradient",
      "marker",
      "mask",
      "metadata",
      "missing-glyph",
      "mpath",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "script",
      "set",
      "stop",
      "style",
      "switch",
      "symbol",
      "text",
      "textPath",
      "title",
      "tref",
      "tspan",
      "use",
      "view",
      "vkern",
    ],
  });
});