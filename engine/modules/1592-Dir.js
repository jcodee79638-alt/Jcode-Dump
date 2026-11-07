
var Dir = ne(() => {
  cV();
  BA();
  ((Iir = Lse({
    dataType() {
      return "text";
    },
    toDriver(e) {
      return QMe(e);
    },
    fromDriver(e) {
      return bo.make(Eir(QMe(e)));
    },
  })),
    (KDn = Lse({
      dataType() {
        return "text";
      },
      toDriver(e) {
        return e ? QMe(e) : e;
      },
      fromDriver(e) {
        return e ? Eir(QMe(e)) : e;
      },
    })),
    (zDn = Lse({
      dataType() {
        return "text";
      },
      toDriver(e) {
        return gir(e);
      },
      fromDriver(e) {
        return gir(e);
      },
    })),
    (QDn = Lse({
      dataType() {
        return "text";
      },
      toDriver(e) {
        return JSON.stringify(e.map(QMe));
      },
      fromDriver(e) {
        return JSON.parse(e).map((t) => bo.make(Eir(QMe(t))));
      },
    })));
});