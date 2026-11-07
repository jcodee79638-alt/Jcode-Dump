
var Wfi = Ie(function (Bfi) {
  Object.defineProperty(Bfi, "__esModule", { value: !0 });
  Bfi.defaultConfig = void 0;
  Bfi.defaultConfig = {
    maxRootRotations: 256,
    maxDelegations: 32,
    rootMaxLength: 512000,
    timestampMaxLength: 16384,
    snapshotMaxLength: 2000000,
    targetsMaxLength: 5000000,
    prefixTargetsWithHash: !0,
    fetchTimeout: 1e5,
    fetchRetries: void 0,
    fetchRetry: 2,
    userAgent: "",
  };
});