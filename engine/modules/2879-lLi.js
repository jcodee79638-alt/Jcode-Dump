
var lLi = Ie(function ($qe) {
  var boa =
    ($qe && $qe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty($qe, "__esModule", { value: !0 });
  var joa = boa(uLi()),
    Poa = (function () {
      function e(t, r) {
        ((this.func = t || function () {}), (this.funcRes = null), (this.options = r));
      }
      return (
        (e.prototype._shouldUpdateSelector = function (t, r) {
          if (r === void 0) r = {};
          var s = Object.assign({}, this.options, r);
          if (s.updateSelector === !1) return !1;
          else return typeof t !== "string";
        }),
        (e.prototype._isLossy = function (t) {
          if (t === void 0) t = {};
          var r = Object.assign({}, this.options, t);
          if (r.lossless === !1) return !0;
          else return !1;
        }),
        (e.prototype._root = function (t, r) {
          if (r === void 0) r = {};
          var s = new joa.default(t, this._parseOptions(r));
          return s.root;
        }),
        (e.prototype._parseOptions = function (t) {
          var r = Object.assign({}, this.options, t);
          return { lossy: this._isLossy(r), maxNestingDepth: r.maxNestingDepth };
        }),
        (e.prototype._stringifyOptions = function (t) {
          var r = Object.assign({}, this.options, t);
          return { maxNestingDepth: r.maxNestingDepth };
        }),
        (e.prototype._run = function (t, r) {
          var s = this;
          if (r === void 0) r = {};
          return new Promise(function (a, H) {
            try {
              var u = s._root(t, r);
              Promise.resolve(s.func(u))
                .then(function (f) {
                  var d = void 0;
                  if (s._shouldUpdateSelector(t, r))
                    ((d = u.toString(s._stringifyOptions(r))), (t.selector = d));
                  return { transform: f, root: u, string: d };
                })
                .then(a, H);
            } catch (f) {
              H(f);
              return;
            }
          });
        }),
        (e.prototype._runSync = function (t, r) {
          if (r === void 0) r = {};
          var s = this._root(t, r),
            a = this.func(s);
          if (a && typeof a.then === "function")
            throw Error("Selector processor returned a promise to a synchronous call.");
          var H = void 0;
          if (r.updateSelector && typeof t !== "string")
            ((H = s.toString(this._stringifyOptions(r))), (t.selector = H));
          return { transform: a, root: s, string: H };
        }),
        (e.prototype.ast = function (t, r) {
          return this._run(t, r).then(function (s) {
            return s.root;
          });
        }),
        (e.prototype.astSync = function (t, r) {
          return this._runSync(t, r).root;
        }),
        (e.prototype.transform = function (t, r) {
          return this._run(t, r).then(function (s) {
            return s.transform;
          });
        }),
        (e.prototype.transformSync = function (t, r) {
          return this._runSync(t, r).transform;
        }),
        (e.prototype.process = function (t, r) {
          var s = this;
          return this._run(t, r).then(function (a) {
            return a.string || a.root.toString(s._stringifyOptions(r));
          });
        }),
        (e.prototype.processSync = function (t, r) {
          var s = this._runSync(t, r);
          return s.string || s.root.toString(this._stringifyOptions(r));
        }),
        e
      );
    })();
  $qe.default = Poa;
});