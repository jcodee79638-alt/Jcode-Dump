
var C$r = Ie(function (xvc, Jyi) {
  var she = dbe(),
    Gha = P$r(),
    Xha = kD();
  Jyi.exports = Xyi;
  function Xyi() {}
  Xyi.prototype = {
    addEventListener: function (t, r, s) {
      if (!r) return;
      if (s === void 0) s = !1;
      if (!this._listeners) this._listeners = Object.create(null);
      if (!this._listeners[t]) this._listeners[t] = [];
      var a = this._listeners[t];
      for (var H = 0, u = a.length; H < u; H++) {
        var f = a[H];
        if (f.listener === r && f.capture === s) return;
      }
      var d = { listener: r, capture: s };
      if (typeof r === "function") d.f = r;
      a.push(d);
    },
    removeEventListener: function (t, r, s) {
      if (s === void 0) s = !1;
      if (this._listeners) {
        var a = this._listeners[t];
        if (a)
          for (var H = 0, u = a.length; H < u; H++) {
            var f = a[H];
            if (f.listener === r && f.capture === s) {
              if (a.length === 1) this._listeners[t] = void 0;
              else a.splice(H, 1);
              return;
            }
          }
      }
    },
    dispatchEvent: function (t) {
      return this._dispatchEvent(t, !1);
    },
    _dispatchEvent: function (t, r) {
      if (typeof r !== "boolean") r = !1;
      function s(_, L) {
        var { type: I, eventPhase: D } = L;
        if (((L.currentTarget = _), D !== she.CAPTURING_PHASE && _._handlers && _._handlers[I])) {
          var S = _._handlers[I],
            T;
          if (typeof S === "function") T = S.call(L.currentTarget, L);
          else {
            var C = S.handleEvent;
            if (typeof C !== "function")
              throw TypeError("handleEvent property of event handler object isnot a function.");
            T = C.call(S, L);
          }
          switch (L.type) {
            case "mouseover":
              if (T === !0) L.preventDefault();
              break;
            case "beforeunload":
            default:
              if (T === !1) L.preventDefault();
              break;
          }
        }
        var O = _._listeners && _._listeners[I];
        if (!O) return;
        O = O.slice();
        for (var B = 0, V = O.length; B < V; B++) {
          if (L._immediatePropagationStopped) return;
          var q = O[B];
          if ((D === she.CAPTURING_PHASE && !q.capture) || (D === she.BUBBLING_PHASE && q.capture)) continue;
          if (q.f) q.f.call(L.currentTarget, L);
          else {
            var Z = q.listener.handleEvent;
            if (typeof Z !== "function")
              throw TypeError("handleEvent property of event listener object is not a function.");
            Z.call(q.listener, L);
          }
        }
      }
      if (!t._initialized || t._dispatching) Xha.InvalidStateError();
      ((t.isTrusted = r), (t._dispatching = !0), (t.target = this));
      var a = [];
      for (var H = this.parentNode; H; H = H.parentNode) a.push(H);
      t.eventPhase = she.CAPTURING_PHASE;
      for (var u = a.length - 1; u >= 0; u--) if ((s(a[u], t), t._propagationStopped)) break;
      if (!t._propagationStopped) ((t.eventPhase = she.AT_TARGET), s(this, t));
      if (t.bubbles && !t._propagationStopped) {
        t.eventPhase = she.BUBBLING_PHASE;
        for (var f = 0, d = a.length; f < d; f++) if ((s(a[f], t), t._propagationStopped)) break;
      }
      if (
        ((t._dispatching = !1),
        (t.eventPhase = she.AT_TARGET),
        (t.currentTarget = null),
        r && !t.defaultPrevented && t instanceof Gha)
      )
        switch (t.type) {
          case "mousedown":
            this._armed = { x: t.clientX, y: t.clientY, t: t.timeStamp };
            break;
          case "mouseout":
          case "mouseover":
            this._armed = null;
            break;
          case "mouseup":
            if (this._isClick(t)) this._doClick(t);
            this._armed = null;
            break;
        }
      return !t.defaultPrevented;
    },
    _isClick: function (e) {
      return (
        this._armed !== null &&
        e.type === "mouseup" &&
        e.isTrusted &&
        e.button === 0 &&
        e.timeStamp - this._armed.t < 1000 &&
        Math.abs(e.clientX - this._armed.x) < 10 &&
        Math.abs(e.clientY - this._armed.Y) < 10
      );
    },
    _doClick: function (e) {
      if (this._click_in_progress) return;
      this._click_in_progress = !0;
      var t = this;
      while (t && !t._post_click_activation_steps) t = t.parentNode;
      if (t && t._pre_click_activation_steps) t._pre_click_activation_steps();
      var r = this.ownerDocument.createEvent("MouseEvent");
      r.initMouseEvent(
        "click",
        !0,
        !0,
        this.ownerDocument.defaultView,
        1,
        e.screenX,
        e.screenY,
        e.clientX,
        e.clientY,
        e.ctrlKey,
        e.altKey,
        e.shiftKey,
        e.metaKey,
        e.button,
        null,
      );
      var s = this._dispatchEvent(r, !0);
      if (t) {
        if (s) {
          if (t._post_click_activation_steps) t._post_click_activation_steps(r);
        } else if (t._cancelled_activation_steps) t._cancelled_activation_steps();
      }
    },
    _setEventHandler: function (t, r) {
      if (!this._handlers) this._handlers = Object.create(null);
      this._handlers[t] = r;
    },
    _getEventHandler: function (t) {
      return (this._handlers && this._handlers[t]) || null;
    },
  };
});