
var QJi = Ie(function (sza) {
  var KA = uwe(),
    hPr = JJi(),
    lwe = lPr().ArraySet,
    iza = HPr(),
    hQe = KJi().quickSort;
  function sE(e, t) {
    var r = e;
    if (typeof e === "string") r = KA.parseSourceMapInput(e);
    return r.sections != null ? new w7(r, t) : new Ib(r, t);
  }
  sE.fromSourceMap = function (e, t) {
    return Ib.fromSourceMap(e, t);
  };
  sE.prototype._version = 3;
  sE.prototype.__generatedMappings = null;
  Object.defineProperty(sE.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function () {
      if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
      return this.__generatedMappings;
    },
  });
  sE.prototype.__originalMappings = null;
  Object.defineProperty(sE.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function () {
      if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
      return this.__originalMappings;
    },
  });
  sE.prototype._charIsMappingSeparator = function (t, r) {
    var s = t.charAt(r);
    return s === ";" || s === ",";
  };
  sE.prototype._parseMappings = function (t, r) {
    throw Error("Subclasses must implement _parseMappings");
  };
  sE.GENERATED_ORDER = 1;
  sE.ORIGINAL_ORDER = 2;
  sE.GREATEST_LOWER_BOUND = 1;
  sE.LEAST_UPPER_BOUND = 2;
  sE.prototype.eachMapping = function (t, r, s) {
    var a = r || null,
      H = s || sE.GENERATED_ORDER,
      u;
    switch (H) {
      case sE.GENERATED_ORDER:
        u = this._generatedMappings;
        break;
      case sE.ORIGINAL_ORDER:
        u = this._originalMappings;
        break;
      default:
        throw Error("Unknown order of iteration.");
    }
    var f = this.sourceRoot;
    u.map(function (d) {
      var _ = d.source === null ? null : this._sources.at(d.source);
      return (
        (_ = KA.computeSourceURL(f, _, this._sourceMapURL)),
        {
          source: _,
          generatedLine: d.generatedLine,
          generatedColumn: d.generatedColumn,
          originalLine: d.originalLine,
          originalColumn: d.originalColumn,
          name: d.name === null ? null : this._names.at(d.name),
        }
      );
    }, this).forEach(t, a);
  };
  sE.prototype.allGeneratedPositionsFor = function (t) {
    var r = KA.getArg(t, "line"),
      s = { source: KA.getArg(t, "source"), originalLine: r, originalColumn: KA.getArg(t, "column", 0) };
    if (((s.source = this._findSourceIndex(s.source)), s.source < 0)) return [];
    var a = [],
      H = this._findMapping(
        s,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        KA.compareByOriginalPositions,
        hPr.LEAST_UPPER_BOUND,
      );
    if (H >= 0) {
      var u = this._originalMappings[H];
      if (t.column === void 0) {
        var f = u.originalLine;
        while (u && u.originalLine === f)
          (a.push({
            line: KA.getArg(u, "generatedLine", null),
            column: KA.getArg(u, "generatedColumn", null),
            lastColumn: KA.getArg(u, "lastGeneratedColumn", null),
          }),
            (u = this._originalMappings[++H]));
      } else {
        var d = u.originalColumn;
        while (u && u.originalLine === r && u.originalColumn == d)
          (a.push({
            line: KA.getArg(u, "generatedLine", null),
            column: KA.getArg(u, "generatedColumn", null),
            lastColumn: KA.getArg(u, "lastGeneratedColumn", null),
          }),
            (u = this._originalMappings[++H]));
      }
    }
    return a;
  };
  sza.SourceMapConsumer = sE;
  function Ib(e, t) {
    var r = e;
    if (typeof e === "string") r = KA.parseSourceMapInput(e);
    var s = KA.getArg(r, "version"),
      a = KA.getArg(r, "sources"),
      H = KA.getArg(r, "names", []),
      u = KA.getArg(r, "sourceRoot", null),
      f = KA.getArg(r, "sourcesContent", null),
      d = KA.getArg(r, "mappings"),
      _ = KA.getArg(r, "file", null);
    if (s != this._version) throw Error("Unsupported version: " + s);
    if (u) u = KA.normalize(u);
    ((a = a
      .map(String)
      .map(KA.normalize)
      .map(function (L) {
        return u && KA.isAbsolute(u) && KA.isAbsolute(L) ? KA.relative(u, L) : L;
      })),
      (this._names = lwe.fromArray(H.map(String), !0)),
      (this._sources = lwe.fromArray(a, !0)),
      (this._absoluteSources = this._sources.toArray().map(function (L) {
        return KA.computeSourceURL(u, L, t);
      })),
      (this.sourceRoot = u),
      (this.sourcesContent = f),
      (this._mappings = d),
      (this._sourceMapURL = t),
      (this.file = _));
  }
  Ib.prototype = Object.create(sE.prototype);
  Ib.prototype.consumer = sE;
  Ib.prototype._findSourceIndex = function (e) {
    var t = e;
    if (this.sourceRoot != null) t = KA.relative(this.sourceRoot, t);
    if (this._sources.has(t)) return this._sources.indexOf(t);
    var r;
    for (r = 0; r < this._absoluteSources.length; ++r) if (this._absoluteSources[r] == e) return r;
    return -1;
  };
  Ib.fromSourceMap = function (t, r) {
    var s = Object.create(Ib.prototype),
      a = (s._names = lwe.fromArray(t._names.toArray(), !0)),
      H = (s._sources = lwe.fromArray(t._sources.toArray(), !0));
    ((s.sourceRoot = t._sourceRoot),
      (s.sourcesContent = t._generateSourcesContent(s._sources.toArray(), s.sourceRoot)),
      (s.file = t._file),
      (s._sourceMapURL = r),
      (s._absoluteSources = s._sources.toArray().map(function (S) {
        return KA.computeSourceURL(s.sourceRoot, S, r);
      })));
    var u = t._mappings.toArray().slice(),
      f = (s.__generatedMappings = []),
      d = (s.__originalMappings = []);
    for (var _ = 0, L = u.length; _ < L; _++) {
      var I = u[_],
        D = new zJi();
      if (((D.generatedLine = I.generatedLine), (D.generatedColumn = I.generatedColumn), I.source)) {
        if (
          ((D.source = H.indexOf(I.source)),
          (D.originalLine = I.originalLine),
          (D.originalColumn = I.originalColumn),
          I.name)
        )
          D.name = a.indexOf(I.name);
        d.push(D);
      }
      f.push(D);
    }
    return (hQe(s.__originalMappings, KA.compareByOriginalPositions), s);
  };
  Ib.prototype._version = 3;
  Object.defineProperty(Ib.prototype, "sources", {
    get: function () {
      return this._absoluteSources.slice();
    },
  });
  function zJi() {
    ((this.generatedLine = 0),
      (this.generatedColumn = 0),
      (this.source = null),
      (this.originalLine = null),
      (this.originalColumn = null),
      (this.name = null));
  }
  Ib.prototype._parseMappings = function (t, r) {
    var s = 1,
      a = 0,
      H = 0,
      u = 0,
      f = 0,
      d = 0,
      _ = t.length,
      L = 0,
      I = {},
      D = {},
      S = [],
      T = [],
      C,
      O,
      B,
      V,
      q;
    while (L < _)
      if (t.charAt(L) === ";") (s++, L++, (a = 0));
      else if (t.charAt(L) === ",") L++;
      else {
        ((C = new zJi()), (C.generatedLine = s));
        for (V = L; V < _; V++) if (this._charIsMappingSeparator(t, V)) break;
        if (((O = t.slice(L, V)), (B = I[O]), B)) L += O.length;
        else {
          B = [];
          while (L < V) (iza.decode(t, L, D), (q = D.value), (L = D.rest), B.push(q));
          if (B.length === 2) throw Error("Found a source, but no line and column");
          if (B.length === 3) throw Error("Found a source and line, but no column");
          I[O] = B;
        }
        if (((C.generatedColumn = a + B[0]), (a = C.generatedColumn), B.length > 1)) {
          if (
            ((C.source = f + B[1]),
            (f += B[1]),
            (C.originalLine = H + B[2]),
            (H = C.originalLine),
            (C.originalLine += 1),
            (C.originalColumn = u + B[3]),
            (u = C.originalColumn),
            B.length > 4)
          )
            ((C.name = d + B[4]), (d += B[4]));
        }
        if ((T.push(C), typeof C.originalLine === "number")) S.push(C);
      }
    (hQe(T, KA.compareByGeneratedPositionsDeflated),
      (this.__generatedMappings = T),
      hQe(S, KA.compareByOriginalPositions),
      (this.__originalMappings = S));
  };
  Ib.prototype._findMapping = function (t, r, s, a, H, u) {
    if (t[s] <= 0) throw TypeError("Line must be greater than or equal to 1, got " + t[s]);
    if (t[a] < 0) throw TypeError("Column must be greater than or equal to 0, got " + t[a]);
    return hPr.search(t, r, H, u);
  };
  Ib.prototype.computeColumnSpans = function () {
    for (var t = 0; t < this._generatedMappings.length; ++t) {
      var r = this._generatedMappings[t];
      if (t + 1 < this._generatedMappings.length) {
        var s = this._generatedMappings[t + 1];
        if (r.generatedLine === s.generatedLine) {
          r.lastGeneratedColumn = s.generatedColumn - 1;
          continue;
        }
      }
      r.lastGeneratedColumn = 1 / 0;
    }
  };
  Ib.prototype.originalPositionFor = function (t) {
    var r = { generatedLine: KA.getArg(t, "line"), generatedColumn: KA.getArg(t, "column") },
      s = this._findMapping(
        r,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        KA.compareByGeneratedPositionsDeflated,
        KA.getArg(t, "bias", sE.GREATEST_LOWER_BOUND),
      );
    if (s >= 0) {
      var a = this._generatedMappings[s];
      if (a.generatedLine === r.generatedLine) {
        var H = KA.getArg(a, "source", null);
        if (H !== null)
          ((H = this._sources.at(H)), (H = KA.computeSourceURL(this.sourceRoot, H, this._sourceMapURL)));
        var u = KA.getArg(a, "name", null);
        if (u !== null) u = this._names.at(u);
        return {
          source: H,
          line: KA.getArg(a, "originalLine", null),
          column: KA.getArg(a, "originalColumn", null),
          name: u,
        };
      }
    }
    return { source: null, line: null, column: null, name: null };
  };
  Ib.prototype.hasContentsOfAllSources = function () {
    if (!this.sourcesContent) return !1;
    return (
      this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (t) {
        return t == null;
      })
    );
  };
  Ib.prototype.sourceContentFor = function (t, r) {
    if (!this.sourcesContent) return null;
    var s = this._findSourceIndex(t);
    if (s >= 0) return this.sourcesContent[s];
    var a = t;
    if (this.sourceRoot != null) a = KA.relative(this.sourceRoot, a);
    var H;
    if (this.sourceRoot != null && (H = KA.urlParse(this.sourceRoot))) {
      var u = a.replace(/^file:\/\//, "");
      if (H.scheme == "file" && this._sources.has(u)) return this.sourcesContent[this._sources.indexOf(u)];
      if ((!H.path || H.path == "/") && this._sources.has("/" + a))
        return this.sourcesContent[this._sources.indexOf("/" + a)];
    }
    if (r) return null;
    else throw Error('"' + a + '" is not in the SourceMap.');
  };
  Ib.prototype.generatedPositionFor = function (t) {
    var r = KA.getArg(t, "source");
    if (((r = this._findSourceIndex(r)), r < 0)) return { line: null, column: null, lastColumn: null };
    var s = { source: r, originalLine: KA.getArg(t, "line"), originalColumn: KA.getArg(t, "column") },
      a = this._findMapping(
        s,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        KA.compareByOriginalPositions,
        KA.getArg(t, "bias", sE.GREATEST_LOWER_BOUND),
      );
    if (a >= 0) {
      var H = this._originalMappings[a];
      if (H.source === s.source)
        return {
          line: KA.getArg(H, "generatedLine", null),
          column: KA.getArg(H, "generatedColumn", null),
          lastColumn: KA.getArg(H, "lastGeneratedColumn", null),
        };
    }
    return { line: null, column: null, lastColumn: null };
  };
  sza.BasicSourceMapConsumer = Ib;
  function w7(e, t) {
    var r = e;
    if (typeof e === "string") r = KA.parseSourceMapInput(e);
    var s = KA.getArg(r, "version"),
      a = KA.getArg(r, "sections");
    if (s != this._version) throw Error("Unsupported version: " + s);
    ((this._sources = new lwe()), (this._names = new lwe()));
    var H = { line: -1, column: 0 };
    this._sections = a.map(function (u) {
      if (u.url) throw Error("Support for url field in sections not implemented.");
      var f = KA.getArg(u, "offset"),
        d = KA.getArg(f, "line"),
        _ = KA.getArg(f, "column");
      if (d < H.line || (d === H.line && _ < H.column))
        throw Error("Section offsets must be ordered and non-overlapping.");
      return (
        (H = f),
        {
          generatedOffset: { generatedLine: d + 1, generatedColumn: _ + 1 },
          consumer: new sE(KA.getArg(u, "map"), t),
        }
      );
    });
  }
  w7.prototype = Object.create(sE.prototype);
  w7.prototype.constructor = sE;
  w7.prototype._version = 3;
  Object.defineProperty(w7.prototype, "sources", {
    get: function () {
      var e = [];
      for (var t = 0; t < this._sections.length; t++)
        for (var r = 0; r < this._sections[t].consumer.sources.length; r++)
          e.push(this._sections[t].consumer.sources[r]);
      return e;
    },
  });
  w7.prototype.originalPositionFor = function (t) {
    var r = { generatedLine: KA.getArg(t, "line"), generatedColumn: KA.getArg(t, "column") },
      s = hPr.search(r, this._sections, function (H, u) {
        var f = H.generatedLine - u.generatedOffset.generatedLine;
        if (f) return f;
        return H.generatedColumn - u.generatedOffset.generatedColumn;
      }),
      a = this._sections[s];
    if (!a) return { source: null, line: null, column: null, name: null };
    return a.consumer.originalPositionFor({
      line: r.generatedLine - (a.generatedOffset.generatedLine - 1),
      column:
        r.generatedColumn -
        (a.generatedOffset.generatedLine === r.generatedLine ? a.generatedOffset.generatedColumn - 1 : 0),
      bias: t.bias,
    });
  };
  w7.prototype.hasContentsOfAllSources = function () {
    return this._sections.every(function (t) {
      return t.consumer.hasContentsOfAllSources();
    });
  };
  w7.prototype.sourceContentFor = function (t, r) {
    for (var s = 0; s < this._sections.length; s++) {
      var a = this._sections[s],
        H = a.consumer.sourceContentFor(t, !0);
      if (H) return H;
    }
    if (r) return null;
    else throw Error('"' + t + '" is not in the SourceMap.');
  };
  w7.prototype.generatedPositionFor = function (t) {
    for (var r = 0; r < this._sections.length; r++) {
      var s = this._sections[r];
      if (s.consumer._findSourceIndex(KA.getArg(t, "source")) === -1) continue;
      var a = s.consumer.generatedPositionFor(t);
      if (a) {
        var H = {
          line: a.line + (s.generatedOffset.generatedLine - 1),
          column:
            a.column +
            (s.generatedOffset.generatedLine === a.line ? s.generatedOffset.generatedColumn - 1 : 0),
        };
        return H;
      }
    }
    return { line: null, column: null };
  };
  w7.prototype._parseMappings = function (t, r) {
    ((this.__generatedMappings = []), (this.__originalMappings = []));
    for (var s = 0; s < this._sections.length; s++) {
      var a = this._sections[s],
        H = a.consumer._generatedMappings;
      for (var u = 0; u < H.length; u++) {
        var f = H[u],
          d = a.consumer._sources.at(f.source);
        ((d = KA.computeSourceURL(a.consumer.sourceRoot, d, this._sourceMapURL)),
          this._sources.add(d),
          (d = this._sources.indexOf(d)));
        var _ = null;
        if (f.name) ((_ = a.consumer._names.at(f.name)), this._names.add(_), (_ = this._names.indexOf(_)));
        var L = {
          source: d,
          generatedLine: f.generatedLine + (a.generatedOffset.generatedLine - 1),
          generatedColumn:
            f.generatedColumn +
            (a.generatedOffset.generatedLine === f.generatedLine ? a.generatedOffset.generatedColumn - 1 : 0),
          originalLine: f.originalLine,
          originalColumn: f.originalColumn,
          name: _,
        };
        if ((this.__generatedMappings.push(L), typeof L.originalLine === "number"))
          this.__originalMappings.push(L);
      }
    }
    (hQe(this.__generatedMappings, KA.compareByGeneratedPositionsDeflated),
      hQe(this.__originalMappings, KA.compareByOriginalPositions));
  };
  sza.IndexedSourceMapConsumer = w7;
});