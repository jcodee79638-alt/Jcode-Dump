
var lY = ne(() => {
  Ba();
  Bj = class {
    static [Gr] = "QueryPromise";
    [Symbol.toStringTag] = "QueryPromise";
    catch(e) {
      return this.then(void 0, e);
    }
    finally(e) {
      return this.then(
        (t) => (e?.(), t),
        (t) => {
          throw (e?.(), t);
        },
      );
    }
    then(e, t) {
      return this.execute().then(e, t);
    }
  };
});