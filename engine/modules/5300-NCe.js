
var NCe = Ie(function (oGi) {
  Object.defineProperty(oGi, "__esModule", { value: !0 });
  oGi.Emitter = oGi.Event = void 0;
  var Sqa = Fce(),
    iGi;
  (function (e) {
    let t = { dispose() {} };
    e.None = function () {
      return t;
    };
  })(iGi || (oGi.Event = iGi = {}));
  class sGi {
    add(e, t = null, r) {
      if (!this._callbacks) ((this._callbacks = []), (this._contexts = []));
      if ((this._callbacks.push(e), this._contexts.push(t), Array.isArray(r)))
        r.push({ dispose: () => this.remove(e, t) });
    }
    remove(e, t = null) {
      if (!this._callbacks) return;
      let r = !1;
      for (let s = 0, a = this._callbacks.length; s < a; s++)
        if (this._callbacks[s] === e)
          if (this._contexts[s] === t) {
            (this._callbacks.splice(s, 1), this._contexts.splice(s, 1));
            return;
          } else r = !0;
      if (r) throw Error("When adding a listener with a context, you should remove it with the same context");
    }
    invoke(...e) {
      if (!this._callbacks) return [];
      let t = [],
        r = this._callbacks.slice(0),
        s = this._contexts.slice(0);
      for (let a = 0, H = r.length; a < H; a++)
        try {
          t.push(r[a].apply(s[a], e));
        } catch (u) {
          (0, Sqa.default)().console.error(u);
        }
      return t;
    }
    isEmpty() {
      return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
      ((this._callbacks = void 0), (this._contexts = void 0));
    }
  }
  class nCt {
    constructor(e) {
      this._options = e;
    }
    get event() {
      if (!this._event)
        this._event = (e, t, r) => {
          if (!this._callbacks) this._callbacks = new sGi();
          if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty())
            this._options.onFirstListenerAdd(this);
          this._callbacks.add(e, t);
          let s = {
            dispose: () => {
              if (!this._callbacks) return;
              if (
                (this._callbacks.remove(e, t),
                (s.dispose = nCt._noop),
                this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty())
              )
                this._options.onLastListenerRemove(this);
            },
          };
          if (Array.isArray(r)) r.push(s);
          return s;
        };
      return this._event;
    }
    fire(e) {
      if (this._callbacks) this._callbacks.invoke.call(this._callbacks, e);
    }
    dispose() {
      if (this._callbacks) (this._callbacks.dispose(), (this._callbacks = void 0));
    }
  }
  oGi.Emitter = nCt;
  nCt._noop = function () {};
});