
class Qbt {
  constructor(e) {
    if (
      ((this._stderrStream = null),
      (this._serverParams = e),
      (this._readBuffer = new CMr({ maxBufferSize: e.maxBufferSize })),
      e.stderr === "pipe" || e.stderr === "overlapped")
    )
      this._stderrStream = new dFa();
  }
  async start() {
    if (this._process)
      throw Error(
        "StdioClientTransport already started! If using Client class, note that connect() calls start() automatically.",
      );
    return new Promise((e, t) => {
      if (
        ((this._process = hRi.default(this._serverParams.command, this._serverParams.args ?? [], {
          env: { ..._Fa(), ...this._serverParams.env },
          stdio: ["pipe", "pipe", this._serverParams.stderr ?? "inherit"],
          shell: !1,
          windowsHide: wMr.platform === "win32",
          cwd: this._serverParams.cwd,
        })),
        this._process.on("error", (r) => {
          (t(r), this.onerror?.(r));
        }),
        this._process.on("spawn", () => {
          e();
        }),
        this._process.on("close", (r) => {
          ((this._process = void 0), this.onclose?.());
        }),
        this._process.stdin?.on("error", (r) => {
          this.onerror?.(r);
        }),
        this._process.stdout?.on("data", (r) => {
          try {
            (this._readBuffer.append(r), this.processReadBuffer());
          } catch (s) {
            (this.onerror?.(s), this.close().catch(() => {}));
          }
        }),
        this._process.stdout?.on("error", (r) => {
          this.onerror?.(r);
        }),
        this._stderrStream && this._process.stderr)
      )
        this._process.stderr.pipe(this._stderrStream);
    });
  }
  get stderr() {
    if (this._stderrStream) return this._stderrStream;
    return this._process?.stderr ?? null;
  }
  get pid() {
    return this._process?.pid ?? null;
  }
  processReadBuffer() {
    while (!0)
      try {
        let e = this._readBuffer.readMessage();
        if (e === null) break;
        this.onmessage?.(e);
      } catch (e) {
        this.onerror?.(e);
      }
  }
  async close() {
    if (this._process) {
      let e = this._process;
      this._process = void 0;
      let t = new Promise((r) => {
        e.once("close", () => {
          r();
        });
      });
      try {
        e.stdin?.end();
      } catch {}
      if ((await Promise.race([t, new Promise((r) => setTimeout(r, 2000).unref())]), e.exitCode === null)) {
        try {
          e.kill("SIGTERM");
        } catch {}
        await Promise.race([t, new Promise((r) => setTimeout(r, 2000).unref())]);
      }
      if (e.exitCode === null)
        try {
          e.kill("SIGKILL");
        } catch {}
    }
    this._readBuffer.clear();
  }
  send(e) {
    return new Promise((t) => {
      if (!this._process?.stdin) throw Error("Not connected");
      let r = mRi(e);
      if (this._process.stdin.write(r)) t();
      else this._process.stdin.once("drain", t);
    });
  }
}