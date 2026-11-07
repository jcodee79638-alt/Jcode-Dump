
var EZn = Ie(function (vUo, Vur) {
  var { inspect: TUo } = cr("util");
  class gZn {
    constructor(e, t, r) {
      let s = `${t}: ${r.syscall} returned ${r.code} (${r.message})`;
      if (r.path !== void 0) s += ` ${r.path}`;
      if (r.dest !== void 0) s += ` => ${r.dest}`;
      if (
        ((this.code = e),
        Object.defineProperties(this, {
          name: { value: "SystemError", enumerable: !1, writable: !0, configurable: !0 },
          message: { value: s, enumerable: !1, writable: !0, configurable: !0 },
          info: { value: r, enumerable: !0, configurable: !0, writable: !1 },
          errno: {
            get() {
              return r.errno;
            },
            set(a) {
              r.errno = a;
            },
            enumerable: !0,
            configurable: !0,
          },
          syscall: {
            get() {
              return r.syscall;
            },
            set(a) {
              r.syscall = a;
            },
            enumerable: !0,
            configurable: !0,
          },
        }),
        r.path !== void 0)
      )
        Object.defineProperty(this, "path", {
          get() {
            return r.path;
          },
          set(a) {
            r.path = a;
          },
          enumerable: !0,
          configurable: !0,
        });
      if (r.dest !== void 0)
        Object.defineProperty(this, "dest", {
          get() {
            return r.dest;
          },
          set(a) {
            r.dest = a;
          },
          enumerable: !0,
          configurable: !0,
        });
    }
    toString() {
      return `${this.name} [${this.code}]: ${this.message}`;
    }
    [Symbol.for("nodejs.util.inspect.custom")](e, t) {
      return TUo(this, { ...t, getters: !0, customInspect: !1 });
    }
  }
  function tZ(e, t) {
    vUo[e] = class extends gZn {
      constructor(s) {
        super(e, t, s);
      }
    };
  }
  tZ("ERR_FS_CP_DIR_TO_NON_DIR", "Cannot overwrite directory with non-directory");
  tZ("ERR_FS_CP_EEXIST", "Target already exists");
  tZ("ERR_FS_CP_EINVAL", "Invalid src or dest");
  tZ("ERR_FS_CP_FIFO_PIPE", "Cannot copy a FIFO pipe");
  tZ("ERR_FS_CP_NON_DIR_TO_DIR", "Cannot overwrite non-directory with directory");
  tZ("ERR_FS_CP_SOCKET", "Cannot copy a socket file");
  tZ("ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY", "Cannot overwrite symlink in subdirectory of self");
  tZ("ERR_FS_CP_UNKNOWN", "Cannot copy an unknown file type");
  tZ("ERR_FS_EISDIR", "Path is a directory");
  vUo.ERR_INVALID_ARG_TYPE = class extends Error {
    constructor(t, r, s) {
      super();
      ((this.code = "ERR_INVALID_ARG_TYPE"),
        (this.message = `The ${t} argument must be ${r}. Received ${typeof s}`));
    }
  };
});