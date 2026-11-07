
var vni = Ie(function (v5, Yf) {
  var Ini = HZ().Buffer,
    Dni = qri(),
    $Ro = Jlr();
  v5.encodings = null;
  v5.defaultCharUnicode = "\uFFFD";
  v5.defaultCharSingleByte = "?";
  v5.encode = function (t, r, s) {
    t = "" + (t || "");
    var a = v5.getEncoder(r, s),
      H = a.write(t),
      u = a.end();
    return u && u.length > 0 ? Ini.concat([H, u]) : H;
  };
  v5.decode = function (t, r, s) {
    if (typeof t === "string") {
      if (!v5.skipDecodeWarning)
        (console.error(
          "Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding",
        ),
          (v5.skipDecodeWarning = !0));
      t = Ini.from("" + (t || ""), "binary");
    }
    var a = v5.getDecoder(r, s),
      H = a.write(t),
      u = a.end();
    return u ? H + u : H;
  };
  v5.encodingExists = function (t) {
    try {
      return (v5.getCodec(t), !0);
    } catch (r) {
      return !1;
    }
  };
  v5.toEncoding = v5.encode;
  v5.fromEncoding = v5.decode;
  v5._codecDataCache = { __proto__: null };
  v5.getCodec = function (t) {
    if (!v5.encodings) {
      var r = Lni();
      ((v5.encodings = { __proto__: null }), $Ro(v5.encodings, r));
    }
    var s = v5._canonicalizeEncoding(t),
      a = {};
    while (!0) {
      var H = v5._codecDataCache[s];
      if (H) return H;
      var u = v5.encodings[s];
      switch (typeof u) {
        case "string":
          s = u;
          break;
        case "object":
          for (var f in u) a[f] = u[f];
          if (!a.encodingName) a.encodingName = s;
          s = u.type;
          break;
        case "function":
          if (!a.encodingName) a.encodingName = s;
          return ((H = new u(a, v5)), (v5._codecDataCache[a.encodingName] = H), H);
        default:
          throw Error("Encoding not recognized: '" + t + "' (searched as: '" + s + "')");
      }
    }
  };
  v5._canonicalizeEncoding = function (e) {
    return ("" + e).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
  };
  v5.getEncoder = function (t, r) {
    var s = v5.getCodec(t),
      a = new s.encoder(r, s);
    if (s.bomAware && r && r.addBOM) a = new Dni.PrependBOM(a, r);
    return a;
  };
  v5.getDecoder = function (t, r) {
    var s = v5.getCodec(t),
      a = new s.decoder(r, s);
    if (s.bomAware && !(r && r.stripBOM === !1)) a = new Dni.StripBOM(a, r);
    return a;
  };
  v5.enableStreamingAPI = function (t) {
    if (v5.supportsStreams) return;
    var r = Eni()(t);
    ((v5.IconvLiteEncoderStream = r.IconvLiteEncoderStream),
      (v5.IconvLiteDecoderStream = r.IconvLiteDecoderStream),
      (v5.encodeStream = function (a, H) {
        return new v5.IconvLiteEncoderStream(v5.getEncoder(a, H), H);
      }),
      (v5.decodeStream = function (a, H) {
        return new v5.IconvLiteDecoderStream(v5.getDecoder(a, H), H);
      }),
      (v5.supportsStreams = !0));
  };
  var pIt;
  try {
    pIt = cr("stream");
  } catch (e) {}
  if (pIt && pIt.Transform) v5.enableStreamingAPI(pIt);
  else
    v5.encodeStream = v5.decodeStream = function () {
      throw Error(
        "iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.",
      );
    };
});