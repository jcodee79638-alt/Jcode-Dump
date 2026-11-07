
var SDn = Ie(function (tWH, xDn) {
  var hQs = MDn();
  xDn.exports = (e = "") => {
    let t = e.match(hQs);
    if (!t) return null;
    let [r, s] = t[0].replace(/#! ?/, "").split(" "),
      a = r.split("/").pop();
    if (a === "env") return s;
    return s ? `${a} ${s}` : a;
  };
});