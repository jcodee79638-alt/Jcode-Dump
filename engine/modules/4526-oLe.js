
function oLe(e, t, r) {
  let s = (a) => Object.defineProperty(e, t, { value: a, enumerable: !0, writable: !0 });
  return (
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !0,
      get() {
        let a = r();
        return (s(a), a);
      },
      set(a) {
        s(a);
      },
    }),
    e
  );
}
import { promisify as E2a } from "util";
import I2a from "process";
import { execFile as D2a } from "child_process";