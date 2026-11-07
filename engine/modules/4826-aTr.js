
var aTr = () => {
    if (typeof File > "u") {
      let { process: e } = globalThis,
        t = typeof e?.versions?.node === "string" && parseInt(e.versions.node.split(".")) < 20;
      throw Error(
        "`File` is not defined as a global, which is required for file uploads." +
          (t
            ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`."
            : ""),
      );
    }
  },
  _Pt = (e) => e != null && typeof e === "object" && typeof e[Symbol.asyncIterator] === "function",
  $ce = async (e, t) => {
    if (!sTr(e.body)) return e;
    return { ...e, body: await kVi(e.body, t) };
  },
  bP = async (e, t) => ({ ...e, body: await kVi(e.body, t) }),
  wVi,
  kVi = async (e, t) => {
    if (!(await r3a(t)))
      throw TypeError(
        "The provided fetch function does not support file uploads with the current global FormData class.",
      );
    let r = new FormData();
    return (await Promise.all(Object.entries(e || {}).map(([s, a]) => oTr(r, s, a))), r);
  },
  OVi = (e) => e instanceof Blob && "name" in e,
  n3a = (e) => typeof e === "object" && e !== null && (e instanceof Response || _Pt(e) || OVi(e)),
  sTr = (e) => {
    if (n3a(e)) return !0;
    if (Array.isArray(e)) return e.some(sTr);
    if (e && typeof e === "object") {
      for (let t in e) if (sTr(e[t])) return !0;
    }
    return !1;
  },
  oTr = async (e, t, r) => {
    if (r === void 0) return;
    if (r == null)
      throw TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof r === "string" || typeof r === "number" || typeof r === "boolean") e.append(t, String(r));
    else if (r instanceof Response) e.append(t, XPe([await r.blob()], DKe(r)));
    else if (_Pt(r)) e.append(t, XPe([await new Response(cPt(r)).blob()], DKe(r)));
    else if (OVi(r)) e.append(t, r, DKe(r));
    else if (Array.isArray(r)) await Promise.all(r.map((s) => oTr(e, t + "[]", s)));
    else if (typeof r === "object")
      await Promise.all(Object.entries(r).map(([s, a]) => oTr(e, `${t}[${s}]`, a)));
    else
      throw TypeError(
        `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${r} instead`,
      );
  };