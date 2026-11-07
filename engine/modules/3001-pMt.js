
class pMt {
  handle = -1;
  _pid = -1;
  _cols = DEi;
  _rows = yEi;
  _name = MEi;
  _readLoop = !1;
  _closing = !1;
  _decoder = new TextDecoder("utf-8");
  _onData = new lMt();
  _onExit = new lMt();
  constructor(e = gua, t = [], r = { name: MEi }) {
    ((this._cols = r.cols ?? DEi), (this._rows = r.rows ?? yEi));
    let s = r.cwd ?? process.cwd(),
      a = [xEi(e), ...t.map(xEi)].join(" "),
      H = "";
    if (r.env)
      H =
        Object.entries(r.env)
          .map(([f, d]) => `${f}=${d}`)
          .join("\x00") + "\x00";
    if (
      ((this.handle = yZ.symbols.bun_pty_spawn(
        kqe.from(`${a}\x00`, "utf8"),
        kqe.from(`${s}\x00`, "utf8"),
        kqe.from(`${H}\x00`, "utf8"),
        this._cols,
        this._rows,
      )),
      this.handle < 0)
    )
      throw Error("PTY spawn failed");
    ((this._pid = yZ.symbols.bun_pty_get_pid(this.handle)), this._startReadLoop());
  }
  get pid() {
    return this._pid;
  }
  get cols() {
    return this._cols;
  }
  get rows() {
    return this._rows;
  }
  get process() {
    return "shell";
  }
  get onData() {
    return this._onData.event;
  }
  get onExit() {
    return this._onExit.event;
  }
  write(e) {
    if (this._closing) return;
    let t = kqe.from(e, "utf8");
    yZ.symbols.bun_pty_write(this.handle, gEi(t), t.length);
  }
  resize(e, t) {
    if (this._closing) return;
    ((this._cols = e), (this._rows = t), yZ.symbols.bun_pty_resize(this.handle, e, t));
  }
  kill(e = "SIGTERM") {
    if (this._closing) return;
    ((this._closing = !0),
      yZ.symbols.bun_pty_kill(this.handle),
      yZ.symbols.bun_pty_close(this.handle),
      this._onExit.fire({ exitCode: 0, signal: e }));
  }
  async _startReadLoop() {
    if (this._readLoop) return;
    this._readLoop = !0;
    let e = kqe.allocUnsafe(4096);
    while (this._readLoop && !this._closing) {
      let t = yZ.symbols.bun_pty_read(this.handle, gEi(e), e.length);
      if (t > 0) {
        let r = this._decoder.decode(e.subarray(0, t), { stream: !0 });
        if (r) this._onData.fire(r);
      } else if (t === -2) {
        let r = this._decoder.decode();
        if (r) this._onData.fire(r);
        let s = yZ.symbols.bun_pty_get_exit_code(this.handle);
        this._onExit.fire({ exitCode: s });
        break;
      } else if (t < 0) {
        let r = this._decoder.decode();
        if (r) this._onData.fire(r);
        break;
      } else await new Promise((r) => setTimeout(r, 8));
    }
  }
}