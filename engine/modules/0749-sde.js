
var sde = (e) => (e instanceof globalThis.Error ? e : new globalThis.Error(String(e))),
  LG = (e, t, r) => {
    let { commands: s } = ffn(r),
      a = s.reduce((H, u) => {
        let f = `${u.command} ${u.args.join(" ")}`;
        return H.length === 0 ? f : `${H} | ${f}`;
      }, "");
    return RL("ChildProcess", e)(t, [a]);
  },
  w3s,
  lfn,
  ffn = (e) => {
    let t = [],
      r = [],
      s = (f) => {
        switch (f._tag) {
          case "StandardCommand": {
            t.push(f);
            break;
          }
          case "PipedCommand": {
            (s(f.left), r.push(f.options), s(f.right));
            break;
          }
        }
      };
    if ((s(e), t.length === 0)) throw Error("flattenCommand produced empty commands array");
    let [a, ...H] = t;
    return { commands: [a, ...H], pipeOptions: r };
  };