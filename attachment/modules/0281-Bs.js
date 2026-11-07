
class Bs extends De {
  toSVGPath() {
    let t = super.toSVGPath();
    return (t.endsWith("Z") || (t += "Z"), t);
  }
}