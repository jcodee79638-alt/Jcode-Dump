
var hsn,
  Lsn = (e) => {
    let t = Math.ceil(Math.log(e) / Math.log(2));
    return Math.max(Math.pow(2, t), 2);
  },
  $sn = (e) => {
    if (e === "NaN") return Lo(NaN);
    if (e === "Infinity") return Lo(1 / 0);
    if (e === "-Infinity") return Lo(-1 / 0);
    if (e.trim() === "") return eH();
    let t = hsn(e);
    return hsn.isNaN(t) ? eH() : Lo(t);
  };