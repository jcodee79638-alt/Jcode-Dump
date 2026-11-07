
class cxt {
  constructor({ xmlMode: e = !1, decodeEntities: t = !0 }, r) {
    ((this.cbs = r),
      (this.state = Qo.Text),
      (this.buffer = ""),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.baseState = Qo.Text),
      (this.isSpecial = !1),
      (this.running = !0),
      (this.offset = 0),
      (this.currentSequence = void 0),
      (this.sequenceIndex = 0),
      (this.trieIndex = 0),
      (this.trieCurrent = 0),
      (this.entityResult = 0),
      (this.entityExcess = 0),
      (this.xmlMode = e),
      (this.decodeEntities = t),
      (this.entityTrie = e ? axt : oxt));
  }
  reset() {
    ((this.state = Qo.Text),
      (this.buffer = ""),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.baseState = Qo.Text),
      (this.currentSequence = void 0),
      (this.running = !0),
      (this.offset = 0));
  }
  write(e) {
    ((this.offset += this.buffer.length), (this.buffer = e), this.parse());
  }
  end() {
    if (this.running) this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    if (((this.running = !0), this.index < this.buffer.length + this.offset)) this.parse();
  }
  getIndex() {
    return this.index;
  }
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(e) {
    if (e === DA.Lt || (!this.decodeEntities && this.fastForwardTo(DA.Lt))) {
      if (this.index > this.sectionStart) this.cbs.ontext(this.sectionStart, this.index);
      ((this.state = Qo.BeforeTagName), (this.sectionStart = this.index));
    } else if (this.decodeEntities && e === DA.Amp) this.state = Qo.BeforeEntity;
  }
  stateSpecialStartSequence(e) {
    let t = this.sequenceIndex === this.currentSequence.length;
    if (!(t ? Hxt(e) : (e | 32) === this.currentSequence[this.sequenceIndex])) this.isSpecial = !1;
    else if (!t) {
      this.sequenceIndex++;
      return;
    }
    ((this.sequenceIndex = 0), (this.state = Qo.InTagName), this.stateInTagName(e));
  }
  stateInSpecialTag(e) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (e === DA.Gt || xZ(e)) {
        let t = this.index - this.currentSequence.length;
        if (this.sectionStart < t) {
          let r = this.index;
          ((this.index = t), this.cbs.ontext(this.sectionStart, t), (this.index = r));
        }
        ((this.isSpecial = !1), (this.sectionStart = t + 2), this.stateInClosingTagName(e));
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((e | 32) === this.currentSequence[this.sequenceIndex]) this.sequenceIndex += 1;
    else if (this.sequenceIndex === 0) {
      if (this.currentSequence === v8.TitleEnd) {
        if (this.decodeEntities && e === DA.Amp) this.state = Qo.BeforeEntity;
      } else if (this.fastForwardTo(DA.Lt)) this.sequenceIndex = 1;
    } else this.sequenceIndex = Number(e === DA.Lt);
  }
  stateCDATASequence(e) {
    if (e === v8.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === v8.Cdata.length)
        ((this.state = Qo.InCommentLike),
          (this.currentSequence = v8.CdataEnd),
          (this.sequenceIndex = 0),
          (this.sectionStart = this.index + 1));
    } else ((this.sequenceIndex = 0), (this.state = Qo.InDeclaration), this.stateInDeclaration(e));
  }
  fastForwardTo(e) {
    while (++this.index < this.buffer.length + this.offset)
      if (this.buffer.charCodeAt(this.index - this.offset) === e) return !0;
    return ((this.index = this.buffer.length + this.offset - 1), !1);
  }
  stateInCommentLike(e) {
    if (e === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === v8.CdataEnd) this.cbs.oncdata(this.sectionStart, this.index, 2);
        else this.cbs.oncomment(this.sectionStart, this.index, 2);
        ((this.sequenceIndex = 0), (this.sectionStart = this.index + 1), (this.state = Qo.Text));
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) this.sequenceIndex = 1;
    } else if (e !== this.currentSequence[this.sequenceIndex - 1]) this.sequenceIndex = 0;
  }
  isTagStartChar(e) {
    return this.xmlMode ? !Hxt(e) : k_a(e);
  }
  startSpecial(e, t) {
    ((this.isSpecial = !0),
      (this.currentSequence = e),
      (this.sequenceIndex = t),
      (this.state = Qo.SpecialStartSequence));
  }
  stateBeforeTagName(e) {
    if (e === DA.ExclamationMark) ((this.state = Qo.BeforeDeclaration), (this.sectionStart = this.index + 1));
    else if (e === DA.Questionmark)
      ((this.state = Qo.InProcessingInstruction), (this.sectionStart = this.index + 1));
    else if (this.isTagStartChar(e)) {
      let t = e | 32;
      if (((this.sectionStart = this.index), !this.xmlMode && t === v8.TitleEnd[2]))
        this.startSpecial(v8.TitleEnd, 3);
      else this.state = !this.xmlMode && t === v8.ScriptEnd[2] ? Qo.BeforeSpecialS : Qo.InTagName;
    } else if (e === DA.Slash) this.state = Qo.BeforeClosingTagName;
    else ((this.state = Qo.Text), this.stateText(e));
  }
  stateInTagName(e) {
    if (Hxt(e))
      (this.cbs.onopentagname(this.sectionStart, this.index),
        (this.sectionStart = -1),
        (this.state = Qo.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
  }
  stateBeforeClosingTagName(e) {
    if (xZ(e));
    else if (e === DA.Gt) this.state = Qo.Text;
    else
      ((this.state = this.isTagStartChar(e) ? Qo.InClosingTagName : Qo.InSpecialComment),
        (this.sectionStart = this.index));
  }
  stateInClosingTagName(e) {
    if (e === DA.Gt || xZ(e))
      (this.cbs.onclosetag(this.sectionStart, this.index),
        (this.sectionStart = -1),
        (this.state = Qo.AfterClosingTagName),
        this.stateAfterClosingTagName(e));
  }
  stateAfterClosingTagName(e) {
    if (e === DA.Gt || this.fastForwardTo(DA.Gt))
      ((this.state = Qo.Text), (this.baseState = Qo.Text), (this.sectionStart = this.index + 1));
  }
  stateBeforeAttributeName(e) {
    if (e === DA.Gt) {
      if ((this.cbs.onopentagend(this.index), this.isSpecial))
        ((this.state = Qo.InSpecialTag), (this.sequenceIndex = 0));
      else this.state = Qo.Text;
      ((this.baseState = this.state), (this.sectionStart = this.index + 1));
    } else if (e === DA.Slash) this.state = Qo.InSelfClosingTag;
    else if (!xZ(e)) ((this.state = Qo.InAttributeName), (this.sectionStart = this.index));
  }
  stateInSelfClosingTag(e) {
    if (e === DA.Gt)
      (this.cbs.onselfclosingtag(this.index),
        (this.state = Qo.Text),
        (this.baseState = Qo.Text),
        (this.sectionStart = this.index + 1),
        (this.isSpecial = !1));
    else if (!xZ(e)) ((this.state = Qo.BeforeAttributeName), this.stateBeforeAttributeName(e));
  }
  stateInAttributeName(e) {
    if (e === DA.Eq || Hxt(e))
      (this.cbs.onattribname(this.sectionStart, this.index),
        (this.sectionStart = -1),
        (this.state = Qo.AfterAttributeName),
        this.stateAfterAttributeName(e));
  }
  stateAfterAttributeName(e) {
    if (e === DA.Eq) this.state = Qo.BeforeAttributeValue;
    else if (e === DA.Slash || e === DA.Gt)
      (this.cbs.onattribend(YV.NoValue, this.index),
        (this.state = Qo.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
    else if (!xZ(e))
      (this.cbs.onattribend(YV.NoValue, this.index),
        (this.state = Qo.InAttributeName),
        (this.sectionStart = this.index));
  }
  stateBeforeAttributeValue(e) {
    if (e === DA.DoubleQuote) ((this.state = Qo.InAttributeValueDq), (this.sectionStart = this.index + 1));
    else if (e === DA.SingleQuote)
      ((this.state = Qo.InAttributeValueSq), (this.sectionStart = this.index + 1));
    else if (!xZ(e))
      ((this.sectionStart = this.index),
        (this.state = Qo.InAttributeValueNq),
        this.stateInAttributeValueNoQuotes(e));
  }
  handleInAttributeValue(e, t) {
    if (e === t || (!this.decodeEntities && this.fastForwardTo(t)))
      (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(t === DA.DoubleQuote ? YV.Double : YV.Single, this.index),
        (this.state = Qo.BeforeAttributeName));
    else if (this.decodeEntities && e === DA.Amp)
      ((this.baseState = this.state), (this.state = Qo.BeforeEntity));
  }
  stateInAttributeValueDoubleQuotes(e) {
    this.handleInAttributeValue(e, DA.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(e) {
    this.handleInAttributeValue(e, DA.SingleQuote);
  }
  stateInAttributeValueNoQuotes(e) {
    if (xZ(e) || e === DA.Gt)
      (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(YV.Unquoted, this.index),
        (this.state = Qo.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
    else if (this.decodeEntities && e === DA.Amp)
      ((this.baseState = this.state), (this.state = Qo.BeforeEntity));
  }
  stateBeforeDeclaration(e) {
    if (e === DA.OpeningSquareBracket) ((this.state = Qo.CDATASequence), (this.sequenceIndex = 0));
    else this.state = e === DA.Dash ? Qo.BeforeComment : Qo.InDeclaration;
  }
  stateInDeclaration(e) {
    if (e === DA.Gt || this.fastForwardTo(DA.Gt))
      (this.cbs.ondeclaration(this.sectionStart, this.index),
        (this.state = Qo.Text),
        (this.sectionStart = this.index + 1));
  }
  stateInProcessingInstruction(e) {
    if (e === DA.Gt || this.fastForwardTo(DA.Gt))
      (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
        (this.state = Qo.Text),
        (this.sectionStart = this.index + 1));
  }
  stateBeforeComment(e) {
    if (e === DA.Dash)
      ((this.state = Qo.InCommentLike),
        (this.currentSequence = v8.CommentEnd),
        (this.sequenceIndex = 2),
        (this.sectionStart = this.index + 1));
    else this.state = Qo.InDeclaration;
  }
  stateInSpecialComment(e) {
    if (e === DA.Gt || this.fastForwardTo(DA.Gt))
      (this.cbs.oncomment(this.sectionStart, this.index, 0),
        (this.state = Qo.Text),
        (this.sectionStart = this.index + 1));
  }
  stateBeforeSpecialS(e) {
    let t = e | 32;
    if (t === v8.ScriptEnd[3]) this.startSpecial(v8.ScriptEnd, 4);
    else if (t === v8.StyleEnd[3]) this.startSpecial(v8.StyleEnd, 4);
    else ((this.state = Qo.InTagName), this.stateInTagName(e));
  }
  stateBeforeEntity(e) {
    if (((this.entityExcess = 1), (this.entityResult = 0), e === DA.Number))
      this.state = Qo.BeforeNumericEntity;
    else if (e === DA.Amp);
    else
      ((this.trieIndex = 0),
        (this.trieCurrent = this.entityTrie[0]),
        (this.state = Qo.InNamedEntity),
        this.stateInNamedEntity(e));
  }
  stateInNamedEntity(e) {
    if (
      ((this.entityExcess += 1),
      (this.trieIndex = x$r(this.entityTrie, this.trieCurrent, this.trieIndex + 1, e)),
      this.trieIndex < 0)
    ) {
      (this.emitNamedEntity(), this.index--);
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    let t = this.trieCurrent & PB.VALUE_LENGTH;
    if (t) {
      let r = (t >> 14) - 1;
      if (!this.allowLegacyEntity() && e !== DA.Semi) this.trieIndex += r;
      else {
        let s = this.index - this.entityExcess + 1;
        if (s > this.sectionStart) this.emitPartial(this.sectionStart, s);
        if (
          ((this.entityResult = this.trieIndex),
          (this.trieIndex += r),
          (this.entityExcess = 0),
          (this.sectionStart = this.index + 1),
          r === 0)
        )
          this.emitNamedEntity();
      }
    }
  }
  emitNamedEntity() {
    if (((this.state = this.baseState), this.entityResult === 0)) return;
    switch ((this.entityTrie[this.entityResult] & PB.VALUE_LENGTH) >> 14) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~PB.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3:
        (this.emitCodePoint(this.entityTrie[this.entityResult + 1]),
          this.emitCodePoint(this.entityTrie[this.entityResult + 2]));
    }
  }
  stateBeforeNumericEntity(e) {
    if ((e | 32) === DA.LowerX) (this.entityExcess++, (this.state = Qo.InHexEntity));
    else ((this.state = Qo.InNumericEntity), this.stateInNumericEntity(e));
  }
  emitNumericEntity(e) {
    let t = this.index - this.entityExcess - 1;
    if (t + 2 + Number(this.state === Qo.InHexEntity) !== this.index) {
      if (t > this.sectionStart) this.emitPartial(this.sectionStart, t);
      ((this.sectionStart = this.index + Number(e)), this.emitCodePoint(rGe(this.entityResult)));
    }
    this.state = this.baseState;
  }
  stateInNumericEntity(e) {
    if (e === DA.Semi) this.emitNumericEntity(!0);
    else if (Iyi(e)) ((this.entityResult = this.entityResult * 10 + (e - DA.Zero)), this.entityExcess++);
    else {
      if (this.allowLegacyEntity()) this.emitNumericEntity(!1);
      else this.state = this.baseState;
      this.index--;
    }
  }
  stateInHexEntity(e) {
    if (e === DA.Semi) this.emitNumericEntity(!0);
    else if (Iyi(e)) ((this.entityResult = this.entityResult * 16 + (e - DA.Zero)), this.entityExcess++);
    else if (O_a(e))
      ((this.entityResult = this.entityResult * 16 + ((e | 32) - DA.LowerA + 10)), this.entityExcess++);
    else {
      if (this.allowLegacyEntity()) this.emitNumericEntity(!1);
      else this.state = this.baseState;
      this.index--;
    }
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === Qo.Text || this.baseState === Qo.InSpecialTag);
  }
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === Qo.Text || (this.state === Qo.InSpecialTag && this.sequenceIndex === 0))
        (this.cbs.ontext(this.sectionStart, this.index), (this.sectionStart = this.index));
      else if (
        this.state === Qo.InAttributeValueDq ||
        this.state === Qo.InAttributeValueSq ||
        this.state === Qo.InAttributeValueNq
      )
        (this.cbs.onattribdata(this.sectionStart, this.index), (this.sectionStart = this.index));
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  parse() {
    while (this.shouldContinue()) {
      let e = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case Qo.Text: {
          this.stateText(e);
          break;
        }
        case Qo.SpecialStartSequence: {
          this.stateSpecialStartSequence(e);
          break;
        }
        case Qo.InSpecialTag: {
          this.stateInSpecialTag(e);
          break;
        }
        case Qo.CDATASequence: {
          this.stateCDATASequence(e);
          break;
        }
        case Qo.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(e);
          break;
        }
        case Qo.InAttributeName: {
          this.stateInAttributeName(e);
          break;
        }
        case Qo.InCommentLike: {
          this.stateInCommentLike(e);
          break;
        }
        case Qo.InSpecialComment: {
          this.stateInSpecialComment(e);
          break;
        }
        case Qo.BeforeAttributeName: {
          this.stateBeforeAttributeName(e);
          break;
        }
        case Qo.InTagName: {
          this.stateInTagName(e);
          break;
        }
        case Qo.InClosingTagName: {
          this.stateInClosingTagName(e);
          break;
        }
        case Qo.BeforeTagName: {
          this.stateBeforeTagName(e);
          break;
        }
        case Qo.AfterAttributeName: {
          this.stateAfterAttributeName(e);
          break;
        }
        case Qo.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(e);
          break;
        }
        case Qo.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(e);
          break;
        }
        case Qo.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(e);
          break;
        }
        case Qo.AfterClosingTagName: {
          this.stateAfterClosingTagName(e);
          break;
        }
        case Qo.BeforeSpecialS: {
          this.stateBeforeSpecialS(e);
          break;
        }
        case Qo.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(e);
          break;
        }
        case Qo.InSelfClosingTag: {
          this.stateInSelfClosingTag(e);
          break;
        }
        case Qo.InDeclaration: {
          this.stateInDeclaration(e);
          break;
        }
        case Qo.BeforeDeclaration: {
          this.stateBeforeDeclaration(e);
          break;
        }
        case Qo.BeforeComment: {
          this.stateBeforeComment(e);
          break;
        }
        case Qo.InProcessingInstruction: {
          this.stateInProcessingInstruction(e);
          break;
        }
        case Qo.InNamedEntity: {
          this.stateInNamedEntity(e);
          break;
        }
        case Qo.BeforeEntity: {
          this.stateBeforeEntity(e);
          break;
        }
        case Qo.InHexEntity: {
          this.stateInHexEntity(e);
          break;
        }
        case Qo.InNumericEntity: {
          this.stateInNumericEntity(e);
          break;
        }
        default:
          this.stateBeforeNumericEntity(e);
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === Qo.InNamedEntity) this.emitNamedEntity();
    if (this.sectionStart < this.index) this.handleTrailingData();
    this.cbs.onend();
  }
  handleTrailingData() {
    let e = this.buffer.length + this.offset;
    if (this.state === Qo.InCommentLike)
      if (this.currentSequence === v8.CdataEnd) this.cbs.oncdata(this.sectionStart, e, 0);
      else this.cbs.oncomment(this.sectionStart, e, 0);
    else if (this.state === Qo.InNumericEntity && this.allowLegacyEntity()) this.emitNumericEntity(!1);
    else if (this.state === Qo.InHexEntity && this.allowLegacyEntity()) this.emitNumericEntity(!1);
    else if (
      this.state === Qo.InTagName ||
      this.state === Qo.BeforeAttributeName ||
      this.state === Qo.BeforeAttributeValue ||
      this.state === Qo.AfterAttributeName ||
      this.state === Qo.InAttributeName ||
      this.state === Qo.InAttributeValueSq ||
      this.state === Qo.InAttributeValueDq ||
      this.state === Qo.InAttributeValueNq ||
      this.state === Qo.InClosingTagName
    );
    else this.cbs.ontext(this.sectionStart, e);
  }
  emitPartial(e, t) {
    if (this.baseState !== Qo.Text && this.baseState !== Qo.InSpecialTag) this.cbs.onattribdata(e, t);
    else this.cbs.ontext(e, t);
  }
  emitCodePoint(e) {
    if (this.baseState !== Qo.Text && this.baseState !== Qo.InSpecialTag) this.cbs.onattribentity(e);
    else this.cbs.ontextentity(e);
  }
}