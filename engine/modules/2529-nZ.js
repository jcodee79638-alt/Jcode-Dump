
async function nZ(e, t, { concurrency: r = Number.POSITIVE_INFINITY, stopOnError: s = !0, signal: a } = {}) {
  return new Promise((H, u) => {
    if (e[Symbol.iterator] === void 0 && e[Symbol.asyncIterator] === void 0)
      throw TypeError(
        `Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof e})`,
      );
    if (typeof t !== "function") throw TypeError("Mapper function is required");
    if (!((Number.isSafeInteger(r) && r >= 1) || r === Number.POSITIVE_INFINITY))
      throw TypeError(
        `Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${r}\` (${typeof r})`,
      );
    let f = [],
      d = [],
      _ = new Map(),
      L = !1,
      I = !1,
      D = !1,
      S = 0,
      T = 0,
      C = e[Symbol.iterator] === void 0 ? e[Symbol.asyncIterator]() : e[Symbol.iterator](),
      O = () => {
        q(a.reason);
      },
      B = () => {
        a?.removeEventListener("abort", O);
      },
      V = (se) => {
        (H(se), B());
      },
      q = (se) => {
        ((L = !0), (I = !0), u(se), B());
      };
    if (a) {
      if (a.aborted) q(a.reason);
      a.addEventListener("abort", O, { once: !0 });
    }
    let Z = async () => {
      if (I) return;
      let se = await C.next(),
        ae = T;
      if ((T++, se.done)) {
        if (((D = !0), S === 0 && !I)) {
          if (!s && d.length > 0) {
            q(AggregateError(d));
            return;
          }
          if (((I = !0), _.size === 0)) {
            V(f);
            return;
          }
          let z = [];
          for (let [Ae, le] of f.entries()) {
            if (_.get(Ae) === cei) continue;
            z.push(le);
          }
          V(z);
        }
        return;
      }
      (S++,
        (async () => {
          try {
            let z = await se.value;
            if (I) return;
            let Ae = await t(z, ae);
            if (Ae === cei) _.set(ae, Ae);
            ((f[ae] = Ae), S--, await Z());
          } catch (z) {
            if (s) q(z);
            else {
              (d.push(z), S--);
              try {
                await Z();
              } catch (Ae) {
                q(Ae);
              }
            }
          }
        })());
    };
    (async () => {
      for (let se = 0; se < r; se++) {
        try {
          await Z();
        } catch (ae) {
          q(ae);
          break;
        }
        if (D || L) break;
      }
    })();
  });
}