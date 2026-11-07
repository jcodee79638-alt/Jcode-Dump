
var vgn = Ie(function (c5s) {
  /*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */ var Mde = hgn(),
    r5s = cr("path").extname,
    Dgn = Ign(),
    ygn = /^\s*([^;\s]*)(?:;|\s|$)/,
    n5s = /^text\//i;
  c5s.charset = Mgn;
  c5s.charsets = { lookup: Mgn };
  c5s.contentType = i5s;
  c5s.extension = Prr;
  c5s.extensions = Object.create(null);
  c5s.lookup = s5s;
  c5s.types = Object.create(null);
  c5s._extensionConflicts = [];
  o5s(c5s.extensions, c5s.types);
  function Mgn(e) {
    if (!e || typeof e !== "string") return !1;
    var t = ygn.exec(e),
      r = t && Mde[t[1].toLowerCase()];
    if (r && r.charset) return r.charset;
    if (t && n5s.test(t[1])) return "UTF-8";
    return !1;
  }
  function i5s(e) {
    if (!e || typeof e !== "string") return !1;
    var t = e.indexOf("/") === -1 ? c5s.lookup(e) : e;
    if (!t) return !1;
    if (t.indexOf("charset") === -1) {
      var r = c5s.charset(t);
      if (r) t += "; charset=" + r.toLowerCase();
    }
    return t;
  }
  function Prr(e) {
    if (!e || typeof e !== "string") return !1;
    var t = ygn.exec(e),
      r = t && c5s.extensions[t[1].toLowerCase()];
    if (!r || !r.length) return !1;
    return r[0];
  }
  function s5s(e) {
    if (!e || typeof e !== "string") return !1;
    var t = r5s("x." + e)
      .toLowerCase()
      .slice(1);
    if (!t) return !1;
    return c5s.types[t] || !1;
  }
  function o5s(e, t) {
    Object.keys(Mde).forEach(function (s) {
      var a = Mde[s],
        H = a.extensions;
      if (!H || !H.length) return;
      e[s] = H;
      for (var u = 0; u < H.length; u++) {
        var f = H[u];
        t[f] = a5s(f, t[f], s);
        let d = H5s(f, t[f], s);
        if (d !== t[f]) c5s._extensionConflicts.push([f, d, t[f]]);
      }
    });
  }
  function a5s(e, t, r) {
    var s = t ? Dgn(t, Mde[t].source) : 0,
      a = r ? Dgn(r, Mde[r].source) : 0;
    return s > a ? t : r;
  }
  function H5s(e, t, r) {
    var s = ["nginx", "apache", void 0, "iana"],
      a = t ? s.indexOf(Mde[t].source) : 0,
      H = r ? s.indexOf(Mde[r].source) : 0;
    if (
      c5s.types[Prr] !== "application/octet-stream" &&
      (a > H || (a === H && c5s.types[Prr]?.slice(0, 12) === "application/"))
    )
      return t;
    return a > H ? t : r;
  }
});
import { fileURLToPath as sXs } from "url";
import { tracingChannel as oXs, channel as aXs } from "diagnostics_channel";
import { posix as lXs, win32 as tnr } from "path";
import { fileURLToPath as fXs } from "url";
import {
  lstatSync as pXs,
  readdir as dXs,
  readdirSync as mXs,
  readlinkSync as _Xs,
  realpathSync as hXs,
} from "fs";
import * as LXs from "fs";
import { lstat as $Xs, readdir as gXs, readlink as EXs, realpath as IXs } from "fs/promises";
import { EventEmitter as snr } from "events";
import L0n from "stream";
import { StringDecoder as DXs } from "string_decoder";