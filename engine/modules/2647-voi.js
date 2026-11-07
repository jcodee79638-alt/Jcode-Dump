
var voi = Ie(function (Soi) {
  Object.defineProperty(Soi, "__esModule", { value: !0 });
  Soi.ipToBuffer =
    Soi.int32ToIpv4 =
    Soi.ipv4ToInt32 =
    Soi.validateSocksClientChainOptions =
    Soi.validateSocksClientOptions =
      void 0;
  var dL = cpr(),
    Cm = Hpr(),
    Ioi = cr("stream"),
    hTe = mpr(),
    WIt = cr("net");
  function O4o(e, t = ["connect", "bind", "associate"]) {
    if (!Cm.SocksCommand[e.command]) throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksCommand, e);
    if (t.indexOf(e.command) === -1)
      throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksCommandForOperation, e);
    if (!yoi(e.destination)) throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsDestination, e);
    if (!Moi(e.proxy)) throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsProxy, e);
    if ((Doi(e.proxy, e), e.timeout && !xoi(e.timeout)))
      throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsTimeout, e);
    if (e.existing_socket && !(e.existing_socket instanceof Ioi.Duplex))
      throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsExistingSocket, e);
  }
  Soi.validateSocksClientOptions = O4o;
  function U4o(e) {
    if (e.command !== "connect") throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksCommandChain, e);
    if (!yoi(e.destination)) throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsDestination, e);
    if (!(e.proxies && Array.isArray(e.proxies) && e.proxies.length >= 2))
      throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsProxiesLength, e);
    if (
      (e.proxies.forEach((t) => {
        if (!Moi(t)) throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsProxy, e);
        Doi(t, e);
      }),
      e.timeout && !xoi(e.timeout))
    )
      throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsTimeout, e);
  }
  Soi.validateSocksClientChainOptions = U4o;
  function Doi(e, t) {
    if (e.custom_auth_method !== void 0) {
      if (
        e.custom_auth_method < Cm.SOCKS5_CUSTOM_AUTH_START ||
        e.custom_auth_method > Cm.SOCKS5_CUSTOM_AUTH_END
      )
        throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsCustomAuthRange, t);
      if (e.custom_auth_request_handler === void 0 || typeof e.custom_auth_request_handler !== "function")
        throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, t);
      if (e.custom_auth_response_size === void 0)
        throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, t);
      if (e.custom_auth_response_handler === void 0 || typeof e.custom_auth_response_handler !== "function")
        throw new dL.SocksClientError(Cm.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, t);
    }
  }
  function yoi(e) {
    return (
      e &&
      typeof e.host === "string" &&
      Buffer.byteLength(e.host) < 256 &&
      typeof e.port === "number" &&
      e.port >= 0 &&
      e.port <= 65535
    );
  }
  function Moi(e) {
    return (
      e &&
      (typeof e.host === "string" || typeof e.ipaddress === "string") &&
      typeof e.port === "number" &&
      e.port >= 0 &&
      e.port <= 65535 &&
      (e.type === 4 || e.type === 5)
    );
  }
  function xoi(e) {
    return typeof e === "number" && e > 0;
  }
  function N4o(e) {
    return new hTe.Address4(e).toArray().reduce((r, s) => (r << 8) + s, 0) >>> 0;
  }
  Soi.ipv4ToInt32 = N4o;
  function F4o(e) {
    let t = (e >>> 24) & 255,
      r = (e >>> 16) & 255,
      s = (e >>> 8) & 255,
      a = e & 255;
    return [t, r, s, a].join(".");
  }
  Soi.int32ToIpv4 = F4o;
  function B4o(e) {
    if (WIt.isIPv4(e)) {
      let t = new hTe.Address4(e);
      return Buffer.from(t.toArray());
    } else if (WIt.isIPv6(e)) {
      let t = new hTe.Address6(e);
      return Buffer.from(
        t
          .canonicalForm()
          .split(":")
          .map((r) => r.padStart(4, "0"))
          .join(""),
        "hex",
      );
    } else throw Error("Invalid IP address format");
  }
  Soi.ipToBuffer = B4o;
});