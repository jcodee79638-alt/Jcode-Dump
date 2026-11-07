
var rJ = ne(() => {
  Iee();
  ZB();
  Rxr();
  Sjt();
  uLe();
  Wxr = class Wxr {
    constructor(e, t, r, s) {
      (Tjt.set(this, void 0),
        Ic(this, Tjt, e, "f"),
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
        throw new Cu("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
      return await Ps(this, Tjt, "f").requestAPIList(this.constructor, e);
    }
    async *iterPages() {
      let e = this;
      yield e;
      while (e.hasNextPage()) ((e = await e.getNextPage()), yield e);
    }
    async *[((Tjt = new WeakMap()), Symbol.asyncIterator)]() {
      for await (let e of this.iterPages()) for (let t of e.getPaginatedItems()) yield t;
    }
  };
  vjt = class vjt extends lLe {
    constructor(e, t, r) {
      super(e, t, async (s, a) => new r(s, a.response, await xjt(s, a), a.options));
    }
    async *[Symbol.asyncIterator]() {
      let e = await this;
      for await (let t of e) yield t;
    }
  };
  y7 = class y7 extends Wxr {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.data = r.data || []),
        (this.has_more = r.has_more || !1),
        (this.first_id = r.first_id || null),
        (this.last_id = r.last_id || null));
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    hasNextPage() {
      if (this.has_more === !1) return !1;
      return super.hasNextPage();
    }
    nextPageRequestOptions() {
      if (this.options.query?.before_id) {
        let t = this.first_id;
        if (!t) return null;
        return { ...this.options, query: { ...gjt(this.options.query), before_id: t } };
      }
      let e = this.last_id;
      if (!e) return null;
      return { ...this.options, query: { ...gjt(this.options.query), after_id: e } };
    }
  };
  LJe = class LJe extends Wxr {
    constructor(e, t, r, s) {
      super(e, t, r, s);
      ((this.data = r.data || []),
        (this.has_more = r.has_more || !1),
        (this.next_page = r.next_page || null));
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    hasNextPage() {
      if (this.has_more === !1) return !1;
      return super.hasNextPage();
    }
    nextPageRequestOptions() {
      let e = this.next_page;
      if (!e) return null;
      return { ...this.options, query: { ...gjt(this.options.query), page: e } };
    }
  };
});