
var Ih = ne(() => {
  od();
  od();
  od();
  od();
  od();
  od();
  W1();
  MTt();
  MTt();
  MTt();
  WIr();
  od();
  od();
  od();
  ({ btoa: S1a, atob: T1a } = globalThis);
  ((Twi = `vercel.ai.error.${Swi}`),
    (v1a = Symbol.for(Twi)),
    ($T = class extends (($wi = pc), (Lwi = v1a), $wi) {
      constructor({
        url: e,
        statusCode: t,
        statusText: r,
        cause: s,
        message: a = s == null ? `Failed to download ${e}: ${t} ${r}` : `Failed to download ${e}: ${s}`,
      }) {
        super({ name: Swi, message: a, cause: s });
        ((this[Lwi] = !0), (this.url = e), (this.statusCode = t), (this.statusText = r));
      }
      static isInstance(e) {
        return pc.hasMarker(e, Twi);
      }
    }));
  U1a = [
    "connection",
    "keep-alive",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "host",
    "forwarded",
    "proxy-authorization",
    "via",
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-proto",
    "x-real-ip",
    "metadata",
    "metadata-flavor",
    "x-aws-ec2-metadata-token",
    "x-metadata-token",
    "cookie",
    "set-cookie",
  ];
  B1a = new Set([301, 302, 303, 307, 308]);
  rje = DX();
  ((V1a = ["fetch failed", "failed to fetch"]),
    (q1a = new Set([
      "ConnectionRefused",
      "ConnectionClosed",
      "FailedToOpenSocket",
      "ECONNRESET",
      "ECONNREFUSED",
      "ETIMEDOUT",
      "EPIPE",
      "UND_ERR_SOCKET",
      "UND_ERR_HEADERS_TIMEOUT",
      "UND_ERR_BODY_TIMEOUT",
      "UND_ERR_CONNECT_TIMEOUT",
    ])));
  ((K1a =
    /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/),
    (z1a =
      /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/));
  ((Y1a = Symbol("Let zodToJsonSchema decide on which parser to use")),
    (Dwi = {
      name: void 0,
      $refStrategy: "root",
      basePath: ["#"],
      effectStrategy: "input",
      pipeStrategy: "all",
      dateStrategy: "format:date-time",
      mapStrategy: "entries",
      removeAdditionalStrategy: "passthrough",
      allowedAdditionalProperties: !0,
      rejectedAdditionalProperties: !1,
      definitionPath: "definitions",
      strictUnions: !1,
      definitions: {},
      errorMessages: !1,
      patternStrategy: "escape",
      applyRegexFlags: !1,
      emailStrategy: "format:email",
      base64Strategy: "contentEncoding:base64",
      nameStrategy: "ref",
    }));
  A7 = {
    cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9-]*\.)+[a-zA-Z]{2,}$/,
    emoji: () => {
      if (qIr === void 0) qIr = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
      return qIr;
    },
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ipv4Cidr:
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ipv6Cidr:
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/,
    jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  };
  uMa = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
  XIr = {
    ZodString: "string",
    ZodNumber: "number",
    ZodBigInt: "integer",
    ZodBoolean: "boolean",
    ZodNull: "null",
  };
  JIr = Symbol.for("vercel.ai.schema");
  GMa = new TextDecoder();
});