
var _sn = ne(() => {
  Jg();
  Jq();
  Sj();
  aie();
  wC();
  mI();
  Hf();
  fye();
  R_();
  Yu();
  gE();
  ((nsn = {
    [elt]: elt,
    pipe() {
      return vA(this, arguments);
    },
    [F0]() {
      return this.toString();
    },
    toJSON() {
      return K2e(this).toJSON();
    },
  }),
    (YUs = {
      ...nsn,
      _tag: "Utc",
      [W_]() {
        return Kfe(this.epochMilliseconds);
      },
      [V_](e) {
        return J2e(e) && e._tag === "Utc" && this.epochMilliseconds === e.epochMilliseconds;
      },
      toString() {
        return `DateTime.Utc(${K2e(this).toJSON()})`;
      },
    }),
    (wuH = {
      ...nsn,
      _tag: "Zoned",
      [W_]() {
        return yv(Kfe(this.epochMilliseconds))(ad(this.zone));
      },
      [V_](e) {
        return (
          J2e(e) &&
          e._tag === "Zoned" &&
          this.epochMilliseconds === e.epochMilliseconds &&
          hp(this.zone, e.zone)
        );
      },
      toString() {
        return `DateTime.Zoned(${msn(this)})`;
      },
    }),
    (isn = {
      [tlt]: tlt,
      [F0]() {
        return this.toString();
      },
    }),
    (kuH = {
      ...isn,
      _tag: "Named",
      [W_]() {
        return N0(`Named:${this.id}`);
      },
      [V_](e) {
        return HQt(e) && e._tag === "Named" && this.id === e.id;
      },
      toString() {
        return `TimeZone.Named(${this.id})`;
      },
      toJSON() {
        return { _id: "TimeZone", _tag: "Named", id: this.id };
      },
    }),
    (OuH = {
      ...isn,
      _tag: "Offset",
      [W_]() {
        return N0(`Offset:${this.offset}`);
      },
      [V_](e) {
        return HQt(e) && e._tag === "Offset" && this.offset === e.offset;
      },
      toString() {
        return `TimeZone.Offset(${fsn(this.offset)})`;
      },
      toJSON() {
        return { _id: "TimeZone", _tag: "Offset", offset: this.offset };
      },
    }),
    (osn = LW((e, t) => e.epochMilliseconds === t.epochMilliseconds)),
    (asn = epe((e, t) =>
      e.epochMilliseconds < t.epochMilliseconds ? -1 : e.epochMilliseconds > t.epochMilliseconds ? 1 : 0,
    )),
    (Hsn = ern(cQt)),
    (csn = $_(qC, rlt)),
    (Asn = $_(qC, (e) => new Date(e))));
});