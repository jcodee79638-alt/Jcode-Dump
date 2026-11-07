
class Mi {
  alphaIsShape = !1;
  fontSize = 0;
  fontSizeScale = 1;
  textMatrix = null;
  textMatrixScale = 1;
  fontMatrix = xs;
  leading = 0;
  x = 0;
  y = 0;
  lineX = 0;
  lineY = 0;
  charSpacing = 0;
  wordSpacing = 0;
  textHScale = 1;
  textRenderingMode = nt.FILL;
  textRise = 0;
  fillColor = "#000000";
  strokeColor = "#000000";
  tilingPatternDims = null;
  patternFill = !1;
  patternStroke = !1;
  fillAlpha = 1;
  strokeAlpha = 1;
  lineWidth = 1;
  activeSMask = null;
  transferMaps = "none";
  transferMapsFallback = null;
  minMax = Yt.slice();
  constructor(t, e) {
    this.clipBox = new Float32Array([0, 0, t, e]);
  }
  clone() {
    const t = Object.create(this);
    return (
      (t.clipBox = this.clipBox.slice()),
      (t.minMax = this.minMax.slice()),
      (t.tilingPatternDims = this.tilingPatternDims?.slice()),
      t
    );
  }
  getPathBoundingBox(t = ht.FILL, e = null) {
    const s = this.minMax.slice();
    if (t === ht.STROKE) {
      (e || $("Stroke bounding box must include transform."), T.singularValueDecompose2dScale(e, yt));
      const i = (yt[0] * this.lineWidth) / 2,
        n = (yt[1] * this.lineWidth) / 2;
      ((s[0] -= i), (s[1] -= n), (s[2] += i), (s[3] += n));
    }
    return s;
  }
  updateClipFromPath() {
    const t = T.intersect(this.clipBox, this.getPathBoundingBox());
    this.startNewPathAndClipBox(t || [0, 0, 0, 0]);
  }
  isEmptyClip() {
    return this.minMax[0] === 1 / 0;
  }
  startNewPathAndClipBox(t) {
    (this.clipBox.set(t, 0), this.minMax.set(Yt, 0));
  }
  getClippedPathBoundingBox(t = ht.FILL, e = null) {
    return T.intersect(this.clipBox, this.getPathBoundingBox(t, e));
  }
}