
var Wzn = Ie(function (iuc, Rzn) {
  var { readFile: p6o } = cr("fs/promises"),
    d6o = m7e();
  async function Fzn(e) {
    try {
      return await p6o(e, "utf8");
    } catch (t) {
      throw ((t.message = `Could not read package.json: ${t}`), t);
    }
  }
  function Bzn(e) {
    try {
      return d6o(e);
    } catch (t) {
      throw ((t.message = `Invalid package.json: ${t}`), t);
    }
  }
  async function m6o(e) {
    let t = await Fzn(e);
    return Bzn(t);
  }
  Rzn.exports = { read: Fzn, parse: Bzn, readPackage: m6o };
});