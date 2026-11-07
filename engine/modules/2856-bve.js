
var bve = Ie(function (cP) {
  var mqe =
    (cP && cP.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(cP, "__esModule", { value: !0 });
  cP.MAX_NESTING_DEPTH =
    cP.resolveMaxNestingDepth =
    cP.stripComments =
    cP.ensureObject =
    cP.getProp =
    cP.unesc =
      void 0;
  var Nna = d_r();
  Object.defineProperty(cP, "unesc", {
    enumerable: !0,
    get: function () {
      return mqe(Nna).default;
    },
  });
  var Fna = jhi();
  Object.defineProperty(cP, "getProp", {
    enumerable: !0,
    get: function () {
      return mqe(Fna).default;
    },
  });
  var Bna = Chi();
  Object.defineProperty(cP, "ensureObject", {
    enumerable: !0,
    get: function () {
      return mqe(Bna).default;
    },
  });
  var Rna = khi();
  Object.defineProperty(cP, "stripComments", {
    enumerable: !0,
    get: function () {
      return mqe(Rna).default;
    },
  });
  var Nhi = Uhi();
  Object.defineProperty(cP, "resolveMaxNestingDepth", {
    enumerable: !0,
    get: function () {
      return mqe(Nhi).default;
    },
  });
  Object.defineProperty(cP, "MAX_NESTING_DEPTH", {
    enumerable: !0,
    get: function () {
      return Nhi.MAX_NESTING_DEPTH;
    },
  });
});