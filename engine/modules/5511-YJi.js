
var YJi = Ie(function (lza) {
  var cza = fPr().SourceMapGenerator,
    qCt = uwe(),
    Aza = /(\r?\n)/,
    uza = 10,
    fwe = "$$$isSourceNode$$$";
  function c9(e, t, r, s, a) {
    if (
      ((this.children = []),
      (this.sourceContents = {}),
      (this.line = e == null ? null : e),
      (this.column = t == null ? null : t),
      (this.source = r == null ? null : r),
      (this.name = a == null ? null : a),
      (this[fwe] = !0),
      s != null)
    )
      this.add(s);
  }
  c9.fromStringWithSourceMap = function (t, r, s) {
    var a = new c9(),
      H = t.split(Aza),
      u = 0,
      f = function () {
        var D = T(),
          S = T() || "";
        return D + S;
        function T() {
          return u < H.length ? H[u++] : void 0;
        }
      },
      d = 1,
      _ = 0,
      L = null;
    if (
      (r.eachMapping(function (D) {
        if (L !== null)
          if (d < D.generatedLine) (I(L, f()), d++, (_ = 0));
          else {
            var S = H[u] || "",
              T = S.substr(0, D.generatedColumn - _);
            ((H[u] = S.substr(D.generatedColumn - _)), (_ = D.generatedColumn), I(L, T), (L = D));
            return;
          }
        while (d < D.generatedLine) (a.add(f()), d++);
        if (_ < D.generatedColumn) {
          var S = H[u] || "";
          (a.add(S.substr(0, D.generatedColumn)),
            (H[u] = S.substr(D.generatedColumn)),
            (_ = D.generatedColumn));
        }
        L = D;
      }, this),
      u < H.length)
    ) {
      if (L) I(L, f());
      a.add(H.splice(u).join(""));
    }
    return (
      r.sources.forEach(function (D) {
        var S = r.sourceContentFor(D);
        if (S != null) {
          if (s != null) D = qCt.join(s, D);
          a.setSourceContent(D, S);
        }
      }),
      a
    );
    function I(D, S) {
      if (D === null || D.source === void 0) a.add(S);
      else {
        var T = s ? qCt.join(s, D.source) : D.source;
        a.add(new c9(D.originalLine, D.originalColumn, T, S, D.name));
      }
    }
  };
  c9.prototype.add = function (t) {
    if (Array.isArray(t))
      t.forEach(function (r) {
        this.add(r);
      }, this);
    else if (t[fwe] || typeof t === "string") {
      if (t) this.children.push(t);
    } else throw TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + t);
    return this;
  };
  c9.prototype.prepend = function (t) {
    if (Array.isArray(t)) for (var r = t.length - 1; r >= 0; r--) this.prepend(t[r]);
    else if (t[fwe] || typeof t === "string") this.children.unshift(t);
    else throw TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + t);
    return this;
  };
  c9.prototype.walk = function (t) {
    var r;
    for (var s = 0, a = this.children.length; s < a; s++)
      if (((r = this.children[s]), r[fwe])) r.walk(t);
      else if (r !== "") t(r, { source: this.source, line: this.line, column: this.column, name: this.name });
  };
  c9.prototype.join = function (t) {
    var r,
      s,
      a = this.children.length;
    if (a > 0) {
      r = [];
      for (s = 0; s < a - 1; s++) (r.push(this.children[s]), r.push(t));
      (r.push(this.children[s]), (this.children = r));
    }
    return this;
  };
  c9.prototype.replaceRight = function (t, r) {
    var s = this.children[this.children.length - 1];
    if (s[fwe]) s.replaceRight(t, r);
    else if (typeof s === "string") this.children[this.children.length - 1] = s.replace(t, r);
    else this.children.push("".replace(t, r));
    return this;
  };
  c9.prototype.setSourceContent = function (t, r) {
    this.sourceContents[qCt.toSetString(t)] = r;
  };
  c9.prototype.walkSourceContents = function (t) {
    for (var r = 0, s = this.children.length; r < s; r++)
      if (this.children[r][fwe]) this.children[r].walkSourceContents(t);
    var a = Object.keys(this.sourceContents);
    for (var r = 0, s = a.length; r < s; r++) t(qCt.fromSetString(a[r]), this.sourceContents[a[r]]);
  };
  c9.prototype.toString = function () {
    var t = "";
    return (
      this.walk(function (r) {
        t += r;
      }),
      t
    );
  };
  c9.prototype.toStringWithSourceMap = function (t) {
    var r = { code: "", line: 1, column: 0 },
      s = new cza(t),
      a = !1,
      H = null,
      u = null,
      f = null,
      d = null;
    return (
      this.walk(function (_, L) {
        if (((r.code += _), L.source !== null && L.line !== null && L.column !== null)) {
          if (H !== L.source || u !== L.line || f !== L.column || d !== L.name)
            s.addMapping({
              source: L.source,
              original: { line: L.line, column: L.column },
              generated: { line: r.line, column: r.column },
              name: L.name,
            });
          ((H = L.source), (u = L.line), (f = L.column), (d = L.name), (a = !0));
        } else if (a) (s.addMapping({ generated: { line: r.line, column: r.column } }), (H = null), (a = !1));
        for (var I = 0, D = _.length; I < D; I++)
          if (_.charCodeAt(I) === uza) {
            if ((r.line++, (r.column = 0), I + 1 === D)) ((H = null), (a = !1));
            else if (a)
              s.addMapping({
                source: L.source,
                original: { line: L.line, column: L.column },
                generated: { line: r.line, column: r.column },
                name: L.name,
              });
          } else r.column++;
      }),
      this.walkSourceContents(function (_, L) {
        s.setSourceContent(_, L);
      }),
      { code: r.code, map: s }
    );
  };
  lza.SourceNode = c9;
});