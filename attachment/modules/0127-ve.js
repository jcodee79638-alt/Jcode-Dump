
class ve {
  #t = new Map();
  #e = new Map();
  #s = 1;
  #i;
  #n = new AbortController();
  #a;
  #r = new Map();
  #o = 1;
  #l = new Map();
  #h;
  constructor(t, e, s) {
    ((this.#a = t),
      (this.#h = e),
      (this.#i = s),
      s.addEventListener("message", this.#u.bind(this), { signal: this.#n.signal }));
  }
  #u({ data: t }) {
    if (t.targetName !== this.#a) return;
    if (t.stream) {
      this.#f(t);
      return;
    }
    if (t.callback) {
      const { callbackId: s, callback: i } = t,
        n = this.#e.get(s);
      if (!n) throw new Error(`Cannot resolve callback ${s}`);
      if ((this.#e.delete(s), i === Be.DATA)) n.resolve(t.data);
      else if (i === Be.ERROR) n.reject(dt(t.reason));
      else throw new Error("Unexpected callback case");
      return;
    }
    const e = this.#t.get(t.action);
    if (!e) throw new Error(`Unknown action from worker: ${t.action}`);
    if (t.callbackId) {
      const s = this.#a,
        i = t.sourceName,
        n = this.#i;
      Promise.try(e, t.data).then(
        (r) => {
          n.postMessage({
            sourceName: s,
            targetName: i,
            callback: Be.DATA,
            callbackId: t.callbackId,
            data: r,
          });
        },
        (r) => {
          n.postMessage({
            sourceName: s,
            targetName: i,
            callback: Be.ERROR,
            callbackId: t.callbackId,
            reason: dt(r),
          });
        },
      );
      return;
    }
    if (t.streamId) {
      this.#d(t);
      return;
    }
    e(t.data);
  }
  on(t, e) {
    const s = this.#t;
    if (s.has(t)) throw new Error(`There is already a "${t}" handler.`);
    s.set(t, e);
  }
  send(t, e, s) {
    this.#i.postMessage({ sourceName: this.#a, targetName: this.#h, action: t, data: e }, s);
  }
  sendWithPromise(t, e, s) {
    const i = this.#s++,
      n = Promise.withResolvers();
    this.#e.set(i, n);
    try {
      this.#i.postMessage({ sourceName: this.#a, targetName: this.#h, action: t, callbackId: i, data: e }, s);
    } catch (r) {
      n.reject(r);
    }
    return n.promise;
  }
  sendWithStream(t, e, s, i) {
    const n = this.#o++,
      r = this.#a,
      a = this.#h,
      o = this.#i;
    return new ReadableStream(
      {
        start: (l) => {
          const h = Promise.withResolvers();
          return (
            this.#r.set(n, { controller: l, startCall: h, pullCall: null, cancelCall: null, isClosed: !1 }),
            o.postMessage(
              { sourceName: r, targetName: a, action: t, streamId: n, data: e, desiredSize: l.desiredSize },
              i,
            ),
            h.promise
          );
        },
        pull: (l) => {
          const h = Promise.withResolvers();
          return (
            (this.#r.get(n).pullCall = h),
            o.postMessage({
              sourceName: r,
              targetName: a,
              stream: st.PULL,
              streamId: n,
              desiredSize: l.desiredSize,
            }),
            h.promise
          );
        },
        cancel: (l) => {
          tt(l instanceof Error, "cancel must have a valid reason");
          const h = Promise.withResolvers();
          return (
            (this.#r.get(n).cancelCall = h),
            (this.#r.get(n).isClosed = !0),
            o.postMessage({ sourceName: r, targetName: a, stream: st.CANCEL, streamId: n, reason: dt(l) }),
            h.promise
          );
        },
      },
      s,
    );
  }
  #d(t) {
    const e = t.streamId,
      s = this.#a,
      i = t.sourceName,
      n = this.#i,
      r = this.#l,
      a = this.#t.get(t.action),
      o = {
        enqueue(l, h = 1, d) {
          if (this.isCancelled) return;
          const u = this.desiredSize;
          ((this.desiredSize -= h),
            u > 0 &&
              this.desiredSize <= 0 &&
              ((this.sinkCapability = Promise.withResolvers()), (this.ready = this.sinkCapability.promise)),
            n.postMessage({ sourceName: s, targetName: i, stream: st.ENQUEUE, streamId: e, chunk: l }, d));
        },
        close() {
          this.isCancelled ||
            ((this.isCancelled = !0),
            n.postMessage({ sourceName: s, targetName: i, stream: st.CLOSE, streamId: e }),
            r.delete(e));
        },
        error(l) {
          (tt(l instanceof Error, "error must have a valid reason"),
            !this.isCancelled &&
              ((this.isCancelled = !0),
              n.postMessage({ sourceName: s, targetName: i, stream: st.ERROR, streamId: e, reason: dt(l) })));
        },
        sinkCapability: Promise.withResolvers(),
        onPull: null,
        onCancel: null,
        isCancelled: !1,
        desiredSize: t.desiredSize,
        ready: null,
      };
    (o.sinkCapability.resolve(),
      (o.ready = o.sinkCapability.promise),
      r.set(e, o),
      Promise.try(a, t.data, o).then(
        () => {
          n.postMessage({
            sourceName: s,
            targetName: i,
            stream: st.START_COMPLETE,
            streamId: e,
            success: !0,
          });
        },
        (l) => {
          n.postMessage({
            sourceName: s,
            targetName: i,
            stream: st.START_COMPLETE,
            streamId: e,
            reason: dt(l),
          });
        },
      ));
  }
  #f(t) {
    const e = t.streamId,
      s = this.#a,
      i = t.sourceName,
      n = this.#i,
      r = this.#r.get(e),
      a = this.#l.get(e);
    switch (t.stream) {
      case st.START_COMPLETE:
        t.success ? r.startCall.resolve() : r.startCall.reject(dt(t.reason));
        break;
      case st.PULL_COMPLETE:
        t.success ? r.pullCall.resolve() : r.pullCall.reject(dt(t.reason));
        break;
      case st.PULL:
        if (!a) {
          n.postMessage({ sourceName: s, targetName: i, stream: st.PULL_COMPLETE, streamId: e, success: !0 });
          break;
        }
        (a.desiredSize <= 0 && t.desiredSize > 0 && a.sinkCapability.resolve(),
          (a.desiredSize = t.desiredSize),
          Promise.try(a.onPull || _i).then(
            () => {
              n.postMessage({
                sourceName: s,
                targetName: i,
                stream: st.PULL_COMPLETE,
                streamId: e,
                success: !0,
              });
            },
            (l) => {
              n.postMessage({
                sourceName: s,
                targetName: i,
                stream: st.PULL_COMPLETE,
                streamId: e,
                reason: dt(l),
              });
            },
          ));
        break;
      case st.ENQUEUE:
        if ((tt(r, "enqueue should have stream controller"), r.isClosed)) break;
        r.controller.enqueue(t.chunk);
        break;
      case st.CLOSE:
        if ((tt(r, "close should have stream controller"), r.isClosed)) break;
        ((r.isClosed = !0), r.controller.close(), this.#g(r, e));
        break;
      case st.ERROR:
        (tt(r, "error should have stream controller"), r.controller.error(dt(t.reason)), this.#g(r, e));
        break;
      case st.CANCEL_COMPLETE:
        (t.success ? r.cancelCall.resolve() : r.cancelCall.reject(dt(t.reason)), this.#g(r, e));
        break;
      case st.CANCEL:
        if (!a) break;
        const o = dt(t.reason);
        (Promise.try(a.onCancel || _i, o).then(
          () => {
            n.postMessage({
              sourceName: s,
              targetName: i,
              stream: st.CANCEL_COMPLETE,
              streamId: e,
              success: !0,
            });
          },
          (l) => {
            n.postMessage({
              sourceName: s,
              targetName: i,
              stream: st.CANCEL_COMPLETE,
              streamId: e,
              reason: dt(l),
            });
          },
        ),
          a.sinkCapability.reject(o),
          (a.isCancelled = !0),
          this.#l.delete(e));
        break;
      default:
        throw new Error("Unexpected stream case");
    }
  }
  async #g(t, e) {
    (await Promise.allSettled([t.startCall?.promise, t.pullCall?.promise, t.cancelCall?.promise]),
      this.#r.delete(e));
  }
  destroy() {
    (this.#n?.abort(), (this.#n = null));
  }
}