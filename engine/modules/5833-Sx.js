
var Sx = ne(() => {
  Gt();
  Bwe = class Bwe extends (
    ki()("InvalidRequestError", { message: re, kind: be(re), field: be(re) }, { httpApiStatus: 400 })
  ) {};
  LnH = class LnH extends ki()("UnauthorizedError", { message: re }, { httpApiStatus: 401 }) {};
  $nH = class $nH extends ki()("ForbiddenError", { message: re }, { httpApiStatus: 403 }) {};
  gnH = class gnH extends ki()("ConflictError", { message: re, resource: be(re) }, { httpApiStatus: 409 }) {};
  EnH = class EnH extends (
    ki()("UpstreamError", { message: re, service: be(re), status: be(Aa) }, { httpApiStatus: 502 })
  ) {};
  InH = class InH extends (
    ki()("ServiceUnavailableError", { message: re, service: be(re) }, { httpApiStatus: 503 })
  ) {};
  DnH = class DnH extends ki()("TimeoutError", { message: re, operation: be(re) }, { httpApiStatus: 504 }) {};
  ynH = class ynH extends ki()("UnknownError", { message: re, ref: be(re) }, { httpApiStatus: 500 }) {};
  MnH = class MnH extends (
    ki()("ProviderNotFoundError", { providerID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  xnH = class xnH extends (
    ki()(
      "ModelNotFoundError",
      { providerID: re, modelID: re, suggestions: On(re), message: re },
      { httpApiStatus: 404 },
    )
  ) {};
  SnH = class SnH extends (
    ki()("SessionNotFoundError", { sessionID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  TnH = class TnH extends (
    ki()("MessageNotFoundError", { sessionID: re, messageID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  vnH = class vnH extends ki()("InvalidCursorError", { message: re }, { httpApiStatus: 400 }) {};
  uAe = class uAe extends ki()("SessionBusyError", { sessionID: re, message: re }, { httpApiStatus: 409 }) {};
  g$e = class g$e extends (
    ki()("QuestionNotFoundError", { requestID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  ite = class ite extends (
    ki()("PermissionNotFoundError", { requestID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  ok = class ok extends ki()("McpServerNotFoundError", { name: re, message: re }, { httpApiStatus: 404 }) {};
  F7 = class F7 extends ki()("PtyNotFoundError", { ptyID: re, message: re }, { httpApiStatus: 404 }) {};
  sYe = class sYe extends ki()("PtyForbiddenError", { message: re }, { httpApiStatus: 403 }) {};
  oYe = class oYe extends (
    ki()("ProjectNotFoundError", { projectID: re, message: re }, { httpApiStatus: 404 })
  ) {};
  t$ = class t$ extends (
    $y("NotFoundError")({ name: ri("NotFoundError"), data: nt({ message: re }) }, { httpApiStatus: 404 })
  ) {};
});