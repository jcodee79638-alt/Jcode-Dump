
var oQt,
  Yut = (e) =>
    class extends oQt {
      _tag = e;
    },
  zUs = () =>
    new Proxy(
      {},
      {
        get(e, t, r) {
          if (t === "$is") return pQ;
          else if (t === "$match") return QUs;
          return (s) => ({ ...s, _tag: t });
        },
      },
    ),
  Zut,
  IE;