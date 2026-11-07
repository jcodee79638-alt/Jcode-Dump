
var OIt = Ie(function (coi) {
  Object.defineProperty(coi, "__esModule", { value: !0 });
  coi.isInSubnet = a7o;
  coi.isHostInSubnet = Apr;
  coi.isGloballyReachable = H7o;
  coi.offsetBigInt = c7o;
  coi.isCorrect = A7o;
  coi.prefixLengthFromMask = u7o;
  coi.assertByteArray = l7o;
  coi.numberToPaddedHex = Hoi;
  coi.stringToPaddedHex = f7o;
  coi.testBit = p7o;
  var l8 = T4e();
  function a7o(e) {
    if (this.subnetMask < e.subnetMask) return !1;
    return Apr.call(this, e);
  }
  function Apr(e) {
    if (this.binaryZeroPad().length !== e.binaryZeroPad().length) return !1;
    return this.mask(e.subnetMask) === e.mask();
  }
  function H7o(e) {
    let t = null;
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (
        s.reachable !== null &&
        Apr.call(this, s.subnet) &&
        (t === null || s.subnet.subnetMask > t.subnet.subnetMask)
      )
        t = s;
    }
    return t === null ? !0 : t.reachable;
  }
  function c7o(e, t, r, s) {
    if (typeof t === "number" && !Number.isSafeInteger(t))
      throw new l8.AddressError(`${s} offset must be an integer`);
    if (typeof t !== "number" && typeof t !== "bigint")
      throw new l8.AddressError(`${s} offset must be an integer`);
    let a = e + BigInt(t);
    if (a < BigInt(0) || a > (BigInt(1) << BigInt(r)) - BigInt(1))
      throw new l8.AddressError(`${s} offset leaves the address space`);
    return a;
  }
  function A7o(e) {
    return function () {
      if (this.addressMinusSuffix !== this.correctForm()) return !1;
      if (this.subnetMask === e && !this.parsedSubnet) return !0;
      return this.parsedSubnet === String(this.subnetMask);
    };
  }
  function u7o(e, t) {
    let r = e.toString(2).padStart(t, "0");
    if (r.length > t) throw new l8.AddressError("Invalid subnet mask.");
    let s = r.indexOf("0");
    if (s === -1) return t;
    if (r.slice(s).includes("1")) throw new l8.AddressError("Invalid subnet mask.");
    return s;
  }
  function l7o(e, t, r, s) {
    if (e.length !== t) throw new l8.AddressError(`${r} addresses require exactly ${t} bytes`);
    for (let a = 0; a < e.length; a++)
      if (!Number.isInteger(e[a]) || e[a] < s || e[a] > 255)
        throw new l8.AddressError(`All bytes must be integers between ${s} and 255`);
  }
  function Hoi(e) {
    return e.toString(16).padStart(2, "0");
  }
  function f7o(e) {
    return Hoi(parseInt(e, 10));
  }
  function p7o(e, t) {
    let { length: r } = e;
    if (t > r) return !1;
    let s = r - t;
    return e.substring(s, s + 1) === "1";
  }
});