
var sii = Ie(function (ipc, iii) {
  var { URL_MATCHER: a3o, TYPE_URL: EIt, TYPE_REGEX: H3o, TYPE_PATH: c3o } = Nfr(),
    qoe = (e = 0) => {
      if (((e = typeof e === "string" ? e.length : e), e < 8)) return "*".repeat(8);
      return "*".repeat(e);
    },
    eii = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    tii = (e) => {
      let t = decodeURIComponent(e),
        r = encodeURIComponent(e);
      return [...new Set([r, t, e])].map(eii).join("|");
    },
    IIt = (e, ...t) => {
      let r = "";
      for (let s = 0; s < t.length; s++) r += e[s] + `(${tii(t[s])})`;
      return ((r += e[e.length - 1]), new RegExp(r));
    },
    A3o = ({ hostname: e, replacement: t } = {}) => ({
      type: EIt,
      predicate: ({ url: r }) => r.hostname === e,
      pattern: ({ url: r }) => IIt`(^${r.protocol}//${r.username}:.+@)?${r.hostname}`,
      replacement: `$1${t || qoe()}`,
    }),
    u3o = ({ param: e, replacement: t } = {}) => ({
      type: EIt,
      predicate: ({ url: r }) => r.searchParams.has(e),
      pattern: ({ url: r }) => IIt`(${e}=)${r.searchParams.get(e)}`,
      replacement: `$1${t || qoe()}`,
    }),
    rii = ({ replacement: e } = {}) => ({
      type: EIt,
      predicate: ({ url: t }) => t.password,
      pattern: ({ url: t }) => IIt`(^${t.protocol}//${t.username}:)${t.password}`,
      replacement: `$1${e || qoe()}`,
    }),
    nii =
      (...e) =>
      (t) => {
        try {
          let r = new URL(t);
          return Ffr(...e)(t, { url: r });
        } catch (r) {
          return t;
        }
      },
    l3o = (...e) => ({ ...a3o, replacement: nii(...e) }),
    f3o = {
      [H3o]: (e) => (t) => {
        if (typeof t === "string") t = t.replace(e.pattern, e.replacement);
        return t;
      },
      [EIt]: (e) => (t, r) => {
        if (typeof t === "string")
          try {
            let s = r?.url || new URL(t),
              { predicate: a, pattern: H } = e;
            if (a({ url: s })) t = t.replace(H({ url: s }), e.replacement);
          } catch (s) {
            return t;
          }
        return t;
      },
      [c3o]: (e) => (t, r) => {
        let s = r?.path,
          a = s.join(".").toLowerCase(),
          { predicate: H, replacement: u } = e,
          f = typeof u === "function" ? u : () => u;
        if (H({ rawPath: s, path: a })) t = f(t, { rawPath: s, path: a });
        return t;
      },
    },
    p3o = (e) => f3o[e.type](e),
    Ffr =
      (...e) =>
      (t, r) =>
        e.flat().reduce((a, H) => (typeof H === "function" ? H : p3o(H))(a, r), t),
    d3o = () => (e, t) => {
      if (typeof t === "number") return qoe(e);
      return t + qoe(e.substring(t.length).length);
    },
    m3o = (e) => (t, r) => {
      if (typeof r === "number") return qoe(e);
      return r + qoe(e);
    },
    _3o = (e, t) => Ffr(rii({ replacement: t }))(e);
  iii.exports = {
    asterisk: qoe,
    escapeRegExp: eii,
    urlEncodeRegexGroup: tii,
    urlEncodeRegexTag: IIt,
    redactUrlHostnameMatcher: A3o,
    redactUrlSearchParamsMatcher: u3o,
    redactUrlPasswordMatcher: rii,
    redactUrlMatcher: l3o,
    redactUrlReplacement: nii,
    redactDynamicReplacement: d3o,
    redactFixedReplacement: m3o,
    redactMatchers: Ffr,
    redactUrlPassword: _3o,
  };
});