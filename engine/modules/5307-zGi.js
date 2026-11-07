
var zGi = Ie(function (qGi) {
  Object.defineProperty(qGi, "__esModule", { value: !0 });
  qGi.createMessageConnection =
    qGi.ConnectionOptions =
    qGi.MessageStrategy =
    qGi.CancellationStrategy =
    qGi.CancellationSenderStrategy =
    qGi.CancellationReceiverStrategy =
    qGi.RequestCancellationReceiverStrategy =
    qGi.IdCancellationReceiverStrategy =
    qGi.ConnectionStrategy =
    qGi.ConnectionError =
    qGi.ConnectionErrors =
    qGi.LogTraceNotification =
    qGi.SetTraceNotification =
    qGi.TraceFormat =
    qGi.TraceValues =
    qGi.Trace =
    qGi.NullLogger =
    qGi.ProgressType =
    qGi.ProgressToken =
      void 0;
  var BGi = Fce(),
    Bf = UCe(),
    Fa = ejr(),
    aCt = rjr(),
    mJ = NCe(),
    WCe = sCt(),
    rQe;
  (function (e) {
    e.type = new Fa.NotificationType("$/cancelRequest");
  })(rQe || (rQe = {}));
  var ljr;
  (function (e) {
    function t(r) {
      return typeof r === "string" || typeof r === "number";
    }
    e.is = t;
  })(ljr || (qGi.ProgressToken = ljr = {}));
  var eQe;
  (function (e) {
    e.type = new Fa.NotificationType("$/progress");
  })(eQe || (eQe = {}));
  class VGi {
    constructor() {}
  }
  qGi.ProgressType = VGi;
  var fjr;
  (function (e) {
    function t(r) {
      return Bf.func(r);
    }
    e.is = t;
  })(fjr || (fjr = {}));
  qGi.NullLogger = Object.freeze({ error: () => {}, warn: () => {}, info: () => {}, log: () => {} });
  var Bh;
  (function (e) {
    ((e[(e.Off = 0)] = "Off"),
      (e[(e.Messages = 1)] = "Messages"),
      (e[(e.Compact = 2)] = "Compact"),
      (e[(e.Verbose = 3)] = "Verbose"));
  })(Bh || (qGi.Trace = Bh = {}));
  var RGi;
  (function (e) {
    ((e.Off = "off"), (e.Messages = "messages"), (e.Compact = "compact"), (e.Verbose = "verbose"));
  })(RGi || (qGi.TraceValues = RGi = {}));
  (function (e) {
    function t(s) {
      if (!Bf.string(s)) return e.Off;
      switch (((s = s.toLowerCase()), s)) {
        case "off":
          return e.Off;
        case "messages":
          return e.Messages;
        case "compact":
          return e.Compact;
        case "verbose":
          return e.Verbose;
        default:
          return e.Off;
      }
    }
    e.fromString = t;
    function r(s) {
      switch (s) {
        case e.Off:
          return "off";
        case e.Messages:
          return "messages";
        case e.Compact:
          return "compact";
        case e.Verbose:
          return "verbose";
        default:
          return "off";
      }
    }
    e.toString = r;
  })(Bh || (qGi.Trace = Bh = {}));
  var H9;
  (function (e) {
    ((e.Text = "text"), (e.JSON = "json"));
  })(H9 || (qGi.TraceFormat = H9 = {}));
  (function (e) {
    function t(r) {
      if (!Bf.string(r)) return e.Text;
      if (((r = r.toLowerCase()), r === "json")) return e.JSON;
      else return e.Text;
    }
    e.fromString = t;
  })(H9 || (qGi.TraceFormat = H9 = {}));
  var pjr;
  (function (e) {
    e.type = new Fa.NotificationType("$/setTrace");
  })(pjr || (qGi.SetTraceNotification = pjr = {}));
  var HCt;
  (function (e) {
    e.type = new Fa.NotificationType("$/logTrace");
  })(HCt || (qGi.LogTraceNotification = HCt = {}));
  var tQe;
  (function (e) {
    ((e[(e.Closed = 1)] = "Closed"),
      (e[(e.Disposed = 2)] = "Disposed"),
      (e[(e.AlreadyListening = 3)] = "AlreadyListening"));
  })(tQe || (qGi.ConnectionErrors = tQe = {}));
  class RCe extends Error {
    constructor(e, t) {
      super(t);
      ((this.code = e), Object.setPrototypeOf(this, RCe.prototype));
    }
  }
  qGi.ConnectionError = RCe;
  var djr;
  (function (e) {
    function t(r) {
      let s = r;
      return s && Bf.func(s.cancelUndispatched);
    }
    e.is = t;
  })(djr || (qGi.ConnectionStrategy = djr = {}));
  var cCt;
  (function (e) {
    function t(r) {
      let s = r;
      return (
        s &&
        (s.kind === void 0 || s.kind === "id") &&
        Bf.func(s.createCancellationTokenSource) &&
        (s.dispose === void 0 || Bf.func(s.dispose))
      );
    }
    e.is = t;
  })(cCt || (qGi.IdCancellationReceiverStrategy = cCt = {}));
  var mjr;
  (function (e) {
    function t(r) {
      let s = r;
      return (
        s &&
        s.kind === "request" &&
        Bf.func(s.createCancellationTokenSource) &&
        (s.dispose === void 0 || Bf.func(s.dispose))
      );
    }
    e.is = t;
  })(mjr || (qGi.RequestCancellationReceiverStrategy = mjr = {}));
  var ACt;
  (function (e) {
    e.Message = Object.freeze({
      createCancellationTokenSource(r) {
        return new WCe.CancellationTokenSource();
      },
    });
    function t(r) {
      return cCt.is(r) || mjr.is(r);
    }
    e.is = t;
  })(ACt || (qGi.CancellationReceiverStrategy = ACt = {}));
  var uCt;
  (function (e) {
    e.Message = Object.freeze({
      sendCancellation(r, s) {
        return r.sendNotification(rQe.type, { id: s });
      },
      cleanup(r) {},
    });
    function t(r) {
      let s = r;
      return s && Bf.func(s.sendCancellation) && Bf.func(s.cleanup);
    }
    e.is = t;
  })(uCt || (qGi.CancellationSenderStrategy = uCt = {}));
  var lCt;
  (function (e) {
    e.Message = Object.freeze({ receiver: ACt.Message, sender: uCt.Message });
    function t(r) {
      let s = r;
      return s && ACt.is(s.receiver) && uCt.is(s.sender);
    }
    e.is = t;
  })(lCt || (qGi.CancellationStrategy = lCt = {}));
  var fCt;
  (function (e) {
    function t(r) {
      let s = r;
      return s && Bf.func(s.handleMessage);
    }
    e.is = t;
  })(fCt || (qGi.MessageStrategy = fCt = {}));
  var WGi;
  (function (e) {
    function t(r) {
      let s = r;
      return (
        s && (lCt.is(s.cancellationStrategy) || djr.is(s.connectionStrategy) || fCt.is(s.messageStrategy))
      );
    }
    e.is = t;
  })(WGi || (qGi.ConnectionOptions = WGi = {}));
  var j7;
  (function (e) {
    ((e[(e.New = 1)] = "New"),
      (e[(e.Listening = 2)] = "Listening"),
      (e[(e.Closed = 3)] = "Closed"),
      (e[(e.Disposed = 4)] = "Disposed"));
  })(j7 || (j7 = {}));
  function Wqa(e, t, r, s) {
    let a = r !== void 0 ? r : qGi.NullLogger,
      H = 0,
      u = 0,
      f = 0,
      d = "2.0",
      _ = void 0,
      L = new Map(),
      I = void 0,
      D = new Map(),
      S = new Map(),
      T,
      C = new aCt.LinkedMap(),
      O = new Map(),
      B = new Set(),
      V = new Map(),
      q = Bh.Off,
      Z = H9.Text,
      se,
      ae = j7.New,
      z = new mJ.Emitter(),
      Ae = new mJ.Emitter(),
      le = new mJ.Emitter(),
      Be = new mJ.Emitter(),
      Te = new mJ.Emitter(),
      Lt = s && s.cancellationStrategy ? s.cancellationStrategy : lCt.Message;
    function Ht(gr) {
      if (gr === null)
        throw Error("Can't send requests with id null since the response can't be correlated.");
      return "req-" + gr.toString();
    }
    function Se(gr) {
      if (gr === null) return "res-unknown-" + (++f).toString();
      else return "res-" + gr.toString();
    }
    function _e() {
      return "not-" + (++u).toString();
    }
    function we(gr, Ei) {
      if (Fa.Message.isRequest(Ei)) gr.set(Ht(Ei.id), Ei);
      else if (Fa.Message.isResponse(Ei)) gr.set(Se(Ei.id), Ei);
      else gr.set(_e(), Ei);
    }
    function Pe(gr) {
      return;
    }
    function ye() {
      return ae === j7.Listening;
    }
    function ot() {
      return ae === j7.Closed;
    }
    function Ee() {
      return ae === j7.Disposed;
    }
    function Ve() {
      if (ae === j7.New || ae === j7.Listening) ((ae = j7.Closed), Ae.fire(void 0));
    }
    function Fe(gr) {
      z.fire([gr, void 0, void 0]);
    }
    function it(gr) {
      z.fire(gr);
    }
    (e.onClose(Ve), e.onError(Fe), t.onClose(Ve), t.onError(it));
    function At() {
      if (T || C.size === 0) return;
      T = (0, BGi.default)().timer.setImmediate(() => {
        ((T = void 0), ut());
      });
    }
    function et(gr) {
      if (Fa.Message.isRequest(gr)) Et(gr);
      else if (Fa.Message.isNotification(gr)) Rr(gr);
      else if (Fa.Message.isResponse(gr)) tr(gr);
      else Vt(gr);
    }
    function ut() {
      if (C.size === 0) return;
      let gr = C.shift();
      try {
        let Ei = s?.messageStrategy;
        if (fCt.is(Ei)) Ei.handleMessage(gr, et);
        else et(gr);
      } finally {
        At();
      }
    }
    let ht = (gr) => {
      try {
        if (Fa.Message.isNotification(gr) && gr.method === rQe.type.method) {
          let Ei = gr.params.id,
            kr = Ht(Ei),
            Wi = C.get(kr);
          if (Fa.Message.isRequest(Wi)) {
            let $o = s?.connectionStrategy,
              La = $o && $o.cancelUndispatched ? $o.cancelUndispatched(Wi, Pe) : Pe(Wi);
            if (La && (La.error !== void 0 || La.result !== void 0)) {
              (C.delete(kr),
                V.delete(Ei),
                (La.id = Wi.id),
                wt(La, gr.method, Date.now()),
                t.write(La).catch(() => a.error("Sending response for canceled message failed.")));
              return;
            }
          }
          let oo = V.get(Ei);
          if (oo !== void 0) {
            (oo.cancel(), Li(gr));
            return;
          } else B.add(Ei);
        }
        we(C, gr);
      } finally {
        At();
      }
    };
    function Et(gr) {
      if (Ee()) return;
      function Ei(Bs, iH, xa) {
        let sH = { jsonrpc: d, id: gr.id };
        if (Bs instanceof Fa.ResponseError) sH.error = Bs.toJson();
        else sH.result = Bs === void 0 ? null : Bs;
        (wt(sH, iH, xa), t.write(sH).catch(() => a.error("Sending response failed.")));
      }
      function kr(Bs, iH, xa) {
        let sH = { jsonrpc: d, id: gr.id, error: Bs.toJson() };
        (wt(sH, iH, xa), t.write(sH).catch(() => a.error("Sending response failed.")));
      }
      function Wi(Bs, iH, xa) {
        if (Bs === void 0) Bs = null;
        let sH = { jsonrpc: d, id: gr.id, result: Bs };
        (wt(sH, iH, xa), t.write(sH).catch(() => a.error("Sending response failed.")));
      }
      Qr(gr);
      let oo = L.get(gr.method),
        $o,
        La;
      if (oo) (($o = oo.type), (La = oo.handler));
      let mA = Date.now();
      if (La || _) {
        let Bs = gr.id ?? String(Date.now()),
          iH = cCt.is(Lt.receiver)
            ? Lt.receiver.createCancellationTokenSource(Bs)
            : Lt.receiver.createCancellationTokenSource(gr);
        if (gr.id !== null && B.has(gr.id)) iH.cancel();
        if (gr.id !== null) V.set(Bs, iH);
        try {
          let xa;
          if (La)
            if (gr.params === void 0) {
              if ($o !== void 0 && $o.numberOfParams !== 0) {
                kr(
                  new Fa.ResponseError(
                    Fa.ErrorCodes.InvalidParams,
                    `Request ${gr.method} defines ${$o.numberOfParams} params but received none.`,
                  ),
                  gr.method,
                  mA,
                );
                return;
              }
              xa = La(iH.token);
            } else if (Array.isArray(gr.params)) {
              if ($o !== void 0 && $o.parameterStructures === Fa.ParameterStructures.byName) {
                kr(
                  new Fa.ResponseError(
                    Fa.ErrorCodes.InvalidParams,
                    `Request ${gr.method} defines parameters by name but received parameters by position`,
                  ),
                  gr.method,
                  mA,
                );
                return;
              }
              xa = La(...gr.params, iH.token);
            } else {
              if ($o !== void 0 && $o.parameterStructures === Fa.ParameterStructures.byPosition) {
                kr(
                  new Fa.ResponseError(
                    Fa.ErrorCodes.InvalidParams,
                    `Request ${gr.method} defines parameters by position but received parameters by name`,
                  ),
                  gr.method,
                  mA,
                );
                return;
              }
              xa = La(gr.params, iH.token);
            }
          else if (_) xa = _(gr.method, gr.params, iH.token);
          let sH = xa;
          if (!xa) (V.delete(Bs), Wi(xa, gr.method, mA));
          else if (sH.then)
            sH.then(
              (Ys) => {
                (V.delete(Bs), Ei(Ys, gr.method, mA));
              },
              (Ys) => {
                if ((V.delete(Bs), Ys instanceof Fa.ResponseError)) kr(Ys, gr.method, mA);
                else if (Ys && Bf.string(Ys.message))
                  kr(
                    new Fa.ResponseError(
                      Fa.ErrorCodes.InternalError,
                      `Request ${gr.method} failed with message: ${Ys.message}`,
                    ),
                    gr.method,
                    mA,
                  );
                else
                  kr(
                    new Fa.ResponseError(
                      Fa.ErrorCodes.InternalError,
                      `Request ${gr.method} failed unexpectedly without providing any details.`,
                    ),
                    gr.method,
                    mA,
                  );
              },
            );
          else (V.delete(Bs), Ei(xa, gr.method, mA));
        } catch (xa) {
          if ((V.delete(Bs), xa instanceof Fa.ResponseError)) Ei(xa, gr.method, mA);
          else if (xa && Bf.string(xa.message))
            kr(
              new Fa.ResponseError(
                Fa.ErrorCodes.InternalError,
                `Request ${gr.method} failed with message: ${xa.message}`,
              ),
              gr.method,
              mA,
            );
          else
            kr(
              new Fa.ResponseError(
                Fa.ErrorCodes.InternalError,
                `Request ${gr.method} failed unexpectedly without providing any details.`,
              ),
              gr.method,
              mA,
            );
        }
      } else
        kr(
          new Fa.ResponseError(Fa.ErrorCodes.MethodNotFound, `Unhandled method ${gr.method}`),
          gr.method,
          mA,
        );
    }
    function tr(gr) {
      if (Ee()) return;
      if (gr.id === null)
        if (gr.error)
          a.error(`Received response message without id: Error is: 
${JSON.stringify(gr.error, void 0, 4)}`);
        else a.error("Received response message without id. No further error information provided.");
      else {
        let Ei = gr.id,
          kr = O.get(Ei);
        if ((sr(gr, kr), kr !== void 0)) {
          O.delete(Ei);
          try {
            if (gr.error) {
              let Wi = gr.error;
              kr.reject(new Fa.ResponseError(Wi.code, Wi.message, Wi.data));
            } else if (gr.result !== void 0) kr.resolve(gr.result);
            else throw Error("Should never happen.");
          } catch (Wi) {
            if (Wi.message) a.error(`Response handler '${kr.method}' failed with message: ${Wi.message}`);
            else a.error(`Response handler '${kr.method}' failed unexpectedly.`);
          }
        }
      }
    }
    function Rr(gr) {
      if (Ee()) return;
      let Ei = void 0,
        kr;
      if (gr.method === rQe.type.method) {
        let Wi = gr.params.id;
        (B.delete(Wi), Li(gr));
        return;
      } else {
        let Wi = D.get(gr.method);
        if (Wi) ((kr = Wi.handler), (Ei = Wi.type));
      }
      if (kr || I)
        try {
          if ((Li(gr), kr))
            if (gr.params === void 0) {
              if (Ei !== void 0) {
                if (Ei.numberOfParams !== 0 && Ei.parameterStructures !== Fa.ParameterStructures.byName)
                  a.error(`Notification ${gr.method} defines ${Ei.numberOfParams} params but received none.`);
              }
              kr();
            } else if (Array.isArray(gr.params)) {
              let Wi = gr.params;
              if (gr.method === eQe.type.method && Wi.length === 2 && ljr.is(Wi[0]))
                kr({ token: Wi[0], value: Wi[1] });
              else {
                if (Ei !== void 0) {
                  if (Ei.parameterStructures === Fa.ParameterStructures.byName)
                    a.error(
                      `Notification ${gr.method} defines parameters by name but received parameters by position`,
                    );
                  if (Ei.numberOfParams !== gr.params.length)
                    a.error(
                      `Notification ${gr.method} defines ${Ei.numberOfParams} params but received ${Wi.length} arguments`,
                    );
                }
                kr(...Wi);
              }
            } else {
              if (Ei !== void 0 && Ei.parameterStructures === Fa.ParameterStructures.byPosition)
                a.error(
                  `Notification ${gr.method} defines parameters by position but received parameters by name`,
                );
              kr(gr.params);
            }
          else if (I) I(gr.method, gr.params);
        } catch (Wi) {
          if (Wi.message) a.error(`Notification handler '${gr.method}' failed with message: ${Wi.message}`);
          else a.error(`Notification handler '${gr.method}' failed unexpectedly.`);
        }
      else le.fire(gr);
    }
    function Vt(gr) {
      if (!gr) {
        a.error("Received empty message.");
        return;
      }
      a.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(gr, null, 4)}`);
      let Ei = gr;
      if (Bf.string(Ei.id) || Bf.number(Ei.id)) {
        let kr = Ei.id,
          Wi = O.get(kr);
        if (Wi) Wi.reject(Error("The received response has neither a result nor an error property."));
      }
    }
    function Br(gr) {
      if (gr === void 0 || gr === null) return;
      switch (q) {
        case Bh.Verbose:
          return JSON.stringify(gr, null, 4);
        case Bh.Compact:
          return JSON.stringify(gr);
        default:
          return;
      }
    }
    function Dt(gr) {
      if (q === Bh.Off || !se) return;
      if (Z === H9.Text) {
        let Ei = void 0;
        if ((q === Bh.Verbose || q === Bh.Compact) && gr.params)
          Ei = `Params: ${Br(gr.params)}

`;
        se.log(`Sending request '${gr.method} - (${gr.id})'.`, Ei);
      } else Mt("send-request", gr);
    }
    function St(gr) {
      if (q === Bh.Off || !se) return;
      if (Z === H9.Text) {
        let Ei = void 0;
        if (q === Bh.Verbose || q === Bh.Compact)
          if (gr.params)
            Ei = `Params: ${Br(gr.params)}

`;
          else
            Ei = `No parameters provided.

`;
        se.log(`Sending notification '${gr.method}'.`, Ei);
      } else Mt("send-notification", gr);
    }
    function wt(gr, Ei, kr) {
      if (q === Bh.Off || !se) return;
      if (Z === H9.Text) {
        let Wi = void 0;
        if (q === Bh.Verbose || q === Bh.Compact) {
          if (gr.error && gr.error.data)
            Wi = `Error data: ${Br(gr.error.data)}

`;
          else if (gr.result)
            Wi = `Result: ${Br(gr.result)}

`;
          else if (gr.error === void 0)
            Wi = `No result returned.

`;
        }
        se.log(`Sending response '${Ei} - (${gr.id})'. Processing request took ${Date.now() - kr}ms`, Wi);
      } else Mt("send-response", gr);
    }
    function Qr(gr) {
      if (q === Bh.Off || !se) return;
      if (Z === H9.Text) {
        let Ei = void 0;
        if ((q === Bh.Verbose || q === Bh.Compact) && gr.params)
          Ei = `Params: ${Br(gr.params)}

`;
        se.log(`Received request '${gr.method} - (${gr.id})'.`, Ei);
      } else Mt("receive-request", gr);
    }
    function Li(gr) {
      if (q === Bh.Off || !se || gr.method === HCt.type.method) return;
      if (Z === H9.Text) {
        let Ei = void 0;
        if (q === Bh.Verbose || q === Bh.Compact)
          if (gr.params)
            Ei = `Params: ${Br(gr.params)}

`;
          else
            Ei = `No parameters provided.

`;
        se.log(`Received notification '${gr.method}'.`, Ei);
      } else Mt("receive-notification", gr);
    }
    function sr(gr, Ei) {
      if (q === Bh.Off || !se) return;
      if (Z === H9.Text) {
        let kr = void 0;
        if (q === Bh.Verbose || q === Bh.Compact) {
          if (gr.error && gr.error.data)
            kr = `Error data: ${Br(gr.error.data)}

`;
          else if (gr.result)
            kr = `Result: ${Br(gr.result)}

`;
          else if (gr.error === void 0)
            kr = `No result returned.

`;
        }
        if (Ei) {
          let Wi = gr.error ? ` Request failed: ${gr.error.message} (${gr.error.code}).` : "";
          se.log(
            `Received response '${Ei.method} - (${gr.id})' in ${Date.now() - Ei.timerStart}ms.${Wi}`,
            kr,
          );
        } else se.log(`Received response ${gr.id} without active response promise.`, kr);
      } else Mt("receive-response", gr);
    }
    function Mt(gr, Ei) {
      if (!se || q === Bh.Off) return;
      let kr = { isLSPMessage: !0, type: gr, message: Ei, timestamp: Date.now() };
      se.log(kr);
    }
    function Lr() {
      if (ot()) throw new RCe(tQe.Closed, "Connection is closed.");
      if (Ee()) throw new RCe(tQe.Disposed, "Connection is disposed.");
    }
    function Tr() {
      if (ye()) throw new RCe(tQe.AlreadyListening, "Connection is already listening");
    }
    function Dn() {
      if (!ye()) throw Error("Call listen() first.");
    }
    function Mn(gr) {
      if (gr === void 0) return null;
      else return gr;
    }
    function as(gr) {
      if (gr === null) return;
      else return gr;
    }
    function xi(gr) {
      return gr !== void 0 && gr !== null && !Array.isArray(gr) && typeof gr === "object";
    }
    function go(gr, Ei) {
      switch (gr) {
        case Fa.ParameterStructures.auto:
          if (xi(Ei)) return as(Ei);
          else return [Mn(Ei)];
        case Fa.ParameterStructures.byName:
          if (!xi(Ei)) throw Error("Received parameters by name but param is not an object literal.");
          return as(Ei);
        case Fa.ParameterStructures.byPosition:
          return [Mn(Ei)];
        default:
          throw Error(`Unknown parameter structure ${gr.toString()}`);
      }
    }
    function Fo(gr, Ei) {
      let kr,
        Wi = gr.numberOfParams;
      switch (Wi) {
        case 0:
          kr = void 0;
          break;
        case 1:
          kr = go(gr.parameterStructures, Ei[0]);
          break;
        default:
          kr = [];
          for (let oo = 0; oo < Ei.length && oo < Wi; oo++) kr.push(Mn(Ei[oo]));
          if (Ei.length < Wi) for (let oo = Ei.length; oo < Wi; oo++) kr.push(null);
          break;
      }
      return kr;
    }
    let en = {
      sendNotification: (gr, ...Ei) => {
        Lr();
        let kr, Wi;
        if (Bf.string(gr)) {
          kr = gr;
          let $o = Ei[0],
            La = 0,
            mA = Fa.ParameterStructures.auto;
          if (Fa.ParameterStructures.is($o)) ((La = 1), (mA = $o));
          let Bs = Ei.length,
            iH = Bs - La;
          switch (iH) {
            case 0:
              Wi = void 0;
              break;
            case 1:
              Wi = go(mA, Ei[La]);
              break;
            default:
              if (mA === Fa.ParameterStructures.byName)
                throw Error(`Received ${iH} parameters for 'by Name' notification parameter structure.`);
              Wi = Ei.slice(La, Bs).map((xa) => Mn(xa));
              break;
          }
        } else {
          let $o = Ei;
          ((kr = gr.method), (Wi = Fo(gr, $o)));
        }
        let oo = { jsonrpc: d, method: kr, params: Wi };
        return (
          St(oo),
          t.write(oo).catch(($o) => {
            throw (a.error("Sending notification failed."), $o);
          })
        );
      },
      onNotification: (gr, Ei) => {
        Lr();
        let kr;
        if (Bf.func(gr)) I = gr;
        else if (Ei)
          if (Bf.string(gr)) ((kr = gr), D.set(gr, { type: void 0, handler: Ei }));
          else ((kr = gr.method), D.set(gr.method, { type: gr, handler: Ei }));
        return {
          dispose: () => {
            if (kr !== void 0) D.delete(kr);
            else I = void 0;
          },
        };
      },
      onProgress: (gr, Ei, kr) => {
        if (S.has(Ei)) throw Error(`Progress handler for token ${Ei} already registered`);
        return (
          S.set(Ei, kr),
          {
            dispose: () => {
              S.delete(Ei);
            },
          }
        );
      },
      sendProgress: (gr, Ei, kr) => en.sendNotification(eQe.type, { token: Ei, value: kr }),
      onUnhandledProgress: Be.event,
      sendRequest: (gr, ...Ei) => {
        (Lr(), Dn());
        let kr,
          Wi,
          oo = void 0;
        if (Bf.string(gr)) {
          kr = gr;
          let Bs = Ei[0],
            iH = Ei[Ei.length - 1],
            xa = 0,
            sH = Fa.ParameterStructures.auto;
          if (Fa.ParameterStructures.is(Bs)) ((xa = 1), (sH = Bs));
          let Ys = Ei.length;
          if (WCe.CancellationToken.is(iH)) ((Ys = Ys - 1), (oo = iH));
          let i_ = Ys - xa;
          switch (i_) {
            case 0:
              Wi = void 0;
              break;
            case 1:
              Wi = go(sH, Ei[xa]);
              break;
            default:
              if (sH === Fa.ParameterStructures.byName)
                throw Error(`Received ${i_} parameters for 'by Name' request parameter structure.`);
              Wi = Ei.slice(xa, Ys).map((jc) => Mn(jc));
              break;
          }
        } else {
          let Bs = Ei;
          ((kr = gr.method), (Wi = Fo(gr, Bs)));
          let iH = gr.numberOfParams;
          oo = WCe.CancellationToken.is(Bs[iH]) ? Bs[iH] : void 0;
        }
        let $o = H++,
          La;
        if (oo)
          La = oo.onCancellationRequested(() => {
            let Bs = Lt.sender.sendCancellation(en, $o);
            if (Bs === void 0)
              return (
                a.log(`Received no promise from cancellation strategy when cancelling id ${$o}`),
                Promise.resolve()
              );
            else
              return Bs.catch(() => {
                a.log(`Sending cancellation messages for id ${$o} failed`);
              });
          });
        let mA = { jsonrpc: d, id: $o, method: kr, params: Wi };
        if ((Dt(mA), typeof Lt.sender.enableCancellation === "function")) Lt.sender.enableCancellation(mA);
        return new Promise(async (Bs, iH) => {
          let xa = (i_) => {
              (Bs(i_), Lt.sender.cleanup($o), La?.dispose());
            },
            sH = (i_) => {
              (iH(i_), Lt.sender.cleanup($o), La?.dispose());
            },
            Ys = { method: kr, timerStart: Date.now(), resolve: xa, reject: sH };
          try {
            (O.set($o, Ys), await t.write(mA));
          } catch (i_) {
            throw (
              O.delete($o),
              Ys.reject(
                new Fa.ResponseError(
                  Fa.ErrorCodes.MessageWriteError,
                  i_.message ? i_.message : "Unknown reason",
                ),
              ),
              a.error("Sending request failed."),
              i_
            );
          }
        });
      },
      onRequest: (gr, Ei) => {
        Lr();
        let kr = null;
        if (fjr.is(gr)) ((kr = void 0), (_ = gr));
        else if (Bf.string(gr)) {
          if (((kr = null), Ei !== void 0)) ((kr = gr), L.set(gr, { handler: Ei, type: void 0 }));
        } else if (Ei !== void 0) ((kr = gr.method), L.set(gr.method, { type: gr, handler: Ei }));
        return {
          dispose: () => {
            if (kr === null) return;
            if (kr !== void 0) L.delete(kr);
            else _ = void 0;
          },
        };
      },
      hasPendingResponse: () => O.size > 0,
      trace: async (gr, Ei, kr) => {
        let Wi = !1,
          oo = H9.Text;
        if (kr !== void 0)
          if (Bf.boolean(kr)) Wi = kr;
          else ((Wi = kr.sendNotification || !1), (oo = kr.traceFormat || H9.Text));
        if (((q = gr), (Z = oo), q === Bh.Off)) se = void 0;
        else se = Ei;
        if (Wi && !ot() && !Ee()) await en.sendNotification(pjr.type, { value: Bh.toString(gr) });
      },
      onError: z.event,
      onClose: Ae.event,
      onUnhandledNotification: le.event,
      onDispose: Te.event,
      end: () => {
        t.end();
      },
      dispose: () => {
        if (Ee()) return;
        ((ae = j7.Disposed), Te.fire(void 0));
        let gr = new Fa.ResponseError(
          Fa.ErrorCodes.PendingResponseRejected,
          "Pending response rejected since connection got disposed",
        );
        for (let Ei of O.values()) Ei.reject(gr);
        if (
          ((O = new Map()), (V = new Map()), (B = new Set()), (C = new aCt.LinkedMap()), Bf.func(t.dispose))
        )
          t.dispose();
        if (Bf.func(e.dispose)) e.dispose();
      },
      listen: () => {
        (Lr(), Tr(), (ae = j7.Listening), e.listen(ht));
      },
      inspect: () => {
        (0, BGi.default)().console.log("inspect");
      },
    };
    return (
      en.onNotification(HCt.type, (gr) => {
        if (q === Bh.Off || !se) return;
        let Ei = q === Bh.Verbose || q === Bh.Compact;
        se.log(gr.message, Ei ? gr.verbose : void 0);
      }),
      en.onNotification(eQe.type, (gr) => {
        let Ei = S.get(gr.token);
        if (Ei) Ei(gr.value);
        else Be.fire(gr);
      }),
      en
    );
  }
  qGi.createMessageConnection = Wqa;
});