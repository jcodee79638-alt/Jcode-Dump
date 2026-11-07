
class qt {
  static #t = null;
  #e = 0;
  #s = 0;
  #i = null;
  #n = null;
  #a = null;
  #r = null;
  #o = 1;
  #l;
  #h = null;
  #u = [];
  constructor(t, e, s, i, n, { optionalContentConfig: r, markedContentStack: a = null }, o, l, h, d) {
    ((this.ctx = t),
      (this.current = new Mi(this.ctx.canvas.width, this.ctx.canvas.height)),
      (this.stateStack = []),
      (this.pendingClip = null),
      (this.pendingEOFill = !1),
      (this.commonObjs = e),
      (this.objs = s),
      (this.canvasFactory = i),
      (this.filterFactory = n),
      (this.groupStack = []),
      (this.baseTransform = null),
      (this.baseTransformStack = []),
      (this.groupLevel = 0),
      (this.smaskStack = []),
      (this.tempSMask = null),
      (this.smaskGroupCanvases = []),
      (this.smaskPreparedEntry = null),
      (this.smaskPreparedFor = null),
      (this.smaskPreparedOffsetX = 0),
      (this.smaskPreparedOffsetY = 0),
      (this.smaskPreparedOOBAlpha = null),
      (this.suspendedCtx = null),
      (this.contentVisible = !0),
      (this.markedContentStack = a || []),
      (this.optionalContentConfig = r),
      (this.cachedPatterns = new Map()),
      (this.annotationCanvasMap = o),
      (this.viewportScale = 1),
      (this.outputScaleX = 1),
      (this.outputScaleY = 1),
      (this.pageColors = l),
      (this._cachedScaleForStroking = [-1, 0]),
      (this._cachedBitmapsMap = new Map()),
      (this.dependencyTracker = h ?? null),
      (this.imagesTracker = d ?? null));
  }
  getObject(t, e, s = null) {
    return typeof e == "string"
      ? (this.dependencyTracker?.recordNamedDependency(t, e),
        e.startsWith("g_") ? this.commonObjs.get(e) : this.objs.get(e))
      : s;
  }
  beginDrawing({ transform: t, viewport: e, transparency: s = !1, background: i = null }) {
    const n = this.ctx.canvas.width,
      r = this.ctx.canvas.height,
      a = this.ctx.fillStyle;
    if (((this.ctx.fillStyle = i || "#ffffff"), this.ctx.fillRect(0, 0, n, r), (this.ctx.fillStyle = a), s)) {
      const o = (this.transparentCanvasEntry = this.canvasFactory.create(n, r));
      ((this.compositeCtx = this.ctx),
        ({ canvas: this.transparentCanvas, context: this.ctx } = o),
        this.ctx.save(),
        this.ctx.transform(...V(this.compositeCtx)));
    }
    (this.ctx.save(),
      Ue(this.ctx),
      t && (this.ctx.transform(...t), (this.outputScaleX = t[0]), (this.outputScaleY = t[3])),
      this.ctx.transform(...e.transform),
      (this.viewportScale = e.scale),
      (this.baseTransform = V(this.ctx)));
  }
  executeOperatorList(t, e, s, i, n) {
    const r = t.argsArray,
      a = t.fnArray;
    let o = e || 0;
    const l = r.length;
    if (l === o) return o;
    const h = l - o > ki && typeof s == "function",
      d = h ? Date.now() + Gr : 0;
    let u = 0;
    const f = this.commonObjs,
      p = this.objs;
    let g, m;
    for (;;) {
      if (i !== void 0) {
        if (o === i.nextBreakPoint) return (i.breakIt(o, s), o);
        if (i.shouldSkip(o)) {
          if (++o === l) return o;
          continue;
        }
      }
      if (!n || n(o, t))
        if (((g = a[o]), (m = r[o] ?? null), g !== Ft.dependency)) m === null ? this[g](o) : this[g](o, ...m);
        else
          for (const b of m) {
            this.dependencyTracker?.recordNamedData(b, o);
            const y = b.startsWith("g_") ? f : p;
            if (!y.has(b)) return (y.get(b, s), o);
          }
      if ((o++, o === l)) return o;
      if (h && ++u > ki) {
        if (Date.now() > d) return (s(), o);
        u = 0;
      }
    }
  }
  #d() {
    for (; this.stateStack.length || this.inSMaskMode;) this.restore();
    ((this.current.activeSMask = null),
      this.ctx.restore(),
      this.transparentCanvas &&
        ((this.ctx = this.compositeCtx),
        this.ctx.save(),
        this.ctx.setTransform(1, 0, 0, 1, 0, 0),
        this.ctx.drawImage(this.transparentCanvas, 0, 0),
        this.ctx.restore(),
        this.canvasFactory.destroy(this.transparentCanvasEntry),
        (this.transparentCanvas = null),
        (this.transparentCanvasEntry = null)));
  }
  endDrawing() {
    this.#d();
    for (const t of this.smaskGroupCanvases) this.canvasFactory.destroy(t);
    ((this.smaskGroupCanvases.length = 0),
      this._clearPreparedSMask(),
      (this.tempSMask = null),
      (this.smaskStack.length = 0));
    for (const t of this.#u) this.#w(t);
    ((this.#u.length = 0),
      (this.#i = null),
      (this.#n = null),
      (this.#a = null),
      (this.#r = null),
      (this.#o = 1),
      (this.#h = null),
      (this.#s = 0),
      (this.#e = 0),
      this.cachedPatterns.clear());
    for (const t of this._cachedBitmapsMap.values()) {
      for (const e of t.values())
        typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement && (e.width = e.height = 0);
      t.clear();
    }
    (this._cachedBitmapsMap.clear(), this.#f());
  }
  #f() {
    if (this.pageColors) {
      const t = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
      if (t !== "none") {
        const e = this.ctx.filter;
        ((this.ctx.filter = t), this.ctx.drawImage(this.ctx.canvas, 0, 0), (this.ctx.filter = e));
      }
    }
  }
  _scaleImage(t, e) {
    const s = t.width ?? t.displayWidth,
      i = t.height ?? t.displayHeight,
      n = Math.max(Math.hypot(e[0], e[1]), 1),
      r = Math.max(Math.hypot(e[2], e[3]), 1),
      a = [];
    let o = n,
      l = r,
      h = s,
      d = i;
    for (; (o > 2 && h > 1) || (l > 2 && d > 1);) {
      let b = h,
        y = d;
      (o > 2 && h > 1 && ((b = Math.ceil(h / 2)), (o /= h / b)),
        l > 2 && d > 1 && ((y = Math.ceil(d / 2)), (l /= d / y)),
        a.push({ newWidth: b, newHeight: y }),
        (h = b),
        (d = y));
    }
    if (a.length === 0) return { img: t, paintWidth: s, paintHeight: i, tmpCanvas: null };
    if (a.length === 1) {
      const { newWidth: b, newHeight: y } = a[0],
        A = this.canvasFactory.create(b, y);
      return (
        A.context.drawImage(t, 0, 0, s, i, 0, 0, b, y),
        { img: A.canvas, paintWidth: b, paintHeight: y, tmpCanvas: A }
      );
    }
    let u = this.canvasFactory.create(1, 1),
      f = this.canvasFactory.create(1, 1),
      p = s,
      g = i,
      m = t;
    for (const { newWidth: b, newHeight: y } of a)
      (this.canvasFactory.reset(f, b, y),
        f.context.drawImage(m, 0, 0, p, g, 0, 0, b, y),
        ([u, f] = [f, u]),
        (m = u.canvas),
        (p = b),
        (g = y));
    return (this.canvasFactory.destroy(f), { img: u.canvas, paintWidth: p, paintHeight: g, tmpCanvas: u });
  }
  _createMaskCanvas(t, e) {
    const s = this.ctx,
      { width: i, height: n } = e,
      r = this.current.patternFill,
      a = r ? this.current.fillColor : s.fillStyle,
      o = V(s);
    let l, h, d, u;
    if ((e.bitmap || e.data) && e.count > 1) {
      const C = e.bitmap || e.data.buffer;
      ((h = JSON.stringify(r ? o : [o.slice(0, 4), a])),
        (l = this._cachedBitmapsMap.getOrInsertComputed(C, Gs)));
      const R = l.get(h);
      if (R && !r) {
        const L = Math.round(Math.min(o[0], o[2]) + o[4]),
          O = Math.round(Math.min(o[1], o[3]) + o[5]);
        return (
          this.dependencyTracker?.recordDependencies(t, wt.transformAndFill),
          { canvas: R, offsetX: L, offsetY: O }
        );
      }
      d = R;
    }
    d || ((u = this.canvasFactory.create(i, n)), Di(u.context, e));
    let f = T.transform(o, [1 / i, 0, 0, -1 / n, 0, 0]);
    f = T.transform(f, [1, 0, 0, 1, 0, -n]);
    const p = Yt.slice();
    T.axialAlignedBoundingBox([0, 0, i, n], f, p);
    const [g, m, b, y] = p,
      A = Math.round(b - g) || 1,
      w = Math.round(y - m) || 1,
      v = this.canvasFactory.create(A, w),
      S = v.context,
      x = g,
      _ = m;
    (S.translate(-x, -_), S.transform(...f));
    let E = null;
    if (!d) {
      const C = this._scaleImage(u.canvas, Mt(S));
      ((d = C.img),
        (E = C.tmpCanvas),
        d !== u.canvas && (this.canvasFactory.destroy(u), (u = null)),
        l && r && (l.set(h, d), (E = null), (u = null)));
    }
    ((S.imageSmoothingEnabled = Fi(V(S), e.interpolate)),
      He(S, d, 0, 0, d.width, d.height, 0, 0, i, n),
      E && this.canvasFactory.destroy(E),
      u && this.canvasFactory.destroy(u),
      (S.globalCompositeOperation = "source-in"));
    const P = T.transform(Mt(S), [1, 0, 0, 1, -x, -_]);
    return (
      (S.fillStyle = r ? a.getPattern(s, this, P, ht.FILL, t) : a),
      S.fillRect(0, 0, i, n),
      l && !r && l.set(h, v.canvas),
      this.dependencyTracker?.recordDependencies(t, wt.transformAndFill),
      { canvas: v.canvas, canvasEntry: l && !r ? null : v, offsetX: Math.round(x), offsetY: Math.round(_) }
    );
  }
  setLineWidth(t, e) {
    (this.dependencyTracker?.recordSimpleData("lineWidth", t),
      e !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1),
      (this.current.lineWidth = e),
      (this.ctx.lineWidth = e));
  }
  setLineCap(t, e) {
    (this.dependencyTracker?.recordSimpleData("lineCap", t), (this.ctx.lineCap = $r[e]));
  }
  setLineJoin(t, e) {
    (this.dependencyTracker?.recordSimpleData("lineJoin", t), (this.ctx.lineJoin = zr[e]));
  }
  setMiterLimit(t, e) {
    (this.dependencyTracker?.recordSimpleData("miterLimit", t), (this.ctx.miterLimit = e));
  }
  setDash(t, e, s) {
    this.dependencyTracker?.recordSimpleData("dash", t);
    const i = this.ctx;
    i.setLineDash !== void 0 && (i.setLineDash(e), (i.lineDashOffset = s));
  }
  setRenderingIntent(t, e) {}
  setFlatness(t, e) {}
  setGState(t, e) {
    for (const [s, i] of e)
      switch (s) {
        case "LW":
          this.setLineWidth(t, i);
          break;
        case "LC":
          this.setLineCap(t, i);
          break;
        case "LJ":
          this.setLineJoin(t, i);
          break;
        case "ML":
          this.setMiterLimit(t, i);
          break;
        case "D":
          this.setDash(t, i[0], i[1]);
          break;
        case "RI":
          this.setRenderingIntent(t, i);
          break;
        case "FL":
          this.setFlatness(t, i);
          break;
        case "Font":
          this.setFont(t, i[0], i[1]);
          break;
        case "CA":
          (this.dependencyTracker?.recordSimpleData("strokeAlpha", t), (this.current.strokeAlpha = i));
          break;
        case "ca":
          (this.dependencyTracker?.recordSimpleData("fillAlpha", t),
            (this.ctx.globalAlpha = this.current.fillAlpha = i));
          break;
        case "BM":
          (this.dependencyTracker?.recordSimpleData("globalCompositeOperation", t),
            (this.ctx.globalCompositeOperation = i));
          break;
        case "SMask":
          (this.dependencyTracker?.recordSimpleData("SMask", t),
            (this.current.activeSMask = i ? this.tempSMask : null),
            this.current.activeSMask &&
              (this.current.activeSMask.blendMode = this.ctx.globalCompositeOperation),
            (this.tempSMask = null),
            this.checkSMaskState(t));
          break;
        case "TR": {
          this.dependencyTracker?.recordSimpleData("filter", t);
          let n = this.filterFactory.addFilter(i);
          this.ctx.filter = n;
          let r = null;
          (i &&
            (n === "none" ||
              !j.isCanvasFilterSupported ||
              this.ctx.filter === "none" ||
              this.ctx.filter === "") &&
            ((this.ctx.filter = n = "none"), (r = new Ks(i))),
            (this.current.transferMaps = n),
            (r || this.current.transferMapsFallback) &&
              ((this.current.transferMapsFallback = r),
              this.current.patternFill || (this.ctx.fillStyle = this.#A(this.current.fillColor)),
              this.current.patternStroke || (this.ctx.strokeStyle = this.#A(this.current.strokeColor))));
          break;
        }
      }
  }
  get inSMaskMode() {
    return !!this.suspendedCtx;
  }
  _clearPreparedSMask() {
    (this.smaskPreparedEntry &&
      (this.canvasFactory.destroy(this.smaskPreparedEntry), (this.smaskPreparedEntry = null)),
      (this.smaskPreparedFor = null),
      (this.smaskPreparedOffsetX = 0),
      (this.smaskPreparedOffsetY = 0),
      (this.smaskPreparedOOBAlpha = null));
  }
  _ensurePreparedSMask(t) {
    t !== this.smaskPreparedFor && (this._clearPreparedSMask(), this._prepareSMaskCanvas(t));
  }
  checkSMaskState(t) {
    const e = this.inSMaskMode;
    this.current.activeSMask && !e
      ? this.beginSMaskMode(t)
      : !this.current.activeSMask && e
        ? this.endSMaskMode()
        : this.current.activeSMask && e && this._ensurePreparedSMask(this.current.activeSMask);
  }
  _prepareSMaskCanvas(t) {
    const { canvas: e, subtype: s, backdrop: i, transferMap: n } = t,
      r = s === "Luminosity" || (s === "Alpha" && n);
    if (!r && !(s === "Luminosity" && i)) {
      this.smaskPreparedFor = t;
      return;
    }
    let a;
    if (s === "Luminosity" && i) {
      const [y, A, w] = ge(i),
        v = Math.round(0.3 * y + 0.59 * A + 0.11 * w);
      a = n?.[v] ?? v;
    } else a = n?.[0] ?? 0;
    const o = 4,
      { width: l, height: h } = this.ctx.canvas,
      d = e.width * e.height,
      u = l * h < o * d,
      f = r
        ? {
            url:
              s === "Alpha"
                ? this.filterFactory.addAlphaFilter(n)
                : this.filterFactory.addLuminosityFilter(n),
            subtype: s,
            transferMap: n,
          }
        : null,
      p = s === "Luminosity" ? i : null;
    let g, m, b;
    (u
      ? ((g = this._bakeSMaskCanvas(e, t.offsetX, t.offsetY, l, h, p, f)), (m = 0), (b = 0))
      : ((g = this._bakeSMaskCanvas(e, 0, 0, e.width, e.height, p, f)), (m = t.offsetX), (b = t.offsetY)),
      (this.smaskPreparedEntry = g),
      (this.smaskPreparedFor = t),
      (this.smaskPreparedOffsetX = m),
      (this.smaskPreparedOffsetY = b),
      (this.smaskPreparedOOBAlpha = !u && a !== 0 ? a : null));
  }
  _bakeSMaskCanvas(t, e, s, i, n, r, a) {
    !r && !a && $("_bakeSMaskCanvas with neither backdrop nor filter");
    const o = this.canvasFactory.create(i, n),
      l = o.context;
    if (
      (l.drawImage(t, e, s),
      r && ((l.globalCompositeOperation = "destination-atop"), (l.fillStyle = r), l.fillRect(0, 0, i, n)),
      !a)
    )
      return o;
    const h = this.canvasFactory.create(i, n),
      d = h.context;
    d.filter = a.url;
    const u = j.isCanvasFilterSupported && d.filter !== "none" && d.filter !== "";
    if ((d.drawImage(o.canvas, 0, 0), j.isCanvasFilterSupported && (d.filter = "none"), !u)) {
      const f = d.getImageData(0, 0, i, n),
        { data: p } = f,
        { transferMap: g } = a;
      if (a.subtype === "Luminosity")
        for (let m = 0, b = p.length; m < b; m += 4) {
          const y = (0.3 * p[m] + 0.59 * p[m + 1] + 0.11 * p[m + 2] + 0.5) | 0;
          ((p[m] = p[m + 1] = p[m + 2] = 0), (p[m + 3] = g?.[y] ?? y));
        }
      else for (let m = 3, b = p.length; m < b; m += 4) p[m] = g[p[m]];
      d.putImageData(f, 0, 0);
    }
    return (this.canvasFactory.destroy(o), h);
  }
  beginSMaskMode(t) {
    if (this.inSMaskMode) throw new Error("beginSMaskMode called while already in smask mode");
    const { width: e, height: s } = this.ctx.canvas,
      i = this.canvasFactory.create(e, s);
    ((this.smaskScratchCanvas = i), (this.suspendedCtx = this.ctx));
    const n = (this.ctx = i.context);
    (n.setTransform(this.suspendedCtx.getTransform()),
      Wt(this.suspendedCtx, n),
      Pi(n, this.suspendedCtx),
      this._ensurePreparedSMask(this.current.activeSMask),
      this.setGState(t, [["BM", "source-over"]]));
  }
  endSMaskMode() {
    if (!this.inSMaskMode) throw new Error("endSMaskMode called while not in smask mode");
    (this.ctx._removeMirroring(),
      Wt(this.ctx, this.suspendedCtx),
      (this.ctx = this.suspendedCtx),
      (this.suspendedCtx = null),
      this.canvasFactory.destroy(this.smaskScratchCanvas),
      (this.smaskScratchCanvas = null),
      this._clearPreparedSMask());
  }
  #g(t, e = null, s = 1) {
    const { width: i, height: n } = t,
      r = e ?? this.canvasFactory.create(i, n),
      a = r.context;
    s = Math.round(s * 255) / 255;
    const o = s < 1;
    o && this.#l === void 0 && (this.#l = j.isCanvasFilterSupported ? new Map() : "none");
    let l = "none";
    if (
      (o &&
        this.#l instanceof Map &&
        (l = this.#l.getOrInsertComputed(s, () => this.filterFactory.addKnockoutFilter(s))),
      !o || l !== "none")
    )
      return (
        e && (a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, i, n), a.restore()),
        (a.filter = l),
        a.drawImage(t, 0, 0),
        (a.filter = "none"),
        r
      );
    const h = t.getContext("2d", { willReadFrequently: !0 }).getImageData(0, 0, i, n),
      d = a.createImageData(i, n),
      u = h.data,
      f = d.data,
      p = s > 0 ? 1 / s : 1e6;
    for (let g = 3, m = u.length; g < m; g += 4) f[g] = Math.min(Math.round(u[g] * p), 255);
    return (a.putImageData(d, 0, 0), r);
  }
  #m(t, e, s, i) {
    let n = t?.[e] ?? null;
    if (
      (n && (n.canvas.width !== s || n.canvas.height !== i) && (this.canvasFactory.destroy(n), (n = null)),
      !n)
    )
      return ((n = this.canvasFactory.create(s, i)), t && (t[e] = n), n);
    const r = n.context;
    return (r.save(), r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, s, i), r.restore(), n);
  }
  #c(t, e, s = {}) {
    const {
        backdropCanvas: i = null,
        destTransform: n = [1, 0, 0, 1, 0, 0],
        backdropOffset: r = [0, 0],
        reuseMaskEntry: a = null,
        poolMeta: o = null,
        sourceAlpha: l = 1,
        sourceFilter: h = "none",
        knockoutAlpha: d = 1,
      } = s,
      { width: u, height: f } = e,
      p = this.#g(e, a, d),
      g = t.globalCompositeOperation;
    if (
      (t.save(),
      t.setTransform(...n),
      (t.globalAlpha = 1),
      j.isCanvasFilterSupported && (t.filter = "none"),
      (t.globalCompositeOperation = "destination-out"),
      t.drawImage(p.canvas, 0, 0),
      i)
    ) {
      const [m, b] = r,
        y = this.#m(o, "knockoutBackdropEntry", u, f),
        A = y.context;
      (A.drawImage(i, m, b, u, f, 0, 0, u, f),
        (A.globalCompositeOperation = "destination-in"),
        A.drawImage(p.canvas, 0, 0),
        (A.globalCompositeOperation = "source-over"),
        (t.globalCompositeOperation = "destination-over"),
        t.drawImage(y.canvas, 0, 0),
        o || this.canvasFactory.destroy(y));
    }
    ((t.globalCompositeOperation = g),
      (t.globalAlpha = l),
      j.isCanvasFilterSupported && (t.filter = h ?? "none"),
      t.drawImage(e, 0, 0),
      t.restore(),
      a || this.canvasFactory.destroy(p));
  }
  #p(t = 1) {
    if (this.#e === 0 || this.#s > 0 || !this.contentVisible) return !1;
    (this.#s++, (this.#o = t));
    const e = this.#u.at(-1),
      { canvas: s } = this.ctx,
      i = this.#m(e, "knockoutTempEntry", s.width, s.height);
    this.#i = i;
    const n = i.context;
    return (
      n.save(),
      n.setTransform(this.ctx.getTransform()),
      Wt(this.ctx, n),
      (this.#r = n.globalCompositeOperation),
      (n.globalCompositeOperation = "source-over"),
      Pi(n, this.ctx),
      (this.#h = e),
      (this.#n = this.ctx),
      (this.#a = this.suspendedCtx),
      (this.ctx = n),
      this.inSMaskMode && (this.suspendedCtx = n),
      !0
    );
  }
  #b(t) {
    if (!t) return;
    const e = this.#i,
      s = this.#n,
      i = this.#a,
      n = e.context;
    ((this.#i = null),
      (this.#n = null),
      (this.#a = null),
      this.inSMaskMode && this.suspendedCtx === n && this.ctx !== n && this.endSMaskMode(),
      this.inSMaskMode && (this.suspendedCtx = i),
      this.ctx._removeMirroring(),
      (this.ctx.globalCompositeOperation = this.#r),
      (this.#r = null),
      Wt(this.ctx, s),
      (this.ctx = s));
    const r = this.#h;
    this.#h = null;
    const a = this.#o;
    this.#o = 1;
    try {
      this.#c(i ?? s, e.canvas, {
        backdropCanvas: r?.backdropCtx?.canvas ?? null,
        backdropOffset: r?.backdropCtx ? [r.offsetX, r.offsetY] : [0, 0],
        reuseMaskEntry: r?.knockoutMaskEntry ?? null,
        poolMeta: r,
        knockoutAlpha: a,
      });
    } finally {
      (n.restore(), this.#s--, r || this.canvasFactory.destroy(e));
    }
  }
  compose(t) {
    if (!this.current.activeSMask) return;
    t = t
      ? [Math.floor(t[0]), Math.floor(t[1]), Math.ceil(t[2]), Math.ceil(t[3])]
      : [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    const e = this.current.activeSMask,
      s = this.suspendedCtx,
      i = this.#s > 0 && s === this.ctx;
    (this.composeSMask(i ? null : s, e, this.ctx, t),
      !i &&
        (this.ctx.save(),
        this.ctx.setTransform(1, 0, 0, 1, 0, 0),
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height),
        this.ctx.restore()));
  }
  composeSMask(t, e, s, i) {
    const n = i[0],
      r = i[1],
      a = i[2] - n,
      o = i[3] - r;
    if (a === 0 || o === 0) return;
    const l = this.smaskPreparedEntry;
    if (l) {
      let h = n,
        d = r,
        u = a,
        f = o;
      const p = this.smaskPreparedOOBAlpha,
        g = p !== null;
      if (g) {
        ((h = Math.max(n, e.offsetX)), (d = Math.max(r, e.offsetY)));
        const m = Math.min(n + a, e.offsetX + e.canvas.width),
          b = Math.min(r + o, e.offsetY + e.canvas.height);
        ((u = m - h), (f = b - d));
      }
      if (u > 0 && f > 0) {
        const m = h - this.smaskPreparedOffsetX,
          b = d - this.smaskPreparedOffsetY;
        (s.save(), (s.globalAlpha = 1), s.setTransform(1, 0, 0, 1, 0, 0));
        const y = new Path2D();
        (y.rect(h, d, u, f),
          s.clip(y),
          (s.globalCompositeOperation = "destination-in"),
          s.drawImage(l.canvas, m, b, u, f, h, d, u, f),
          s.restore());
      }
      g && p < 255 && this._applySMaskOOBAlpha(s, n, r, a, o, h, d, h + u, d + f, p);
    } else this.genericComposeSMask(e, s, a, o, n, r);
    t &&
      (t.save(),
      (t.globalAlpha = 1),
      (t.globalCompositeOperation = e.blendMode || "source-over"),
      t.setTransform(1, 0, 0, 1, 0, 0),
      t.drawImage(s.canvas, n, r, a, o, n, r, a, o),
      t.restore());
  }
  _applySMaskOOBAlpha(t, e, s, i, n, r, a, o, l, h) {
    const d = r < o && a < l;
    if (d && r === e && a === s && o === e + i && l === s + n) return;
    const u = new Path2D();
    (u.rect(e, s, i, n),
      d && u.rect(r, a, o - r, l - a),
      t.save(),
      (t.globalAlpha = h / 255),
      t.setTransform(1, 0, 0, 1, 0, 0),
      t.clip(u, "evenodd"),
      (t.globalCompositeOperation = "destination-in"),
      (t.fillStyle = "#000000"),
      t.fillRect(e, s, i, n),
      t.restore());
  }
  genericComposeSMask(t, e, s, i, n, r) {
    const { context: a, offsetX: o, offsetY: l } = t;
    (e.save(), (e.globalAlpha = 1), e.setTransform(1, 0, 0, 1, 0, 0));
    const h = new Path2D();
    (h.rect(n, r, s, i),
      e.clip(h),
      (e.globalCompositeOperation = "destination-in"),
      e.drawImage(a.canvas, n - o, r - l, s, i, n, r, s, i),
      e.restore());
  }
  save(t) {
    (this.inSMaskMode && Wt(this.ctx, this.suspendedCtx), this.ctx.save());
    const e = this.current;
    (this.stateStack.push(e), (this.current = e.clone()), this.dependencyTracker?.save(t));
  }
  restore(t) {
    if ((this.dependencyTracker?.restore(t), this.stateStack.length === 0)) {
      this.inSMaskMode && this.endSMaskMode();
      return;
    }
    ((this.current = this.stateStack.pop()),
      this.ctx.restore(),
      this.inSMaskMode &&
        (Wt(this.suspendedCtx, this.ctx), this.ctx.setTransform(this.suspendedCtx.getTransform())),
      this.checkSMaskState(t),
      (this.pendingClip = null),
      (this._cachedScaleForStroking[0] = -1));
  }
  transform(t, e, s, i, n, r, a) {
    (this.dependencyTracker?.recordIncrementalData("transform", t),
      this.ctx.transform(e, s, i, n, r, a),
      (this._cachedScaleForStroking[0] = -1));
  }
  constructPath(t, e, s, i) {
    let [n] = s;
    if (!i) {
      ((n ||= s[0] = new Path2D()),
        e !== Ft.stroke && e !== Ft.closeStroke && (this.current.tilingPatternDims = null),
        this[e](t, n));
      return;
    }
    if (this.dependencyTracker !== null) {
      const a = e === Ft.stroke ? this.current.lineWidth / 2 : 0;
      this.dependencyTracker
        .resetBBox(t)
        .recordBBox(t, this.ctx, i[0] - a, i[2] + a, i[1] - a, i[3] + a)
        .recordDependencies(t, ["transform"]);
    }
    (n instanceof Path2D || (n = s[0] = Wi(n)),
      T.axialAlignedBoundingBox(i, V(this.ctx), this.current.minMax));
    const r = this.current.tilingPatternDims;
    if (r && e !== Ft.stroke && e !== Ft.closeStroke && this.current.fillColor instanceof Ee) {
      const a = T.intersect(this.current.clipBox, this.current.minMax);
      a ? this.current.fillColor.updatePatternDims(a, r) : (this.current.tilingPatternDims = null);
    }
    (this[e](t, n), (this._pathStartIdx = t));
  }
  closePath(t) {
    this.ctx.closePath();
  }
  stroke(t, e, s = !0) {
    const i = s && this.#p(this.current.strokeAlpha),
      n = this.ctx,
      r = this.current.strokeColor;
    if (((n.globalAlpha = this.current.strokeAlpha), this.contentVisible))
      if (typeof r == "object" && r?.getPattern) {
        const a = r.isModifyingCurrentTransform() ? n.getTransform() : null;
        if ((n.save(), (n.strokeStyle = r.getPattern(n, this, Mt(n), ht.STROKE, t)), a)) {
          const o = new Path2D();
          (o.addPath(e, n.getTransform().invertSelf().multiplySelf(a)), (e = o));
        }
        (this.rescaleAndStroke(e, !1), n.restore());
      } else this.rescaleAndStroke(e, !0);
    (this.dependencyTracker?.recordDependencies(t, wt.stroke),
      s && this.consumePath(t, e, this.current.getClippedPathBoundingBox(ht.STROKE, V(this.ctx))),
      (n.globalAlpha = this.current.fillAlpha),
      this.#b(i));
  }
  closeStroke(t, e) {
    this.stroke(t, e);
  }
  fill(t, e, s = !0) {
    const i = s && this.#p(this.current.fillAlpha),
      n = this.ctx,
      r = this.current.fillColor,
      a = this.current.patternFill;
    let o = !1;
    const l = this.current.getClippedPathBoundingBox();
    if ((this.dependencyTracker?.recordDependencies(t, wt.fill), a)) {
      const h = this.current.tilingPatternDims,
        d = h && r.canSkipPatternCanvas(h);
      if (d) {
        (r.drawPattern(this, e, this.pendingEOFill, d, t),
          (this.pendingEOFill = !1),
          s && this.consumePath(t, e, l),
          (this.current.tilingPatternDims = null),
          this.#b(i));
        return;
      }
      const u = r.isModifyingCurrentTransform() ? n.getTransform() : null;
      if (
        (this.dependencyTracker?.save(t),
        n.save(),
        (n.fillStyle = r.getPattern(n, this, Mt(n), ht.FILL, t)),
        u)
      ) {
        const f = new Path2D();
        (f.addPath(e, n.getTransform().invertSelf().multiplySelf(u)), (e = f));
      }
      o = !0;
    }
    (this.contentVisible &&
      l !== null &&
      (this.pendingEOFill ? (n.fill(e, "evenodd"), (this.pendingEOFill = !1)) : n.fill(e)),
      o && (n.restore(), this.dependencyTracker?.restore(t)),
      s && this.consumePath(t, e, l),
      this.#b(i));
  }
  eoFill(t, e) {
    ((this.pendingEOFill = !0), this.fill(t, e));
  }
  fillStroke(t, e) {
    const s = this.#p(Math.min(this.current.fillAlpha, this.current.strokeAlpha));
    (this.fill(t, e, !1), this.stroke(t, e, !1), this.consumePath(t, e), this.#b(s));
  }
  eoFillStroke(t, e) {
    ((this.pendingEOFill = !0), this.fillStroke(t, e));
  }
  closeFillStroke(t, e) {
    this.fillStroke(t, e);
  }
  closeEOFillStroke(t, e) {
    ((this.pendingEOFill = !0), this.fillStroke(t, e));
  }
  endPath(t, e) {
    this.consumePath(t, e);
  }
  rawFillPath(t, e) {
    const s = this.#p(this.current.fillAlpha);
    (this.ctx.fill(e),
      this.dependencyTracker?.recordDependencies(t, wt.rawFillPath).recordOperation(t),
      this.#b(s));
  }
  clip(t) {
    (this.dependencyTracker?.recordFutureForcedDependency("clipMode", t), (this.pendingClip = jr));
  }
  eoClip(t) {
    (this.dependencyTracker?.recordFutureForcedDependency("clipMode", t), (this.pendingClip = Oi));
  }
  beginText(t) {
    ((this.current.textMatrix = null),
      (this.current.textMatrixScale = 1),
      (this.current.x = this.current.lineX = 0),
      (this.current.y = this.current.lineY = 0),
      this.dependencyTracker
        ?.recordOpenMarker(t)
        .resetIncrementalData("sameLineText")
        .resetIncrementalData("moveText", t));
  }
  endText(t) {
    const e = this.pendingTextPaths,
      s = this.ctx;
    if (this.dependencyTracker) {
      const { dependencyTracker: i } = this;
      (e !== void 0 &&
        i
          .recordFutureForcedDependency("textClip", i.getOpenMarker())
          .recordFutureForcedDependency("textClip", t),
        i.recordCloseMarker(t));
    }
    if (e !== void 0) {
      const i = new Path2D(),
        n = s.getTransform().invertSelf();
      for (const { transform: r, x: a, y: o, fontSize: l, path: h } of e)
        h && i.addPath(h, new DOMMatrix(r).preMultiplySelf(n).translate(a, o).scale(l, -l));
      s.clip(i);
    }
    delete this.pendingTextPaths;
  }
  setCharSpacing(t, e) {
    (this.dependencyTracker?.recordSimpleData("charSpacing", t), (this.current.charSpacing = e));
  }
  setWordSpacing(t, e) {
    (this.dependencyTracker?.recordSimpleData("wordSpacing", t), (this.current.wordSpacing = e));
  }
  setHScale(t, e) {
    (this.dependencyTracker?.recordSimpleData("hScale", t), (this.current.textHScale = e / 100));
  }
  setLeading(t, e) {
    (this.dependencyTracker?.recordSimpleData("leading", t), (this.current.leading = -e));
  }
  setFont(t, e, s) {
    this.dependencyTracker?.recordSimpleData("font", t).recordSimpleDataFromNamed("fontObj", e, t);
    const i = this.commonObjs.get(e),
      n = this.current;
    if (!i) throw new Error(`Can't find font for ${e}`);
    if (
      ((n.fontMatrix = i.fontMatrix || xs),
      (n.fontMatrix[0] === 0 || n.fontMatrix[3] === 0) && H("Invalid font matrix for font " + e),
      s < 0 ? ((s = -s), (n.fontDirection = -1)) : (n.fontDirection = 1),
      (this.current.font = i),
      (this.current.fontSize = s),
      i.isType3Font)
    )
      return;
    const r = i.loadedName || "sans-serif",
      a = i.systemFontInfo?.css || `"${r}", ${i.fallbackName}`;
    let o = "normal";
    i.black ? (o = "900") : i.bold && (o = "bold");
    const l = i.italic ? "italic" : "normal",
      h = Y(s, Hr, Ur);
    ((this.current.fontSizeScale = s / h), (this.ctx.font = `${l} ${o} ${h}px ${a}`));
  }
  setTextRenderingMode(t, e) {
    (this.dependencyTracker?.recordSimpleData("textRenderingMode", t), (this.current.textRenderingMode = e));
  }
  setTextRise(t, e) {
    (this.dependencyTracker?.recordSimpleData("textRise", t), (this.current.textRise = e));
  }
  moveText(t, e, s) {
    (this.dependencyTracker?.resetIncrementalData("sameLineText").recordIncrementalData("moveText", t),
      (this.current.x = this.current.lineX += e),
      (this.current.y = this.current.lineY += s));
  }
  setLeadingMoveText(t, e, s) {
    (this.setLeading(t, -s), this.moveText(t, e, s));
  }
  setTextMatrix(t, e) {
    this.dependencyTracker?.resetIncrementalData("sameLineText").recordSimpleData("textMatrix", t);
    const { current: s } = this;
    ((s.textMatrix = e),
      (s.textMatrixScale = Math.hypot(e[0], e[1])),
      (s.x = s.lineX = 0),
      (s.y = s.lineY = 0));
  }
  nextLine(t) {
    (this.moveText(t, 0, this.current.leading),
      this.dependencyTracker?.recordIncrementalData(
        "moveText",
        this.dependencyTracker.getSimpleIndex("leading") ?? t,
      ));
  }
  #y(t, e, s) {
    const i = new Path2D();
    return (i.addPath(t, new DOMMatrix(s).invertSelf().multiplySelf(e)), i);
  }
  paintChar(t, e, s, i, n, r) {
    const a = this.ctx,
      o = this.current,
      l = o.font,
      h = o.textRenderingMode,
      d = o.fontSize / o.fontSizeScale,
      u = h & nt.FILL_STROKE_MASK,
      f = !!(h & nt.ADD_TO_PATH_FLAG),
      p = o.patternFill && !l.missingFile,
      g = o.patternStroke && !l.missingFile;
    let m;
    if (
      ((l.disableFontFace || f || p || g) && !l.missingFile && (m = l.getPathGenerator(this.commonObjs, e)),
      m && (l.disableFontFace || p || g))
    ) {
      (a.save(), a.translate(s, i), a.scale(d, -d), this.dependencyTracker?.recordCharacterBBox(t, a, l));
      let b;
      if (u === nt.FILL || u === nt.FILL_STROKE)
        if (n) {
          ((b = a.getTransform()), a.setTransform(...n));
          const y = this.#y(m, b, n);
          a.fill(y);
        } else a.fill(m);
      if (u === nt.STROKE || u === nt.FILL_STROKE)
        if (r) {
          ((b ||= a.getTransform()), a.setTransform(...r));
          const { a: y, b: A, c: w, d: v } = b,
            S = T.inverseTransform(r),
            x = T.transform([y, A, w, v, 0, 0], S);
          (T.singularValueDecompose2dScale(x, yt),
            (a.lineWidth *= Math.max(yt[0], yt[1]) / d),
            a.stroke(this.#y(m, b, r)));
        } else ((a.lineWidth /= d), a.stroke(m));
      a.restore();
    } else
      ((u === nt.FILL || u === nt.FILL_STROKE) &&
        (a.fillText(e, s, i),
        this.dependencyTracker?.recordCharacterBBox(t, a, l, d, s, i, () => a.measureText(e))),
        (u === nt.STROKE || u === nt.FILL_STROKE) &&
          (this.dependencyTracker &&
            this.dependencyTracker
              ?.recordCharacterBBox(t, a, l, d, s, i, () => a.measureText(e))
              .recordDependencies(t, wt.stroke),
          a.strokeText(e, s, i)));
    f &&
      ((this.pendingTextPaths ||= []).push({ transform: V(a), x: s, y: i, fontSize: d, path: m }),
      this.dependencyTracker?.recordCharacterBBox(t, a, l, d, s, i));
  }
  get isFontSubpixelAAEnabled() {
    const t = this.canvasFactory.create(10, 10),
      e = t.context;
    (e.scale(1.5, 1), e.fillText("I", 0, 10));
    const s = e.getImageData(0, 0, 10, 10).data;
    this.canvasFactory.destroy(t);
    let i = !1;
    for (let n = 3; n < s.length; n += 4)
      if (s[n] > 0 && s[n] < 255) {
        i = !0;
        break;
      }
    return k(this, "isFontSubpixelAAEnabled", i);
  }
  showText(t, e) {
    this.dependencyTracker &&
      (this.dependencyTracker.recordDependencies(t, wt.showText).resetBBox(t),
      this.current.textRenderingMode & nt.ADD_TO_PATH_FLAG &&
        this.dependencyTracker
          .recordFutureForcedDependency("textClip", t)
          .inheritPendingDependenciesAsFutureForcedDependencies());
    const s = this.current,
      i = s.font;
    if (i.isType3Font) {
      const C = this.#p(s.fillAlpha);
      (this.showType3Text(t, e), this.dependencyTracker?.recordShowTextOperation(t), this.#b(C));
      return;
    }
    const n = s.fontSize;
    if (n === 0) {
      this.dependencyTracker?.recordOperation(t);
      return;
    }
    const r = this.#p(s.fillAlpha),
      a = this.ctx,
      o = s.fontSizeScale,
      l = s.charSpacing,
      h = s.wordSpacing,
      d = s.fontDirection,
      u = s.textHScale * d,
      f = e.length,
      p = i.vertical,
      g = p ? 1 : -1,
      m = n * s.fontMatrix[0],
      b = s.textRenderingMode === nt.FILL && !i.disableFontFace && !s.patternFill;
    (a.save(),
      s.textMatrix && a.transform(...s.textMatrix),
      a.translate(s.x, s.y + s.textRise),
      d > 0 ? a.scale(u, -1) : a.scale(u, 1));
    let y, A;
    const w = s.textRenderingMode & nt.FILL_STROKE_MASK,
      v = w === nt.FILL || w === nt.FILL_STROKE,
      S = w === nt.STROKE || w === nt.FILL_STROKE;
    let x = s.lineWidth;
    const _ = s.textMatrixScale;
    if (
      (_ === 0 || x === 0 ? S && (x = this.getSinglePixelWidth()) : (x /= _),
      o !== 1 && (a.scale(o, o), (x /= o)),
      (a.lineWidth = x),
      v && s.patternFill)
    ) {
      a.save();
      const C = s.fillColor.getPattern(a, this, Mt(a), ht.FILL, t);
      ((y = V(a)), a.restore(), (a.fillStyle = C));
    }
    if (S && s.patternStroke) {
      a.save();
      const C = s.strokeColor.getPattern(a, this, Mt(a), ht.STROKE, t);
      ((A = V(a)), a.restore(), (a.strokeStyle = C));
    }
    if (i.isInvalidPDFjsFont) {
      const C = [];
      let R = 0;
      for (const O of e) (C.push(O.unicode), (R += O.width));
      const L = C.join("");
      if ((a.fillText(L, 0, 0), this.dependencyTracker !== null)) {
        const O = a.measureText(L);
        this.dependencyTracker
          .recordBBox(
            t,
            this.ctx,
            -O.actualBoundingBoxLeft,
            O.actualBoundingBoxRight,
            -O.actualBoundingBoxAscent,
            O.actualBoundingBoxDescent,
          )
          .recordShowTextOperation(t);
      }
      ((s.x += R * m * u), a.restore(), this.compose(), this.#b(r));
      return;
    }
    let E = 0,
      P;
    for (P = 0; P < f; ++P) {
      const C = e[P];
      if (typeof C == "number") {
        E += (g * C * n) / 1e3;
        continue;
      }
      let R = !1;
      const L = (C.isSpace ? h : 0) + l,
        O = C.fontChar,
        W = C.accent;
      let I,
        F,
        et = C.width;
      if (p) {
        const ot = C.vmetric,
          q = -ot[1] * m,
          X = ot[2] * m;
        ((et = -ot[0]), (I = q / o), (F = (E + X) / o));
      } else ((I = E / o), (F = 0));
      let it;
      if (i.remeasure && et > 0) {
        it = a.measureText(O);
        const ot = ((it.width * 1e3) / n) * o;
        if (et < ot && this.isFontSubpixelAAEnabled) {
          const q = et / ot;
          ((R = !0), a.save(), a.scale(q, 1), (I /= q));
        } else et !== ot && (I += (((et - ot) / 2e3) * n) / o);
      }
      if (this.contentVisible && (C.isInFont || i.missingFile)) {
        if (b && !W)
          (a.fillText(O, I, F),
            this.dependencyTracker?.recordCharacterBBox(
              t,
              a,
              it ? { bbox: null } : i,
              n / o,
              I,
              F,
              () => it ?? a.measureText(O),
            ));
        else if ((this.paintChar(t, O, I, F, y, A), W)) {
          const ot = I + (n * W.offset.x) / o,
            q = F - (n * W.offset.y) / o;
          this.paintChar(t, W.fontChar, ot, q, y, A);
        }
      }
      const Ht = p ? et * m - L * d : et * m + L * d;
      ((E += Ht), R && a.restore());
    }
    (p ? (s.y -= E) : (s.x += E * u),
      a.restore(),
      this.compose(),
      this.dependencyTracker?.recordShowTextOperation(t),
      this.#b(r));
  }
  showType3Text(t, e) {
    const s = this.ctx,
      i = this.current,
      n = i.font,
      r = i.fontSize,
      a = i.fontDirection,
      o = n.vertical ? 1 : -1,
      l = i.charSpacing,
      h = i.wordSpacing,
      d = i.textHScale * a,
      u = i.fontMatrix || xs,
      f = e.length,
      p = i.textRenderingMode === nt.INVISIBLE;
    let g, m, b, y;
    if (p || r === 0) return;
    ((this._cachedScaleForStroking[0] = -1),
      s.save(),
      i.textMatrix && s.transform(...i.textMatrix),
      s.translate(i.x, i.y + i.textRise),
      s.scale(d, a));
    const A = this.dependencyTracker;
    for (this.dependencyTracker = A ? new ke(A, t) : null, g = 0; g < f; ++g) {
      if (((m = e[g]), typeof m == "number")) {
        ((y = (o * m * r) / 1e3), this.ctx.translate(y, 0), (i.x += y * d));
        continue;
      }
      const w = (m.isSpace ? h : 0) + l,
        v = n.charProcOperatorList.get(m.operatorListId);
      v
        ? this.contentVisible &&
          (this.save(),
          v.fnArray[0] === Ft.setCharWidth && ((i.fillAlpha = i.strokeAlpha = 1), (s.globalAlpha = 1)),
          s.scale(r, r),
          s.transform(...u),
          this.executeOperatorList(v),
          this.restore())
        : H(`Type3 character "${m.operatorListId}" is not available.`);
      const S = [m.width, 0];
      (T.applyTransform(S, u), (b = S[0] * r + w), s.translate(b, 0), (i.x += b * d));
    }
    (s.restore(), A && (this.dependencyTracker = A));
  }
  setCharWidth(t, e, s) {}
  setCharWidthAndBounds(t, e, s, i, n, r, a) {
    const o = new Path2D();
    (o.rect(i, n, r - i, a - n),
      this.ctx.clip(o),
      this.dependencyTracker?.recordBBox(t, this.ctx, i, r, n, a).recordClipBox(t, this.ctx, i, r, n, a),
      this.endPath(t));
  }
  getColorN_Pattern(t, e) {
    let s;
    if (e[0] === "TilingPattern") {
      const i = this.baseTransform || V(this.ctx),
        n = {
          createCanvasGraphics: (r, a) =>
            new qt(
              r,
              this.commonObjs,
              this.objs,
              this.canvasFactory,
              this.filterFactory,
              {
                optionalContentConfig: this.optionalContentConfig,
                markedContentStack: this.markedContentStack,
              },
              void 0,
              void 0,
              this.dependencyTracker ? new ke(this.dependencyTracker, a, !0) : null,
            ),
        };
      s = new Ee(e, this.ctx, n, i);
    } else s = this._getPattern(t, e[1], e[2]);
    return s;
  }
  setStrokeColorN(t, ...e) {
    (this.dependencyTracker?.recordSimpleData("strokeColor", t),
      (this.current.strokeColor = this.getColorN_Pattern(t, e)),
      (this.current.patternStroke = !0));
  }
  setFillColorN(t, ...e) {
    this.dependencyTracker?.recordSimpleData("fillColor", t);
    const s = (this.current.fillColor = this.getColorN_Pattern(t, e));
    ((this.current.patternFill = !0),
      (this.current.tilingPatternDims = s instanceof Ee ? [0, 0, 0, 0] : null));
  }
  #A(t) {
    return this.current.transferMapsFallback?.applyToColor(t) ?? t;
  }
  setStrokeRGBColor(t, e) {
    (this.dependencyTracker?.recordSimpleData("strokeColor", t),
      (this.current.strokeColor = e),
      (this.ctx.strokeStyle = this.#A(e)),
      (this.current.patternStroke = !1));
  }
  setStrokeTransparent(t) {
    (this.dependencyTracker?.recordSimpleData("strokeColor", t),
      (this.ctx.strokeStyle = this.current.strokeColor = "transparent"),
      (this.current.patternStroke = !1));
  }
  setFillRGBColor(t, e) {
    (this.dependencyTracker?.recordSimpleData("fillColor", t),
      (this.current.fillColor = e),
      (this.ctx.fillStyle = this.#A(e)),
      (this.current.patternFill = !1),
      (this.current.tilingPatternDims = null));
  }
  setFillTransparent(t) {
    (this.dependencyTracker?.recordSimpleData("fillColor", t),
      (this.ctx.fillStyle = this.current.fillColor = "transparent"),
      (this.current.patternFill = !1),
      (this.current.tilingPatternDims = null));
  }
  _getPattern(t, e, s = null) {
    const i = this.cachedPatterns.getOrInsertComputed(e, () => Br(this.getObject(t, e)));
    return (s && (i.matrix = s), i);
  }
  shadingFill(t, e) {
    if (!this.contentVisible) return;
    const s = this.#p(this.current.fillAlpha),
      i = this.ctx;
    this.save(t);
    const n = this._getPattern(t, e);
    i.fillStyle = n.getPattern(i, this, Mt(i), ht.SHADING, t);
    const r = Mt(i);
    if (r) {
      const { width: a, height: o } = i.canvas,
        l = Yt.slice();
      T.axialAlignedBoundingBox([0, 0, a, o], r, l);
      const [h, d, u, f] = l;
      this.ctx.fillRect(h, d, u - h, f - d);
    } else this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
    (this.dependencyTracker
      ?.resetBBox(t)
      .recordFullPageBBox(t)
      .recordDependencies(t, wt.transform)
      .recordDependencies(t, wt.fill)
      .recordOperation(t),
      this.compose(this.current.getClippedPathBoundingBox()),
      this.restore(t),
      this.#b(s));
  }
  beginInlineImage() {
    $("Should not call beginInlineImage");
  }
  beginImageData() {
    $("Should not call beginImageData");
  }
  paintFormXObjectBegin(t, e, s) {
    if (
      this.contentVisible &&
      (this.save(t),
      this.baseTransformStack.push(this.baseTransform),
      e && this.transform(t, ...e),
      (this.baseTransform = V(this.ctx)),
      s)
    ) {
      T.axialAlignedBoundingBox(s, this.baseTransform, this.current.minMax);
      const [i, n, r, a] = s,
        o = new Path2D();
      (o.rect(i, n, r - i, a - n),
        this.ctx.clip(o),
        this.dependencyTracker?.recordClipBox(t, this.ctx, i, r, n, a),
        this.endPath(t));
    }
  }
  paintFormXObjectEnd(t) {
    this.contentVisible && (this.restore(t), (this.baseTransform = this.baseTransformStack.pop()));
  }
  beginGroup(t, e) {
    if (!this.contentVisible) return;
    this.save(t);
    const { inSMaskMode: s } = this;
    s && (this.endSMaskMode(), (this.current.activeSMask = null));
    const i = this.ctx;
    if (
      (!e.needsIsolation || (!e.isolated && !e.hasSoftMask)) &&
      !e.knockout &&
      !e.isGray &&
      this.#e === 0 &&
      i.globalAlpha === 1 &&
      i.globalCompositeOperation === "source-over" &&
      !s
    ) {
      if (e.bbox) {
        let w = new Path2D();
        const [v, S, x, _] = e.bbox;
        if ((w.rect(v, S, x - v, _ - S), e.matrix)) {
          const E = new Path2D();
          (E.addPath(w, new DOMMatrix(e.matrix)), (w = E));
        }
        i.clip(w);
      }
      (this.groupStack.push(null), this.#u.push(null), this.groupLevel++);
      return;
    }
    !e.isolated &&
      !e.knockout &&
      this.#e === 0 &&
      ts("TODO: Fully support non-isolated non-knockout groups.");
    const n = V(i);
    e.matrix && i.transform(...e.matrix);
    const r = [0, 0, i.canvas.width, i.canvas.height];
    let a;
    e.bbox
      ? ((a = Yt.slice()),
        T.axialAlignedBoundingBox(e.bbox, V(i), a),
        (a = T.intersect(a, r) || [0, 0, 0, 0]))
      : (a = r);
    const o = Math.floor(a[0]),
      l = Math.floor(a[1]),
      h = Math.max(Math.ceil(a[2]) - o, 1),
      d = Math.max(Math.ceil(a[3]) - l, 1);
    this.current.startNewPathAndClipBox([0, 0, h, d]);
    const u = this.canvasFactory.create(h, d);
    e.smask && this.smaskGroupCanvases.push(u);
    const f = u.context,
      p = e.knockout && !e.isolated ? i : null,
      g = !e.isolated && !e.knockout && !e.smask && e.needsIsolation && this.#e > 0,
      m = e.knockout ? this.canvasFactory.create(h, d) : null,
      b = this.#e;
    (e.knockout ? this.#e++ : (this.#e = 0), f.translate(-o, -l), f.transform(...n));
    const y = !e.isolated && !e.smask && e.needsIsolation,
      A =
        y &&
        !s &&
        b === 0 &&
        !e.knockout &&
        !e.isGray &&
        e.hasSoftMask &&
        i.globalAlpha === 1 &&
        i.globalCompositeOperation === "source-over" &&
        this.current.transferMaps === "none" &&
        !this.current.transferMapsFallback;
    if (
      (y &&
        (s || A) &&
        (f.save(), f.setTransform(1, 0, 0, 1, 0, 0), f.drawImage(i.canvas, -o, -l), f.restore()),
      e.bbox)
    ) {
      let w = new Path2D();
      const [v, S, x, _] = e.bbox;
      if ((w.rect(v, S, x - v, _ - S), e.matrix)) {
        const E = new Path2D();
        (E.addPath(w, new DOMMatrix(e.matrix)), (w = E));
      }
      f.clip(w);
    }
    (e.smask &&
      this.smaskStack.push({
        canvas: u.canvas,
        context: f,
        offsetX: o,
        offsetY: l,
        subtype: e.smask.subtype,
        backdrop: e.smask.backdrop,
        transferMap: e.smask.transferMap || null,
      }),
      (!e.smask || this.dependencyTracker) && (i.setTransform(1, 0, 0, 1, 0, 0), i.translate(o, l), i.save()),
      Wt(i, f),
      (this.ctx = f),
      this.dependencyTracker
        ?.inheritSimpleDataAsFutureForcedDependencies([
          "fillAlpha",
          "strokeAlpha",
          "globalCompositeOperation",
        ])
        .pushBaseTransform(i),
      this.setGState(t, [
        ["BM", "source-over"],
        ["ca", 1],
        ["CA", 1],
        ["TR", null],
      ]),
      this.groupStack.push(i),
      this.#u.push({
        backdropCtx: p,
        savedKnockoutLevel: b,
        offsetX: o,
        offsetY: l,
        hasInnerBackdrop: g,
        replaceBackdrop: A,
        knockoutMaskEntry: m,
        knockoutTempEntry: null,
        knockoutBackdropEntry: null,
      }),
      this.groupLevel++);
  }
  endGroup(t, e) {
    if (!this.contentVisible) return;
    this.groupLevel--;
    const s = this.ctx,
      i = this.groupStack.pop(),
      n = this.#u.pop();
    if ((n && (this.#e = n.savedKnockoutLevel), i === null)) {
      this.restore(t);
      return;
    }
    if (
      (e.isGray && this.#v(s),
      (this.ctx = i),
      (this.ctx.imageSmoothingEnabled = !1),
      this.dependencyTracker?.popBaseTransform(),
      e.smask)
    )
      ((this.tempSMask = this.smaskStack.pop()),
        this.restore(t),
        this.dependencyTracker &&
          (this.ctx.restore(), this.inSMaskMode && this.ctx.setTransform(this.suspendedCtx.getTransform())),
        this.#w(n));
    else {
      this.ctx.restore();
      const r = V(this.ctx);
      (this.restore(t),
        this.current.transferMapsFallback?.applyToCanvas(s),
        this.ctx.save(),
        this.ctx.setTransform(...r));
      const a = Yt.slice();
      T.axialAlignedBoundingBox([0, 0, s.canvas.width, s.canvas.height], r, a);
      const o = this.#u.at(-1);
      if (this.#e > 0)
        if (n.hasInnerBackdrop) {
          const { width: l, height: h } = s.canvas,
            d = this.canvasFactory.create(l, h),
            u = d.context;
          (u.drawImage(i.canvas, n.offsetX, n.offsetY, l, h, 0, 0, l, h),
            (u.globalCompositeOperation = "source-over"),
            u.drawImage(s.canvas, 0, 0));
          const f = this.#g(s.canvas);
          ((u.globalCompositeOperation = "destination-in"), u.drawImage(f.canvas, 0, 0));
          const p = this.ctx.globalCompositeOperation,
            g = this.ctx.globalAlpha,
            m = this.ctx.filter;
          (this.ctx.save(),
            this.ctx.setTransform(...r),
            (this.ctx.globalAlpha = 1),
            j.isCanvasFilterSupported && (this.ctx.filter = "none"),
            (this.ctx.globalCompositeOperation = "destination-out"),
            this.ctx.drawImage(f.canvas, 0, 0),
            (this.ctx.globalCompositeOperation = p),
            (this.ctx.globalAlpha = g),
            j.isCanvasFilterSupported && (this.ctx.filter = m ?? "none"),
            this.ctx.drawImage(d.canvas, 0, 0),
            this.ctx.restore(),
            this.canvasFactory.destroy(f),
            this.canvasFactory.destroy(d));
        } else {
          const l = o?.backdropCtx ?? null;
          this.#c(this.ctx, s.canvas, {
            backdropCanvas: l?.canvas ?? null,
            destTransform: r,
            backdropOffset: l ? [o.offsetX + n.offsetX, o.offsetY + n.offsetY] : [0, 0],
            sourceAlpha: this.ctx.globalAlpha,
            sourceFilter: this.ctx.filter,
          });
        }
      else {
        if (n.replaceBackdrop) {
          const l = new Path2D();
          (l.rect(0, 0, s.canvas.width, s.canvas.height),
            this.ctx.clip(l),
            (this.ctx.globalCompositeOperation = "copy"));
        }
        this.ctx.drawImage(s.canvas, 0, 0);
      }
      (this.ctx.restore(),
        this.canvasFactory.destroy({ canvas: s.canvas, context: s }),
        this.#w(n),
        this.compose(a));
    }
  }
  #v(t) {
    const { canvas: e } = t,
      { width: s, height: i } = e;
    if (j.isCanvasFilterSupported) {
      (t.save(),
        t.setTransform(1, 0, 0, 1, 0, 0),
        (t.filter = "grayscale(1)"),
        (t.globalAlpha = 1),
        (t.globalCompositeOperation = "copy"),
        t.drawImage(e, 0, 0),
        t.restore());
      return;
    }
    const n = t.getImageData(0, 0, s, i),
      { data: r } = n;
    for (let a = 0, o = r.length; a < o; a += 4) {
      const l = (r[a] * 0.2126 + r[a + 1] * 0.7152 + r[a + 2] * 0.0722 + 0.5) | 0;
      r[a] = r[a + 1] = r[a + 2] = l;
    }
    t.putImageData(n, 0, 0);
  }
  #w(t) {
    t &&
      (t.knockoutMaskEntry && (this.canvasFactory.destroy(t.knockoutMaskEntry), (t.knockoutMaskEntry = null)),
      t.knockoutTempEntry && (this.canvasFactory.destroy(t.knockoutTempEntry), (t.knockoutTempEntry = null)),
      t.knockoutBackdropEntry &&
        (this.canvasFactory.destroy(t.knockoutBackdropEntry), (t.knockoutBackdropEntry = null)));
  }
  beginAnnotation(t, e, s, i, n, r, a) {
    if (
      (this.#d(),
      Ue(this.ctx),
      this.ctx.save(),
      this.save(t),
      this.baseTransform && this.ctx.setTransform(...this.baseTransform),
      s)
    ) {
      const o = s[2] - s[0],
        l = s[3] - s[1];
      if (r && this.annotationCanvasMap) {
        ((i = i.slice()), (i[4] -= s[0]), (i[5] -= s[1]), T.singularValueDecompose2dScale(V(this.ctx), yt));
        const { viewportScale: h } = this,
          d = Math.ceil(o * this.outputScaleX * h),
          u = Math.ceil(l * this.outputScaleY * h);
        this.annotationCanvas = this.canvasFactory.create(d, u);
        const { canvas: f, context: p } = this.annotationCanvas;
        if (a) {
          const g = this.annotationCanvasMap.getOrInsertComputed(e, pe);
          f.setAttribute("data-canvas-name", a);
          const m = g.findIndex((b) => b.getAttribute("data-canvas-name") === a);
          m === -1 ? g.push(f) : (g[m] = f);
        } else this.annotationCanvasMap.set(e, f);
        ((this.annotationCanvas.savedCtx = this.ctx),
          (this.ctx = p),
          this.ctx.save(),
          this.ctx.setTransform(yt[0], 0, 0, -yt[1], 0, l * yt[1]),
          Ue(this.ctx));
      } else {
        (Ue(this.ctx), this.endPath(t));
        const h = new Path2D();
        (h.rect(s[0], s[1], o, l), this.ctx.clip(h));
      }
    }
    ((this.current = new Mi(this.ctx.canvas.width, this.ctx.canvas.height)),
      this.baseTransformStack.push(this.baseTransform),
      this.transform(t, ...i),
      this.transform(t, ...n),
      (this.baseTransform = V(this.ctx)));
  }
  endAnnotation(t) {
    (this.annotationCanvas &&
      (this.ctx.restore(),
      this.#f(),
      (this.ctx = this.annotationCanvas.savedCtx),
      delete this.annotationCanvas.savedCtx,
      delete this.annotationCanvas),
      (this.baseTransform = this.baseTransformStack.pop()));
  }
  paintImageMaskXObject(t, e) {
    if (!this.contentVisible) return;
    const s = e.count;
    ((e = this.getObject(t, e.data, e)), (e.count = s));
    const i = this.#p(this.current.fillAlpha),
      n = this.ctx,
      r = this._createMaskCanvas(t, e),
      a = r.canvas;
    (n.save(),
      n.setTransform(1, 0, 0, 1, 0, 0),
      n.drawImage(a, r.offsetX, r.offsetY),
      this.dependencyTracker
        ?.resetBBox(t)
        .recordBBox(t, this.ctx, r.offsetX, r.offsetX + a.width, r.offsetY, r.offsetY + a.height)
        .recordOperation(t),
      n.restore(),
      r.canvasEntry && this.canvasFactory.destroy(r.canvasEntry),
      this.compose(),
      this.#b(i));
  }
  paintImageMaskXObjectRepeat(t, e, s, i = 0, n = 0, r, a) {
    if (!this.contentVisible) return;
    e = this.getObject(t, e.data, e);
    const o = this.#p(this.current.fillAlpha),
      l = this.ctx;
    l.save();
    const h = V(l);
    l.transform(s, i, n, r, 0, 0);
    const d = this._createMaskCanvas(t, e);
    (l.setTransform(1, 0, 0, 1, d.offsetX - h[4], d.offsetY - h[5]), this.dependencyTracker?.resetBBox(t));
    for (let u = 0, f = a.length; u < f; u += 2) {
      const p = T.transform(h, [s, i, n, r, a[u], a[u + 1]]);
      (l.drawImage(d.canvas, p[4], p[5]),
        this.dependencyTracker?.recordBBox(
          t,
          this.ctx,
          p[4],
          p[4] + d.canvas.width,
          p[5],
          p[5] + d.canvas.height,
        ));
    }
    (l.restore(),
      d.canvasEntry && this.canvasFactory.destroy(d.canvasEntry),
      this.compose(),
      this.dependencyTracker?.recordOperation(t),
      this.#b(o));
  }
  paintImageMaskXObjectGroup(t, e) {
    if (!this.contentVisible) return;
    const s = this.#p(this.current.fillAlpha),
      i = this.ctx,
      n = this.current.patternFill,
      r = n ? this.current.fillColor : i.fillStyle;
    this.dependencyTracker?.resetBBox(t).recordDependencies(t, wt.transformAndFill);
    for (const a of e) {
      const { data: o, width: l, height: h, transform: d } = a,
        u = this.canvasFactory.create(l, h),
        f = u.context;
      f.save();
      const p = this.getObject(t, o, a);
      (Di(f, p),
        (f.globalCompositeOperation = "source-in"),
        (f.fillStyle = n ? r.getPattern(f, this, Mt(i), ht.FILL, t) : r),
        f.fillRect(0, 0, l, h),
        f.restore(),
        i.save(),
        i.transform(...d),
        i.scale(1, -1),
        He(i, u.canvas, 0, 0, l, h, 0, -1, 1, 1),
        this.canvasFactory.destroy(u),
        this.dependencyTracker?.recordBBox(t, i, 0, l, 0, h),
        i.restore());
    }
    (this.compose(), this.dependencyTracker?.recordOperation(t), this.#b(s));
  }
  paintImageXObject(t, e) {
    if (!this.contentVisible) return;
    const s = this.getObject(t, e);
    if (!s) {
      H("Dependent image isn't ready yet");
      return;
    }
    this.paintInlineImageXObject(t, s);
  }
  paintImageXObjectRepeat(t, e, s, i, n) {
    if (!this.contentVisible) return;
    const r = this.getObject(t, e);
    if (!r) {
      H("Dependent image isn't ready yet");
      return;
    }
    const a = r.width,
      o = r.height,
      l = [];
    for (let h = 0, d = n.length; h < d; h += 2)
      l.push({ transform: [s, 0, 0, i, n[h], n[h + 1]], x: 0, y: 0, w: a, h: o });
    this.paintInlineImageXObjectGroup(t, r, l);
  }
  applyTransferMapsToCanvas(t) {
    return (
      this.current.transferMaps !== "none"
        ? ((t.filter = this.current.transferMaps), t.drawImage(t.canvas, 0, 0), (t.filter = "none"))
        : this.current.transferMapsFallback?.applyToCanvas(t),
      t.canvas
    );
  }
  applyTransferMapsToBitmap(t) {
    const { transferMaps: e, transferMapsFallback: s } = this.current;
    if (e === "none" && !s) return { img: t.bitmap, canvasEntry: null };
    const { bitmap: i, width: n, height: r } = t,
      a = this.canvasFactory.create(n, r),
      o = a.context;
    return (
      (o.filter = e),
      o.drawImage(i, 0, 0),
      (o.filter = "none"),
      s?.applyToCanvas(o),
      { img: a.canvas, canvasEntry: a }
    );
  }
  paintInlineImageXObject(t, e) {
    if (!this.contentVisible) return;
    const s = e.width,
      i = e.height,
      n = this.#p(this.current.fillAlpha),
      r = this.ctx;
    this.save(t);
    const { filter: a } = r;
    (a !== "none" && a !== "" && (r.filter = "none"), r.scale(1 / s, -1 / i));
    let o,
      l = null;
    if (e.bitmap) {
      const d = this.applyTransferMapsToBitmap(e);
      ((o = d.img), (l = d.canvasEntry));
    } else {
      const d = this.canvasFactory.create(s, i);
      (Ii(d.context, e), (o = this.applyTransferMapsToCanvas(d.context)), (l = d));
    }
    const h = this._scaleImage(o, Mt(r));
    ((r.imageSmoothingEnabled = Fi(V(r), e.interpolate)),
      this.dependencyTracker &&
        (this.dependencyTracker
          .resetBBox(t)
          .recordBBox(t, r, 0, s, -i, 0)
          .recordDependencies(t, wt.imageXObject)
          .recordOperation(t),
        this.imagesTracker?.record(r, s, i, this.dependencyTracker.clipBox)),
      He(r, h.img, 0, 0, h.paintWidth, h.paintHeight, 0, -i, s, i),
      h.tmpCanvas && this.canvasFactory.destroy(h.tmpCanvas),
      l && this.canvasFactory.destroy(l),
      this.compose(),
      this.restore(t),
      this.#b(n));
  }
  paintInlineImageXObjectGroup(t, e, s) {
    if (!this.contentVisible) return;
    const i = this.#p(this.current.fillAlpha),
      n = this.ctx;
    let r,
      a = null;
    if (e.bitmap && !this.current.transferMapsFallback) r = e.bitmap;
    else if (e.bitmap) ({ img: r, canvasEntry: a } = this.applyTransferMapsToBitmap(e));
    else {
      const o = e.width,
        l = e.height,
        h = this.canvasFactory.create(o, l);
      (Ii(h.context, e), (r = this.applyTransferMapsToCanvas(h.context)), (a = h));
    }
    this.dependencyTracker?.resetBBox(t);
    for (const o of s)
      (n.save(),
        n.transform(...o.transform),
        n.scale(1, -1),
        He(n, r, o.x, o.y, o.w, o.h, 0, -1, 1, 1),
        this.dependencyTracker?.recordBBox(t, n, 0, 1, -1, 0),
        n.restore());
    (a && this.canvasFactory.destroy(a),
      this.dependencyTracker?.recordOperation(t),
      this.compose(),
      this.#b(i));
  }
  paintSolidColorImageMask(t) {
    if (!this.contentVisible) return;
    const e = this.#p(this.current.fillAlpha);
    (this.dependencyTracker
      ?.resetBBox(t)
      .recordBBox(t, this.ctx, 0, 1, 0, 1)
      .recordDependencies(t, wt.fill)
      .recordOperation(t),
      this.ctx.fillRect(0, 0, 1, 1),
      this.compose(),
      this.#b(e));
  }
  markPoint(t, e) {}
  markPointProps(t, e, s) {}
  beginMarkedContent(t, e) {
    (this.dependencyTracker?.beginMarkedContent(t), this.markedContentStack.push({ visible: !0 }));
  }
  beginMarkedContentProps(t, e, s) {
    (this.dependencyTracker?.beginMarkedContent(t),
      e === "OC"
        ? this.markedContentStack.push({ visible: this.optionalContentConfig.isVisible(s) })
        : this.markedContentStack.push({ visible: !0 }),
      (this.contentVisible = this.isContentVisible()));
  }
  endMarkedContent(t) {
    (this.dependencyTracker?.endMarkedContent(t),
      this.markedContentStack.pop(),
      (this.contentVisible = this.isContentVisible()));
  }
  beginCompat(t) {}
  endCompat(t) {}
  consumePath(t, e, s) {
    const i = this.current.isEmptyClip();
    (this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(s));
    const n = this.ctx;
    (this.pendingClip
      ? (i || (this.pendingClip === Oi ? n.clip(e, "evenodd") : n.clip(e)),
        (this.pendingClip = null),
        this.dependencyTracker?.bboxToClipBoxDropOperation(t).recordFutureForcedDependency("clipPath", t))
      : this.dependencyTracker?.recordOperation(t),
      this.current.startNewPathAndClipBox(this.current.clipBox));
  }
  getSinglePixelWidth() {
    const t = V(this.ctx);
    if (t[1] === 0 && t[2] === 0) return 1 / Math.min(Math.abs(t[0]), Math.abs(t[3]));
    const e = Math.abs(t[0] * t[3] - t[2] * t[1]),
      s = Math.hypot(t[0], t[2]),
      i = Math.hypot(t[1], t[3]);
    return Math.max(s, i) / e;
  }
  getScaleForStroking() {
    if (this._cachedScaleForStroking[0] === -1) {
      const { lineWidth: t } = this.current,
        { a: e, b: s, c: i, d: n } = this.ctx.getTransform();
      let r, a;
      if (s === 0 && i === 0) {
        const o = Math.abs(e),
          l = Math.abs(n);
        if (o === l)
          if (t === 0) r = a = 1 / o;
          else {
            const h = o * t;
            r = a = h < 1 ? 1 / h : 1;
          }
        else if (t === 0) ((r = 1 / o), (a = 1 / l));
        else {
          const h = o * t,
            d = l * t;
          ((r = h < 1 ? 1 / h : 1), (a = d < 1 ? 1 / d : 1));
        }
      } else {
        const o = Math.abs(e * n - s * i),
          l = Math.hypot(e, s),
          h = Math.hypot(i, n);
        if (t === 0) ((r = h / o), (a = l / o));
        else {
          const d = t * o;
          ((r = h > d ? h / d : 1), (a = l > d ? l / d : 1));
        }
      }
      ((this._cachedScaleForStroking[0] = r), (this._cachedScaleForStroking[1] = a));
    }
    return this._cachedScaleForStroking;
  }
  rescaleAndStroke(t, e) {
    const {
        ctx: s,
        current: { lineWidth: i },
      } = this,
      [n, r] = this.getScaleForStroking();
    if (n === r) {
      ((s.lineWidth = (i || 1) * n), s.stroke(t));
      return;
    }
    const a = (qt.#t ??= new DOMMatrix()),
      o = s.getLineDash();
    (e && s.save(), s.scale(n, r), (a.a = 1 / n), (a.d = 1 / r));
    const l = new Path2D();
    if ((l.addPath(t, a), o.length > 0)) {
      const h = Math.max(n, r);
      (s.setLineDash(o.map((d) => d / h)), (s.lineDashOffset /= h));
    }
    ((s.lineWidth = i || 1), s.stroke(l), e && s.restore());
  }
  isContentVisible() {
    for (let t = this.markedContentStack.length - 1; t >= 0; t--)
      if (!this.markedContentStack[t].visible) return !1;
    return !0;
  }
}
for (const c in Ft) qt.prototype[c] !== void 0 && (qt.prototype[Ft[c]] = qt.prototype[c]);