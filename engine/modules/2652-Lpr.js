
var Lpr = Ie(function (Qpc, Joi) {
  class Woi extends Error {
    constructor(e) {
      super(`Invalid protocol \`${e.protocol}\` connecting to proxy \`${e.host}\``);
      ((this.code = "EINVALIDPROXY"), (this.proxy = e));
    }
  }
  class Voi extends Error {
    constructor(e) {
      super(`Timeout connecting to host \`${e}\``);
      ((this.code = "ECONNECTIONTIMEOUT"), (this.host = e));
    }
  }
  class qoi extends Error {
    constructor(e) {
      super(`Idle timeout reached for host \`${e}\``);
      ((this.code = "EIDLETIMEOUT"), (this.host = e));
    }
  }
  class Goi extends Error {
    constructor(e, t) {
      let r = "Response timeout ";
      if (t) r += `from proxy \`${t.host}\` `;
      r += `connecting to host \`${e.host}\``;
      super(r);
      ((this.code = "ERESPONSETIMEOUT"), (this.proxy = t), (this.request = e));
    }
  }
  class Xoi extends Error {
    constructor(e, t) {
      let r = "Transfer timeout ";
      if (t) r += `from proxy \`${t.host}\` `;
      r += `for \`${e.host}\``;
      super(r);
      ((this.code = "ETRANSFERTIMEOUT"), (this.proxy = t), (this.request = e));
    }
  }
  Joi.exports = {
    InvalidProxyProtocolError: Woi,
    ConnectionTimeoutError: Voi,
    IdleTimeoutError: qoi,
    ResponseTimeoutError: Goi,
    TransferTimeoutError: Xoi,
  };
});