
var Ufr = Ie(function (rpc, Yni) {
  var gIt = Qni();
  Yni.exports = {
    maxSockets: 12,
    method: "GET",
    registry: "https://registry.npmjs.org/",
    timeout: 300000,
    strictSSL: !0,
    noProxy: process.env.NOPROXY,
    userAgent: `${gIt.name}@${gIt.version}/node@${process.version}+x64 (win32)`,
  };
});