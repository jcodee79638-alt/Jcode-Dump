
var fPr = Ie(function (QKa) {
  var _Qe = HPr(),
    Y1 = uwe(),
    VCt = lPr().ArraySet,
    zKa = GJi().MappingList;
  function LR(e) {
    if (!e) e = {};
    ((this._file = Y1.getArg(e, "file", null)),
      (this._sourceRoot = Y1.getArg(e, "sourceRoot", null)),
      (this._skipValidation = Y1.getArg(e, "skipValidation", !1)),
      (this._sources = new VCt()),
      (this._names = new VCt()),
      (this._mappings = new zKa()),
      (this._sourcesContents = null));
  }
  LR.prototype._version = 3;
  LR.fromSourceMap = function (t) {
    var r = t.sourceRoot,
      s = new LR({ file: t.file, sourceRoot: r });
    return (
      t.eachMapping(function (a) {
        var H = { generated: { line: a.generatedLine, column: a.generatedColumn } };
        if (a.source != null) {
          if (((H.source = a.source), r != null)) H.source = Y1.relative(r, H.source);
          if (((H.original = { line: a.originalLine, column: a.originalColumn }), a.name != null))
            H.name = a.name;
        }
        s.addMapping(H);
      }),
      t.sources.forEach(function (a) {
        var H = a;
        if (r !== null) H = Y1.relative(r, a);
        if (!s._sources.has(H)) s._sources.add(H);
        var u = t.sourceContentFor(a);
        if (u != null) s.setSourceContent(a, u);
      }),
      s
    );
  };
  LR.prototype.addMapping = function (t) {
    var r = Y1.getArg(t, "generated"),
      s = Y1.getArg(t, "original", null),
      a = Y1.getArg(t, "source", null),
      H = Y1.getArg(t, "name", null);
    if (!this._skipValidation) this._validateMapping(r, s, a, H);
    if (a != null) {
      if (((a = String(a)), !this._sources.has(a))) this._sources.add(a);
    }
    if (H != null) {
      if (((H = String(H)), !this._names.has(H))) this._names.add(H);
    }
    this._mappings.add({
      generatedLine: r.line,
      generatedColumn: r.column,
      originalLine: s != null && s.line,
      originalColumn: s != null && s.column,
      source: a,
      name: H,
    });
  };
  LR.prototype.setSourceContent = function (t, r) {
    var s = t;
    if (this._sourceRoot != null) s = Y1.relative(this._sourceRoot, s);
    if (r != null) {
      if (!this._sourcesContents) this._sourcesContents = Object.create(null);
      this._sourcesContents[Y1.toSetString(s)] = r;
    } else if (this._sourcesContents) {
      if ((delete this._sourcesContents[Y1.toSetString(s)], Object.keys(this._sourcesContents).length === 0))
        this._sourcesContents = null;
    }
  };
  LR.prototype.applySourceMap = function (t, r, s) {
    var a = r;
    if (r == null) {
      if (t.file == null)
        throw Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`,
        );
      a = t.file;
    }
    var H = this._sourceRoot;
    if (H != null) a = Y1.relative(H, a);
    var u = new VCt(),
      f = new VCt();
    (this._mappings.unsortedForEach(function (d) {
      if (d.source === a && d.originalLine != null) {
        var _ = t.originalPositionFor({ line: d.originalLine, column: d.originalColumn });
        if (_.source != null) {
          if (((d.source = _.source), s != null)) d.source = Y1.join(s, d.source);
          if (H != null) d.source = Y1.relative(H, d.source);
          if (((d.originalLine = _.line), (d.originalColumn = _.column), _.name != null)) d.name = _.name;
        }
      }
      var L = d.source;
      if (L != null && !u.has(L)) u.add(L);
      var I = d.name;
      if (I != null && !f.has(I)) f.add(I);
    }, this),
      (this._sources = u),
      (this._names = f),
      t.sources.forEach(function (d) {
        var _ = t.sourceContentFor(d);
        if (_ != null) {
          if (s != null) d = Y1.join(s, d);
          if (H != null) d = Y1.relative(H, d);
          this.setSourceContent(d, _);
        }
      }, this));
  };
  LR.prototype._validateMapping = function (t, r, s, a) {
    if (r && typeof r.line !== "number" && typeof r.column !== "number")
      throw Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.",
      );
    if (t && "line" in t && "column" in t && t.line > 0 && t.column >= 0 && !r && !s && !a) return;
    else if (
      t &&
      "line" in t &&
      "column" in t &&
      r &&
      "line" in r &&
      "column" in r &&
      t.line > 0 &&
      t.column >= 0 &&
      r.line > 0 &&
      r.column >= 0 &&
      s
    )
      return;
    else throw Error("Invalid mapping: " + JSON.stringify({ generated: t, source: s, original: r, name: a }));
  };
  LR.prototype._serializeMappings = function () {
    var t = 0,
      r = 1,
      s = 0,
      a = 0,
      H = 0,
      u = 0,
      f = "",
      d,
      _,
      L,
      I,
      D = this._mappings.toArray();
    for (var S = 0, T = D.length; S < T; S++) {
      if (((_ = D[S]), (d = ""), _.generatedLine !== r)) {
        t = 0;
        while (_.generatedLine !== r) ((d += ";"), r++);
      } else if (S > 0) {
        if (!Y1.compareByGeneratedPositionsInflated(_, D[S - 1])) continue;
        d += ",";
      }
      if (((d += _Qe.encode(_.generatedColumn - t)), (t = _.generatedColumn), _.source != null)) {
        if (
          ((I = this._sources.indexOf(_.source)),
          (d += _Qe.encode(I - u)),
          (u = I),
          (d += _Qe.encode(_.originalLine - 1 - a)),
          (a = _.originalLine - 1),
          (d += _Qe.encode(_.originalColumn - s)),
          (s = _.originalColumn),
          _.name != null)
        )
          ((L = this._names.indexOf(_.name)), (d += _Qe.encode(L - H)), (H = L));
      }
      f += d;
    }
    return f;
  };
  LR.prototype._generateSourcesContent = function (t, r) {
    return t.map(function (s) {
      if (!this._sourcesContents) return null;
      if (r != null) s = Y1.relative(r, s);
      var a = Y1.toSetString(s);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, a) ? this._sourcesContents[a] : null;
    }, this);
  };
  LR.prototype.toJSON = function () {
    var t = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings(),
    };
    if (this._file != null) t.file = this._file;
    if (this._sourceRoot != null) t.sourceRoot = this._sourceRoot;
    if (this._sourcesContents) t.sourcesContent = this._generateSourcesContent(t.sources, t.sourceRoot);
    return t;
  };
  LR.prototype.toString = function () {
    return JSON.stringify(this.toJSON());
  };
  QKa.SourceMapGenerator = LR;
});