
class Cr {
  child;
  password = en.randomBytes(32).toString("hex");
  port = 0;
  pending = new Map();
  controller = new AbortController();
  emit;
  normalize = Sr();
  buffer = "";
  running = new Set();
  stopping = !1;
  sends = 0;
  connected;
  observed = { state: "stopped", since: Date.now(), attempt: 0 };
  exited = !0;
  startup;
  stream;
  reconnecting;
  constructor(e) {
    this.emit = e;
  }
  get active() {
    return this.running.size > 0;
  }
  connection() {
    return { ...this.observed };
  }
  connectionState(e, t = 0) {
    let n = e !== this.observed.state;
    if (((this.observed = { state: e, since: n ? Date.now() : this.observed.since, attempt: t }), n))
      this.emit({ type: "connection", connection: this.connection() });
  }
  reconnect() {
    if (this.reconnecting) return this.reconnecting;
    let e = (async () => {
      if (this.stopping) throw Error("Jac Code is closing. Reopen the app to reconnect.");
      if (this.exited) {
        if (!this.startup) throw Error("The Jac Code engine has not started. Close and reopen the app.");
        await this.start(this.startup.resources, this.startup.args, this.startup.cwd, this.startup.userData);
        return;
      }
      if (!this.port) throw Error("The Jac Code engine is still starting. Wait and reconnect again.");
      (this.connectionState("reconnecting", 1),
        this.controller.abort(),
        await this.stream,
        await this.observe());
    })();
    return (
      (this.reconnecting = e),
      e
        .finally(() => {
          if (this.reconnecting === e) this.reconnecting = void 0;
        })
        .catch(() => {}),
      e
    );
  }
  async activity() {
    let e = j(await this.call("activity"));
    return {
      busy: e.busy === !0 || this.sends > 0,
      sessions: Array.isArray(e.sessions)
        ? e.sessions.map((t) => {
            let n = j(t);
            return { id: String(n.id), directory: String(n.directory) };
          })
        : [],
    };
  }
  get pid() {
    return this.exited ? void 0 : this.child?.pid;
  }
  async start(e, t, n, i) {
    if (!this.exited) throw Error("The Jac Code engine is already running. Reconnect to its saved work.");
    ((this.startup = { resources: e, args: [...t], cwd: n, userData: i }),
      (this.password = en.randomBytes(32).toString("hex")),
      (this.buffer = ""),
      (this.port = 0),
      this.running.clear(),
      (this.normalize = Sr()),
      (this.stopping = !1),
      this.connectionState("reconnecting", 1),
      (this.child = Ci.spawn(Si.default.join(e, "jac-engine.exe"), [], {
        cwd: n,
        windowsHide: !0,
        shell: !1,
        stdio: ["pipe", "pipe", "ignore"],
        env: {
          ...process.env,
          NODE_OPTIONS: void 0,
          BUN_OPTIONS: void 0,
          NODE_EXTRA_CA_CERTS: void 0,
          ELECTRON_RUN_AS_NODE: void 0,
          NO_PROXY: [process.env.NO_PROXY, "127.0.0.1,localhost,::1"].filter(Boolean).join(","),
          no_proxy: "127.0.0.1,localhost,::1",
        },
      })));
    let r = this.child;
    ((this.exited = !1),
      r.stdout?.setEncoding("utf8"),
      r.stdout?.on("data", (o) => {
        if (this.child !== r) return;
        if (((this.buffer += o), this.buffer.length > 20000000))
          return (this.child?.stdin?.end(), this.fail());
        while (
          this.buffer.includes(`
`)
        ) {
          let l = this.buffer.indexOf(`
`),
            u = this.buffer.slice(0, l);
          this.buffer = this.buffer.slice(l + 1);
          try {
            let p = j(JSON.parse(u));
            if (p.event) {
              this.emit(p.event);
              continue;
            }
            let w = this.pending.get(String(p.id));
            if (!w) continue;
            if ((clearTimeout(w.timer), this.pending.delete(String(p.id)), p.ok === !0)) w.resolve(p.value);
            else
              w.reject(
                Error(
                  typeof p.message === "string" ? p.message : "Jac Code could not complete this request.",
                ),
              );
          } catch {
            this.fail();
          }
        }
      }),
      r.once("error", () => {
        if (this.child !== r) return;
        if ((this.fail(), !r.pid)) ((this.exited = !0), this.connectionState("stopped"));
      }),
      r.once("exit", () => {
        if (this.child !== r) return;
        if (
          ((this.exited = !0),
          (this.port = 0),
          this.controller.abort(),
          this.running.clear(),
          this.connectionState("stopped"),
          this.fail(),
          !this.stopping)
        )
          this.emit({
            type: "error",
            fatal: !0,
            message: "The Jac Code engine stopped. Reconnect to review saved progress before continuing.",
          });
      }));
    let s = j(
      await this.call(
        "init",
        { password: this.password, parentPid: process.pid, args: t, cwd: n, ...(i ? { userData: i } : {}) },
        120000,
      ),
    );
    if (!Number.isSafeInteger(s.port) || Number(s.port) < 1 || Number(s.port) > 65535)
      throw Error("Jac Code could not start its coding engine.");
    return ((this.port = Number(s.port)), await this.observe(), String(s.version));
  }
  async observe() {
    this.controller = new AbortController();
    let e = this.controller.signal,
      t = new Promise((n, i) => {
        let r = () => {
            if ((clearTimeout(o), e.removeEventListener("abort", s), this.connected === l))
              this.connected = void 0;
          },
          s = () => {
            (r(), i(Error("The Jac Code engine connection stopped. Reconnect to review saved work.")));
          },
          o = setTimeout(() => {
            (r(), i(Error("Jac Code could not reconnect to saved progress. Try reconnecting again.")));
          }, 15000),
          l = () => {
            (r(), n());
          };
        (e.addEventListener("abort", s, { once: !0 }), (this.connected = l));
      });
    ((this.stream = this.events()), await t);
  }
  fail() {
    (this.pending.forEach((e) => {
      (clearTimeout(e.timer),
        e.reject(Error("The Jac Code engine is unavailable. Close and reopen the app.")));
    }),
      this.pending.clear());
  }
  call(e, t, n = 30000) {
    let i = en.randomUUID();
    return new Promise((r, s) => {
      let o =
        JSON.stringify({ id: i, op: e, input: t }) +
        `
`;
      if (Buffer.byteLength(o) >= 16000000) {
        s(Error("This request is too large to send safely. Reduce its size and try again."));
        return;
      }
      if (e === "saveSettings" && t && typeof t === "object" && "drafts" in t && t.drafts !== void 0)
        Bo(t.drafts);
      if (this.exited) {
        s(Error("The Jac Code engine is stopped. Reconnect to review saved work."));
        return;
      }
      let l = setTimeout(() => {
        (this.pending.delete(i), s(Error("This request took too long. Try again.")));
      }, n);
      if (
        (this.pending.set(i, { resolve: r, reject: s, timer: l }),
        this.child?.stdin?.write(o, (u) => {
          if (u) this.fail();
        }),
        !this.child?.stdin)
      )
        this.fail();
    });
  }
  async request(e, t, n, i) {
    if (!Fo(e, t) || !this.port) throw Error("Unsupported desktop operation.");
    let r = new URL(t, `http://127.0.0.1:${this.port}`);
    if (r.origin !== `http://127.0.0.1:${this.port}`) throw Error("Unsupported desktop operation.");
    if (n) r.searchParams.set("directory", n);
    let s = e === "POST" && t.endsWith("/prompt_async");
    if (s)
      (await this.call("promptAdmission", { id: new URL(t, "http://localhost").pathname.split("/")[2] }),
        this.sends++);
    let o = await fetch(r, {
      method: e,
      redirect: "error",
      headers: {
        authorization: `Basic ${Buffer.from(`jac-desktop:${this.password}`).toString("base64")}`,
        ...(i === void 0 ? {} : { "content-type": "application/json" }),
      },
      body: i === void 0 ? void 0 : JSON.stringify(i),
      signal: AbortSignal.timeout(30000),
    }).finally(() => {
      if (s) setTimeout(() => (this.sends = Math.max(0, this.sends - 1)), 1000);
    });
    if (!o.ok)
      throw (
        await o.body?.cancel(),
        Error(
          o.status === 404
            ? "This conversation is unavailable. Refresh your history."
            : "Jac Code could not complete this request. Try again.",
        )
      );
    if (Number(o.headers.get("content-length")) > 25000000)
      throw (await o.body?.cancel(), Error("This response is too large to display."));
    let l = o.body?.getReader(),
      u = [],
      p = 0;
    try {
      while (l) {
        let f = await l.read();
        if (f.done) break;
        if (((p += f.value.byteLength), p > 25000000)) throw Error("This response is too large to display.");
        u.push(f.value);
      }
    } finally {
      await l?.cancel().catch(() => {});
    }
    let w = Buffer.concat(u).toString("utf8");
    return { value: w ? JSON.parse(w) : void 0, cursor: o.headers.get("x-next-cursor") ?? void 0 };
  }
  async events() {
    let e = this.controller.signal;
    while (!e.aborted && !this.exited) {
      try {
        let t = await fetch(`http://127.0.0.1:${this.port}/global/event`, {
          redirect: "error",
          headers: {
            authorization: `Basic ${Buffer.from(`jac-desktop:${this.password}`).toString("base64")}`,
            accept: "text/event-stream",
          },
          signal: e,
        });
        if (!t.ok || !t.body) throw (await t.body?.cancel(), Error("Event stream unavailable"));
        if (e.aborted || this.exited) {
          await t.body.cancel();
          break;
        }
        (this.connectionState("connected"), this.connected?.(), this.emit({ type: "refresh" }));
        let n = t.body.getReader(),
          i = new TextDecoder(),
          r = "";
        try {
          while (!e.aborted) {
            let s = await n.read();
            if (s.done || e.aborted) break;
            if (
              ((r = (r + i.decode(s.value, { stream: !0 })).replaceAll(
                `\r
`,
                `
`,
              )),
              r.length > 20000000)
            )
              throw Error("Event too large");
            while (
              r.includes(`

`)
            ) {
              let o = r.indexOf(`

`),
                l = r.slice(0, o);
              r = r.slice(o + 2);
              let u = l
                .split(
                  `
`,
                )
                .filter((f) => f.startsWith("data:"))
                .map((f) => f.slice(5).trimStart()).join(`
`);
              if (!u) continue;
              let p = j(JSON.parse(u)),
                w = this.normalize(p);
              if (!w) continue;
              if (w.type === "status")
                if (w.status === "busy") this.running.add(w.sessionId);
                else this.running.delete(w.sessionId);
              this.emit(w);
            }
          }
        } finally {
          await n.cancel().catch(() => {});
        }
      } catch {}
      if (!e.aborted && !this.exited)
        (this.connectionState("reconnecting", this.observed.attempt + 1),
          await new Promise((t) => {
            let n = setTimeout(() => {
                (e.removeEventListener("abort", i), t());
              }, 1500),
              i = () => {
                (clearTimeout(n), t());
              };
            e.addEventListener("abort", i, { once: !0 });
          }));
    }
  }
  async stop() {
    let e = this.child,
      t =
        e && !this.exited
          ? Ai.once(e, "exit", { signal: AbortSignal.timeout(15000) }).catch(() => {})
          : void 0;
    ((this.stopping = !0),
      this.controller.abort(),
      this.connectionState("stopped"),
      await this.call("stop", {}, 1e4).catch(() => {}),
      e?.stdin?.end(),
      this.fail(),
      await t);
  }
}