
var Eoi = Ie(function (k5) {
  var f4o =
      (k5 && k5.__createBinding) ||
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
    p4o =
      (k5 && k5.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    RIt =
      (k5 && k5.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) f4o(t, e, r);
        }
        return (p4o(t, e), t);
      };
  Object.defineProperty(k5, "__esModule", { value: !0 });
  k5.Address6 = void 0;
  var w5 = RIt(OIt()),
    dpr = RIt(upr()),
    Xd = RIt(fpr()),
    l_e = RIt(ppr()),
    k1 = lpr(),
    p8 = hoi(),
    Pm = T4e(),
    Joe = OIt(),
    d4o = w5.isCorrect(Xd.BITS);
  function BIt(e) {
    if (!e) throw Error("Assertion failed.");
  }
  function m4o(e) {
    let t = /(\d+)(\d{3})/;
    while (t.test(e)) e = e.replace(t, "$1,$2");
    return e;
  }
  function _4o(e) {
    return (
      (e = e.replace(/^(0{1,})([1-9]+)$/, '<span class="parse-error">$1</span>$2')),
      (e = e.replace(/^(0{1,})(0)$/, '<span class="parse-error">$1</span>$2')),
      e
    );
  }
  function h4o(e, t) {
    let r = [],
      s = [],
      a;
    for (a = 0; a < e.length; a++)
      if (a < t[0]) r.push(e[a]);
      else if (a > t[1]) s.push(e[a]);
    return r.concat(["compact"]).concat(s);
  }
  function Loi(e) {
    return parseInt(e, 16).toString(16).padStart(4, "0");
  }
  function $oi(e) {
    return e & 255;
  }
  class Qp {
    constructor(e, t) {
      if (
        ((this.addressMinusSuffix = ""),
        (this.parsedSubnet = ""),
        (this.subnet = "/128"),
        (this.subnetMask = 128),
        (this.v4 = !1),
        (this.zone = ""),
        (this.isInSubnet = w5.isInSubnet),
        (this.isHostInSubnet = w5.isHostInSubnet),
        (this.isCorrect = d4o),
        t === void 0)
      )
        this.groups = Xd.GROUPS;
      else this.groups = t;
      this.address = e;
      let r = Xd.RE_SUBNET_STRING.exec(e);
      if (r) {
        if (
          ((this.parsedSubnet = r[0].replace("/", "")),
          (this.subnetMask = parseInt(this.parsedSubnet, 10)),
          (this.subnet = `/${this.subnetMask}`),
          Number.isNaN(this.subnetMask) || this.subnetMask < 0 || this.subnetMask > Xd.BITS)
        )
          throw new Pm.AddressError("Invalid subnet mask.");
        e = e.replace(Xd.RE_SUBNET_STRING, "");
      }
      if (/\//.test(e)) throw new Pm.AddressError("Invalid subnet mask.");
      let s = e.indexOf("%");
      if (s !== -1 && /^.*$/.test(e.slice(s))) ((this.zone = e.slice(s)), (e = e.slice(0, s)));
      let a = this.groups * 5 + 5;
      if (e.length > a) throw new Pm.AddressError(`IPv6 addresses are at most ${a} characters.`);
      ((this.addressMinusSuffix = e), (this.parsedAddress = this.parse(this.addressMinusSuffix)));
    }
    static isValid(e) {
      try {
        return (new Qp(e), !0);
      } catch {
        return !1;
      }
    }
    static fromBigInt(e) {
      if (e < BigInt(0) || e > (BigInt(1) << BigInt(Xd.BITS)) - BigInt(1))
        throw new Pm.AddressError("IPv6 BigInt must be in the range 0 to 2**128 - 1");
      let t = e.toString(16).padStart(32, "0"),
        r = [];
      for (let s = 0; s < Xd.GROUPS; s++) r.push(t.slice(s * 4, (s + 1) * 4));
      return new Qp(r.join(":"));
    }
    static fromURL(e) {
      var t;
      let r,
        s = null,
        a,
        H,
        u = e.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
      if (u.indexOf("[") !== -1 && u.indexOf("]:") !== -1) {
        if (((H = "failed to parse address with port"), (a = Xd.RE_URL_WITH_PORT.exec(u)), a === null))
          return { error: H, address: null, port: null };
        ((r = a[1]), (s = a[2]));
      } else {
        if (((H = "failed to parse address from URL"), (a = Xd.RE_URL.exec(u)), a === null))
          return { error: H, address: null, port: null };
        r = (t = a[1]) !== null && t !== void 0 ? t : a[2];
      }
      if (s) {
        if (((s = parseInt(s, 10)), s < 0 || s > 65535)) s = null;
      } else s = null;
      let f;
      try {
        f = new Qp(r);
      } catch {
        return { error: H, address: null, port: null };
      }
      return { address: f, port: s };
    }
    static fromAddressAndMask(e, t) {
      let r = w5.prefixLengthFromMask(new Qp(t).bigInt(), Xd.BITS);
      return new Qp(`${e}/${r}`);
    }
    static fromAddressAndWildcardMask(e, t) {
      let r = new Qp(t).bigInt(),
        s = (BigInt(1) << BigInt(Xd.BITS)) - BigInt(1),
        a = r ^ s,
        H = w5.prefixLengthFromMask(a, Xd.BITS);
      return new Qp(`${e}/${H}`);
    }
    static fromWildcard(e) {
      if (e.includes("%") || e.includes("/"))
        throw new Pm.AddressError("Wildcard pattern must not include a zone or CIDR suffix");
      let t = e.split("::");
      if (t.length > 2) throw new Pm.AddressError("Wildcard pattern cannot contain more than one '::'");
      let r;
      if (t.length === 2) {
        let f = t[0] === "" ? [] : t[0].split(":"),
          d = t[1] === "" ? [] : t[1].split(":"),
          _ = Xd.GROUPS - f.length - d.length;
        if (_ < 1) throw new Pm.AddressError("Wildcard pattern with '::' has too many groups");
        r = [...f, ...Array(_).fill("0"), ...d];
      } else r = e.split(":");
      if (r.length !== Xd.GROUPS) throw new Pm.AddressError("Wildcard pattern must have 8 groups");
      let s = -1;
      for (let f = 0; f < r.length; f++)
        if (r[f] === "*") {
          if (s === -1) s = f;
        } else if (s !== -1)
          throw new Pm.AddressError(
            "Wildcard `*` must only appear in trailing groups (e.g. `2001:db8:*:*:*:*:*:*`)",
          );
      let a = s === -1 ? 0 : r.length - s,
        H = r.map((f) => (f === "*" ? "0" : f)),
        u = Xd.BITS - a * 16;
      return new Qp(`${H.join(":")}/${u}`);
    }
    static fromAddress4(e) {
      let t = new k1.Address4(e),
        r = Xd.BITS - (dpr.BITS - t.subnetMask);
      return new Qp(`::ffff:${t.correctForm()}/${r}`);
    }
    static fromArpa(e) {
      let t = e.replace(/(\.ip6\.arpa)?\.?$/i, "");
      if (!/^[0-9a-f](\.[0-9a-f]){0,31}$/i.test(t)) throw new Pm.AddressError("Invalid 'ip6.arpa' form.");
      let r = t.split(".").reverse(),
        s = r.length * 4,
        a = r.join("").padEnd(32, "0"),
        H = [];
      for (let u = 0; u < Xd.GROUPS; u++) H.push(a.slice(u * 4, (u + 1) * 4));
      return new Qp(`${H.join(":")}/${s}`);
    }
    microsoftTranscription() {
      return `${this.correctForm().replace(/:/g, "-")}.ipv6-literal.net`;
    }
    mask(e = this.subnetMask) {
      return this.getBitsBase2(0, e);
    }
    possibleSubnets(e = 128) {
      let t = Xd.BITS - this.subnetMask,
        r = Math.abs(e - Xd.BITS),
        s = t - r;
      if (s < 0) return "0";
      return m4o((BigInt("2") ** BigInt(s)).toString(10));
    }
    _startAddress() {
      return BigInt(`0b${this.mask() + "0".repeat(Xd.BITS - this.subnetMask)}`);
    }
    startAddress() {
      return Qp.fromBigInt(this._startAddress());
    }
    startAddressExclusive() {
      let e = BigInt("1");
      return Qp.fromBigInt(this._startAddress() + e);
    }
    _endAddress() {
      return BigInt(`0b${this.mask() + "1".repeat(Xd.BITS - this.subnetMask)}`);
    }
    endAddress() {
      return Qp.fromBigInt(this._endAddress());
    }
    endAddressExclusive() {
      let e = BigInt("1");
      return Qp.fromBigInt(this._endAddress() - e);
    }
    offset(e) {
      return Qp.fromBigInt(w5.offsetBigInt(this.bigInt(), e, Xd.BITS, "IPv6")).withSubnetMask(
        this.subnetMask,
      );
    }
    nextNetwork() {
      return Qp.fromBigInt(w5.offsetBigInt(this._endAddress(), 1, Xd.BITS, "IPv6")).withSubnetMask(
        this.subnetMask,
      );
    }
    withSubnetMask(e) {
      return new Qp(`${this.correctForm()}/${e}`);
    }
    subnetMaskAddress() {
      return Qp.fromBigInt(
        BigInt(`0b${"1".repeat(this.subnetMask)}${"0".repeat(Xd.BITS - this.subnetMask)}`),
      );
    }
    wildcardMask() {
      return Qp.fromBigInt(
        BigInt(`0b${"0".repeat(this.subnetMask)}${"1".repeat(Xd.BITS - this.subnetMask)}`),
      );
    }
    networkForm() {
      return `${this.startAddress().correctForm()}/${this.subnetMask}`;
    }
    getScope() {
      let e = this.getType();
      if (e === "Multicast" || e.startsWith("Multicast "))
        return Xd.SCOPES[parseInt(this.getBits(12, 16).toString(10), 10)] || "Unknown";
      if (e === "Link-local unicast" || e === "Loopback") return "Link local";
      if (e === "Unspecified") return "Unknown";
      return "Global";
    }
    getType() {
      for (let e = 0; e < goi.length; e++) {
        let t = goi[e];
        if (this.isHostInSubnet(t[0])) return t[1];
      }
      return "Global unicast";
    }
    getBits(e, t) {
      return BigInt(`0b${this.getBitsBase2(e, t)}`);
    }
    getBitsBase2(e, t) {
      return this.binaryZeroPad().slice(e, t);
    }
    getBitsBase16(e, t) {
      let r = t - e;
      if (r % 4 !== 0) throw Error("Length of bits to retrieve must be divisible by four");
      return this.getBits(e, t)
        .toString(16)
        .padStart(r / 4, "0");
    }
    getBitsPastSubnet() {
      return this.getBitsBase2(this.subnetMask, Xd.BITS);
    }
    reverseForm(e) {
      if (!e) e = {};
      let t = Math.floor(this.subnetMask / 4),
        r = this.canonicalForm().replace(/:/g, "").split("").slice(0, t).reverse().join(".");
      if (t > 0) {
        if (e.omitSuffix) return r;
        return `${r}.ip6.arpa.`;
      }
      if (e.omitSuffix) return "";
      return "ip6.arpa.";
    }
    correctForm() {
      let e,
        t = [],
        r = 0,
        s = [];
      for (e = 0; e < this.parsedAddress.length; e++) {
        let u = parseInt(this.parsedAddress[e], 16);
        if (u === 0) r++;
        if (u !== 0 && r > 0) {
          if (r > 1) s.push([e - r, e - 1]);
          r = 0;
        }
      }
      if (r > 1) s.push([this.parsedAddress.length - r, this.parsedAddress.length - 1]);
      let a = s.map((u) => u[1] - u[0] + 1);
      if (s.length > 0) {
        let u = a.indexOf(Math.max(...a));
        t = h4o(this.parsedAddress, s[u]);
      } else t = this.parsedAddress;
      for (e = 0; e < t.length; e++) if (t[e] !== "compact") t[e] = parseInt(t[e], 16).toString(16);
      let H = t.join(":");
      return (
        (H = H.replace(/^compact$/, "::")),
        (H = H.replace(/(^compact)|(compact$)/, ":")),
        (H = H.replace(/compact/, "")),
        H
      );
    }
    binaryZeroPad() {
      if (this._binaryZeroPad === void 0)
        this._binaryZeroPad = this.bigInt().toString(2).padStart(Xd.BITS, "0");
      return this._binaryZeroPad;
    }
    parse4in6(e) {
      if (e.indexOf(".") === -1) return e;
      let t = e.split(":"),
        r = t.slice(-1)[0],
        s = r.split(".");
      if (s.length === dpr.GROUPS && s.every((H) => /^\d{1,3}$/.test(H))) {
        if (s.some((H) => /^0\d/.test(H))) {
          let H = s.map(_4o).join("."),
            u = t.slice(0, -1).map(l_e.escapeHtml).join(":"),
            f = t.length > 1 ? ":" : "";
          throw new Pm.AddressError("IPv4 addresses can't have leading zeroes.", `${u}${f}${H}`);
        }
      }
      let a = r.match(dpr.RE_ADDRESS);
      if (a) {
        this.parsedAddress4 = a[0];
        let H = this.subnetMask >= 96 ? `/${this.subnetMask - 96}` : "";
        ((this.address4 = new k1.Address4(`${this.parsedAddress4}${H}`)),
          (this.v4 = !0),
          (t[t.length - 1] = this.address4.toGroup6()),
          (e = t.join(":")));
      }
      return e;
    }
    parse(e) {
      e = this.parse4in6(e);
      let t = e.match(Xd.RE_BAD_CHARACTERS);
      if (t)
        throw new Pm.AddressError(
          `Bad character${t.length > 1 ? "s" : ""} detected in address: ${t.join("")}`,
          e.replace(Xd.RE_BAD_CHARACTERS, '<span class="parse-error">$1</span>'),
        );
      let r = e.match(Xd.RE_BAD_ADDRESS);
      if (r)
        throw new Pm.AddressError(
          `Address failed regex: ${r.join("")}`,
          e.replace(Xd.RE_BAD_ADDRESS, '<span class="parse-error">$1</span>'),
        );
      let s = [],
        a = e.split("::");
      if (a.length === 2) {
        let H = a[0].split(":"),
          u = a[1].split(":");
        if (H.length === 1 && H[0] === "") H = [];
        if (u.length === 1 && u[0] === "") u = [];
        let f = this.groups - (H.length + u.length);
        if (!f) throw new Pm.AddressError("Error parsing groups");
        ((this.elidedGroups = f),
          (this.elisionBegin = H.length),
          (this.elisionEnd = H.length + this.elidedGroups),
          (s = s.concat(H)));
        for (let d = 0; d < f; d++) s.push("0");
        s = s.concat(u);
      } else if (a.length === 1) ((s = e.split(":")), (this.elidedGroups = 0));
      else throw new Pm.AddressError("Too many :: groups found");
      if (((s = s.map((H) => parseInt(H, 16).toString(16))), s.length !== this.groups))
        throw new Pm.AddressError("Incorrect number of groups found");
      return s;
    }
    canonicalForm() {
      return this.parsedAddress.map(Loi).join(":");
    }
    decimal() {
      return this.parsedAddress.map((e) => parseInt(e, 16).toString(10).padStart(5, "0")).join(":");
    }
    bigInt() {
      return BigInt(`0x${this.parsedAddress.map(Loi).join("")}`);
    }
    to4() {
      let e = this.binaryZeroPad().split(""),
        t = BigInt(`0b${e.slice(96, 128).join("")}`)
          .toString(16)
          .padStart(8, "0");
      if (this.subnetMask >= 96) {
        let r = this.subnetMask - 96,
          s = [];
        for (let a = 0; a < 8; a += 2) s.push(parseInt(t.slice(a, a + 2), 16));
        return new k1.Address4(`${s.join(".")}/${r}`);
      }
      return k1.Address4.fromHex(t);
    }
    to4in6() {
      let e = this.to4(),
        r = new Qp(this.parsedAddress.slice(0, 6).join(":"), 6).correctForm(),
        s = "";
      if (!/:$/.test(r)) s = ":";
      return r + s + e.correctForm();
    }
    inspectTeredo() {
      let e = this.getBitsBase16(0, 32),
        r = (this.getBits(80, 96) ^ BigInt("0xffff")).toString(),
        s = k1.Address4.fromHex(this.getBitsBase16(32, 64)),
        a = this.getBits(96, 128),
        H = k1.Address4.fromHex((a ^ BigInt("0xffffffff")).toString(16).padStart(8, "0")),
        u = this.getBitsBase2(64, 80),
        f = Joe.testBit(u, 15),
        d = Joe.testBit(u, 14),
        _ = Joe.testBit(u, 8),
        L = Joe.testBit(u, 9),
        I = BigInt(`0b${u.slice(2, 6) + u.slice(8, 16)}`).toString(10);
      return {
        prefix: `${e.slice(0, 4)}:${e.slice(4, 8)}`,
        server4: s.address,
        client4: H.address,
        flags: u,
        coneNat: f,
        microsoft: { reserved: d, universalLocal: L, groupIndividual: _, nonce: I },
        udpPort: r,
      };
    }
    inspect6to4() {
      let e = this.getBitsBase16(0, 16),
        t = k1.Address4.fromHex(this.getBitsBase16(16, 48));
      return { prefix: e.slice(0, 4), gateway: t.address };
    }
    to6to4() {
      if (!this.is4()) return null;
      let e = ["2002", this.getBitsBase16(96, 112), this.getBitsBase16(112, 128), "", "/16"].join(":");
      return new Qp(e);
    }
    static fromAddress4Nat64(e, t = "64:ff9b::/96") {
      let r = new k1.Address4(e),
        s = new Qp(t),
        a = s.subnetMask;
      if (a !== 32 && a !== 40 && a !== 48 && a !== 56 && a !== 64 && a !== 96)
        throw new Pm.AddressError("NAT64 prefix length must be 32, 40, 48, 56, 64, or 96");
      let H = s.binaryZeroPad(),
        u = r.binaryZeroPad(),
        f;
      if (a === 96) f = H.slice(0, 96) + u;
      else {
        let L = 64 - a;
        f = [H.slice(0, a), u.slice(0, L), "00000000", u.slice(L), "0".repeat(56 - (32 - L))].join("");
      }
      let d = BigInt(`0b${f}`).toString(16).padStart(32, "0"),
        _ = [];
      for (let L = 0; L < 8; L++) _.push(d.slice(L * 4, (L + 1) * 4));
      return new Qp(_.join(":"));
    }
    toAddress4Nat64(e = "64:ff9b::/96") {
      let t = new Qp(e),
        r = t.subnetMask;
      if (r !== 32 && r !== 40 && r !== 48 && r !== 56 && r !== 64 && r !== 96)
        throw new Pm.AddressError("NAT64 prefix length must be 32, 40, 48, 56, 64, or 96");
      if (!this.isHostInSubnet(t)) return null;
      let s = this.binaryZeroPad(),
        a;
      if (r === 96) a = s.slice(96, 128);
      else {
        let u = 64 - r;
        a = s.slice(r, r + u) + s.slice(72, 72 + (32 - u));
      }
      let H = [];
      for (let u = 0; u < 4; u++) H.push(parseInt(a.slice(u * 8, (u + 1) * 8), 2).toString());
      return new k1.Address4(H.join("."));
    }
    toByteArray() {
      let e = this.bigInt()
          .toString(16)
          .padStart(Xd.BITS / 4, "0"),
        t = [];
      for (let r = 0, s = e.length; r < s; r += 2) t.push(parseInt(e.substring(r, r + 2), 16));
      return t;
    }
    toUnsignedByteArray() {
      return this.toByteArray().map($oi);
    }
    static fromByteArray(e) {
      return (w5.assertByteArray(e, 16, "IPv6", -128), this.fromUnsignedByteArray(e.map($oi)));
    }
    static fromUnsignedByteArray(e) {
      w5.assertByteArray(e, 16, "IPv6", 0);
      let t = BigInt("256"),
        r = BigInt("0"),
        s = BigInt("1");
      for (let a = e.length - 1; a >= 0; a--) ((r += s * BigInt(e[a].toString(10))), (s *= t));
      return Qp.fromBigInt(r);
    }
    isCanonical() {
      return this.addressMinusSuffix === this.canonicalForm();
    }
    isLinkLocal() {
      let e = this.embeddedIPv4();
      if (e) return e.isLinkLocal();
      return this.isHostInSubnet(E4o);
    }
    isMulticast() {
      let e = this.embeddedIPv4();
      if (e) return e.isMulticast();
      let t = this.getType();
      return t === "Multicast" || t.startsWith("Multicast ");
    }
    is4() {
      return this.v4;
    }
    isMapped4() {
      return this.isHostInSubnet(x4o);
    }
    embeddedIPv4() {
      if (this.isMapped4() || this.isHostInSubnet(S4o)) return this.to4();
      return null;
    }
    isTeredo() {
      return this.isHostInSubnet(L4o);
    }
    is6to4() {
      return this.isHostInSubnet($4o);
    }
    isLoopback() {
      let e = this.embeddedIPv4();
      if (e) return e.isLoopback();
      return this.getType() === "Loopback";
    }
    isULA() {
      return this.isHostInSubnet(g4o);
    }
    isPrivate() {
      let e = this.embeddedIPv4();
      if (e) return e.isPrivate();
      return this.isULA() || this.isHostInSubnet(T4o);
    }
    isCGNAT() {
      let e = this.embeddedIPv4();
      if (e) return e.isCGNAT();
      return !1;
    }
    isBroadcast() {
      let e = this.embeddedIPv4();
      if (e) return e.isBroadcast();
      return !1;
    }
    isUnspecified() {
      let e = this.embeddedIPv4();
      if (e) return e.isUnspecified();
      return this.getType() === "Unspecified";
    }
    isDocumentation() {
      return I4o.some((e) => this.isHostInSubnet(e));
    }
    isBenchmarking() {
      let e = this.embeddedIPv4();
      if (e) return e.isBenchmarking();
      return this.isHostInSubnet(D4o);
    }
    isGlobal() {
      let e = this.embeddedIPv4();
      if (e) return e.isGlobal();
      return this.isHostInSubnet(y4o) && w5.isGloballyReachable.call(this, M4o);
    }
    href(e) {
      if (e === void 0) e = "";
      else e = `:${e}`;
      return `http://[${this.correctForm()}]${e}/`;
    }
    link(e) {
      if (!e) e = {};
      if (e.className === void 0) e.className = "";
      if (e.prefix === void 0) e.prefix = "/#address=";
      if (e.v4 === void 0) e.v4 = !1;
      let t = this.correctForm;
      if (e.v4) t = this.to4in6;
      let r = t.call(this),
        s = l_e.escapeHtml(`${e.prefix}${r}`),
        a = l_e.escapeHtml(r);
      if (e.className) {
        let H = l_e.escapeHtml(e.className);
        return `<a href="${s}" class="${H}">${a}</a>`;
      }
      return `<a href="${s}">${a}</a>`;
    }
    group() {
      if (this.elidedGroups === 0) return l_e.simpleGroup(this.addressMinusSuffix).join(":");
      (BIt(typeof this.elidedGroups === "number"), BIt(typeof this.elisionBegin === "number"));
      let e = [],
        [t, r] = this.addressMinusSuffix.split("::");
      if (t.length) e.push(...l_e.simpleGroup(t));
      else e.push("");
      let s = ["hover-group"];
      for (let a = this.elisionBegin; a < this.elisionBegin + this.elidedGroups; a++) s.push(`group-${a}`);
      if ((e.push(`<span class="${s.join(" ")}"></span>`), r.length))
        e.push(...l_e.simpleGroup(r, this.elisionEnd));
      else e.push("");
      if (this.is4())
        (BIt(this.address4 instanceof k1.Address4), e.pop(), e.push(this.address4.groupForV6()));
      return e.join(":");
    }
    regularExpressionString(e = !1) {
      let t = [],
        r = new Qp(this.correctForm());
      if (r.elidedGroups === 0) t.push(p8.simpleRegularExpression(r.parsedAddress));
      else if (r.elidedGroups === Xd.GROUPS) t.push(p8.possibleElisions(Xd.GROUPS));
      else {
        let s = r.address.split("::");
        if (s[0].length) t.push(p8.simpleRegularExpression(s[0].split(":")));
        if (
          (BIt(typeof r.elidedGroups === "number"),
          t.push(p8.possibleElisions(r.elidedGroups, s[0].length !== 0, s[1].length !== 0)),
          s[1].length)
        )
          t.push(p8.simpleRegularExpression(s[1].split(":")));
        t = [t.join(":")];
      }
      if (!e)
        t = [
          "(?=^|",
          p8.ADDRESS_BOUNDARY,
          "|[^\\w\\:])(",
          ...t,
          ")(?=[^\\w\\:]|",
          p8.ADDRESS_BOUNDARY,
          "|$)",
        ];
      return t.join("");
    }
    regularExpression(e = !1) {
      return new RegExp(this.regularExpressionString(e), "i");
    }
  }
  k5.Address6 = Qp;
  var goi = Object.keys(Xd.TYPES).map((e) => [new Qp(e), Xd.TYPES[e]]),
    L4o = new Qp("2001::/32"),
    $4o = new Qp("2002::/16"),
    g4o = new Qp("fc00::/7"),
    E4o = new Qp("fe80::/10"),
    I4o = [new Qp("2001:db8::/32"), new Qp("3fff::/20")],
    D4o = new Qp("2001:2::/48"),
    y4o = new Qp("2000::/3"),
    M4o = Xd.SPECIAL_PURPOSE.map(([e, , t]) => ({ subnet: new Qp(e), reachable: t })),
    x4o = new Qp("::ffff:0:0/96"),
    S4o = new Qp("64:ff9b::/96"),
    T4o = new Qp("64:ff9b:1::/48");
});