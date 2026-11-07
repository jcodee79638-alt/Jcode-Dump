
var yyt = Ie(function (Pfi) {
  Object.defineProperty(Pfi, "__esModule", { value: !0 });
  Pfi.DownloadHTTPError =
    Pfi.DownloadLengthMismatchError =
    Pfi.DownloadError =
    Pfi.ExpiredMetadataError =
    Pfi.EqualVersionError =
    Pfi.BadVersionError =
    Pfi.RepositoryError =
    Pfi.PersistError =
    Pfi.RuntimeError =
    Pfi.ValueError =
      void 0;
  class Mfi extends Error {}
  Pfi.ValueError = Mfi;
  class xfi extends Error {}
  Pfi.RuntimeError = xfi;
  class Sfi extends Error {}
  Pfi.PersistError = Sfi;
  class Iyt extends Error {}
  Pfi.RepositoryError = Iyt;
  class Kdr extends Iyt {}
  Pfi.BadVersionError = Kdr;
  class Tfi extends Kdr {}
  Pfi.EqualVersionError = Tfi;
  class vfi extends Iyt {}
  Pfi.ExpiredMetadataError = vfi;
  class Dyt extends Error {}
  Pfi.DownloadError = Dyt;
  class bfi extends Dyt {}
  Pfi.DownloadLengthMismatchError = bfi;
  class jfi extends Dyt {
    statusCode;
    constructor(e, t) {
      super(e);
      this.statusCode = t;
    }
  }
  Pfi.DownloadHTTPError = jfi;
});