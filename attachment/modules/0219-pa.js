
class pa {
  downloadInfoCapability = Promise.withResolvers();
  #t = null;
  #e = new Map();
  #s = null;
  #i = new Map();
  #n = new Map();
  #a = new Map();
  #r = null;
  #o = null;
  constructor(t, e, s, i, n, r) {
    ((this.messageHandler = t),
      (this.loadingTask = e),
      (this.#s = s),
      (this.commonObjs = new ln()),
      (this.fontLoader = new ar({ ownerDocument: i.ownerDocument, styleElement: i.styleElement })),
      (this.enableHWA = i.enableHWA),
      (this.loadingParams = i.loadingParams),
      (this._params = i),
      (this.canvasFactory = n.canvasFactory),
      (this.filterFactory = n.filterFactory),
      (this.binaryDataFactory = n.binaryDataFactory),
      (this.pagesMapper = r),
      (this.destroyed = !1),
      (this.destroyCapability = null),
      this.setupMessageHandler());
  }
  updatePage(t) {
    (this.#i.set(t._id, t), this.#n.set(t._pageIndex, Promise.resolve(t)));
  }
  #l(t, e = null) {
    return this.#e.getOrInsertComputed(t, () => this.messageHandler.sendWithPromise(t, e));
  }
  #h({ loaded: t, total: e }) {
    this.loadingTask.onProgress?.({
      loaded: t,
      total: e,
      percent: e ? Y(Math.round((t / e) * 100), 0, 100) : NaN,
    });
  }
  get annotationStorage() {
    return k(this, "annotationStorage", new Xs());
  }
  getRenderingIntent(t, e = $t.ENABLE, s = null, i = !1, n = !1) {
    let r = pt.DISPLAY,
      a = Te;
    switch (t) {
      case "any":
        r = pt.ANY;
        break;
      case "display":
        break;
      case "print":
        r = pt.PRINT;
        break;
      default:
        H(`getRenderingIntent - invalid intent: ${t}`);
    }
    const o = r & pt.PRINT && s instanceof Ki ? s : this.annotationStorage;
    switch (e) {
      case $t.DISABLE:
        r += pt.ANNOTATIONS_DISABLE;
        break;
      case $t.ENABLE:
        break;
      case $t.ENABLE_FORMS:
        r += pt.ANNOTATIONS_FORMS;
        break;
      case $t.ENABLE_STORAGE:
        ((r += pt.ANNOTATIONS_STORAGE), (a = o.serializable));
        break;
      default:
        H(`getRenderingIntent - invalid annotationMode: ${e}`);
    }
    (i && (r += pt.IS_EDITING), n && (r += pt.OPLIST));
    const { ids: l, hash: h } = o.modifiedIds,
      d = [r, a.hash, h];
    return { renderingIntent: r, cacheKey: d.join("_"), annotationStorageSerializable: a, modifiedIds: l };
  }
  destroy() {
    if (this.destroyCapability) return this.destroyCapability.promise;
    ((this.destroyed = !0),
      (this.destroyCapability = Promise.withResolvers()),
      this.#r?.reject(new Error("Worker was destroyed during onPassword callback")));
    const t = [];
    for (const s of this.#i.values()) t.push(s._destroy());
    (this.#i.clear(),
      this.#n.clear(),
      this.#a.clear(),
      Object.hasOwn(this, "annotationStorage") && this.annotationStorage.resetModified());
    const e = this.messageHandler.sendWithPromise("Terminate", null);
    return (
      t.push(e),
      Promise.all(t).then(() => {
        (this.commonObjs.clear(),
          this.fontLoader.clear(),
          this.#e.clear(),
          this.filterFactory.destroy(),
          ut.cleanup(),
          this.#s?.cancelAllRequests(new zt("Worker was terminated.")),
          this.messageHandler?.destroy(),
          (this.messageHandler = null),
          this.destroyCapability.resolve());
      }, this.destroyCapability.reject),
      this.destroyCapability.promise
    );
  }
  setupMessageHandler() {
    const { messageHandler: t, loadingTask: e } = this;
    (t.on("GetReader", (s, i) => {
      (tt(this.#s, "GetReader - no `BasePDFStream` instance available."),
        (this.#t = this.#s.getFullReader()),
        (this.#t.onProgress = (n) => this.#h(n)),
        (i.onPull = () => {
          this.#t
            .read()
            .then(function ({ value: n, done: r }) {
              if (r) {
                i.close();
                return;
              }
              (tt(n instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."),
                i.enqueue(new Uint8Array(n), 1, [n]));
            })
            .catch((n) => {
              i.error(n);
            });
        }),
        (i.onCancel = (n) => {
          (this.#t.cancel(n),
            i.ready.catch((r) => {
              if (!this.destroyed) throw r;
            }));
        }));
    }),
      t.on("ReaderHeadersReady", async (s) => {
        await this.#t.headersReady;
        const { isStreamingSupported: i, isRangeSupported: n, contentLength: r } = this.#t;
        return (
          i && n && (this.#t.onProgress = null),
          { isStreamingSupported: i, isRangeSupported: n, contentLength: r }
        );
      }),
      t.on("GetRangeReader", (s, i) => {
        tt(this.#s, "GetRangeReader - no `BasePDFStream` instance available.");
        const n = this.#s.getRangeReader(s.begin, s.end);
        if (!n) {
          i.close();
          return;
        }
        ((i.onPull = () => {
          n.read()
            .then(function ({ value: r, done: a }) {
              if (a) {
                i.close();
                return;
              }
              (tt(r instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."),
                i.enqueue(new Uint8Array(r), 1, [r]));
            })
            .catch((r) => {
              i.error(r);
            });
        }),
          (i.onCancel = (r) => {
            (n.cancel(r),
              i.ready.catch((a) => {
                if (!this.destroyed) throw a;
              }));
          }));
      }),
      t.on("GetDoc", ({ pdfInfo: s }) => {
        ((this.pagesMapper.pagesNumber = s.numPages),
          (this._numPages = s.numPages),
          (this._htmlForXfa = s.htmlForXfa),
          delete s.htmlForXfa,
          e._capability.resolve(new fa(s, this)));
      }),
      t.on("DocException", (s) => {
        e._capability.reject(dt(s));
      }),
      t.on("PasswordRequest", (s) => {
        this.#r = Promise.withResolvers();
        try {
          if (!e.onPassword) throw dt(s);
          const i = (n) => {
            n instanceof Error ? this.#r.reject(n) : this.#r.resolve({ password: n });
          };
          e.onPassword(i, s.code);
        } catch (i) {
          this.#r.reject(i);
        }
        return this.#r.promise;
      }),
      t.on("DataLoaded", (s) => {
        (this.#h({ loaded: s.length, total: s.length }), this.downloadInfoCapability.resolve(s));
      }),
      t.on("StartRenderPage", (s) => {
        if (this.destroyed) return;
        this.#i.get(s.pageProxyId)._startRenderPage(s.transparency, s.cacheKey);
      }),
      t.on("commonobj", ([s, i, n]) => {
        if (this.destroyed || this.commonObjs.has(s)) return null;
        switch (i) {
          case "Font":
            if ("error" in n) {
              const d = n.error;
              (H(`Error during font loading: ${d}`), this.commonObjs.resolve(s, d));
              break;
            }
            const r = new fr(n.buffer),
              a =
                this._params.pdfBug && globalThis.FontInspector?.enabled
                  ? (d, u) => globalThis.FontInspector.fontAdded(d, u)
                  : null,
              o = new or(r, a, n.charProcOperatorList, n.extra);
            this.fontLoader
              .bind(o)
              .catch(() => t.sendWithPromise("FontFallback", { id: s }))
              .finally(() => {
                (o.fontExtraProperties || o.clearData(), this.commonObjs.resolve(s, o));
              });
            break;
          case "CopyLocalImage":
            const { imageRef: l } = n;
            tt(l, "The imageRef must be defined.");
            for (const d of this.#i.values())
              for (const [, u] of d.objs) {
                if (u?.ref !== l) continue;
                if (!u.dataLen) return null;
                const f = structuredClone(u);
                return (this.commonObjs.resolve(s, f), u.dataLen);
              }
            break;
          case "FontPath":
            this.commonObjs.resolve(s, new gr(n));
            break;
          case "Image":
            this.commonObjs.resolve(s, n);
            break;
          case "Pattern":
            const h = new pr(n);
            this.commonObjs.resolve(s, h.getIR());
            break;
          default:
            throw new Error(`Got unknown common object type ${i}`);
        }
        return null;
      }),
      t.on("obj", ([s, i, n, r]) => {
        if (this.destroyed) return;
        const a = this.#i.get(i);
        if (!a.objs.has(s)) {
          if (a._intentStates.size === 0) {
            r?.bitmap?.close();
            return;
          }
          switch (n) {
            case "Image":
            case "Pattern":
              a.objs.resolve(s, r);
              break;
            default:
              throw new Error(`Got unknown object type ${n}`);
          }
        }
      }),
      t.on("DocProgress", (s) => {
        this.destroyed || this.#h(s);
      }),
      t.on("FetchBinaryData", async (s) => {
        if (this.destroyed) throw new Error("Worker was destroyed.");
        if (!this.binaryDataFactory)
          throw new Error("`BinaryDataFactory` not initialized, see the `useWorkerFetch` parameter.");
        return this.binaryDataFactory.fetch(s);
      }));
  }
  getData() {
    return this.messageHandler.sendWithPromise("GetData", null);
  }
  saveDocument(t = null) {
    this.annotationStorage.size <= 0 &&
      H("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
    const { map: e, transfer: s } = this.annotationStorage.serializable;
    return this.messageHandler
      .sendWithPromise(
        "SaveDocument",
        {
          isPureXfa: !!this._htmlForXfa,
          numPages: this._numPages,
          annotationStorage: e,
          supportsPrintToPDF: this.#o !== null,
          filename: this.#t?.filename ?? null,
        },
        s,
      )
      .finally(() => {
        ((this.#o = null), this.annotationStorage.resetModified());
      });
  }
  extractPages(t, e = null) {
    const s = { pageInfos: t };
    let i;
    const n = globalThis.ImageBitmap;
    if (typeof n == "function") {
      const r = Array.isArray(t) ? t : [t];
      for (const a of r) a?.image instanceof n && (i ||= []).push(a.image);
    }
    if (this.annotationStorage.size > 0) {
      const r = this.annotationStorage.serializable;
      let { map: a } = r;
      r.transfer?.length && (i ? i.push(...r.transfer) : (i = r.transfer));
      const o = this.pagesMapper.getMapping();
      if (o) {
        const l = new Map();
        for (const [h, d] of a) {
          if (d?.pageIndex !== void 0 && d.pageIndex >= 0 && d.pageIndex < o.length) {
            const u = e?.[d.pageIndex] ?? 0,
              f = o[d.pageIndex] - 1;
            if (f !== d.pageIndex || u !== 0) {
              l.set(h, { ...d, pageIndex: f, copyLevel: u });
              continue;
            }
          }
          l.set(h, d);
        }
        a = l;
      }
      s.annotationStorage = a;
    }
    return this.messageHandler.sendWithPromise("ExtractPages", s, i).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  getPage(t) {
    if (!Number.isInteger(t) || t <= 0 || t > this.pagesMapper.pagesNumber)
      return Promise.reject(new Error("Invalid page request."));
    const e = t - 1,
      s = this.pagesMapper.getPageId(t) - 1,
      i = this.#n.get(e);
    if (i) return i;
    const n = this.messageHandler.sendWithPromise("GetPage", { pageIndex: s }).then((r) => {
      if (this.destroyed) throw new Error("Transport destroyed");
      r.refStr && this.#a.set(r.refStr, s);
      const a = new Ke(e, r, this, this.pagesMapper, this._params.pdfBug);
      return (this.#i.set(a._id, a), a);
    });
    return (this.#n.set(e, n), n);
  }
  async getPageIndex(t) {
    if (!Os(t)) throw new Error("Invalid pageIndex request.");
    const e = await this.messageHandler.sendWithPromise("GetPageIndex", { num: t.num, gen: t.gen }),
      s = this.pagesMapper.getPageNumber(e + 1);
    if (s === 0) throw new Error("GetPageIndex: page has been removed.");
    return s - 1;
  }
  getAnnotations(t, e) {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1,
      intent: e,
    });
  }
  getFieldObjects() {
    return this.#l("GetFieldObjects");
  }
  getSignatures() {
    return this.#l("GetSignatures");
  }
  getSignatureData(t) {
    return this.messageHandler.sendWithPromise("GetSignatureData", t);
  }
  hasJSActions() {
    return this.#l("HasJSActions");
  }
  getCalculationOrderIds() {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
  }
  getDestinations() {
    return this.messageHandler.sendWithPromise("GetDestinations", null);
  }
  getDestination(t) {
    return typeof t != "string"
      ? Promise.reject(new Error("Invalid destination request."))
      : this.messageHandler.sendWithPromise("GetDestination", { id: t });
  }
  getPageLabels() {
    return this.messageHandler.sendWithPromise("GetPageLabels", null);
  }
  getPageLayout() {
    return this.messageHandler.sendWithPromise("GetPageLayout", null);
  }
  getPageMode() {
    return this.messageHandler.sendWithPromise("GetPageMode", null);
  }
  getViewerPreferences() {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
  }
  getOpenAction() {
    return this.messageHandler.sendWithPromise("GetOpenAction", null);
  }
  getAttachments() {
    return this.messageHandler.sendWithPromise("GetAttachments", null);
  }
  getAttachmentContent(t) {
    return this.messageHandler.sendWithPromise("GetAttachmentContent", t);
  }
  getAnnotationsByType(t, e) {
    return this.messageHandler.sendWithPromise("GetAnnotationsByType", { types: t, pageIndexesToSkip: e });
  }
  getDocJSActions() {
    return this.#l("GetDocJSActions");
  }
  getPageJSActions(t) {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1,
    });
  }
  getStructTree(t) {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1,
    });
  }
  getOutline() {
    return this.messageHandler.sendWithPromise("GetOutline", null);
  }
  getOptionalContentConfig(t) {
    return this.#l("GetOptionalContentConfig").then((e) => new qs(e, t));
  }
  getPermissions() {
    return this.messageHandler.sendWithPromise("GetPermissions", null);
  }
  getMetadata() {
    const t = "GetMetadata";
    return this.#e.getOrInsertComputed(t, () =>
      this.messageHandler
        .sendWithPromise(t, null)
        .then((e) => ({
          info: e[0],
          metadata: e[1] ? new oa(e[1]) : null,
          contentDispositionFilename: this.#t?.filename ?? null,
          contentLength: this.#t?.contentLength ?? null,
          hasStructTree: e[2],
        })),
    );
  }
  getMarkInfo() {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null);
  }
  async startCleanup(t = !1) {
    if (!this.destroyed) {
      await this.messageHandler.sendWithPromise("Cleanup", null);
      for (const e of this.#i.values())
        if (!e.cleanup()) throw new Error(`startCleanup: Page ${e.pageNumber} is currently rendering.`);
      (this.commonObjs.clear(),
        t || this.fontLoader.clear(),
        this.#e.clear(),
        this.filterFactory.destroy(!0),
        ut.cleanup());
    }
  }
  cachedPageNumber(t) {
    if (!Os(t)) return null;
    const e = t.gen === 0 ? `${t.num}R` : `${t.num}R${t.gen}`,
      s = this.#a.get(e);
    if (s >= 0) {
      const i = this.pagesMapper.getPageNumber(s + 1);
      if (i !== 0) return i;
    }
    return null;
  }
}