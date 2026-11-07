
var hTr = ne(() => {
  _Tr();
  CKe = class CKe extends PKe {
    static runTools(e, t, r) {
      let s = new CKe(),
        a = { ...r, headers: { ...r?.headers, "X-Stainless-Helper-Method": "runTools" } };
      return (s._run(() => s._runTools(e, t, a)), s);
    }
    _addMessage(e, t = !0) {
      if ((super._addMessage(e, t), KPe(e) && e.content)) this._emit("content", e.content);
    }
  };
});