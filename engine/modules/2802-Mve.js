
var Mve = Ie(function (Ghc, ami) {
  var { get: I_e } = r_e(),
    $ea = jpr(),
    gea = _mr(),
    Eea = rTe(),
    Iea = nIt(),
    Dea = k4e(),
    Lmr = (e, t) => I_e(e, t).tarball();
  Lmr.stream = (e, t, r) => I_e(e, r).tarballStream(t);
  Lmr.file = (e, t, r) => I_e(e, r).tarballFile(t);
  ami.exports = {
    GitFetcher: $ea,
    RegistryFetcher: gea,
    FileFetcher: Eea,
    DirFetcher: Iea,
    RemoteFetcher: Dea,
    resolve: (e, t) => I_e(e, t).resolve(),
    extract: (e, t, r) => I_e(e, r).extract(t),
    manifest: (e, t) => I_e(e, t).manifest(),
    packument: (e, t) => I_e(e, t).packument(),
    tarball: Lmr,
  };
});