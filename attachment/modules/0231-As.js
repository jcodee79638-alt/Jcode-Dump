
class As {
  static create(t) {
    switch (t.data.annotationType) {
      case Z.LINK:
        return new Js(t);
      case Z.TEXT:
        return new Sa(t);
      case Z.WIDGET:
        switch (t.data.fieldType) {
          case "Tx":
            return new xa(t);
          case "Btn":
            return t.data.radioButton ? new Ca(t) : t.data.checkBox ? new _a(t) : new Ta(t);
          case "Ch":
            return new ka(t);
          case "Sig":
            return new Ea(t);
        }
        return new te(t);
      case Z.POPUP:
        return new Rs(t);
      case Z.FREETEXT:
        return new dn(t);
      case Z.LINE:
        return new Ma(t);
      case Z.SQUARE:
        return new Ia(t);
      case Z.CIRCLE:
        return new Da(t);
      case Z.POLYLINE:
        return new un(t);
      case Z.CARET:
        return new Oa(t);
      case Z.INK:
        return new Zs(t);
      case Z.POLYGON:
        return new Fa(t);
      case Z.HIGHLIGHT:
        return new fn(t);
      case Z.UNDERLINE:
        return new Ra(t);
      case Z.SQUIGGLY:
        return new La(t);
      case Z.STRIKEOUT:
        return new Na(t);
      case Z.STAMP:
        return new pn(t);
      case Z.FILEATTACHMENT:
        return new Ba(t);
      case Z.RICHMEDIA:
      case Z.SCREEN:
      case Z.SOUND:
        return new gn(t);
      default:
        return new Q(t);
    }
  }
}