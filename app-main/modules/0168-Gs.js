
function Gs(e) {
  if (!Ae.default.isAbsolute(e) || e.includes("\x00"))
    throw Error("Choose an absolute local queue directory.");
  let t = process.platform === "win32" ? Ae.default.resolve(e).toLowerCase() : Ae.default.resolve(e),
    n = { value: !1, directory: Ae.default.resolve(e) };
  function i(f) {
    let h = (Qn.get(t) ?? Promise.resolve())
      .catch(() => {})
      .then(async () => {
        if (((n.directory = await Hs(n.directory)), !n.value))
          for (let b of (await me.readdir(n.directory)).filter((C) =>
            /^\.queue-[0-9a-f-]{36}\.pending$/.test(C),
          )) {
            let C = Ae.default.join(n.directory, b),
              g = await me.lstat(C);
            if (!g.isFile() || g.isSymbolicLink() || g.nlink > 1)
              throw Error("The queue contains an unsafe temporary file.");
            await me.unlink(C);
          }
        let m = await r();
        if (!n.value)
          ((m.paused = !0),
            (m.items = m.items.map((b) =>
              b.state === "admitting" ? { ...b, state: "needs_attention", message: Yr } : b,
            )),
            await s(m),
            (n.value = !0));
        return f(m);
      });
    return (
      Qn.set(t, h),
      h
        .finally(() => {
          if (Qn.get(t) === h) Qn.delete(t);
        })
        .catch(() => {}),
      h
    );
  }
  async function r() {
    let f = Ae.default.join(n.directory, "queue.json"),
      h = await me.lstat(f).catch((b) => {
        if (b.code === "ENOENT") return;
        throw b;
      });
    if (!h) return { version: 1, paused: !0, items: [] };
    if (!h.isFile() || h.isSymbolicLink() || h.nlink > 1 || h.size > gt.bytes)
      throw Error("The saved queue is unsafe or exceeds its storage limit. No queued work was started.");
    let m = await me.open(f, "r");
    try {
      let b = await m.stat();
      if (!b.isFile() || b.nlink > 1 || b.ino !== h.ino || b.dev !== h.dev || b.size > gt.bytes)
        throw Error("The saved queue changed while opening. No queued work was started.");
      let C = await m.readFile();
      if (C.byteLength > gt.bytes) throw Error("The saved queue exceeds its storage limit.");
      let g = (() => {
        try {
          return JSON.parse(C.toString("utf8"));
        } catch {
          throw Error("The saved queue is damaged. No queued work was started.");
        }
      })();
      if (!wa(g)) throw Error("The saved queue is damaged. No queued work was started.");
      return g;
    } finally {
      await m.close();
    }
  }
  async function s(f) {
    let h = Buffer.from(JSON.stringify(f));
    if (h.byteLength > gt.bytes)
      throw Error("The queue exceeds its 4 MiB limit. Shorten or remove a pending request.");
    await Hs(n.directory);
    let m = Ae.default.join(n.directory, "queue.json"),
      b = await me.lstat(m).catch((k) => {
        if (k.code === "ENOENT") return;
        throw k;
      });
    if (b && (!b.isFile() || b.isSymbolicLink() || b.nlink > 1))
      throw Error("The saved queue is unsafe. No queued work was started.");
    let C = Ae.default.join(n.directory, `.queue-${Gr.randomUUID()}.pending`),
      g = await me.open(C, "wx", 384);
    try {
      (await g.writeFile(h), await g.sync());
    } finally {
      await g.close();
    }
    try {
      await me.rename(C, m);
    } finally {
      await me.unlink(C).catch((k) => {
        if (k.code !== "ENOENT") throw k;
      });
    }
  }
  let o = (f) => structuredClone({ paused: f.paused, items: f.items }),
    l = (f, h) => {
      let m = f.items.find((b) => b.id === h);
      if (!m) throw Error("This queued request is unavailable. Refresh the queue.");
      return m;
    },
    u = (f) => f.state === "queued" || f.state === "paused",
    p = (f, h) => (process.platform === "win32" ? f.toLowerCase() === h.toLowerCase() : f === h),
    w = {
      list: () => i(async (f) => o(f)),
      add: (f) =>
        i(async (h) => {
          if (f.model !== void 0) tt(f.model);
          if (
            !Ys(f) ||
            Object.keys(f).some(
              (b) =>
                ![
                  "sessionId",
                  "directory",
                  "text",
                  "attachments",
                  "thinking",
                  "model",
                  "accessMode",
                ].includes(b),
            )
          )
            throw Error("Write a message or add valid attachments before queuing this request.");
          if (h.items.length >= gt.items)
            throw Error("The queue has 20 requests. Remove a sent or pending request before adding another.");
          let m = {
            ...structuredClone(f),
            model: f.model ?? "jaccoder-5.5",
            directory: Ae.default.resolve(f.directory),
            id: `queue_${Gr.randomUUID()}`,
            createdAt: Date.now(),
            position: h.items.length,
            state: "queued",
          };
          if ((h.items.push(m), Buffer.byteLength(JSON.stringify(h)) > gt.bytes - 8192))
            throw Error("The queue exceeds its 4 MiB limit. Shorten or remove a pending request.");
          return (await s(h), structuredClone(m));
        }),
      update: (f, h) =>
        i(async (m) => {
          let b = l(m, f);
          if (!u(b)) throw Error("Only requests that have not entered admission can be edited.");
          if (typeof h !== "string" || h.length > 200000 || (!h.trim() && !b.attachments.length))
            throw Error("Write a shorter message or keep an attachment.");
          if (((b.text = h), Buffer.byteLength(JSON.stringify(m)) > gt.bytes - 8192))
            throw Error("The queue exceeds its 4 MiB limit. Shorten this request.");
          return (await s(m), o(m));
        }),
      action: (f, h) =>
        i(async (m) => {
          if (!["remove", "up", "down", "pause", "resume"].includes(h))
            throw Error("Choose a supported queue action.");
          let b = l(m, f);
          if (h === "remove") {
            if (b.state === "admitting")
              throw Error(
                "This request is entering admission. Review its saved chat before removing the queue record.",
              );
            m.items = m.items.filter((C) => C.id !== f);
          }
          if (h !== "remove") {
            if (!u(b))
              throw Error(
                "This request may already have been admitted. Open its saved chat; it cannot be queued again.",
              );
            if (h === "pause") b.state = "paused";
            if (h === "resume") b.state = "queued";
            if (h === "up" || h === "down") {
              let C = m.items.indexOf(b),
                g = C + (h === "up" ? -1 : 1);
              if (g >= 0 && g < m.items.length) m.items.splice(g, 0, ...m.items.splice(C, 1));
            }
          }
          return ((m.items = m.items.map((C, g) => ({ ...C, position: g }))), await s(m), o(m));
        }),
      pause: (f) =>
        i(async (h) => {
          if (typeof f !== "boolean") throw Error("Choose whether to pause the queue.");
          return ((h.paused = f), await s(h), o(h));
        }),
      claim: (f) =>
        i(async (h) => {
          if (h.paused) return;
          let m = h.items.find(
            (b, C) =>
              b.state === "queued" &&
              (f === void 0 || b.id === f) &&
              !h.items.some(
                (g, k) =>
                  p(g.directory, b.directory) && (g.state === "admitting" || (g.state === "queued" && k < C)),
              ),
          );
          if (!m) return;
          return ((m.state = "admitting"), delete m.message, await s(h), structuredClone(m));
        }),
      submitted: (f) =>
        i(async (h) => {
          let m = l(h, f);
          if (m.state === "submitted") return o(h);
          if (m.state !== "admitting") throw Error("This request has no active queue claim.");
          return ((m.state = "submitted"), delete m.message, await s(h), o(h));
        }),
      block: (f) =>
        i(async (h) => {
          let m = l(h, f);
          if (m.state !== "admitting" && m.state !== "needs_attention")
            throw Error("This request has no active queue claim.");
          return ((m.state = "needs_attention"), (m.message = Yr), await s(h), o(h));
        }),
      dispatch: async (f) => {
        let h = await w.claim();
        if (!h) return w.list();
        try {
          return (await f(h), await w.submitted(h.id));
        } catch {
          return w.block(h.id);
        }
      },
    };
  return w;
}