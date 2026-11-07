
var STi = Ie(function (ASt) {
  var Ru = cr("buffer").Buffer,
    _T = hTi(),
    MTi = LTi(),
    xTi = $Ti(),
    HHe = gTi(),
    Ube = ETi(),
    w8 = yTi(),
    vc = (ASt.name = {});
  vc.encode = function (e, t, r, { mail: s = !1 } = {}) {
    if (!t) t = Ru.alloc(vc.encodingLength(e));
    if (!r) r = 0;
    let a = r,
      H = e.replace(/^\.|\.$/gm, "");
    if (H.length) {
      let u = [];
      if (s) {
        let f = "";
        H.split(".").forEach((d) => {
          if (d.endsWith("\\")) f += (f.length ? "." : "") + d.slice(0, -1);
          else if (u.length === 0 && f.length) u.push(f + "." + d);
          else u.push(d);
        });
      } else u = H.split(".");
      for (let f = 0; f < u.length; f++) {
        let d = t.write(u[f], r + 1);
        ((t[r] = d), (r += d + 1));
      }
    }
    return ((t[r++] = 0), (vc.encode.bytes = r - a), t);
  };
  vc.encode.bytes = 0;
  vc.decode = function (e, t, { mail: r = !1 } = {}) {
    if (!t) t = 0;
    let s = [],
      a = t,
      H = 0,
      u = 0,
      f = !1;
    while (!0) {
      if (t >= e.length) throw Error("Cannot decode name (buffer overflow)");
      let d = e[t++];
      if (((u += f ? 0 : 1), d === 0)) break;
      else if ((d & 192) === 0) {
        if (t + d > e.length) throw Error("Cannot decode name (buffer overflow)");
        if (((H += d + 1), H > 254)) throw Error("Cannot decode name (name too long)");
        let _ = e.toString("utf-8", t, t + d);
        if (r) _ = _.replace(/\./g, "\\.");
        (s.push(_), (t += d), (u += f ? 0 : d));
      } else if ((d & 192) === 192) {
        if (t + 1 > e.length) throw Error("Cannot decode name (buffer overflow)");
        let _ = e.readUInt16BE(t - 1) - 49152;
        if (_ >= a) throw Error("Cannot decode name (bad pointer)");
        ((t = _), (a = _), (u += f ? 0 : 1), (f = !0));
      } else throw Error("Cannot decode name (bad label)");
    }
    return ((vc.decode.bytes = u), s.length === 0 ? "." : s.join("."));
  };
  vc.decode.bytes = 0;
  vc.encodingLength = function (e) {
    if (e === "." || e === "..") return 1;
    return Ru.byteLength(e.replace(/^\.|\.$/gm, "")) + 2;
  };
  var Sd = {};
  Sd.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(Sd.encodingLength(e));
    if (!r) r = 0;
    let s = t.write(e, r + 1);
    return ((t[r] = s), (Sd.encode.bytes = s + 1), t);
  };
  Sd.encode.bytes = 0;
  Sd.decode = function (e, t) {
    if (!t) t = 0;
    let r = e[t],
      s = e.toString("utf-8", t + 1, t + 1 + r);
    return ((Sd.decode.bytes = r + 1), s);
  };
  Sd.decode.bytes = 0;
  Sd.encodingLength = function (e) {
    return Ru.byteLength(e) + 1;
  };
  var s7 = {};
  s7.encode = function (e, t, r) {
    if (!t) t = s7.encodingLength(e);
    if (!r) r = 0;
    let s = (e.flags || 0) & 32767,
      a = e.type === "response" ? 32768 : 0;
    return (
      t.writeUInt16BE(e.id || 0, r),
      t.writeUInt16BE(s | a, r + 2),
      t.writeUInt16BE(e.questions.length, r + 4),
      t.writeUInt16BE(e.answers.length, r + 6),
      t.writeUInt16BE(e.authorities.length, r + 8),
      t.writeUInt16BE(e.additionals.length, r + 10),
      t
    );
  };
  s7.encode.bytes = 12;
  s7.decode = function (e, t) {
    if (!t) t = 0;
    if (e.length < 12) throw Error("Header must be 12 bytes");
    let r = e.readUInt16BE(t + 2);
    return {
      id: e.readUInt16BE(t),
      type: r & 32768 ? "response" : "query",
      flags: r & 32767,
      flag_qr: ((r >> 15) & 1) === 1,
      opcode: xTi.toString((r >> 11) & 15),
      flag_aa: ((r >> 10) & 1) === 1,
      flag_tc: ((r >> 9) & 1) === 1,
      flag_rd: ((r >> 8) & 1) === 1,
      flag_ra: ((r >> 7) & 1) === 1,
      flag_z: ((r >> 6) & 1) === 1,
      flag_ad: ((r >> 5) & 1) === 1,
      flag_cd: ((r >> 4) & 1) === 1,
      rcode: MTi.toString(r & 15),
      questions: Array(e.readUInt16BE(t + 4)),
      answers: Array(e.readUInt16BE(t + 6)),
      authorities: Array(e.readUInt16BE(t + 8)),
      additionals: Array(e.readUInt16BE(t + 10)),
    };
  };
  s7.decode.bytes = 12;
  s7.encodingLength = function () {
    return 12;
  };
  var wZ = (ASt.unknown = {});
  wZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(wZ.encodingLength(e));
    if (!r) r = 0;
    return (t.writeUInt16BE(e.length, r), e.copy(t, r + 2), (wZ.encode.bytes = e.length + 2), t);
  };
  wZ.encode.bytes = 0;
  wZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = e.readUInt16BE(t),
      s = e.slice(t + 2, t + 2 + r);
    return ((wZ.decode.bytes = r + 2), s);
  };
  wZ.decode.bytes = 0;
  wZ.encodingLength = function (e) {
    return e.length + 2;
  };
  var kZ = (ASt.ns = {});
  kZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(kZ.encodingLength(e));
    if (!r) r = 0;
    return (
      vc.encode(e, t, r + 2),
      t.writeUInt16BE(vc.encode.bytes, r),
      (kZ.encode.bytes = vc.encode.bytes + 2),
      t
    );
  };
  kZ.encode.bytes = 0;
  kZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = e.readUInt16BE(t),
      s = vc.decode(e, t + 2);
    return ((kZ.decode.bytes = r + 2), s);
  };
  kZ.decode.bytes = 0;
  kZ.encodingLength = function (e) {
    return vc.encodingLength(e) + 2;
  };
  var OZ = (ASt.soa = {});
  OZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(OZ.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      vc.encode(e.mname, t, r),
      (r += vc.encode.bytes),
      vc.encode(e.rname, t, r, { mail: !0 }),
      (r += vc.encode.bytes),
      t.writeUInt32BE(e.serial || 0, r),
      (r += 4),
      t.writeUInt32BE(e.refresh || 0, r),
      (r += 4),
      t.writeUInt32BE(e.retry || 0, r),
      (r += 4),
      t.writeUInt32BE(e.expire || 0, r),
      (r += 4),
      t.writeUInt32BE(e.minimum || 0, r),
      (r += 4),
      t.writeUInt16BE(r - s - 2, s),
      (OZ.encode.bytes = r - s),
      t
    );
  };
  OZ.encode.bytes = 0;
  OZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {};
    return (
      (t += 2),
      (s.mname = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (s.rname = vc.decode(e, t, { mail: !0 })),
      (t += vc.decode.bytes),
      (s.serial = e.readUInt32BE(t)),
      (t += 4),
      (s.refresh = e.readUInt32BE(t)),
      (t += 4),
      (s.retry = e.readUInt32BE(t)),
      (t += 4),
      (s.expire = e.readUInt32BE(t)),
      (t += 4),
      (s.minimum = e.readUInt32BE(t)),
      (t += 4),
      (OZ.decode.bytes = t - r),
      s
    );
  };
  OZ.decode.bytes = 0;
  OZ.encodingLength = function (e) {
    return 22 + vc.encodingLength(e.mname) + vc.encodingLength(e.rname);
  };
  var UZ = (ASt.txt = {});
  UZ.encode = function (e, t, r) {
    if (!Array.isArray(e)) e = [e];
    for (let a = 0; a < e.length; a++) {
      if (typeof e[a] === "string") e[a] = Ru.from(e[a]);
      if (!Ru.isBuffer(e[a])) throw Error("Must be a Buffer");
    }
    if (!t) t = Ru.alloc(UZ.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      e.forEach(function (a) {
        ((t[r++] = a.length), a.copy(t, r, 0, a.length), (r += a.length));
      }),
      t.writeUInt16BE(r - s - 2, s),
      (UZ.encode.bytes = r - s),
      t
    );
  };
  UZ.encode.bytes = 0;
  UZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = e.readUInt16BE(t);
    t += 2;
    let a = [];
    while (s > 0) {
      let H = e[t++];
      if ((--s, s < H)) throw Error("Buffer overflow");
      (a.push(e.slice(t, t + H)), (t += H), (s -= H));
    }
    return ((UZ.decode.bytes = t - r), a);
  };
  UZ.decode.bytes = 0;
  UZ.encodingLength = function (e) {
    if (!Array.isArray(e)) e = [e];
    let t = 2;
    return (
      e.forEach(function (r) {
        if (typeof r === "string") t += Ru.byteLength(r) + 1;
        else t += r.length + 1;
      }),
      t
    );
  };
  var NZ = (ASt.null = {});
  NZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(NZ.encodingLength(e));
    if (!r) r = 0;
    if (typeof e === "string") e = Ru.from(e);
    if (!e) e = Ru.alloc(0);
    let s = r;
    r += 2;
    let a = e.length;
    return (e.copy(t, r, 0, a), (r += a), t.writeUInt16BE(r - s - 2, s), (NZ.encode.bytes = r - s), t);
  };
  NZ.encode.bytes = 0;
  NZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = e.readUInt16BE(t);
    t += 2;
    let a = e.slice(t, t + s);
    return ((t += s), (NZ.decode.bytes = t - r), a);
  };
  NZ.decode.bytes = 0;
  NZ.encodingLength = function (e) {
    if (!e) return 2;
    return (Ru.isBuffer(e) ? e.length : Ru.byteLength(e)) + 2;
  };
  var FZ = (ASt.hinfo = {});
  FZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(FZ.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      Sd.encode(e.cpu, t, r),
      (r += Sd.encode.bytes),
      Sd.encode(e.os, t, r),
      (r += Sd.encode.bytes),
      t.writeUInt16BE(r - s - 2, s),
      (FZ.encode.bytes = r - s),
      t
    );
  };
  FZ.encode.bytes = 0;
  FZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {};
    return (
      (t += 2),
      (s.cpu = Sd.decode(e, t)),
      (t += Sd.decode.bytes),
      (s.os = Sd.decode(e, t)),
      (t += Sd.decode.bytes),
      (FZ.decode.bytes = t - r),
      s
    );
  };
  FZ.decode.bytes = 0;
  FZ.encodingLength = function (e) {
    return Sd.encodingLength(e.cpu) + Sd.encodingLength(e.os) + 2;
  };
  var n7 = (ASt.ptr = {}),
    fIa = (ASt.cname = n7),
    pIa = (ASt.dname = n7);
  n7.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(n7.encodingLength(e));
    if (!r) r = 0;
    return (
      vc.encode(e, t, r + 2),
      t.writeUInt16BE(vc.encode.bytes, r),
      (n7.encode.bytes = vc.encode.bytes + 2),
      t
    );
  };
  n7.encode.bytes = 0;
  n7.decode = function (e, t) {
    if (!t) t = 0;
    let r = vc.decode(e, t + 2);
    return ((n7.decode.bytes = vc.decode.bytes + 2), r);
  };
  n7.decode.bytes = 0;
  n7.encodingLength = function (e) {
    return vc.encodingLength(e) + 2;
  };
  var BZ = (ASt.srv = {});
  BZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(BZ.encodingLength(e));
    if (!r) r = 0;
    (t.writeUInt16BE(e.priority || 0, r + 2),
      t.writeUInt16BE(e.weight || 0, r + 4),
      t.writeUInt16BE(e.port || 0, r + 6),
      vc.encode(e.target, t, r + 8));
    let s = vc.encode.bytes + 6;
    return (t.writeUInt16BE(s, r), (BZ.encode.bytes = s + 2), t);
  };
  BZ.encode.bytes = 0;
  BZ.decode = function (e, t) {
    if (!t) t = 0;
    let r = e.readUInt16BE(t),
      s = {};
    return (
      (s.priority = e.readUInt16BE(t + 2)),
      (s.weight = e.readUInt16BE(t + 4)),
      (s.port = e.readUInt16BE(t + 6)),
      (s.target = vc.decode(e, t + 8)),
      (BZ.decode.bytes = r + 2),
      s
    );
  };
  BZ.decode.bytes = 0;
  BZ.encodingLength = function (e) {
    return 8 + vc.encodingLength(e.target);
  };
  var bN = (ASt.caa = {});
  bN.ISSUER_CRITICAL = 128;
  bN.encode = function (e, t, r) {
    let s = bN.encodingLength(e);
    if (!t) t = Ru.alloc(bN.encodingLength(e));
    if (!r) r = 0;
    if (e.issuerCritical) e.flags = bN.ISSUER_CRITICAL;
    return (
      t.writeUInt16BE(s - 2, r),
      (r += 2),
      t.writeUInt8(e.flags || 0, r),
      (r += 1),
      Sd.encode(e.tag, t, r),
      (r += Sd.encode.bytes),
      t.write(e.value, r),
      (r += Ru.byteLength(e.value)),
      (bN.encode.bytes = s),
      t
    );
  };
  bN.encode.bytes = 0;
  bN.decode = function (e, t) {
    if (!t) t = 0;
    let r = e.readUInt16BE(t);
    t += 2;
    let s = t,
      a = {};
    return (
      (a.flags = e.readUInt8(t)),
      (t += 1),
      (a.tag = Sd.decode(e, t)),
      (t += Sd.decode.bytes),
      (a.value = e.toString("utf-8", t, s + r)),
      (a.issuerCritical = !!(a.flags & bN.ISSUER_CRITICAL)),
      (bN.decode.bytes = r + 2),
      a
    );
  };
  bN.decode.bytes = 0;
  bN.encodingLength = function (e) {
    return Sd.encodingLength(e.tag) + Sd.encodingLength(e.value) + 2;
  };
  var aHe = (ASt.mx = {});
  aHe.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(aHe.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      t.writeUInt16BE(e.preference || 0, r),
      (r += 2),
      vc.encode(e.exchange, t, r),
      (r += vc.encode.bytes),
      t.writeUInt16BE(r - s - 2, s),
      (aHe.encode.bytes = r - s),
      t
    );
  };
  aHe.encode.bytes = 0;
  aHe.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {};
    return (
      (t += 2),
      (s.preference = e.readUInt16BE(t)),
      (t += 2),
      (s.exchange = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (aHe.decode.bytes = t - r),
      s
    );
  };
  aHe.encodingLength = function (e) {
    return 4 + vc.encodingLength(e.exchange);
  };
  var RZ = (ASt.a = {});
  RZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(RZ.encodingLength(e));
    if (!r) r = 0;
    return (t.writeUInt16BE(4, r), (r += 2), w8.v4.encode(e, t, r), (RZ.encode.bytes = 6), t);
  };
  RZ.encode.bytes = 0;
  RZ.decode = function (e, t) {
    if (!t) t = 0;
    t += 2;
    let r = w8.v4.decode(e, t);
    return ((RZ.decode.bytes = 6), r);
  };
  RZ.decode.bytes = 0;
  RZ.encodingLength = function () {
    return 6;
  };
  var WZ = (ASt.aaaa = {});
  WZ.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(WZ.encodingLength(e));
    if (!r) r = 0;
    return (t.writeUInt16BE(16, r), (r += 2), w8.v6.encode(e, t, r), (WZ.encode.bytes = 18), t);
  };
  WZ.encode.bytes = 0;
  WZ.decode = function (e, t) {
    if (!t) t = 0;
    t += 2;
    let r = w8.v6.decode(e, t);
    return ((WZ.decode.bytes = 18), r);
  };
  WZ.decode.bytes = 0;
  WZ.encodingLength = function () {
    return 18;
  };
  var C8 = (ASt.option = {});
  C8.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(C8.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = Ube.toCode(e.code);
    if ((t.writeUInt16BE(a, r), (r += 2), e.data))
      (t.writeUInt16BE(e.data.length, r), (r += 2), e.data.copy(t, r), (r += e.data.length));
    else
      switch (a) {
        case 8:
          let H = e.sourcePrefixLength || 0,
            u = e.family || w8.familyOf(e.ip),
            f = w8.encode(e.ip, Ru.alloc),
            d = Math.ceil(H / 8);
          (t.writeUInt16BE(d + 4, r),
            (r += 2),
            t.writeUInt16BE(u, r),
            (r += 2),
            t.writeUInt8(H, r++),
            t.writeUInt8(e.scopePrefixLength || 0, r++),
            f.copy(t, r, 0, d),
            (r += d));
          break;
        case 11:
          if (e.timeout) (t.writeUInt16BE(2, r), (r += 2), t.writeUInt16BE(e.timeout, r), (r += 2));
          else (t.writeUInt16BE(0, r), (r += 2));
          break;
        case 12:
          let _ = e.length || 0;
          (t.writeUInt16BE(_, r), (r += 2), t.fill(0, r, r + _), (r += _));
          break;
        case 14:
          let L = e.tags.length * 2;
          (t.writeUInt16BE(L, r), (r += 2));
          for (let I of e.tags) (t.writeUInt16BE(I, r), (r += 2));
          break;
        default:
          throw Error(`Unknown roption code: ${e.code}`);
      }
    return ((C8.encode.bytes = r - s), t);
  };
  C8.encode.bytes = 0;
  C8.decode = function (e, t) {
    if (!t) t = 0;
    let r = {};
    ((r.code = e.readUInt16BE(t)), (r.type = Ube.toString(r.code)), (t += 2));
    let s = e.readUInt16BE(t);
    switch (((t += 2), (r.data = e.slice(t, t + s)), r.code)) {
      case 8:
        ((r.family = e.readUInt16BE(t)),
          (t += 2),
          (r.sourcePrefixLength = e.readUInt8(t++)),
          (r.scopePrefixLength = e.readUInt8(t++)));
        let a = Ru.alloc(r.family === 1 ? 4 : 16);
        (e.copy(a, 0, t, t + s - 4), (r.ip = w8.decode(a)));
        break;
      case 11:
        if (s > 0) ((r.timeout = e.readUInt16BE(t)), (t += 2));
        break;
      case 14:
        r.tags = [];
        for (let H = 0; H < s; H += 2) (r.tags.push(e.readUInt16BE(t)), (t += 2));
    }
    return ((C8.decode.bytes = s + 4), r);
  };
  C8.decode.bytes = 0;
  C8.encodingLength = function (e) {
    if (e.data) return e.data.length + 4;
    switch (Ube.toCode(e.code)) {
      case 8:
        let r = e.sourcePrefixLength || 0;
        return Math.ceil(r / 8) + 8;
      case 11:
        return typeof e.timeout === "number" ? 6 : 4;
      case 12:
        return e.length + 4;
      case 14:
        return 4 + e.tags.length * 2;
    }
    throw Error(`Unknown roption code: ${e.code}`);
  };
  var PN = (ASt.opt = {});
  PN.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(PN.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = kbe(e, C8);
    return (t.writeUInt16BE(a, r), (r = PGe(e, C8, t, r + 2)), (PN.encode.bytes = r - s), t);
  };
  PN.encode.bytes = 0;
  PN.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = [],
      a = e.readUInt16BE(t);
    t += 2;
    let H = 0;
    while (a > 0) ((s[H++] = C8.decode(e, t)), (t += C8.decode.bytes), (a -= C8.decode.bytes));
    return ((PN.decode.bytes = t - r), s);
  };
  PN.decode.bytes = 0;
  PN.encodingLength = function (e) {
    return 2 + kbe(e || [], C8);
  };
  var Uw = (ASt.dnskey = {});
  Uw.PROTOCOL_DNSSEC = 3;
  Uw.ZONE_KEY = 128;
  Uw.SECURE_ENTRYPOINT = 32768;
  Uw.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(Uw.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = e.key;
    if (!Ru.isBuffer(a)) throw Error("Key must be a Buffer");
    return (
      (r += 2),
      t.writeUInt16BE(e.flags, r),
      (r += 2),
      t.writeUInt8(Uw.PROTOCOL_DNSSEC, r),
      (r += 1),
      t.writeUInt8(e.algorithm, r),
      (r += 1),
      a.copy(t, r, 0, a.length),
      (r += a.length),
      (Uw.encode.bytes = r - s),
      t.writeUInt16BE(Uw.encode.bytes - 2, s),
      t
    );
  };
  Uw.encode.bytes = 0;
  Uw.decode = function (e, t) {
    if (!t) t = 0;
    let r = t;
    var s = {},
      a = e.readUInt16BE(t);
    if (((t += 2), (s.flags = e.readUInt16BE(t)), (t += 2), e.readUInt8(t) !== Uw.PROTOCOL_DNSSEC))
      throw Error("Protocol must be 3");
    return (
      (t += 1),
      (s.algorithm = e.readUInt8(t)),
      (t += 1),
      (s.key = e.slice(t, r + a + 2)),
      (t += s.key.length),
      (Uw.decode.bytes = t - r),
      s
    );
  };
  Uw.decode.bytes = 0;
  Uw.encodingLength = function (e) {
    return 6 + Ru.byteLength(e.key);
  };
  var HX = (ASt.rrsig = {});
  HX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(HX.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = e.signature;
    if (!Ru.isBuffer(a)) throw Error("Signature must be a Buffer");
    return (
      (r += 2),
      t.writeUInt16BE(_T.toType(e.typeCovered), r),
      (r += 2),
      t.writeUInt8(e.algorithm, r),
      (r += 1),
      t.writeUInt8(e.labels, r),
      (r += 1),
      t.writeUInt32BE(e.originalTTL, r),
      (r += 4),
      t.writeUInt32BE(e.expiration, r),
      (r += 4),
      t.writeUInt32BE(e.inception, r),
      (r += 4),
      t.writeUInt16BE(e.keyTag, r),
      (r += 2),
      vc.encode(e.signersName, t, r),
      (r += vc.encode.bytes),
      a.copy(t, r, 0, a.length),
      (r += a.length),
      (HX.encode.bytes = r - s),
      t.writeUInt16BE(HX.encode.bytes - 2, s),
      t
    );
  };
  HX.encode.bytes = 0;
  HX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t;
    var s = {},
      a = e.readUInt16BE(t);
    return (
      (t += 2),
      (s.typeCovered = _T.toString(e.readUInt16BE(t))),
      (t += 2),
      (s.algorithm = e.readUInt8(t)),
      (t += 1),
      (s.labels = e.readUInt8(t)),
      (t += 1),
      (s.originalTTL = e.readUInt32BE(t)),
      (t += 4),
      (s.expiration = e.readUInt32BE(t)),
      (t += 4),
      (s.inception = e.readUInt32BE(t)),
      (t += 4),
      (s.keyTag = e.readUInt16BE(t)),
      (t += 2),
      (s.signersName = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (s.signature = e.slice(t, r + a + 2)),
      (t += s.signature.length),
      (HX.decode.bytes = t - r),
      s
    );
  };
  HX.decode.bytes = 0;
  HX.encodingLength = function (e) {
    return 20 + vc.encodingLength(e.signersName) + Ru.byteLength(e.signature);
  };
  var cX = (ASt.rp = {});
  cX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(cX.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      vc.encode(e.mbox || ".", t, r, { mail: !0 }),
      (r += vc.encode.bytes),
      vc.encode(e.txt || ".", t, r),
      (r += vc.encode.bytes),
      (cX.encode.bytes = r - s),
      t.writeUInt16BE(cX.encode.bytes - 2, s),
      t
    );
  };
  cX.encode.bytes = 0;
  cX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {};
    return (
      (t += 2),
      (s.mbox = vc.decode(e, t, { mail: !0 }) || "."),
      (t += vc.decode.bytes),
      (s.txt = vc.decode(e, t) || "."),
      (t += vc.decode.bytes),
      (cX.decode.bytes = t - r),
      s
    );
  };
  cX.decode.bytes = 0;
  cX.encodingLength = function (e) {
    return 2 + vc.encodingLength(e.mbox || ".") + vc.encodingLength(e.txt || ".");
  };
  var mT = {};
  mT.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(mT.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    var a = [];
    for (var H = 0; H < e.length; H++) {
      var u = _T.toType(e[H]);
      if (a[u >> 8] === void 0) a[u >> 8] = [];
      a[u >> 8][(u >> 3) & 31] |= 1 << (7 - (u & 7));
    }
    for (H = 0; H < a.length; H++)
      if (a[H] !== void 0) {
        var f = Ru.from(a[H]);
        (t.writeUInt8(H, r), (r += 1), t.writeUInt8(f.length, r), (r += 1), f.copy(t, r), (r += f.length));
      }
    return ((mT.encode.bytes = r - s), t);
  };
  mT.encode.bytes = 0;
  mT.decode = function (e, t, r) {
    if (!t) t = 0;
    let s = t;
    var a = [];
    while (t - s < r) {
      var H = e.readUInt8(t);
      t += 1;
      var u = e.readUInt8(t);
      t += 1;
      for (var f = 0; f < u; f++) {
        var d = e.readUInt8(t + f);
        for (var _ = 0; _ < 8; _++)
          if (d & (1 << (7 - _))) {
            var L = _T.toString((H << 8) | (f << 3) | _);
            a.push(L);
          }
      }
      t += u;
    }
    return ((mT.decode.bytes = t - s), a);
  };
  mT.decode.bytes = 0;
  mT.encodingLength = function (e) {
    var t = [];
    for (var r = 0; r < e.length; r++) {
      var s = _T.toType(e[r]);
      t[s >> 8] = Math.max(t[s >> 8] || 0, s & 255);
    }
    var a = 0;
    for (r = 0; r < t.length; r++) if (t[r] !== void 0) a += 2 + Math.ceil((t[r] + 1) / 8);
    return a;
  };
  var AX = (ASt.nsec = {});
  AX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(AX.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      vc.encode(e.nextDomain, t, r),
      (r += vc.encode.bytes),
      mT.encode(e.rrtypes, t, r),
      (r += mT.encode.bytes),
      (AX.encode.bytes = r - s),
      t.writeUInt16BE(AX.encode.bytes - 2, s),
      t
    );
  };
  AX.encode.bytes = 0;
  AX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t;
    var s = {},
      a = e.readUInt16BE(t);
    return (
      (t += 2),
      (s.nextDomain = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (s.rrtypes = mT.decode(e, t, a - (t - r))),
      (t += mT.decode.bytes),
      (AX.decode.bytes = t - r),
      s
    );
  };
  AX.decode.bytes = 0;
  AX.encodingLength = function (e) {
    return 2 + vc.encodingLength(e.nextDomain) + mT.encodingLength(e.rrtypes);
  };
  var uX = (ASt.nsec3 = {});
  uX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(uX.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = e.salt;
    if (!Ru.isBuffer(a)) throw Error("salt must be a Buffer");
    let H = e.nextDomain;
    if (!Ru.isBuffer(H)) throw Error("nextDomain must be a Buffer");
    return (
      (r += 2),
      t.writeUInt8(e.algorithm, r),
      (r += 1),
      t.writeUInt8(e.flags, r),
      (r += 1),
      t.writeUInt16BE(e.iterations, r),
      (r += 2),
      t.writeUInt8(a.length, r),
      (r += 1),
      a.copy(t, r, 0, a.length),
      (r += a.length),
      t.writeUInt8(H.length, r),
      (r += 1),
      H.copy(t, r, 0, H.length),
      (r += H.length),
      mT.encode(e.rrtypes, t, r),
      (r += mT.encode.bytes),
      (uX.encode.bytes = r - s),
      t.writeUInt16BE(uX.encode.bytes - 2, s),
      t
    );
  };
  uX.encode.bytes = 0;
  uX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t;
    var s = {},
      a = e.readUInt16BE(t);
    ((t += 2),
      (s.algorithm = e.readUInt8(t)),
      (t += 1),
      (s.flags = e.readUInt8(t)),
      (t += 1),
      (s.iterations = e.readUInt16BE(t)),
      (t += 2));
    let H = e.readUInt8(t);
    ((t += 1), (s.salt = e.slice(t, t + H)), (t += H));
    let u = e.readUInt8(t);
    return (
      (t += 1),
      (s.nextDomain = e.slice(t, t + u)),
      (t += u),
      (s.rrtypes = mT.decode(e, t, a - (t - r))),
      (t += mT.decode.bytes),
      (uX.decode.bytes = t - r),
      s
    );
  };
  uX.decode.bytes = 0;
  uX.encodingLength = function (e) {
    return 8 + e.salt.length + e.nextDomain.length + mT.encodingLength(e.rrtypes);
  };
  var lX = (ASt.ds = {});
  lX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(lX.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = e.digest;
    if (!Ru.isBuffer(a)) throw Error("Digest must be a Buffer");
    return (
      (r += 2),
      t.writeUInt16BE(e.keyTag, r),
      (r += 2),
      t.writeUInt8(e.algorithm, r),
      (r += 1),
      t.writeUInt8(e.digestType, r),
      (r += 1),
      a.copy(t, r, 0, a.length),
      (r += a.length),
      (lX.encode.bytes = r - s),
      t.writeUInt16BE(lX.encode.bytes - 2, s),
      t
    );
  };
  lX.encode.bytes = 0;
  lX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t;
    var s = {},
      a = e.readUInt16BE(t);
    return (
      (t += 2),
      (s.keyTag = e.readUInt16BE(t)),
      (t += 2),
      (s.algorithm = e.readUInt8(t)),
      (t += 1),
      (s.digestType = e.readUInt8(t)),
      (t += 1),
      (s.digest = e.slice(t, r + a + 2)),
      (t += s.digest.length),
      (lX.decode.bytes = t - r),
      s
    );
  };
  lX.decode.bytes = 0;
  lX.encodingLength = function (e) {
    return 6 + Ru.byteLength(e.digest);
  };
  var jN = (ASt.sshfp = {});
  jN.getFingerprintLengthForHashType = function (t) {
    switch (t) {
      case 1:
        return 20;
      case 2:
        return 32;
    }
  };
  jN.encode = function (t, r, s) {
    if (!r) r = Ru.alloc(jN.encodingLength(t));
    if (!s) s = 0;
    let a = s;
    ((s += 2), (r[s] = t.algorithm), (s += 1), (r[s] = t.hash), (s += 1));
    let H = Ru.from(t.fingerprint.toUpperCase(), "hex");
    if (H.length !== jN.getFingerprintLengthForHashType(t.hash)) throw Error("Invalid fingerprint length");
    return (
      H.copy(r, s),
      (s += H.byteLength),
      (jN.encode.bytes = s - a),
      r.writeUInt16BE(jN.encode.bytes - 2, a),
      r
    );
  };
  jN.encode.bytes = 0;
  jN.decode = function (t, r) {
    if (!r) r = 0;
    let s = r,
      a = {};
    ((r += 2), (a.algorithm = t[r]), (r += 1), (a.hash = t[r]), (r += 1));
    let H = jN.getFingerprintLengthForHashType(a.hash);
    return (
      (a.fingerprint = t
        .slice(r, r + H)
        .toString("hex")
        .toUpperCase()),
      (r += H),
      (jN.decode.bytes = r - s),
      a
    );
  };
  jN.decode.bytes = 0;
  jN.encodingLength = function (e) {
    return 4 + Ru.from(e.fingerprint, "hex").byteLength;
  };
  var fX = (ASt.naptr = {});
  fX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(fX.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      (r += 2),
      t.writeUInt16BE(e.order || 0, r),
      (r += 2),
      t.writeUInt16BE(e.preference || 0, r),
      (r += 2),
      Sd.encode(e.flags, t, r),
      (r += Sd.encode.bytes),
      Sd.encode(e.services, t, r),
      (r += Sd.encode.bytes),
      Sd.encode(e.regexp, t, r),
      (r += Sd.encode.bytes),
      vc.encode(e.replacement, t, r),
      (r += vc.encode.bytes),
      (fX.encode.bytes = r - s),
      t.writeUInt16BE(fX.encode.bytes - 2, s),
      t
    );
  };
  fX.encode.bytes = 0;
  fX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {};
    return (
      (t += 2),
      (s.order = e.readUInt16BE(t)),
      (t += 2),
      (s.preference = e.readUInt16BE(t)),
      (t += 2),
      (s.flags = Sd.decode(e, t)),
      (t += Sd.decode.bytes),
      (s.services = Sd.decode(e, t)),
      (t += Sd.decode.bytes),
      (s.regexp = Sd.decode(e, t)),
      (t += Sd.decode.bytes),
      (s.replacement = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (fX.decode.bytes = t - r),
      s
    );
  };
  fX.decode.bytes = 0;
  fX.encodingLength = function (e) {
    return (
      Sd.encodingLength(e.flags) +
      Sd.encodingLength(e.services) +
      Sd.encodingLength(e.regexp) +
      vc.encodingLength(e.replacement) +
      6
    );
  };
  var pX = (ASt.tlsa = {});
  pX.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(pX.encodingLength(e));
    if (!r) r = 0;
    let s = r,
      a = e.certificate;
    if (!Ru.isBuffer(a)) throw Error("Certificate must be a Buffer");
    return (
      (r += 2),
      t.writeUInt8(e.usage, r),
      (r += 1),
      t.writeUInt8(e.selector, r),
      (r += 1),
      t.writeUInt8(e.matchingType, r),
      (r += 1),
      a.copy(t, r, 0, a.length),
      (r += a.length),
      (pX.encode.bytes = r - s),
      t.writeUInt16BE(pX.encode.bytes - 2, s),
      t
    );
  };
  pX.encode.bytes = 0;
  pX.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {},
      a = e.readUInt16BE(t);
    return (
      (t += 2),
      (s.usage = e.readUInt8(t)),
      (t += 1),
      (s.selector = e.readUInt8(t)),
      (t += 1),
      (s.matchingType = e.readUInt8(t)),
      (t += 1),
      (s.certificate = e.slice(t, r + a + 2)),
      (t += s.certificate.length),
      (pX.decode.bytes = t - r),
      s
    );
  };
  pX.decode.bytes = 0;
  pX.encodingLength = function (e) {
    return 5 + Ru.byteLength(e.certificate);
  };
  var b0r = (ASt.record = function (e) {
      switch (e.toUpperCase()) {
        case "A":
          return RZ;
        case "PTR":
          return n7;
        case "CNAME":
          return fIa;
        case "DNAME":
          return pIa;
        case "TXT":
          return UZ;
        case "NULL":
          return NZ;
        case "AAAA":
          return WZ;
        case "SRV":
          return BZ;
        case "HINFO":
          return FZ;
        case "CAA":
          return bN;
        case "NS":
          return kZ;
        case "SOA":
          return OZ;
        case "MX":
          return aHe;
        case "OPT":
          return PN;
        case "DNSKEY":
          return Uw;
        case "RRSIG":
          return HX;
        case "RP":
          return cX;
        case "NSEC":
          return AX;
        case "NSEC3":
          return uX;
        case "SSHFP":
          return jN;
        case "DS":
          return lX;
        case "NAPTR":
          return fX;
        case "TLSA":
          return pX;
      }
      return wZ;
    }),
    cb = (ASt.answer = {});
  cb.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(cb.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    if (
      (vc.encode(e.name, t, r),
      (r += vc.encode.bytes),
      t.writeUInt16BE(_T.toType(e.type), r),
      e.type.toUpperCase() === "OPT")
    ) {
      if (e.name !== ".") throw Error("OPT name must be root.");
      (t.writeUInt16BE(e.udpPayloadSize || 4096, r + 2),
        t.writeUInt8(e.extendedRcode || 0, r + 4),
        t.writeUInt8(e.ednsVersion || 0, r + 5),
        t.writeUInt16BE(e.flags || 0, r + 6),
        (r += 8),
        PN.encode(e.options || [], t, r),
        (r += PN.encode.bytes));
    } else {
      let a = HHe.toClass(e.class === void 0 ? "IN" : e.class);
      if (e.flush) a |= 32768;
      (t.writeUInt16BE(a, r + 2), t.writeUInt32BE(e.ttl || 0, r + 4), (r += 8));
      let H = b0r(e.type);
      (H.encode(e.data, t, r), (r += H.encode.bytes));
    }
    return ((cb.encode.bytes = r - s), t);
  };
  cb.encode.bytes = 0;
  cb.decode = function (e, t) {
    if (!t) t = 0;
    let r = {},
      s = t;
    if (
      ((r.name = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (r.type = _T.toString(e.readUInt16BE(t))),
      r.type === "OPT")
    )
      ((r.udpPayloadSize = e.readUInt16BE(t + 2)),
        (r.extendedRcode = e.readUInt8(t + 4)),
        (r.ednsVersion = e.readUInt8(t + 5)),
        (r.flags = e.readUInt16BE(t + 6)),
        (r.flag_do = ((r.flags >> 15) & 1) === 1),
        (r.options = PN.decode(e, t + 8)),
        (t += 8 + PN.decode.bytes));
    else {
      let a = e.readUInt16BE(t + 2);
      ((r.ttl = e.readUInt32BE(t + 4)), (r.class = HHe.toString(a & -32769)), (r.flush = !!(a & 32768)));
      let H = b0r(r.type);
      ((r.data = H.decode(e, t + 8)), (t += 8 + H.decode.bytes));
    }
    return ((cb.decode.bytes = t - s), r);
  };
  cb.decode.bytes = 0;
  cb.encodingLength = function (e) {
    let t = e.data !== null && e.data !== void 0 ? e.data : e.options;
    return vc.encodingLength(e.name) + 8 + b0r(e.type).encodingLength(t);
  };
  var i7 = (ASt.question = {});
  i7.encode = function (e, t, r) {
    if (!t) t = Ru.alloc(i7.encodingLength(e));
    if (!r) r = 0;
    let s = r;
    return (
      vc.encode(e.name, t, r),
      (r += vc.encode.bytes),
      t.writeUInt16BE(_T.toType(e.type), r),
      (r += 2),
      t.writeUInt16BE(HHe.toClass(e.class === void 0 ? "IN" : e.class), r),
      (r += 2),
      (i7.encode.bytes = r - s),
      e
    );
  };
  i7.encode.bytes = 0;
  i7.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = {};
    if (
      ((s.name = vc.decode(e, t)),
      (t += vc.decode.bytes),
      (s.type = _T.toString(e.readUInt16BE(t))),
      (t += 2),
      (s.class = HHe.toString(e.readUInt16BE(t))),
      (t += 2),
      !!(s.class & 32768))
    )
      s.class &= -32769;
    return ((i7.decode.bytes = t - r), s);
  };
  i7.decode.bytes = 0;
  i7.encodingLength = function (e) {
    return vc.encodingLength(e.name) + 4;
  };
  ASt.AUTHORITATIVE_ANSWER = 1024;
  ASt.TRUNCATED_RESPONSE = 512;
  ASt.RECURSION_DESIRED = 256;
  ASt.RECURSION_AVAILABLE = 128;
  ASt.AUTHENTIC_DATA = 32;
  ASt.CHECKING_DISABLED = 16;
  ASt.DNSSEC_OK = 32768;
  ASt.encode = function (e, t, r) {
    let s = !t;
    if (s) t = Ru.alloc(ASt.encodingLength(e));
    if (!r) r = 0;
    let a = r;
    if (!e.questions) e.questions = [];
    if (!e.answers) e.answers = [];
    if (!e.authorities) e.authorities = [];
    if (!e.additionals) e.additionals = [];
    if (
      (s7.encode(e, t, r),
      (r += s7.encode.bytes),
      (r = PGe(e.questions, i7, t, r)),
      (r = PGe(e.answers, cb, t, r)),
      (r = PGe(e.authorities, cb, t, r)),
      (r = PGe(e.additionals, cb, t, r)),
      (ASt.encode.bytes = r - a),
      s && ASt.encode.bytes !== t.length)
    )
      return t.slice(0, ASt.encode.bytes);
    return t;
  };
  ASt.encode.bytes = 0;
  ASt.decode = function (e, t) {
    if (!t) t = 0;
    let r = t,
      s = s7.decode(e, t);
    return (
      (t += s7.decode.bytes),
      (t = cSt(s.questions, i7, e, t)),
      (t = cSt(s.answers, cb, e, t)),
      (t = cSt(s.authorities, cb, e, t)),
      (t = cSt(s.additionals, cb, e, t)),
      (ASt.decode.bytes = t - r),
      s
    );
  };
  ASt.decode.bytes = 0;
  ASt.encodingLength = function (e) {
    return (
      s7.encodingLength(e) +
      kbe(e.questions || [], i7) +
      kbe(e.answers || [], cb) +
      kbe(e.authorities || [], cb) +
      kbe(e.additionals || [], cb)
    );
  };
  ASt.streamEncode = function (e) {
    let t = ASt.encode(e),
      r = Ru.alloc(2);
    r.writeUInt16BE(t.byteLength);
    let s = Ru.concat([r, t]);
    return ((ASt.streamEncode.bytes = s.byteLength), s);
  };
  ASt.streamEncode.bytes = 0;
  ASt.streamDecode = function (e) {
    let t = e.readUInt16BE(0);
    if (e.byteLength < t + 2) return null;
    let r = ASt.decode(e.slice(2));
    return ((ASt.streamDecode.bytes = ASt.decode.bytes), r);
  };
  ASt.streamDecode.bytes = 0;
  function kbe(e, t) {
    let r = 0;
    for (let s = 0; s < e.length; s++) r += t.encodingLength(e[s]);
    return r;
  }
  function PGe(e, t, r, s) {
    for (let a = 0; a < e.length; a++) (t.encode(e[a], r, s), (s += t.encode.bytes));
    return s;
  }
  function cSt(e, t, r, s) {
    for (let a = 0; a < e.length; a++) ((e[a] = t.decode(r, s)), (s += t.decode.bytes));
    return s;
  }
});