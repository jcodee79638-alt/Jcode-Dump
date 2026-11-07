
var HLn = ne(() => {
  Ba();
  J_();
  aLn = class e extends pH {
    sql;
    static [Gr] = "SQLiteCountBuilderAsync";
    [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
    session;
    static buildEmbeddedCount(t, r) {
      return Zt`(select count(*) from ${t}${Zt.raw(" where ").if(r)}${r})`;
    }
    static buildCount(t, r) {
      return Zt`select count(*) from ${t}${Zt.raw(" where ").if(r)}${r}`;
    }
    constructor(t) {
      super(e.buildEmbeddedCount(t.source, t.filters).queryChunks);
      ((this.params = t), (this.session = t.session), (this.sql = e.buildCount(t.source, t.filters)));
    }
    then(t, r) {
      return Promise.resolve(this.session.count(this.sql)).then(t, r);
    }
    catch(t) {
      return this.then(void 0, t);
    }
    finally(t) {
      return this.then(
        (r) => (t?.(), r),
        (r) => {
          throw (t?.(), r);
        },
      );
    }
  };
});