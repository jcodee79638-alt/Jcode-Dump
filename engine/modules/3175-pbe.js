
class pbe {
  constructor(e, t = {}) {
    var r, s, a, H, u;
    ((this.options = t),
      (this.startIndex = 0),
      (this.endIndex = 0),
      (this.openTagStart = 0),
      (this.tagname = ""),
      (this.attribname = ""),
      (this.attribvalue = ""),
      (this.attribs = null),
      (this.stack = []),
      (this.foreignContext = []),
      (this.buffers = []),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1),
      (this.cbs = e !== null && e !== void 0 ? e : {}),
      (this.lowerCaseTagNames = (r = t.lowerCaseTags) !== null && r !== void 0 ? r : !t.xmlMode),
      (this.lowerCaseAttributeNames =
        (s = t.lowerCaseAttributeNames) !== null && s !== void 0 ? s : !t.xmlMode),
      (this.tokenizer = new ((a = t.Tokenizer) !== null && a !== void 0 ? a : cxt)(this.options, this)),
      (u = (H = this.cbs).onparserinit) === null || u === void 0 || u.call(H, this));
  }
  ontext(e, t) {
    var r, s;
    let a = this.getSlice(e, t);
    ((this.endIndex = t - 1),
      (s = (r = this.cbs).ontext) === null || s === void 0 || s.call(r, a),
      (this.startIndex = t));
  }
  ontextentity(e) {
    var t, r;
    let s = this.tokenizer.getSectionStart();
    ((this.endIndex = s - 1),
      (r = (t = this.cbs).ontext) === null || r === void 0 || r.call(t, lbe(e)),
      (this.startIndex = s));
  }
  isVoidElement(e) {
    return !this.options.xmlMode && N_a.has(e);
  }
  onopentagname(e, t) {
    this.endIndex = t;
    let r = this.getSlice(e, t);
    if (this.lowerCaseTagNames) r = r.toLowerCase();
    this.emitOpenTag(r);
  }
  emitOpenTag(e) {
    var t, r, s, a;
    ((this.openTagStart = this.startIndex), (this.tagname = e));
    let H = !this.options.xmlMode && U_a.get(e);
    if (H)
      while (this.stack.length > 0 && H.has(this.stack[this.stack.length - 1])) {
        let u = this.stack.pop();
        (r = (t = this.cbs).onclosetag) === null || r === void 0 || r.call(t, u, !0);
      }
    if (!this.isVoidElement(e)) {
      if ((this.stack.push(e), Syi.has(e))) this.foreignContext.push(!0);
      else if (Tyi.has(e)) this.foreignContext.push(!1);
    }
    if (((a = (s = this.cbs).onopentagname) === null || a === void 0 || a.call(s, e), this.cbs.onopentag))
      this.attribs = {};
  }
  endOpenTag(e) {
    var t, r;
    if (((this.startIndex = this.openTagStart), this.attribs))
      ((r = (t = this.cbs).onopentag) === null || r === void 0 || r.call(t, this.tagname, this.attribs, e),
        (this.attribs = null));
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) this.cbs.onclosetag(this.tagname, !0);
    this.tagname = "";
  }
  onopentagend(e) {
    ((this.endIndex = e), this.endOpenTag(!1), (this.startIndex = e + 1));
  }
  onclosetag(e, t) {
    var r, s, a, H, u, f;
    this.endIndex = t;
    let d = this.getSlice(e, t);
    if (this.lowerCaseTagNames) d = d.toLowerCase();
    if (Syi.has(d) || Tyi.has(d)) this.foreignContext.pop();
    if (!this.isVoidElement(d)) {
      let _ = this.stack.lastIndexOf(d);
      if (_ !== -1)
        if (this.cbs.onclosetag) {
          let L = this.stack.length - _;
          while (L--) this.cbs.onclosetag(this.stack.pop(), L !== 0);
        } else this.stack.length = _;
      else if (!this.options.xmlMode && d === "p") (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    } else if (!this.options.xmlMode && d === "br")
      ((s = (r = this.cbs).onopentagname) === null || s === void 0 || s.call(r, "br"),
        (H = (a = this.cbs).onopentag) === null || H === void 0 || H.call(a, "br", {}, !0),
        (f = (u = this.cbs).onclosetag) === null || f === void 0 || f.call(u, "br", !1));
    this.startIndex = t + 1;
  }
  onselfclosingtag(e) {
    if (
      ((this.endIndex = e),
      this.options.xmlMode ||
        this.options.recognizeSelfClosing ||
        this.foreignContext[this.foreignContext.length - 1])
    )
      (this.closeCurrentTag(!1), (this.startIndex = e + 1));
    else this.onopentagend(e);
  }
  closeCurrentTag(e) {
    var t, r;
    let s = this.tagname;
    if ((this.endOpenTag(e), this.stack[this.stack.length - 1] === s))
      ((r = (t = this.cbs).onclosetag) === null || r === void 0 || r.call(t, s, !e), this.stack.pop());
  }
  onattribname(e, t) {
    this.startIndex = e;
    let r = this.getSlice(e, t);
    this.attribname = this.lowerCaseAttributeNames ? r.toLowerCase() : r;
  }
  onattribdata(e, t) {
    this.attribvalue += this.getSlice(e, t);
  }
  onattribentity(e) {
    this.attribvalue += lbe(e);
  }
  onattribend(e, t) {
    var r, s;
    if (
      ((this.endIndex = t),
      (s = (r = this.cbs).onattribute) === null ||
        s === void 0 ||
        s.call(
          r,
          this.attribname,
          this.attribvalue,
          e === YV.Double ? '"' : e === YV.Single ? "'" : e === YV.NoValue ? void 0 : null,
        ),
      this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname))
    )
      this.attribs[this.attribname] = this.attribvalue;
    this.attribvalue = "";
  }
  getInstructionName(e) {
    let t = e.search(F_a),
      r = t < 0 ? e : e.substr(0, t);
    if (this.lowerCaseTagNames) r = r.toLowerCase();
    return r;
  }
  ondeclaration(e, t) {
    this.endIndex = t;
    let r = this.getSlice(e, t);
    if (this.cbs.onprocessinginstruction) {
      let s = this.getInstructionName(r);
      this.cbs.onprocessinginstruction(`!${s}`, `!${r}`);
    }
    this.startIndex = t + 1;
  }
  onprocessinginstruction(e, t) {
    this.endIndex = t;
    let r = this.getSlice(e, t);
    if (this.cbs.onprocessinginstruction) {
      let s = this.getInstructionName(r);
      this.cbs.onprocessinginstruction(`?${s}`, `?${r}`);
    }
    this.startIndex = t + 1;
  }
  oncomment(e, t, r) {
    var s, a, H, u;
    ((this.endIndex = t),
      (a = (s = this.cbs).oncomment) === null || a === void 0 || a.call(s, this.getSlice(e, t - r)),
      (u = (H = this.cbs).oncommentend) === null || u === void 0 || u.call(H),
      (this.startIndex = t + 1));
  }
  oncdata(e, t, r) {
    var s, a, H, u, f, d, _, L, I, D;
    this.endIndex = t;
    let S = this.getSlice(e, t - r);
    if (this.options.xmlMode || this.options.recognizeCDATA)
      ((a = (s = this.cbs).oncdatastart) === null || a === void 0 || a.call(s),
        (u = (H = this.cbs).ontext) === null || u === void 0 || u.call(H, S),
        (d = (f = this.cbs).oncdataend) === null || d === void 0 || d.call(f));
    else
      ((L = (_ = this.cbs).oncomment) === null || L === void 0 || L.call(_, `[CDATA[${S}]]`),
        (D = (I = this.cbs).oncommentend) === null || D === void 0 || D.call(I));
    this.startIndex = t + 1;
  }
  onend() {
    var e, t;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let r = this.stack.length; r > 0; this.cbs.onclosetag(this.stack[--r], !0));
    }
    (t = (e = this.cbs).onend) === null || t === void 0 || t.call(e);
  }
  reset() {
    var e, t, r, s;
    ((t = (e = this.cbs).onreset) === null || t === void 0 || t.call(e),
      this.tokenizer.reset(),
      (this.tagname = ""),
      (this.attribname = ""),
      (this.attribs = null),
      (this.stack.length = 0),
      (this.startIndex = 0),
      (this.endIndex = 0),
      (s = (r = this.cbs).onparserinit) === null || s === void 0 || s.call(r, this),
      (this.buffers.length = 0),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1));
  }
  parseComplete(e) {
    (this.reset(), this.end(e));
  }
  getSlice(e, t) {
    while (e - this.bufferOffset >= this.buffers[0].length) this.shiftBuffer();
    let r = this.buffers[0].slice(e - this.bufferOffset, t - this.bufferOffset);
    while (t - this.bufferOffset > this.buffers[0].length)
      (this.shiftBuffer(), (r += this.buffers[0].slice(0, t - this.bufferOffset)));
    return r;
  }
  shiftBuffer() {
    ((this.bufferOffset += this.buffers[0].length), this.writeIndex--, this.buffers.shift());
  }
  write(e) {
    var t, r;
    if (this.ended) {
      (r = (t = this.cbs).onerror) === null || r === void 0 || r.call(t, Error(".write() after done!"));
      return;
    }
    if ((this.buffers.push(e), this.tokenizer.running)) (this.tokenizer.write(e), this.writeIndex++);
  }
  end(e) {
    var t, r;
    if (this.ended) {
      (r = (t = this.cbs).onerror) === null || r === void 0 || r.call(t, Error(".end() after done!"));
      return;
    }
    if (e) this.write(e);
    ((this.ended = !0), this.tokenizer.end());
  }
  pause() {
    this.tokenizer.pause();
  }
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length)
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    if (this.ended) this.tokenizer.end();
  }
  parseChunk(e) {
    this.write(e);
  }
  done(e) {
    this.end(e);
  }
}