
var MSr = ne(() => {
  Iee();
  uLe();
  wxr();
  ZB();
  rJ();
  Jxr();
  VWi();
  Sjt();
  dSr();
  ISr();
  pSr();
  ESr();
  wxr();
  eR();
  Mjt();
  uLe();
  ((ySr = qD),
    (Xjt = new WeakMap()),
    (DSr = new WeakSet()),
    (qWi = function () {
      return this.baseURL !== "https://api.anthropic.com";
    }));
  qD.Anthropic = ySr;
  qD.HUMAN_PROMPT = GWi;
  qD.AI_PROMPT = XWi;
  qD.DEFAULT_TIMEOUT = 600000;
  qD.AnthropicError = Cu;
  qD.APIError = mx;
  qD.APIConnectionError = ALe;
  qD.APIConnectionTimeoutError = sJe;
  qD.APIUserAbortError = SP;
  qD.NotFoundError = cJe;
  qD.ConflictError = AJe;
  qD.RateLimitError = lJe;
  qD.BadRequestError = oJe;
  qD.AuthenticationError = aJe;
  qD.InternalServerError = fJe;
  qD.PermissionDeniedError = HJe;
  qD.UnprocessableEntityError = uJe;
  qD.toFile = bjt;
  YN = class YN extends qD {
    constructor() {
      super(...arguments);
      ((this.completions = new kPe(this)),
        (this.messages = new hLe(this)),
        (this.models = new OPe(this)),
        (this.beta = new nJ(this)));
    }
  };
  YN.Completions = kPe;
  YN.Messages = hLe;
  YN.Models = OPe;
  YN.Beta = nJ;
});