
var kl = ne(() => {
  nR();
  iR();
  nTr();
  pPt();
  wee();
  IKe = class IKe {
    constructor(e, t, r, s) {
      (dPt.set(this, void 0),
        wu(this, dPt, e, "f"),
        (this.options = s),
        (this.response = t),
        (this.body = r));
    }
    hasNextPage() {
      if (!this.getPaginatedItems().length) return !1;
      return this.nextPageRequestOptions() != null;
    }
    async getNextPage() {
      let e = this.nextPageRequestOptions();
      if (!e)
        throw new bc("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
      return await us(this, dPt, "f").requestAPIList(this.constructor, e);
    }
    async *iterPages() {
      let e = this;
      yield e;
      while (e.hasNextPage()) ((e = await e.getNextPage()), yield e);
    }
    async *[((dPt = new WeakMap()), Symbol.asyncIterator)]() {
      for await (let e of this.iterPages()) for (let t of e.getPaginatedItems()) yield t;
    }
  };
  mPt = class mPt extends DLe {
    constructor(e, t, r) {
      super(e, t, async (s, a) => new r(s, a.response, await fPt(s, a), a.options));
    }
    async *[Symbol.asyncIterator]() {
      let e = await this;
      for await (let t of e) yield t;
    }
  };
  Yw = class Yw extends IKe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.data = r.data || []), (this.object = r.object));
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    nextPageRequestOptions() {
      return null;
    }
  };
  Ff = class Ff extends IKe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.data = r.data || []), (this.has_more = r.has_more || !1));
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    hasNextPage() {
      if (this.has_more === !1) return !1;
      return super.hasNextPage();
    }
    nextPageRequestOptions() {
      let e = this.getPaginatedItems(),
        t = e[e.length - 1]?.id;
      if (!t) return null;
      return { ...this.options, query: { ...aPt(this.options.query), after: t } };
    }
  };
  T_ = class T_ extends IKe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.data = r.data || []), (this.has_more = r.has_more || !1), (this.last_id = r.last_id || ""));
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    hasNextPage() {
      if (this.has_more === !1) return !1;
      return super.hasNextPage();
    }
    nextPageRequestOptions() {
      let e = this.last_id;
      if (!e) return null;
      return { ...this.options, query: { ...aPt(this.options.query), after: e } };
    }
  };
  $x = class $x extends IKe {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.data = r.data || []), (this.has_more = r.has_more || !1), (this.next = r.next || null));
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    hasNextPage() {
      if (this.has_more === !1) return !1;
      return super.hasNextPage();
    }
    nextPageRequestOptions() {
      let e = this.next;
      if (!e) return null;
      return { ...this.options, query: { ...aPt(this.options.query), after: e } };
    }
  };
});