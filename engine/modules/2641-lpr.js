
var lpr = Ie(function (C5) {
  var T7o =
      (C5 && C5.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    v7o =
      (C5 && C5.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    loi =
      (C5 && C5.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) T7o(t, e, r);
        }
        return (v7o(t, e), t);
      };
  Object.defineProperty(C5, "__esModule", { value: !0 });
  C5.Address4 = void 0;
  var LN = loi(OIt()),
    xI = loi(upr()),
    jD = T4e(),
    b7o = LN.isCorrect(xI.BITS);
  class fm {
    constructor(e) {
      ((this.addressMinusSuffix = ""),
        (this.groups = xI.GROUPS),
        (this.parsedAddress = []),
        (this.parsedSubnet = ""),
        (this.subnet = "/32"),
        (this.subnetMask = 32),
        (this.v4 = !0),
        (this.isCorrect = b7o),
        (this.isInSubnet = LN.isInSubnet),
        (this.isHostInSubnet = LN.isHostInSubnet),
        (this.address = e));
      let t = xI.RE_SUBNET_STRING.exec(e);
      if (t) {
        if (
          ((this.parsedSubnet = t[0].replace("/", "")),
          (this.subnetMask = parseInt(this.parsedSubnet, 10)),
          (this.subnet = `/${this.subnetMask}`),
          this.subnetMask < 0 || this.subnetMask > xI.BITS)
        )
          throw new jD.AddressError("Invalid subnet mask.");
        e = e.replace(xI.RE_SUBNET_STRING, "");
      }
      let r = xI.GROUPS * 4 - 1;
      if (e.length > r) throw new jD.AddressError(`IPv4 addresses are at most ${r} characters.`);
      ((this.addressMinusSuffix = e), (this.parsedAddress = this.parse(e)));
    }
    static isValid(e) {
      try {
        return (new fm(e), !0);
      } catch {
        return !1;
      }
    }
    parse(e) {
      let t = e.split(".");
      if (t.some((r) => /^0\d/.test(r)))
        throw new jD.AddressError("IPv4 addresses can't have leading zeroes.");
      if (!e.match(xI.RE_ADDRESS)) throw new jD.AddressError("Invalid IPv4 address.");
      return t;
    }
    correctForm() {
      return this.parsedAddress.map((e) => parseInt(e, 10)).join(".");
    }
    static fromAddressAndMask(e, t) {
      let r = LN.prefixLengthFromMask(new fm(t).bigInt(), xI.BITS);
      return new fm(`${e}/${r}`);
    }
    static fromAddressAndWildcardMask(e, t) {
      let r = new fm(t).bigInt(),
        s = (BigInt(1) << BigInt(xI.BITS)) - BigInt(1),
        a = r ^ s,
        H = LN.prefixLengthFromMask(a, xI.BITS);
      return new fm(`${e}/${H}`);
    }
    static fromWildcard(e) {
      let t = e.split(".");
      if (t.length !== xI.GROUPS) throw new jD.AddressError("Wildcard pattern must have 4 octets");
      let r = -1;
      for (let u = 0; u < t.length; u++)
        if (t[u] === "*") {
          if (r === -1) r = u;
        } else if (r !== -1)
          throw new jD.AddressError("Wildcard `*` must only appear in trailing octets (e.g. `192.168.0.*`)");
      let s = r === -1 ? 0 : t.length - r,
        a = t.map((u) => (u === "*" ? "0" : u)),
        H = xI.BITS - s * 8;
      return new fm(`${a.join(".")}/${H}`);
    }
    static fromHex(e) {
      let t = e.replace(/:/g, "");
      if (!/^[0-9a-fA-F]{8}$/.test(t)) throw new jD.AddressError("IPv4 hex must be exactly 8 hex digits");
      let r = [];
      for (let s = 0; s < 8; s += 2) r.push(parseInt(t.slice(s, s + 2), 16));
      return new fm(r.join("."));
    }
    static fromInteger(e) {
      if (!Number.isInteger(e) || e < 0 || e > 4294967295)
        throw new jD.AddressError("IPv4 integer must be in the range 0 to 2**32 - 1");
      return fm.fromHex(e.toString(16).padStart(8, "0"));
    }
    static fromArpa(e) {
      let t = xI.GROUPS * 4 - 1 + 3 + 14;
      if (e.length > t) throw new jD.AddressError(`in-addr.arpa names are at most ${t} characters.`);
      let s = e
        .replace(/(\.in-addr\.arpa)?\.?$/i, "")
        .split(".")
        .reverse()
        .join(".");
      return new fm(s);
    }
    toHex() {
      return this.parsedAddress.map((e) => LN.stringToPaddedHex(e)).join(":");
    }
    toArray() {
      return this.parsedAddress.map((e) => parseInt(e, 10));
    }
    toGroup6() {
      let e = [],
        t;
      for (t = 0; t < xI.GROUPS; t += 2)
        e.push(
          `${LN.stringToPaddedHex(this.parsedAddress[t])}${LN.stringToPaddedHex(this.parsedAddress[t + 1])}`,
        );
      return e.join(":");
    }
    bigInt() {
      return BigInt(`0x${this.parsedAddress.map((e) => LN.stringToPaddedHex(e)).join("")}`);
    }
    _startAddress() {
      return BigInt(`0b${this.mask() + "0".repeat(xI.BITS - this.subnetMask)}`);
    }
    startAddress() {
      return fm.fromBigInt(this._startAddress());
    }
    startAddressExclusive() {
      let e = BigInt("1");
      return fm.fromBigInt(this._startAddress() + e);
    }
    offset(e) {
      return fm
        .fromBigInt(LN.offsetBigInt(this.bigInt(), e, xI.BITS, "IPv4"))
        .withSubnetMask(this.subnetMask);
    }
    nextNetwork() {
      return fm
        .fromBigInt(LN.offsetBigInt(this._endAddress(), 1, xI.BITS, "IPv4"))
        .withSubnetMask(this.subnetMask);
    }
    withSubnetMask(e) {
      return new fm(`${this.correctForm()}/${e}`);
    }
    _endAddress() {
      return BigInt(`0b${this.mask() + "1".repeat(xI.BITS - this.subnetMask)}`);
    }
    endAddress() {
      return fm.fromBigInt(this._endAddress());
    }
    endAddressExclusive() {
      let e = BigInt("1");
      return fm.fromBigInt(this._endAddress() - e);
    }
    subnetMaskAddress() {
      return fm.fromBigInt(
        BigInt(`0b${"1".repeat(this.subnetMask)}${"0".repeat(xI.BITS - this.subnetMask)}`),
      );
    }
    wildcardMask() {
      return fm.fromBigInt(
        BigInt(`0b${"0".repeat(this.subnetMask)}${"1".repeat(xI.BITS - this.subnetMask)}`),
      );
    }
    networkForm() {
      return `${this.startAddress().correctForm()}/${this.subnetMask}`;
    }
    static fromBigInt(e) {
      if (e < BigInt(0) || e > BigInt(4294967295))
        throw new jD.AddressError("IPv4 BigInt must be in the range 0 to 2**32 - 1");
      return fm.fromHex(e.toString(16).padStart(8, "0"));
    }
    static fromByteArray(e) {
      return (LN.assertByteArray(e, 4, "IPv4", 0), this.fromUnsignedByteArray(e));
    }
    static fromUnsignedByteArray(e) {
      if (e.length !== 4) throw new jD.AddressError("IPv4 addresses require exactly 4 bytes");
      let t = e.join(".");
      return new fm(t);
    }
    mask(e) {
      if (e === void 0) e = this.subnetMask;
      return this.getBitsBase2(0, e);
    }
    getBitsBase2(e, t) {
      return this.binaryZeroPad().slice(e, t);
    }
    reverseForm(e) {
      if (!e) e = {};
      let t = this.correctForm().split(".").reverse().join(".");
      if (e.omitSuffix) return t;
      return `${t}.in-addr.arpa.`;
    }
    isMulticast() {
      return this.isHostInSubnet(j7o);
    }
    isPrivate() {
      return P7o.some((e) => this.isHostInSubnet(e));
    }
    isLoopback() {
      return this.isHostInSubnet(C7o);
    }
    isLinkLocal() {
      return this.isHostInSubnet(w7o);
    }
    isUnspecified() {
      return this.isHostInSubnet(k7o);
    }
    isBroadcast() {
      return this.isHostInSubnet(O7o);
    }
    isCGNAT() {
      return this.isHostInSubnet(U7o);
    }
    isDocumentation() {
      return N7o.some((e) => this.isHostInSubnet(e));
    }
    isBenchmarking() {
      return this.isHostInSubnet(F7o);
    }
    isReserved() {
      return this.isHostInSubnet(B7o);
    }
    isGlobal() {
      return !this.isMulticast() && LN.isGloballyReachable.call(this, R7o);
    }
    binaryZeroPad() {
      if (this._binaryZeroPad === void 0)
        this._binaryZeroPad = this.bigInt().toString(2).padStart(xI.BITS, "0");
      return this._binaryZeroPad;
    }
    groupForV6() {
      let e = this.parsedAddress;
      return this.correctForm().replace(
        xI.RE_ADDRESS,
        `<span class="hover-group group-v4 group-6">${e.slice(0, 2).join(".")}</span>.<span class="hover-group group-v4 group-7">${e.slice(2, 4).join(".")}</span>`,
      );
    }
  }
  C5.Address4 = fm;
  var j7o = new fm("224.0.0.0/4"),
    P7o = [new fm("10.0.0.0/8"), new fm("172.16.0.0/12"), new fm("192.168.0.0/16")],
    C7o = new fm("127.0.0.0/8"),
    w7o = new fm("169.254.0.0/16"),
    k7o = new fm("0.0.0.0/32"),
    O7o = new fm("255.255.255.255/32"),
    U7o = new fm("100.64.0.0/10"),
    N7o = [new fm("192.0.2.0/24"), new fm("198.51.100.0/24"), new fm("203.0.113.0/24")],
    F7o = new fm("198.18.0.0/15"),
    B7o = new fm("240.0.0.0/4"),
    R7o = xI.SPECIAL_PURPOSE.map(([e, , t]) => ({ subnet: new fm(e), reachable: t }));
});