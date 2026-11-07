
class ne {
  static bools = [
    "black",
    "bold",
    "disableFontFace",
    "fontExtraProperties",
    "isInvalidPDFjsFont",
    "isType3Font",
    "italic",
    "missingFile",
    "remeasure",
    "vertical",
  ];
  static strings = ["fallbackName", "loadedName"];
  static OFFSET_BBOX = Math.ceil((this.bools.length * 2) / 8);
  static OFFSET_FONT_MATRIX = this.OFFSET_BBOX + 1 + 8;
  static OFFSET_STRINGS = this.OFFSET_FONT_MATRIX + 1 + 48;
}