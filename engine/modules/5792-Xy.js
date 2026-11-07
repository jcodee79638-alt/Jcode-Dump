
var Xy = ne(() => {
  Gt();
  Sb = class Sb extends (
    ki()("InvalidRequestError", { message: re, kind: be(re), field: be(re) }, { httpApiStatus: 400 })
  ) {};
  eYe = class eYe extends ki()("UnauthorizedError", { message: re }, { httpApiStatus: 401 }) {};
  tYe = class tYe extends ki()("ConflictError", { message: re, resource: be(re) }, { httpApiStatus: 409 }) {};
  yR = class yR extends (
    ki()("ServiceUnavailableError", { message: re, service: be(re) }, { httpApiStatus: 503 })
  ) {};
  l9 = class l9 extends ki()("UnknownError", { message: re, ref: be(re) }, { httpApiStatus: 500 }) {};
  rYe = class rYe extends (
    ki()("ProviderNotFoundError", { providerID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  Wf = class Wf extends (
    ki()("SessionNotFoundError", { sessionID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  $$e = class $$e extends (
    ki()("MessageNotFoundError", { sessionID: re, messageID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  SJ = class SJ extends ki()("InvalidCursorError", { message: re }, { httpApiStatus: 400 }) {};
  kwe = class kwe extends (
    ki()("PermissionNotFoundError", { requestID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  Owe = class Owe extends (
    ki()("QuestionNotFoundError", { requestID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  Uwe = class Uwe extends ki()("ForbiddenError", { message: re }, { httpApiStatus: 403 }) {};
  MR = class MR extends ki()("PtyNotFoundError", { ptyID: re, message: re }, { httpApiStatus: 404 }) {};
});