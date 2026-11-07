
var YWi = (e, t) => {
    if (LLe(t)) return { success: !0, data: t.value };
    else {
      if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
      return {
        success: !1,
        get error() {
          if (this._error) return this._error;
          let r = new ZN(e.common.issues);
          return ((this._error = r), this._error);
        },
      };
    }
  },
  mRa,
  _Ra,
  hRa,
  LRa,
  $Ra,
  gRa,
  ERa,
  IRa,
  DRa = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  bSr,
  yRa,
  MRa,
  xRa,
  SRa,
  TRa,
  vRa,
  ZWi =
    "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
  bRa,
  bee,
  FPe,
  BPe,
  Qjt,
  KJe,
  Yjt,
  zJe,
  QJe,
  Zjt,
  $Le,
  jee,
  ePt,
  iJ,
  GD,
  YJe,
  vee = (e) => {
    if (e instanceof eKe) return vee(e.schema);
    else if (e instanceof oJ) return vee(e.innerType());
    else if (e instanceof tKe) return [e.value];
    else if (e instanceof gLe) return e.options;
    else if (e instanceof rKe) return Om.objectValues(e.enum);
    else if (e instanceof nKe) return vee(e._def.innerType);
    else if (e instanceof zJe) return [void 0];
    else if (e instanceof QJe) return [null];
    else if (e instanceof sJ) return [void 0, ...vee(e.unwrap())];
    else if (e instanceof hce) return [null, ...vee(e.unwrap())];
    else if (e instanceof CSr) return vee(e.unwrap());
    else if (e instanceof sKe) return vee(e.unwrap());
    else if (e instanceof iKe) return vee(e._def.innerType);
    else return [];
  },
  PSr,
  ZJe,
  Pee,
  tPt,
  rPt,
  RPe,
  JJe,
  eKe,
  tKe,
  gLe,
  rKe,
  WPe,
  oJ,
  sJ,
  hce,
  nKe,
  iKe,
  nPt,
  _sA,
  CSr,
  iPt,
  sKe,
  hsA,
  pf,
  sPt,
  rVi,
  LsA,
  $sA,
  gsA,
  EsA,
  IsA,
  DsA,
  ysA,
  MsA,
  xsA,
  SsA,
  TsA,
  vsA,
  nVi,
  bsA,
  jsA,
  PsA,
  CsA,
  wsA,
  URa,
  ksA,
  OsA,
  UsA,
  NsA,
  FsA,
  BsA,
  RsA,
  WsA,
  VsA,
  qsA,
  GsA,
  XsA,
  JsA;