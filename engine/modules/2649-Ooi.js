
var Ooi = Ie(function (Koe) {
  var LTe =
    (Koe && Koe.__awaiter) ||
    function (e, t, r, s) {
      function a(H) {
        return H instanceof r
          ? H
          : new r(function (u) {
              u(H);
            });
      }
      return new (r || (r = Promise))(function (H, u) {
        function f(L) {
          try {
            _(s.next(L));
          } catch (I) {
            u(I);
          }
        }
        function d(L) {
          try {
            _(s.throw(L));
          } catch (I) {
            u(I);
          }
        }
        function _(L) {
          L.done ? H(L.value) : a(L.value).then(f, d);
        }
        _((s = s.apply(e, t || [])).next());
      });
    };
  Object.defineProperty(Koe, "__esModule", { value: !0 });
  Koe.SocksClientError = Koe.SocksClient = void 0;
  var woi = cr("events"),
    lB = cr("net"),
    O$ = Xsi(),
    Ci = Hpr(),
    i0 = voi(),
    koi = Coi(),
    gTe = cpr();
  Object.defineProperty(Koe, "SocksClientError", {
    enumerable: !0,
    get: function () {
      return gTe.SocksClientError;
    },
  });
  var $Te = mpr();
  class VIt extends woi.EventEmitter {
    constructor(e) {
      super();
      ((this.options = Object.assign({}, e)),
        i0.validateSocksClientOptions(e),
        this.setState(Ci.SocksClientState.Created));
    }
    static createConnection(e, t) {
      return new Promise((r, s) => {
        try {
          i0.validateSocksClientOptions(e, ["connect"]);
        } catch (H) {
          if (typeof t === "function") return (t(H), r(H));
          else return s(H);
        }
        let a = new VIt(e);
        (a.connect(e.existing_socket),
          a.once("established", (H) => {
            if ((a.removeAllListeners(), typeof t === "function")) (t(null, H), r(H));
            else r(H);
          }),
          a.once("error", (H) => {
            if ((a.removeAllListeners(), typeof t === "function")) (t(H), r(H));
            else s(H);
          }));
      });
    }
    static createConnectionChain(e, t) {
      return new Promise((r, s) =>
        LTe(this, void 0, void 0, function* () {
          try {
            i0.validateSocksClientChainOptions(e);
          } catch (a) {
            if (typeof t === "function") return (t(a), r(a));
            else return s(a);
          }
          if (e.randomizeChain) gTe.shuffleArray(e.proxies);
          try {
            let a;
            for (let H = 0; H < e.proxies.length; H++) {
              let u = e.proxies[H],
                f =
                  H === e.proxies.length - 1
                    ? e.destination
                    : {
                        host: e.proxies[H + 1].host || e.proxies[H + 1].ipaddress,
                        port: e.proxies[H + 1].port,
                      },
                d = yield VIt.createConnection({
                  command: "connect",
                  proxy: u,
                  destination: f,
                  existing_socket: a,
                });
              a = a || d.socket;
            }
            if (typeof t === "function") (t(null, { socket: a }), r({ socket: a }));
            else r({ socket: a });
          } catch (a) {
            if (typeof t === "function") (t(a), r(a));
            else s(a);
          }
        }),
      );
    }
    static createUDPFrame(e) {
      let t = new O$.SmartBuffer();
      if ((t.writeUInt16BE(0), t.writeUInt8(e.frameNumber || 0), lB.isIPv4(e.remoteHost.host)))
        (t.writeUInt8(Ci.Socks5HostType.IPv4), t.writeUInt32BE(i0.ipv4ToInt32(e.remoteHost.host)));
      else if (lB.isIPv6(e.remoteHost.host))
        (t.writeUInt8(Ci.Socks5HostType.IPv6), t.writeBuffer(i0.ipToBuffer(e.remoteHost.host)));
      else
        (t.writeUInt8(Ci.Socks5HostType.Hostname),
          t.writeUInt8(Buffer.byteLength(e.remoteHost.host)),
          t.writeString(e.remoteHost.host));
      return (t.writeUInt16BE(e.remoteHost.port), t.writeBuffer(e.data), t.toBuffer());
    }
    static parseUDPFrame(e) {
      let t = O$.SmartBuffer.fromBuffer(e);
      t.readOffset = 2;
      let r = t.readUInt8(),
        s = t.readUInt8(),
        a;
      if (s === Ci.Socks5HostType.IPv4) a = i0.int32ToIpv4(t.readUInt32BE());
      else if (s === Ci.Socks5HostType.IPv6)
        a = $Te.Address6.fromByteArray(Array.from(t.readBuffer(16))).canonicalForm();
      else a = t.readString(t.readUInt8());
      let H = t.readUInt16BE();
      return { frameNumber: r, remoteHost: { host: a, port: H }, data: t.readBuffer() };
    }
    setState(e) {
      if (this.state !== Ci.SocksClientState.Error) this.state = e;
    }
    connect(e) {
      ((this.onDataReceived = (r) => this.onDataReceivedHandler(r)),
        (this.onClose = () => this.onCloseHandler()),
        (this.onError = (r) => this.onErrorHandler(r)),
        (this.onConnect = () => this.onConnectHandler()));
      let t = setTimeout(() => this.onEstablishedTimeout(), this.options.timeout || Ci.DEFAULT_TIMEOUT);
      if (t.unref && typeof t.unref === "function") t.unref();
      if (e) this.socket = e;
      else this.socket = new lB.Socket();
      if (
        (this.socket.once("close", this.onClose),
        this.socket.once("error", this.onError),
        this.socket.once("connect", this.onConnect),
        this.socket.on("data", this.onDataReceived),
        this.setState(Ci.SocksClientState.Connecting),
        (this.receiveBuffer = new koi.ReceiveBuffer()),
        e)
      )
        this.socket.emit("connect");
      else if (
        (this.socket.connect(this.getSocketOptions()),
        this.options.set_tcp_nodelay !== void 0 && this.options.set_tcp_nodelay !== null)
      )
        this.socket.setNoDelay(!!this.options.set_tcp_nodelay);
      this.prependOnceListener("established", (r) => {
        setImmediate(() => {
          if (this.receiveBuffer.length > 0) {
            let s = this.receiveBuffer.get(this.receiveBuffer.length);
            r.socket.emit("data", s);
          }
          r.socket.resume();
        });
      });
    }
    getSocketOptions() {
      return Object.assign(Object.assign({}, this.options.socket_options), {
        host: this.options.proxy.host || this.options.proxy.ipaddress,
        port: this.options.proxy.port,
      });
    }
    onEstablishedTimeout() {
      if (
        this.state !== Ci.SocksClientState.Established &&
        this.state !== Ci.SocksClientState.BoundWaitingForConnection
      )
        this.closeSocket(Ci.ERRORS.ProxyConnectionTimedOut);
    }
    onConnectHandler() {
      if ((this.setState(Ci.SocksClientState.Connected), this.options.proxy.type === 4))
        this.sendSocks4InitialHandshake();
      else this.sendSocks5InitialHandshake();
      this.setState(Ci.SocksClientState.SentInitialHandshake);
    }
    onDataReceivedHandler(e) {
      (this.receiveBuffer.append(e), this.processData());
    }
    processData() {
      while (
        this.state !== Ci.SocksClientState.Established &&
        this.state !== Ci.SocksClientState.Error &&
        this.receiveBuffer.length >= this.nextRequiredPacketBufferSize
      )
        if (this.state === Ci.SocksClientState.SentInitialHandshake)
          if (this.options.proxy.type === 4) this.handleSocks4FinalHandshakeResponse();
          else this.handleInitialSocks5HandshakeResponse();
        else if (this.state === Ci.SocksClientState.SentAuthentication)
          this.handleInitialSocks5AuthenticationHandshakeResponse();
        else if (this.state === Ci.SocksClientState.SentFinalHandshake)
          this.handleSocks5FinalHandshakeResponse();
        else if (this.state === Ci.SocksClientState.BoundWaitingForConnection)
          if (this.options.proxy.type === 4) this.handleSocks4IncomingConnectionResponse();
          else this.handleSocks5IncomingConnectionResponse();
        else {
          this.closeSocket(Ci.ERRORS.InternalError);
          break;
        }
    }
    onCloseHandler() {
      this.closeSocket(Ci.ERRORS.SocketClosed);
    }
    onErrorHandler(e) {
      this.closeSocket(e.message);
    }
    removeInternalSocketHandlers() {
      (this.socket.pause(),
        this.socket.removeListener("data", this.onDataReceived),
        this.socket.removeListener("close", this.onClose),
        this.socket.removeListener("error", this.onError),
        this.socket.removeListener("connect", this.onConnect));
    }
    closeSocket(e) {
      if (this.state !== Ci.SocksClientState.Error)
        (this.setState(Ci.SocksClientState.Error),
          this.socket.destroy(),
          this.removeInternalSocketHandlers(),
          this.emit("error", new gTe.SocksClientError(e, this.options)));
    }
    sendSocks4InitialHandshake() {
      let e = this.options.proxy.userId || "",
        t = new O$.SmartBuffer();
      if (
        (t.writeUInt8(4),
        t.writeUInt8(Ci.SocksCommand[this.options.command]),
        t.writeUInt16BE(this.options.destination.port),
        lB.isIPv4(this.options.destination.host))
      )
        (t.writeBuffer(i0.ipToBuffer(this.options.destination.host)), t.writeStringNT(e));
      else
        (t.writeUInt8(0),
          t.writeUInt8(0),
          t.writeUInt8(0),
          t.writeUInt8(1),
          t.writeStringNT(e),
          t.writeStringNT(this.options.destination.host));
      ((this.nextRequiredPacketBufferSize = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks4Response),
        this.socket.write(t.toBuffer()));
    }
    handleSocks4FinalHandshakeResponse() {
      let e = this.receiveBuffer.get(8);
      if (e[1] !== Ci.Socks4Response.Granted)
        this.closeSocket(`${Ci.ERRORS.Socks4ProxyRejectedConnection} - (${Ci.Socks4Response[e[1]]})`);
      else if (Ci.SocksCommand[this.options.command] === Ci.SocksCommand.bind) {
        let t = O$.SmartBuffer.fromBuffer(e);
        t.readOffset = 2;
        let r = { port: t.readUInt16BE(), host: i0.int32ToIpv4(t.readUInt32BE()) };
        if (r.host === "0.0.0.0") r.host = this.options.proxy.ipaddress;
        (this.setState(Ci.SocksClientState.BoundWaitingForConnection),
          this.emit("bound", { remoteHost: r, socket: this.socket }));
      } else
        (this.setState(Ci.SocksClientState.Established),
          this.removeInternalSocketHandlers(),
          this.emit("established", { socket: this.socket }));
    }
    handleSocks4IncomingConnectionResponse() {
      let e = this.receiveBuffer.get(8);
      if (e[1] !== Ci.Socks4Response.Granted)
        this.closeSocket(
          `${Ci.ERRORS.Socks4ProxyRejectedIncomingBoundConnection} - (${Ci.Socks4Response[e[1]]})`,
        );
      else {
        let t = O$.SmartBuffer.fromBuffer(e);
        t.readOffset = 2;
        let r = { port: t.readUInt16BE(), host: i0.int32ToIpv4(t.readUInt32BE()) };
        (this.setState(Ci.SocksClientState.Established),
          this.removeInternalSocketHandlers(),
          this.emit("established", { remoteHost: r, socket: this.socket }));
      }
    }
    sendSocks5InitialHandshake() {
      let e = new O$.SmartBuffer(),
        t = [Ci.Socks5Auth.NoAuth];
      if (this.options.proxy.userId || this.options.proxy.password) t.push(Ci.Socks5Auth.UserPass);
      if (this.options.proxy.custom_auth_method !== void 0) t.push(this.options.proxy.custom_auth_method);
      (e.writeUInt8(5), e.writeUInt8(t.length));
      for (let r of t) e.writeUInt8(r);
      ((this.nextRequiredPacketBufferSize = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5InitialHandshakeResponse),
        this.socket.write(e.toBuffer()),
        this.setState(Ci.SocksClientState.SentInitialHandshake));
    }
    handleInitialSocks5HandshakeResponse() {
      let e = this.receiveBuffer.get(2);
      if (e[0] !== 5) this.closeSocket(Ci.ERRORS.InvalidSocks5IntiailHandshakeSocksVersion);
      else if (e[1] === Ci.SOCKS5_NO_ACCEPTABLE_AUTH)
        this.closeSocket(Ci.ERRORS.InvalidSocks5InitialHandshakeNoAcceptedAuthType);
      else if (e[1] === Ci.Socks5Auth.NoAuth)
        ((this.socks5ChosenAuthType = Ci.Socks5Auth.NoAuth), this.sendSocks5CommandRequest());
      else if (e[1] === Ci.Socks5Auth.UserPass)
        ((this.socks5ChosenAuthType = Ci.Socks5Auth.UserPass), this.sendSocks5UserPassAuthentication());
      else if (e[1] === this.options.proxy.custom_auth_method)
        ((this.socks5ChosenAuthType = this.options.proxy.custom_auth_method),
          this.sendSocks5CustomAuthentication());
      else this.closeSocket(Ci.ERRORS.InvalidSocks5InitialHandshakeUnknownAuthType);
    }
    sendSocks5UserPassAuthentication() {
      let e = this.options.proxy.userId || "",
        t = this.options.proxy.password || "",
        r = new O$.SmartBuffer();
      (r.writeUInt8(1),
        r.writeUInt8(Buffer.byteLength(e)),
        r.writeString(e),
        r.writeUInt8(Buffer.byteLength(t)),
        r.writeString(t),
        (this.nextRequiredPacketBufferSize =
          Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5UserPassAuthenticationResponse),
        this.socket.write(r.toBuffer()),
        this.setState(Ci.SocksClientState.SentAuthentication));
    }
    sendSocks5CustomAuthentication() {
      return LTe(this, void 0, void 0, function* () {
        ((this.nextRequiredPacketBufferSize = this.options.proxy.custom_auth_response_size),
          this.socket.write(yield this.options.proxy.custom_auth_request_handler()),
          this.setState(Ci.SocksClientState.SentAuthentication));
      });
    }
    handleSocks5CustomAuthHandshakeResponse(e) {
      return LTe(this, void 0, void 0, function* () {
        return yield this.options.proxy.custom_auth_response_handler(e);
      });
    }
    handleSocks5AuthenticationNoAuthHandshakeResponse(e) {
      return LTe(this, void 0, void 0, function* () {
        return e[1] === 0;
      });
    }
    handleSocks5AuthenticationUserPassHandshakeResponse(e) {
      return LTe(this, void 0, void 0, function* () {
        return e[1] === 0;
      });
    }
    handleInitialSocks5AuthenticationHandshakeResponse() {
      return LTe(this, void 0, void 0, function* () {
        this.setState(Ci.SocksClientState.ReceivedAuthenticationResponse);
        let e = !1;
        if (this.socks5ChosenAuthType === Ci.Socks5Auth.NoAuth)
          e = yield this.handleSocks5AuthenticationNoAuthHandshakeResponse(this.receiveBuffer.get(2));
        else if (this.socks5ChosenAuthType === Ci.Socks5Auth.UserPass)
          e = yield this.handleSocks5AuthenticationUserPassHandshakeResponse(this.receiveBuffer.get(2));
        else if (this.socks5ChosenAuthType === this.options.proxy.custom_auth_method)
          e = yield this.handleSocks5CustomAuthHandshakeResponse(
            this.receiveBuffer.get(this.options.proxy.custom_auth_response_size),
          );
        if (!e) this.closeSocket(Ci.ERRORS.Socks5AuthenticationFailed);
        else this.sendSocks5CommandRequest();
      });
    }
    sendSocks5CommandRequest() {
      let e = new O$.SmartBuffer();
      if (
        (e.writeUInt8(5),
        e.writeUInt8(Ci.SocksCommand[this.options.command]),
        e.writeUInt8(0),
        lB.isIPv4(this.options.destination.host))
      )
        (e.writeUInt8(Ci.Socks5HostType.IPv4), e.writeBuffer(i0.ipToBuffer(this.options.destination.host)));
      else if (lB.isIPv6(this.options.destination.host))
        (e.writeUInt8(Ci.Socks5HostType.IPv6), e.writeBuffer(i0.ipToBuffer(this.options.destination.host)));
      else
        (e.writeUInt8(Ci.Socks5HostType.Hostname),
          e.writeUInt8(this.options.destination.host.length),
          e.writeString(this.options.destination.host));
      (e.writeUInt16BE(this.options.destination.port),
        (this.nextRequiredPacketBufferSize = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader),
        this.socket.write(e.toBuffer()),
        this.setState(Ci.SocksClientState.SentFinalHandshake));
    }
    handleSocks5FinalHandshakeResponse() {
      let e = this.receiveBuffer.peek(5);
      if (e[0] !== 5 || e[1] !== Ci.Socks5Response.Granted)
        this.closeSocket(`${Ci.ERRORS.InvalidSocks5FinalHandshakeRejected} - ${Ci.Socks5Response[e[1]]}`);
      else {
        let t = e[3],
          r,
          s;
        if (t === Ci.Socks5HostType.IPv4) {
          let a = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
          if (this.receiveBuffer.length < a) {
            this.nextRequiredPacketBufferSize = a;
            return;
          }
          if (
            ((s = O$.SmartBuffer.fromBuffer(this.receiveBuffer.get(a).slice(4))),
            (r = { host: i0.int32ToIpv4(s.readUInt32BE()), port: s.readUInt16BE() }),
            r.host === "0.0.0.0")
          )
            r.host = this.options.proxy.ipaddress;
        } else if (t === Ci.Socks5HostType.Hostname) {
          let a = e[4],
            H = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(a);
          if (this.receiveBuffer.length < H) {
            this.nextRequiredPacketBufferSize = H;
            return;
          }
          ((s = O$.SmartBuffer.fromBuffer(this.receiveBuffer.get(H).slice(5))),
            (r = { host: s.readString(a), port: s.readUInt16BE() }));
        } else if (t === Ci.Socks5HostType.IPv6) {
          let a = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
          if (this.receiveBuffer.length < a) {
            this.nextRequiredPacketBufferSize = a;
            return;
          }
          ((s = O$.SmartBuffer.fromBuffer(this.receiveBuffer.get(a).slice(4))),
            (r = {
              host: $Te.Address6.fromByteArray(Array.from(s.readBuffer(16))).canonicalForm(),
              port: s.readUInt16BE(),
            }));
        }
        if (
          (this.setState(Ci.SocksClientState.ReceivedFinalResponse),
          Ci.SocksCommand[this.options.command] === Ci.SocksCommand.connect)
        )
          (this.setState(Ci.SocksClientState.Established),
            this.removeInternalSocketHandlers(),
            this.emit("established", { remoteHost: r, socket: this.socket }));
        else if (Ci.SocksCommand[this.options.command] === Ci.SocksCommand.bind)
          (this.setState(Ci.SocksClientState.BoundWaitingForConnection),
            (this.nextRequiredPacketBufferSize = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader),
            this.emit("bound", { remoteHost: r, socket: this.socket }));
        else if (Ci.SocksCommand[this.options.command] === Ci.SocksCommand.associate)
          (this.setState(Ci.SocksClientState.Established),
            this.removeInternalSocketHandlers(),
            this.emit("established", { remoteHost: r, socket: this.socket }));
      }
    }
    handleSocks5IncomingConnectionResponse() {
      let e = this.receiveBuffer.peek(5);
      if (e[0] !== 5 || e[1] !== Ci.Socks5Response.Granted)
        this.closeSocket(
          `${Ci.ERRORS.Socks5ProxyRejectedIncomingBoundConnection} - ${Ci.Socks5Response[e[1]]}`,
        );
      else {
        let t = e[3],
          r,
          s;
        if (t === Ci.Socks5HostType.IPv4) {
          let a = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
          if (this.receiveBuffer.length < a) {
            this.nextRequiredPacketBufferSize = a;
            return;
          }
          if (
            ((s = O$.SmartBuffer.fromBuffer(this.receiveBuffer.get(a).slice(4))),
            (r = { host: i0.int32ToIpv4(s.readUInt32BE()), port: s.readUInt16BE() }),
            r.host === "0.0.0.0")
          )
            r.host = this.options.proxy.ipaddress;
        } else if (t === Ci.Socks5HostType.Hostname) {
          let a = e[4],
            H = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(a);
          if (this.receiveBuffer.length < H) {
            this.nextRequiredPacketBufferSize = H;
            return;
          }
          ((s = O$.SmartBuffer.fromBuffer(this.receiveBuffer.get(H).slice(5))),
            (r = { host: s.readString(a), port: s.readUInt16BE() }));
        } else if (t === Ci.Socks5HostType.IPv6) {
          let a = Ci.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
          if (this.receiveBuffer.length < a) {
            this.nextRequiredPacketBufferSize = a;
            return;
          }
          ((s = O$.SmartBuffer.fromBuffer(this.receiveBuffer.get(a).slice(4))),
            (r = {
              host: $Te.Address6.fromByteArray(Array.from(s.readBuffer(16))).canonicalForm(),
              port: s.readUInt16BE(),
            }));
        }
        (this.setState(Ci.SocksClientState.Established),
          this.removeInternalSocketHandlers(),
          this.emit("established", { remoteHost: r, socket: this.socket }));
      }
    }
    get socksClientOptions() {
      return Object.assign({}, this.options);
    }
  }
  Koe.SocksClient = VIt;
});