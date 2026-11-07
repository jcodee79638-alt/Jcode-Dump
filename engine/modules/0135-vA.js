
var vA = (e, t) => {
    switch (t.length) {
      case 0:
        return e;
      case 1:
        return t[0](e);
      case 2:
        return t[1](t[0](e));
      case 3:
        return t[2](t[1](t[0](e)));
      case 4:
        return t[3](t[2](t[1](t[0](e))));
      case 5:
        return t[4](t[3](t[2](t[1](t[0](e)))));
      case 6:
        return t[5](t[4](t[3](t[2](t[1](t[0](e))))));
      case 7:
        return t[6](t[5](t[4](t[3](t[2](t[1](t[0](e)))))));
      case 8:
        return t[7](t[6](t[5](t[4](t[3](t[2](t[1](t[0](e))))))));
      case 9:
        return t[8](t[7](t[6](t[5](t[4](t[3](t[2](t[1](t[0](e)))))))));
      default: {
        let r = e;
        for (let s = 0, a = t.length; s < a; s++) r = t[s](r);
        return r;
      }
    }
  },
  W8s,
  Jfe;