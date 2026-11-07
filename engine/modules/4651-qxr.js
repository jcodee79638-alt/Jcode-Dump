
var qxr = () => {
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
  Gxr = (e) => e != null && typeof e === "object" && typeof e[Symbol.asyncIterator] === "function",
  TPe = async (e, t) => ({ ...e, body: await XBa(e.body, t) }),
  LWi,
  XBa = async (e, t) => {
    if (!(await GBa(t)))
      throw TypeError(
        "The provided fetch function does not support file uploads with the current global FormData class.",
      );
    let r = new FormData();
    return (await Promise.all(Object.entries(e || {}).map(([s, a]) => Vxr(r, s, a))), r);
  },
  JBa = (e) => e instanceof Blob && "name" in e,
  Vxr = async (e, t, r) => {
    if (r === void 0) return;
    if (r == null)
      throw TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof r === "string" || typeof r === "number" || typeof r === "boolean") e.append(t, String(r));
    else if (r instanceof Response) {
      let s = {},
        a = r.headers.get("Content-Type");
      if (a) s = { type: a };
      e.append(t, fLe([await r.blob()], $Je(r), s));
    } else if (Gxr(r)) e.append(t, fLe([await new Response(Ijt(r)).blob()], $Je(r)));
    else if (JBa(r)) e.append(t, fLe([r], $Je(r), { type: r.type }));
    else if (Array.isArray(r)) await Promise.all(r.map((s) => Vxr(e, t + "[]", s)));
    else if (typeof r === "object")
      await Promise.all(Object.entries(r).map(([s, a]) => Vxr(e, `${t}[${s}]`, a)));
    else
      throw TypeError(
        `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${r} instead`,
      );
  };