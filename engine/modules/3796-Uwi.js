
function Uwi(e, t) {
  let r = { type: "string" };
  if (e.checks)
    for (let s of e.checks)
      switch (s.kind) {
        case "min":
          r.minLength = typeof r.minLength === "number" ? Math.max(r.minLength, s.value) : s.value;
          break;
        case "max":
          r.maxLength = typeof r.maxLength === "number" ? Math.min(r.maxLength, s.value) : s.value;
          break;
        case "email":
          switch (t.emailStrategy) {
            case "format:email":
              u7(r, "email", s.message, t);
              break;
            case "format:idn-email":
              u7(r, "idn-email", s.message, t);
              break;
            case "pattern:zod":
              Bw(r, A7.email, s.message, t);
              break;
          }
          break;
        case "url":
          u7(r, "uri", s.message, t);
          break;
        case "uuid":
          u7(r, "uuid", s.message, t);
          break;
        case "regex":
          Bw(r, s.regex, s.message, t);
          break;
        case "cuid":
          Bw(r, A7.cuid, s.message, t);
          break;
        case "cuid2":
          Bw(r, A7.cuid2, s.message, t);
          break;
        case "startsWith":
          Bw(r, RegExp(`^${GIr(s.value, t)}`), s.message, t);
          break;
        case "endsWith":
          Bw(r, RegExp(`${GIr(s.value, t)}$`), s.message, t);
          break;
        case "datetime":
          u7(r, "date-time", s.message, t);
          break;
        case "date":
          u7(r, "date", s.message, t);
          break;
        case "time":
          u7(r, "time", s.message, t);
          break;
        case "duration":
          u7(r, "duration", s.message, t);
          break;
        case "length":
          ((r.minLength = typeof r.minLength === "number" ? Math.max(r.minLength, s.value) : s.value),
            (r.maxLength = typeof r.maxLength === "number" ? Math.min(r.maxLength, s.value) : s.value));
          break;
        case "includes": {
          Bw(r, RegExp(GIr(s.value, t)), s.message, t);
          break;
        }
        case "ip": {
          if (s.version !== "v6") u7(r, "ipv4", s.message, t);
          if (s.version !== "v4") u7(r, "ipv6", s.message, t);
          break;
        }
        case "base64url":
          Bw(r, A7.base64url, s.message, t);
          break;
        case "jwt":
          Bw(r, A7.jwt, s.message, t);
          break;
        case "cidr": {
          if (s.version !== "v6") Bw(r, A7.ipv4Cidr, s.message, t);
          if (s.version !== "v4") Bw(r, A7.ipv6Cidr, s.message, t);
          break;
        }
        case "emoji":
          Bw(r, A7.emoji(), s.message, t);
          break;
        case "ulid": {
          Bw(r, A7.ulid, s.message, t);
          break;
        }
        case "base64": {
          switch (t.base64Strategy) {
            case "format:binary": {
              u7(r, "binary", s.message, t);
              break;
            }
            case "contentEncoding:base64": {
              r.contentEncoding = "base64";
              break;
            }
            case "pattern:zod": {
              Bw(r, A7.base64, s.message, t);
              break;
            }
          }
          break;
        }
        case "nanoid":
          Bw(r, A7.nanoid, s.message, t);
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
      }
  return r;
}