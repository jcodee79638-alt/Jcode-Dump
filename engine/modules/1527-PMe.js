
var PMe = ne(() => {
  R0();
  Jg();
  kpe();
  n2();
  $6();
  BH();
  Yu();
  TQ();
  Tv();
  _In = [239, 187, 191];
  M_t = class M_t extends Yut("Retry") {
    [Rnr] = Rnr;
    static is(e) {
      return Ma(e, Rnr);
    }
    static filter(e) {
      return M_t.is(e) ? D$(e) : dh(e);
    }
  };
  y_t = {
    write(e) {
      switch (e._tag) {
        case "Event": {
          let t = "";
          if (e.id !== void 0)
            t += `id: ${e.id}
`;
          if (e.event !== "message")
            t += `event: ${e.event}
`;
          if (e.data !== "")
            t += `data: ${e.data.replace(
              /\n/g,
              `
data: `,
            )}
`;
          return (
            t +
            `
`
          );
        }
        case "Retry":
          return `retry: ${$E(e.duration)}

`;
      }
    },
  };
});
import { Buffer as Wnr } from "buffer";