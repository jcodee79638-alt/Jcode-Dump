
var Qln = ne(() => {
  Spt();
  Spt();
  Jln = class Jln extends D3s {
    _parser;
    _canWrite = !0;
    _writeCallback;
    constructor(e) {
      super({ readableObjectMode: !0 });
      let t, r;
      this._parser = xpt({
        ...e,
        onField: (s, a) => {
          if (t !== void 0) return;
          let H = { _tag: "Field", info: s, value: a };
          (this.push(H), this.emit("field", H));
        },
        onFile: (s) => {
          if (t !== void 0) return (H) => {};
          let a = new zln(s, this);
          return (
            (r = a),
            this.push(a),
            this.emit("file", a),
            (H) => {
              if (((this._canWrite = a.push(H)), H === null && !this._canWrite))
                ((r = void 0), this._resume());
            }
          );
        },
        onError: (s) => {
          (this.emit("error", s), r?.emit("error", s), (t = s));
        },
        onDone: () => {
          this.push(null);
        },
      });
    }
    _resume() {
      if (((this._canWrite = !0), this._writeCallback !== void 0)) {
        let e = this._writeCallback;
        ((this._writeCallback = void 0), e());
      }
    }
    _read(e) {}
    _write(e, t, r) {
      if ((this._parser.write(e instanceof Uint8Array ? e : Buffer.from(e, t)), this._canWrite)) r();
      else this._writeCallback = r;
    }
    _final(e) {
      (this._parser.end(), e());
    }
  };
  zln = class zln extends y3s {
    info;
    _parent;
    _tag = "File";
    filename;
    constructor(e, t) {
      super();
      ((this.info = e), (this._parent = t), (this.filename = e.filename));
    }
    _read(e) {
      if (this._parent._canWrite === !1) this._parent._resume();
    }
  };
});