
function Ms(e, t) {
  let n = !1;
  async function i(h, m) {
    if (n) throw new T("busy");
    n = !0;
    try {
      if (!m.length || m.length > le.fileBytes) throw new T("size");
      if (((m = Uint8Array.from(m)), !h || h.length > 260 || /[\u0000-\u001f]/.test(h))) throw new T("type");
      ((h = ee.default.basename(h)), fn(h, m));
      let b = Ct(e, !0),
        C = await $e.readdir(b);
      if (C.length + 3 > 4096) throw new T("storage");
      let g = 0;
      for (let S of C) {
        let x = await $e.lstat(ee.default.join(b, S));
        if (!x.isFile() || x.isSymbolicLink()) throw new T("document");
        if (((g += x.size), g > le.storeBytes)) throw new T("storage");
      }
      let k = Un(await As(h, m, t())),
        a = fn(h, m),
        d =
          {
            pdf: "application/pdf",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          }[a] ?? a,
        c = { id: Bt.randomUUID(), filename: h, size: m.length, mime: d };
      Is(c, k);
      let y = JSON.stringify(k),
        v = JSON.stringify({ ...c, version: 1, originalHash: Wn(m), preparedHash: Wn(y) });
      if (g + m.length + Buffer.byteLength(v) + Buffer.byteLength(y) > le.storeBytes) throw new T("storage");
      let E = [];
      try {
        for (let [S, x] of [
          ["", m],
          [".json", v],
          [".prepared.json", y],
        ]) {
          if (Ct(e) !== b) throw new T("document");
          let I = ee.default.join(b, c.id + S);
          (await $e.writeFile(I, x, { flag: "wx", mode: 384 }), E.push(I));
        }
      } catch (S) {
        throw (
          await Promise.all(
            E.map((x) =>
              $e.unlink(x).catch(() => {
                return;
              }),
            ),
          ),
          S
        );
      }
      return c;
    } finally {
      n = !1;
    }
  }
  async function r(h) {
    if (!$t.test(h)) throw new T("document");
    let m = Ct(e),
      b = js(JSON.parse((await Jn(ee.default.join(m, h + ".json"), 4096)).toString("utf8")), h),
      C = await Jn(ee.default.join(m, h), le.fileBytes),
      g = fn(b.filename, C),
      k =
        {
          pdf: "application/pdf",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        }[g] ?? g;
    if (C.length !== b.size || k !== b.mime || (b.version && Wn(C) !== b.originalHash))
      throw new T("document");
    let a = b.version ? await Jn(ee.default.join(m, h + ".prepared.json"), 800000) : void 0;
    if (a && Wn(a) !== b.preparedHash) throw new T("document");
    let d = Un(a ? JSON.parse(a.toString("utf8")) : await As(b.filename, C, t()));
    if (Ct(e) !== m) throw new T("document");
    return { value: b, files: d, references: Is(b, d) };
  }
  async function s(h) {
    return (await r(h)).files;
  }
  async function o(h) {
    let m = await r(h);
    return { attachmentId: h, filename: m.value.filename, references: m.references, truncated: !1 };
  }
  async function l(h, m) {
    let b = await r(h),
      C = b.references.findIndex((a) => a.id === m),
      g = b.references[C],
      k = b.files[C];
    if (!g || !k) throw new T("document");
    return {
      reference: g,
      filename: b.value.filename,
      mime: k.mime,
      ...(k.mime === "image/jpeg"
        ? { url: k.url }
        : { text: Buffer.from(k.url.slice(23), "base64").toString("utf8") }),
    };
  }
  function u(h) {
    let m = (() => {
      try {
        return Ps(ee.default.join(h, ".references-v6.json"), Dt.bytes);
      } catch (g) {
        if (g && typeof g === "object" && "code" in g && g.code === "ENOENT") return;
        throw g;
      }
    })();
    if (!m) return { version: 1, sessions: [] };
    let b = JSON.parse(m.toString("utf8"));
    if (
      !b ||
      typeof b !== "object" ||
      Object.keys(b).sort().join(",") !== "sessions,version" ||
      !("version" in b) ||
      b.version !== 1 ||
      !("sessions" in b) ||
      !Array.isArray(b.sessions) ||
      b.sessions.length > Dt.sessions
    )
      throw new T("document");
    let C = b.sessions.map((g) => {
      if (
        !g ||
        typeof g !== "object" ||
        Object.keys(g).sort().join(",") !== "attachments,id" ||
        !("id" in g) ||
        typeof g.id !== "string" ||
        !$t.test(g.id) ||
        !("attachments" in g) ||
        !Array.isArray(g.attachments) ||
        g.attachments.length > Dt.perSession ||
        !g.attachments.every((k) => typeof k === "string" && $t.test(k)) ||
        new Set(g.attachments).size !== g.attachments.length
      )
        throw new T("document");
      return { id: g.id, attachments: g.attachments };
    });
    if (new Set(C.map((g) => g.id)).size !== C.length) throw new T("document");
    return { version: 1, sessions: C };
  }
  function p(h, m) {
    if (
      !$t.test(h) ||
      !Array.isArray(m) ||
      m.length > le.files ||
      !m.every((c) => typeof c === "string" && $t.test(c))
    )
      throw new T("document");
    if (!m.length) return;
    let b = Ct(e);
    m.forEach((c) => {
      js(JSON.parse(Ps(ee.default.join(b, c + ".json"), 4096).toString("utf8")), c);
      let y = te.lstatSync(ee.default.join(b, c));
      if (!y.isFile() || y.isSymbolicLink() || y.nlink !== 1 || y.size > le.fileBytes)
        throw new T("document");
    });
    let C = u(b),
      g = C.sessions.find((c) => c.id === h),
      k = [...new Set([...(g?.attachments ?? []), ...m])];
    if (k.length > Dt.perSession || (!g && C.sessions.length >= Dt.sessions)) throw new T("storage");
    let a = JSON.stringify({
      version: 1,
      sessions: [...C.sessions.filter((c) => c.id !== h), { id: h, attachments: k }],
    });
    if (Buffer.byteLength(a) > Dt.bytes) throw new T("storage");
    let d = ee.default.join(b, `.references-${Bt.randomUUID()}.tmp`);
    try {
      if ((te.writeFileSync(d, a, { flag: "wx", mode: 384 }), Ct(e) !== b)) throw new T("document");
      te.renameSync(d, ee.default.join(b, ".references-v6.json"));
    } finally {
      try {
        te.unlinkSync(d);
      } catch {}
    }
  }
  async function w(h) {
    if (!$t.test(h)) throw new T("document");
    let m = (() => {
      try {
        return Ct(e);
      } catch (g) {
        if (g && typeof g === "object" && "code" in g && g.code === "ENOENT") return;
        throw g;
      }
    })();
    if (!m) return [];
    let b = u(m).sessions.find((g) => g.id === h)?.attachments ?? [],
      C = [];
    for (let g of b) {
      let k = await o(g).catch(() => {
        return;
      });
      if (k) C.push(k);
    }
    return C;
  }
  async function f(h) {
    let m = await r(h);
    return { id: h, filename: m.value.filename, mime: m.value.mime, size: m.value.size };
  }
  return {
    save: i,
    load: s,
    view: o,
    content: l,
    link: p,
    references: w,
    metadata: f,
    read: (h) => Jn(h, le.fileBytes),
  };
}