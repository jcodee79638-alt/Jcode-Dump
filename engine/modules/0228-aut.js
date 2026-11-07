
var aut = "~effect/time/Duration",
  grn,
  JOs,
  KOs,
  Hut = (e) => BigInt(e < 0 ? Math.ceil(e - 0.5) : Math.floor(e + 0.5)),
  Ern = (e) => Hut(e * 1e6),
  _rn = (e, t) => (e.includes(".") ? Hut(Number(e) * Number(t)) : BigInt(e) * t),
  zOs,
  Ag = (e) => {
    switch (typeof e) {
      case "number":
        return UC(e);
      case "bigint":
        return spe(e);
      case "string": {
        if (e === "Infinity") return SU;
        if (e === "-Infinity") return dye;
        let t = zOs.exec(e);
        if (!t) break;
        let [r, s, a] = t;
        if (a === "nano" || a === "nanos") return spe(_rn(s, JOs));
        if (a === "micro" || a === "micros") return spe(_rn(s, KOs));
        let H = Number(s);
        switch (a) {
          case "milli":
          case "millis":
            return UC(H);
          case "second":
          case "seconds":
            return Pv(H);
          case "minute":
          case "minutes":
            return Hie(H);
          case "hour":
          case "hours":
            return cut(H);
          case "day":
          case "days":
            return BKt(H);
          case "week":
          case "weeks":
            return eUs(H);
        }
        break;
      }
      case "object": {
        if (e === null) break;
        if (aut in e) return e;
        if (Array.isArray(e)) {
          if (e.length !== 2 || !e.every(zFe)) return hrn(e);
          if (Number.isNaN(e[0]) || Number.isNaN(e[1])) return xU;
          if (e[0] === -1 / 0 || e[1] === -1 / 0) return dye;
          if (e[0] === 1 / 0 || e[1] === 1 / 0) return SU;
          return OC(Hut(e[0] * 1e9 + e[1]));
        }
        let t = e,
          r = 0;
        if (t.weeks) r += t.weeks * 604800000;
        if (t.days) r += t.days * 86400000;
        if (t.hours) r += t.hours * 3600000;
        if (t.minutes) r += t.minutes * 60000;
        if (t.seconds) r += t.seconds * 1000;
        if (t.milliseconds) r += t.milliseconds;
        if (!t.microseconds && !t.nanoseconds) return OC(r);
        return OC(Hut(r * 1e6 + (t.microseconds ?? 0) * 1000 + (t.nanoseconds ?? 0)));
      }
    }
    return hrn(e);
  },
  hrn = (e) => {
    throw Error(`Invalid Input: ${e}`);
  },
  Lrn,
  QOs,
  YOs,
  ZOs,
  OC = (e) => {
    let t = Object.create(ZOs);
    if (typeof e === "number")
      if (isNaN(e) || e === 0 || Object.is(e, -0)) t.value = Lrn;
      else if (!Number.isFinite(e)) t.value = e > 0 ? QOs : YOs;
      else if (!Number.isInteger(e)) t.value = { _tag: "Nanos", nanos: Ern(e) };
      else t.value = { _tag: "Millis", millis: e };
    else if (e === grn) t.value = Lrn;
    else t.value = { _tag: "Nanos", nanos: e };
    return t;
  },
  FKt = (e) => Ma(e, aut),
  Wq = (e) => e.value._tag !== "Infinity" && e.value._tag !== "NegativeInfinity",
  I2e = (e) => {
    switch (e.value._tag) {
      case "Millis":
        return e.value.millis === 0;
      case "Nanos":
        return e.value.nanos === grn;
      case "Infinity":
      case "NegativeInfinity":
        return !1;
    }
  },
  xU,
  SU,
  dye,
  spe = (e) => OC(e),
  UC = (e) => OC(e),
  Pv = (e) => OC(e * 1000),
  Hie = (e) => OC(e * 60000),
  cut = (e) => OC(e * 3600000),
  BKt = (e) => OC(e * 86400000),
  eUs = (e) => OC(e * 604800000),
  $E = (e) =>
    Irn(Ag(e), {
      onMillis: Za,
      onNanos: (t) => Number(t) / 1e6,
      onInfinity: () => 1 / 0,
      onNegativeInfinity: () => -1 / 0,
    }),
  Aut = (e) =>
    Irn(Ag(e), {
      onMillis: (t) => t / 1000,
      onNanos: (t) => Number(t) / 1e9,
      onInfinity: () => 1 / 0,
      onNegativeInfinity: () => -1 / 0,
    }),
  $rn = (e) => {
    let t = Ag(e);
    switch (t.value._tag) {
      case "Infinity":
      case "NegativeInfinity":
        throw Error("Cannot convert infinite duration to nanos");
      case "Nanos":
        return t.value.nanos;
      case "Millis":
        return Ern(t.value.millis);
    }
  },
  Irn,
  RKt,
  Drn,
  WKt = (e, t) =>
    RKt(e, t, {
      onMillis: (r, s) => r === s,
      onNanos: (r, s) => r === s,
      onInfinity: (r, s) => r.value._tag === s.value._tag,
    }),
  yrn,
  VKt,
  Mrn,
  tUs;