
var elt = "~effect/time/DateTime",
  tlt = "~effect/time/DateTime/TimeZone",
  nsn,
  YUs,
  wuH,
  isn,
  kuH,
  OuH,
  J2e = (e) => Ma(e, elt),
  HQt = (e) => Ma(e, tlt),
  ssn = (e) => e._tag === "Utc",
  osn,
  asn,
  rlt = (e) => {
    let t = Object.create(YUs);
    return (
      (t.epochMilliseconds = e),
      Object.defineProperty(t, "partsUtc", { value: void 0, enumerable: !1, writable: !0 }),
      t
    );
  },
  Pye = (e) => {
    let t = e.getTime();
    if (Number.isNaN(t)) throw new Fin("Invalid date");
    return rlt(t);
  },
  cQt = (e) => {
    if (J2e(e)) return e;
    else if (e instanceof Date) return Pye(e);
    else if (typeof e === "object") {
      if ("epochMilliseconds" in e) return rlt(e.epochMilliseconds);
      let t = new Date(0);
      return (eNs(t, e), Pye(t));
    } else if (typeof e === "string" && !ZUs(e)) return Pye(new Date(e + "Z"));
    return Pye(new Date(e));
  },
  ZUs = (e) => /Z|GMT|[+-]\d{2}$|[+-]\d{2}:?\d{2}$|\]$/.test(e),
  Hsn,
  csn,
  Asn,
  usn = (e) => rlt(e.epochMilliseconds),
  K2e = (e) => new Date(e.epochMilliseconds),
  AQt = (e) => {
    if (e._tag === "Utc") return new Date(e.epochMilliseconds);
    else if (e.zone._tag === "Offset") return new Date(e.epochMilliseconds + e.zone.offset);
    else if (e.adjustedEpochMilliseconds !== void 0) return new Date(e.adjustedEpochMilliseconds);
    let t = e.zone.format.formatToParts(e.epochMilliseconds).filter((s) => s.type !== "literal"),
      r = new Date(0);
    return (
      r.setUTCFullYear(Number(t[2].value), Number(t[0].value) - 1, Number(t[1].value)),
      r.setUTCHours(Number(t[3].value), Number(t[4].value), Number(t[5].value), Number(t[6].value)),
      (e.adjustedEpochMilliseconds = r.getTime()),
      r
    );
  },
  lsn = (e) => AQt(e).getTime() - uQt(e),
  fsn = (e) => {
    let t = Math.abs(e),
      r = Math.floor(t / 3600000),
      s = Math.round((t % 3600000) / 60000);
    if (s === 60) ((r += 1), (s = 0));
    return `${e < 0 ? "-" : "+"}${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  },
  psn = (e) => fsn(lsn(e)),
  uQt = (e) => e.epochMilliseconds,
  eNs = (e, t) => {
    if (t.year !== void 0) e.setUTCFullYear(t.year);
    if (t.month !== void 0) e.setUTCMonth(t.month - 1);
    if (t.day !== void 0) e.setUTCDate(t.day);
    if (t.weekDay !== void 0) {
      let r = t.weekDay - e.getUTCDay();
      e.setUTCDate(e.getUTCDate() + r);
    }
    if (t.hour !== void 0) e.setUTCHours(t.hour);
    if (t.minute !== void 0) e.setUTCMinutes(t.minute);
    if (t.second !== void 0) e.setUTCSeconds(t.second);
    if (t.millisecond !== void 0) e.setUTCMilliseconds(t.millisecond);
  },
  dsn = (e) => K2e(e).toISOString(),
  aQt = (e) => {
    let t = AQt(e);
    return e._tag === "Utc" ? t.toISOString() : `${t.toISOString().slice(0, -1)}${psn(e)}`;
  },
  msn = (e) => (e.zone._tag === "Offset" ? aQt(e) : `${aQt(e)}[${e.zone.id}]`);