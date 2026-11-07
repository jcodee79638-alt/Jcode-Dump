
function Vs(e) {
  let t = { stopped: !1, active: void 0 },
    n = () => {
      try {
        e.changed();
      } catch {}
    };
  async function i() {
    if (t.stopped || !(await e.ready())) return;
    let r = await e.queue.list();
    if (r.paused) return;
    for (let s of r.items.filter((o) => o.state === "queued").slice(0, 20)) {
      if (t.stopped) return;
      if (!(await e.eligible(s))) continue;
      if (t.stopped || !(await e.ready())) return;
      let o = await e.queue.list();
      if (o.paused) return;
      let l = o.items.find((w) => w.id === s.id && w.state === "queued");
      if (!l || !(await e.eligible(l))) continue;
      if (t.stopped || !(await e.ready())) return;
      let u = await e.access(l);
      if (t.stopped) return;
      if (u !== l.accessMode) {
        (await e.queue.action(l.id, "pause"), n());
        continue;
      }
      let p = await e.queue.claim(l.id);
      if (!p) continue;
      n();
      try {
        if (
          t.stopped ||
          !(await e.ready()) ||
          !(await e.eligible(p)) ||
          (await e.access(p)) !== p.accessMode
        ) {
          (await e.queue.block(p.id), n());
          return;
        }
        (await e.send(p), await e.queue.submitted(p.id));
      } catch {
        await e.queue.block(p.id);
      }
      n();
      return;
    }
  }
  return {
    tick() {
      if (t.stopped) return Promise.resolve();
      if (t.active) return t.active;
      let r = i();
      return (
        (t.active = r),
        r
          .finally(() => {
            if (t.active === r) t.active = void 0;
          })
          .catch(() => {}),
        r
      );
    },
    async stop() {
      ((t.stopped = !0), await t.active);
    },
  };
}