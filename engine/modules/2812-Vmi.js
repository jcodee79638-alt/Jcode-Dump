
var Vmi = Ie(function (Vea) {
  Vea.Client = Umi();
  Vea.Tracker = Bmi();
  var Imr = new Map();
  Vea.createTracker = (e, t, r) => {
    let s = new Vea.Tracker(e, t, r);
    if (Imr.has(s.key)) {
      let a = `proggy: duplicate progress id ${JSON.stringify(s.key)}`;
      throw Error(a);
    }
    return (Imr.set(s.key, s), s.on("done", () => Imr.delete(s.key)), s);
  };
  Vea.createClient = (e = {}) => new Vea.Client(e);
});