
var Zli = Ie(function (Y4e) {
  var Lzo =
    (Y4e && Y4e.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(Y4e, "__esModule", { value: !0 });
  Y4e.getPublicKey = Izo;
  var WTe = Lzo(cr("crypto")),
    X5 = q5(),
    VTe = Kli(),
    iyt = 48,
    zli = 3,
    Qli = 0,
    $zo = "1.3.101.112",
    gzo = "1.2.840.10045.2.1",
    Ezo = "1.2.840.10045.3.1.7",
    Bdr = "-----BEGIN PUBLIC KEY-----";
  function Izo(e) {
    switch (e.keyType) {
      case "rsa":
        return Dzo(e);
      case "ed25519":
        return yzo(e);
      case "ecdsa":
      case "ecdsa-sha2-nistp256":
      case "ecdsa-sha2-nistp384":
        return Mzo(e);
      default:
        throw new X5.UnsupportedAlgorithmError(`Unsupported key type: ${e.keyType}`);
    }
  }
  function Dzo(e) {
    if (!e.keyVal.startsWith(Bdr)) throw new X5.CryptoError("Invalid key format");
    let t = WTe.default.createPublicKey(e.keyVal);
    switch (e.scheme) {
      case "rsassa-pss-sha256":
        return { key: t, padding: WTe.default.constants.RSA_PKCS1_PSS_PADDING };
      default:
        throw new X5.UnsupportedAlgorithmError(`Unsupported RSA scheme: ${e.scheme}`);
    }
  }
  function yzo(e) {
    let t;
    if (e.keyVal.startsWith(Bdr)) t = WTe.default.createPublicKey(e.keyVal);
    else {
      if (!Yli(e.keyVal)) throw new X5.CryptoError("Invalid key format");
      t = WTe.default.createPublicKey({ key: xzo.hexToDER(e.keyVal), format: "der", type: "spki" });
    }
    return { key: t };
  }
  function Mzo(e) {
    let t;
    if (e.keyVal.startsWith(Bdr)) t = WTe.default.createPublicKey(e.keyVal);
    else {
      if (!Yli(e.keyVal)) throw new X5.CryptoError("Invalid key format");
      t = WTe.default.createPublicKey({ key: Szo.hexToDER(e.keyVal), format: "der", type: "spki" });
    }
    return { key: t };
  }
  var xzo = {
      hexToDER: (e) => {
        let t = Buffer.from(e, "hex"),
          r = VTe.encodeOIDString($zo),
          s = Buffer.concat([
            Buffer.concat([Buffer.from([iyt]), Buffer.from([r.length]), r]),
            Buffer.concat([Buffer.from([zli]), Buffer.from([t.length + 1]), Buffer.from([Qli]), t]),
          ]);
        return Buffer.concat([Buffer.from([iyt]), Buffer.from([s.length]), s]);
      },
    },
    Szo = {
      hexToDER: (e) => {
        let t = Buffer.from(e, "hex"),
          r = Buffer.concat([Buffer.from([zli]), Buffer.from([t.length + 1]), Buffer.from([Qli]), t]),
          s = Buffer.concat([VTe.encodeOIDString(gzo), VTe.encodeOIDString(Ezo)]),
          a = Buffer.concat([Buffer.from([iyt]), Buffer.from([s.length]), s]);
        return Buffer.concat([Buffer.from([iyt]), Buffer.from([a.length + r.length]), a, r]);
      },
    },
    Yli = (e) => /^[0-9a-fA-F]+$/.test(e);
});