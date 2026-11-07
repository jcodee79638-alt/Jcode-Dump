
var JDa = () => {
  let e = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" },
  };
  function t(H) {
    return e[H] ?? null;
  }
  let r = {
      regex: "input",
      email: "email address",
      url: "URL",
      emoji: "emoji",
      uuid: "UUID",
      uuidv4: "UUIDv4",
      uuidv6: "UUIDv6",
      nanoid: "nanoid",
      guid: "GUID",
      cuid: "cuid",
      cuid2: "cuid2",
      ulid: "ULID",
      xid: "XID",
      ksuid: "KSUID",
      datetime: "ISO datetime",
      date: "ISO date",
      time: "ISO time",
      duration: "ISO duration",
      ipv4: "IPv4 address",
      ipv6: "IPv6 address",
      mac: "MAC address",
      cidrv4: "IPv4 range",
      cidrv6: "IPv6 range",
      base64: "base64-encoded string",
      base64url: "base64url-encoded string",
      json_string: "JSON string",
      e164: "E.164 number",
      currency_code: "currency code",
      credit_card: "credit card number",
      iban: "IBAN",
      jwt: "JWT",
      template_literal: "input",
    },
    s = { nan: "NaN" };
  function a(H, u) {
    if (H === "number" && typeof u === "number" && !Number.isFinite(u)) return String(u);
    return s[H] ?? H;
  }
  return (H) => {
    switch (H.code) {
      case "invalid_type": {
        let u = a(H.expected),
          f = Cvi(H.input),
          d = a(f, H.input);
        return `Invalid input: expected ${u}, received ${d}`;
      }
      case "invalid_value":
        if (H.values.length === 1) return `Invalid input: expected ${Q0r(H.values[0])}`;
        return `Invalid option: expected one of ${J0r(H.values, "|")}`;
      case "too_big": {
        let u = H.exact ? "exactly " : H.inclusive ? "<=" : "<",
          f = t(H.origin);
        if (f)
          return `Too big: expected ${H.origin ?? "value"} to have ${u}${H.maximum.toString()} ${f.unit ?? "elements"}`;
        return `Too big: expected ${H.origin ?? "value"} to be ${u}${H.maximum.toString()}`;
      }
      case "too_small": {
        let u = H.exact ? "exactly " : H.inclusive ? ">=" : ">",
          f = t(H.origin);
        if (f) return `Too small: expected ${H.origin} to have ${u}${H.minimum.toString()} ${f.unit}`;
        return `Too small: expected ${H.origin} to be ${u}${H.minimum.toString()}`;
      }
      case "invalid_format": {
        let u = H;
        if (u.format === "starts_with") return `Invalid string: must start with "${u.prefix}"`;
        if (u.format === "ends_with") return `Invalid string: must end with "${u.suffix}"`;
        if (u.format === "includes") return `Invalid string: must include "${u.includes}"`;
        if (u.format === "regex") return `Invalid string: must match pattern ${u.pattern}`;
        return `Invalid ${r[u.format] ?? H.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${H.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${H.keys.length > 1 ? "s" : ""}: ${J0r(H.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${H.origin}`;
      case "invalid_union":
        if (H.options && Array.isArray(H.options) && H.options.length > 0)
          return `Invalid discriminator value. Expected ${H.options.map((f) => `'${f}'`).join(" | ")}`;
        if (H.inclusive === !1) return "Invalid input: more than one option matched";
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${H.origin}`;
      default:
        return "Invalid input";
    }
  };
};