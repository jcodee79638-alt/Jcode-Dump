
var FKi,
  BKi,
  RKi = (e, t, r) => {
    switch (e) {
      case "now":
        return Date.now();
      case "parse":
        return Date.parse(vd(t[0]));
      case "UTC":
        return Date.UTC(...t.map((s) => a$e(s)));
      default:
        throw new is(`Date.${e} is not available in CodeMode.`, r);
    }
  },
  WKi = (e, t, r) => {
    let s = new Date(e.time);
    switch (t) {
      case "getTime":
      case "valueOf":
        return e.time;
      case "toISOString":
        if (!Number.isFinite(e.time)) throw new is("Invalid time value.", r);
        return s.toISOString();
      case "toJSON":
        return Number.isFinite(e.time) ? s.toISOString() : null;
      case "toString":
        return vd(e);
      case "getFullYear":
        return s.getFullYear();
      case "getMonth":
        return s.getMonth();
      case "getDate":
        return s.getDate();
      case "getDay":
        return s.getDay();
      case "getHours":
        return s.getHours();
      case "getMinutes":
        return s.getMinutes();
      case "getSeconds":
        return s.getSeconds();
      case "getMilliseconds":
        return s.getMilliseconds();
      case "getUTCFullYear":
        return s.getUTCFullYear();
      case "getUTCMonth":
        return s.getUTCMonth();
      case "getUTCDate":
        return s.getUTCDate();
      case "getUTCDay":
        return s.getUTCDay();
      case "getUTCHours":
        return s.getUTCHours();
      case "getUTCMinutes":
        return s.getUTCMinutes();
      case "getUTCSeconds":
        return s.getUTCSeconds();
      case "getUTCMilliseconds":
        return s.getUTCMilliseconds();
      case "getTimezoneOffset":
        return s.getTimezoneOffset();
      default:
        throw new is(`Date method '${t}' is not available in CodeMode.`, r);
    }
  };