
var hhr = Ie(function (B$c, hgi) {
  var vca = Promise.allSettled
    ? (e) => Promise.allSettled(e)
    : (e) => {
        let t = [];
        for (let r = 0; r < e.length; r++)
          t[r] = Promise.resolve(e[r]).then(
            (s) => ({ status: "fulfilled", value: s }),
            (s) => ({ status: "rejected", reason: s }),
          );
        return Promise.all(t);
      };
  hgi.exports = (e) =>
    vca(e).then((t) => {
      let r = null,
        s = Array(t.length);
      return (
        t.forEach((a, H) => {
          if (a.status === "rejected") throw a.reason;
          else s[H] = a.value;
        }),
        s
      );
    });
});