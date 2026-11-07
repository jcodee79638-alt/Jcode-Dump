
var gxt = Ie(function (Lbe, P1i) {
  var hxt = Object.create(null, {
      location: {
        get: function () {
          throw Error("window.location is not supported.");
        },
      },
    }),
    ILa = function (e, t) {
      return e.compareDocumentPosition(t);
    },
    DLa = function (e, t) {
      return ILa(e, t) & 2 ? 1 : -1;
    },
    $xt = function (e) {
      while ((e = e.nextSibling) && e.nodeType !== 1);
      return e;
    },
    hbe = function (e) {
      while ((e = e.previousSibling) && e.nodeType !== 1);
      return e;
    },
    yLa = function (e) {
      if ((e = e.firstChild)) while (e.nodeType !== 1 && (e = e.nextSibling));
      return e;
    },
    MLa = function (e) {
      if ((e = e.lastChild)) while (e.nodeType !== 1 && (e = e.previousSibling));
      return e;
    },
    _be = function (e) {
      if (!e.parentNode) return !1;
      var t = e.parentNode.nodeType;
      return t === 1 || t === 9;
    },
    S1i = function (e) {
      if (!e) return e;
      var t = e[0];
      if (t === '"' || t === "'") {
        if (e[e.length - 1] === t) e = e.slice(1, -1);
        else e = e.slice(1);
        return e.replace(zl.str_escape, function (r) {
          var s = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(r);
          if (!s) return r.slice(1);
          if (s[2]) return "";
          var a = parseInt(s[1], 16);
          return String.fromCodePoint ? String.fromCodePoint(a) : String.fromCharCode(a);
        });
      } else if (zl.ident.test(e)) return rHe(e);
      else return e;
    },
    rHe = function (e) {
      return e.replace(zl.escape, function (t) {
        var r = /^\\([0-9A-Fa-f]+)/.exec(t);
        if (!r) return t[1];
        var s = parseInt(r[1], 16);
        return String.fromCodePoint ? String.fromCodePoint(s) : String.fromCharCode(s);
      });
    },
    xLa = (function () {
      if (Array.prototype.indexOf) return Array.prototype.indexOf;
      return function (e, t) {
        var r = this.length;
        while (r--) if (this[r] === t) return r;
        return -1;
      };
    })(),
    v1i = function (e, t) {
      var r = zl.inside.source.replace(/</g, e).replace(/>/g, t);
      return new RegExp(r);
    },
    j8 = function (e, t, r) {
      return ((e = e.source), (e = e.replace(t, r.source || r)), new RegExp(e));
    },
    T1i = function (e, t) {
      return e
        .replace(/^(?:\w+:\/\/|\/+)/, "")
        .replace(/(?:\/+|\/*#.*?)$/, "")
        .split("/", t)
        .join("/");
    },
    SLa = function (e, t) {
      var r = e.replace(/\s+/g, ""),
        s;
      if (r === "even") r = "2n+0";
      else if (r === "odd") r = "2n+1";
      else if (r.indexOf("n") === -1) r = "0n" + r;
      return (
        (s = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(r)),
        {
          group: s[1] === "-" ? -(s[2] || 1) : +(s[2] || 1),
          offset: s[4] ? (s[3] === "-" ? -s[4] : +s[4]) : 0,
        }
      );
    },
    Q$r = function (e, t, r) {
      var s = SLa(e),
        { group: a, offset: H } = s,
        u = !r ? yLa : MLa,
        f = !r ? $xt : hbe;
      return function (d) {
        if (!_be(d)) return;
        var _ = u(d.parentNode),
          L = 0;
        while (_) {
          if (t(_, d)) L++;
          if (_ === d) return ((L -= H), a && L ? L % a === 0 && L < 0 === a < 0 : !L);
          _ = f(_);
        }
      };
    },
    pT = {
      "*": (function () {
        return function () {
          return !0;
        };
      })(),
      type: function (e) {
        return (
          (e = e.toLowerCase()),
          function (t) {
            return t.nodeName.toLowerCase() === e;
          }
        );
      },
      attr: function (e, t, r, s) {
        return (
          (t = b1i[t]),
          function (a) {
            var H;
            switch (e) {
              case "for":
                H = a.htmlFor;
                break;
              case "class":
                if (((H = a.className), H === "" && a.getAttribute("class") == null)) H = null;
                break;
              case "href":
              case "src":
                H = a.getAttribute(e, 2);
                break;
              case "title":
                H = a.getAttribute("title") || null;
                break;
              case "id":
              case "lang":
              case "dir":
              case "accessKey":
              case "hidden":
              case "tabIndex":
              case "style":
                if (a.getAttribute) {
                  H = a.getAttribute(e);
                  break;
                }
              default:
                if (a.hasAttribute && !a.hasAttribute(e)) break;
                H = a[e] != null ? a[e] : a.getAttribute && a.getAttribute(e);
                break;
            }
            if (H == null) return;
            if (((H = H + ""), s)) ((H = H.toLowerCase()), (r = r.toLowerCase()));
            return t(H, r);
          }
        );
      },
      ":first-child": function (e) {
        return !hbe(e) && _be(e);
      },
      ":last-child": function (e) {
        return !$xt(e) && _be(e);
      },
      ":only-child": function (e) {
        return !hbe(e) && !$xt(e) && _be(e);
      },
      ":nth-child": function (e, t) {
        return Q$r(
          e,
          function () {
            return !0;
          },
          t,
        );
      },
      ":nth-last-child": function (e) {
        return pT[":nth-child"](e, !0);
      },
      ":root": function (e) {
        return e.ownerDocument.documentElement === e;
      },
      ":empty": function (e) {
        return !e.firstChild;
      },
      ":not": function (e) {
        var t = Z$r(e);
        return function (r) {
          return !t(r);
        };
      },
      ":first-of-type": function (e) {
        if (!_be(e)) return;
        var t = e.nodeName;
        while ((e = hbe(e))) if (e.nodeName === t) return;
        return !0;
      },
      ":last-of-type": function (e) {
        if (!_be(e)) return;
        var t = e.nodeName;
        while ((e = $xt(e))) if (e.nodeName === t) return;
        return !0;
      },
      ":only-of-type": function (e) {
        return pT[":first-of-type"](e) && pT[":last-of-type"](e);
      },
      ":nth-of-type": function (e, t) {
        return Q$r(
          e,
          function (r, s) {
            return r.nodeName === s.nodeName;
          },
          t,
        );
      },
      ":nth-last-of-type": function (e) {
        return pT[":nth-of-type"](e, !0);
      },
      ":checked": function (e) {
        return !!(e.checked || e.selected);
      },
      ":indeterminate": function (e) {
        return !pT[":checked"](e);
      },
      ":enabled": function (e) {
        return !e.disabled && e.type !== "hidden";
      },
      ":disabled": function (e) {
        return !!e.disabled;
      },
      ":target": function (e) {
        return e.id === hxt.location.hash.substring(1);
      },
      ":focus": function (e) {
        return e === e.ownerDocument.activeElement;
      },
      ":is": function (e) {
        return Z$r(e);
      },
      ":matches": function (e) {
        return pT[":is"](e);
      },
      ":nth-match": function (e, t) {
        var r = e.split(/\s*,\s*/),
          s = r.shift(),
          a = Z$r(r.join(","));
        return Q$r(s, a, t);
      },
      ":nth-last-match": function (e) {
        return pT[":nth-match"](e, !0);
      },
      ":links-here": function (e) {
        return e + "" === hxt.location + "";
      },
      ":lang": function (e) {
        return function (t) {
          while (t) {
            if (t.lang) return t.lang.indexOf(e) === 0;
            t = t.parentNode;
          }
        };
      },
      ":dir": function (e) {
        return function (t) {
          while (t) {
            if (t.dir) return t.dir === e;
            t = t.parentNode;
          }
        };
      },
      ":scope": function (e, t) {
        var r = t || e.ownerDocument;
        if (r.nodeType === 9) return e === r.documentElement;
        return e === r;
      },
      ":any-link": function (e) {
        return typeof e.href === "string";
      },
      ":local-link": function (e) {
        if (e.nodeName) return e.href && e.host === hxt.location.host;
        var t = +e + 1;
        return function (r) {
          if (!r.href) return;
          var s = hxt.location + "",
            a = r + "";
          return T1i(s, t) === T1i(a, t);
        };
      },
      ":default": function (e) {
        return !!e.defaultSelected;
      },
      ":valid": function (e) {
        return e.willValidate || (e.validity && e.validity.valid);
      },
      ":invalid": function (e) {
        return !pT[":valid"](e);
      },
      ":in-range": function (e) {
        return e.value > e.min && e.value <= e.max;
      },
      ":out-of-range": function (e) {
        return !pT[":in-range"](e);
      },
      ":required": function (e) {
        return !!e.required;
      },
      ":optional": function (e) {
        return !e.required;
      },
      ":read-only": function (e) {
        if (e.readOnly) return !0;
        var t = e.getAttribute("contenteditable"),
          r = e.contentEditable,
          s = e.nodeName.toLowerCase();
        return ((s = s !== "input" && s !== "textarea"), (s || e.disabled) && t == null && r !== "true");
      },
      ":read-write": function (e) {
        return !pT[":read-only"](e);
      },
      ":hover": function () {
        throw Error(":hover is not supported.");
      },
      ":active": function () {
        throw Error(":active is not supported.");
      },
      ":link": function () {
        throw Error(":link is not supported.");
      },
      ":visited": function () {
        throw Error(":visited is not supported.");
      },
      ":column": function () {
        throw Error(":column is not supported.");
      },
      ":nth-column": function () {
        throw Error(":nth-column is not supported.");
      },
      ":nth-last-column": function () {
        throw Error(":nth-last-column is not supported.");
      },
      ":current": function () {
        throw Error(":current is not supported.");
      },
      ":past": function () {
        throw Error(":past is not supported.");
      },
      ":future": function () {
        throw Error(":future is not supported.");
      },
      ":contains": function (e) {
        return function (t) {
          var r = t.innerText || t.textContent || t.value || "";
          return r.indexOf(e) !== -1;
        };
      },
      ":has": function (e) {
        return function (t) {
          return j1i(e, t).length > 0;
        };
      },
    },
    b1i = {
      "-": function () {
        return !0;
      },
      "=": function (e, t) {
        return e === t;
      },
      "*=": function (e, t) {
        return e.indexOf(t) !== -1;
      },
      "~=": function (e, t) {
        var r, s, a, H;
        for (s = 0; ; s = r + 1) {
          if (((r = e.indexOf(t, s)), r === -1)) return !1;
          if (((a = e[r - 1]), (H = e[r + t.length]), (!a || a === " ") && (!H || H === " "))) return !0;
        }
      },
      "|=": function (e, t) {
        var r = e.indexOf(t),
          s;
        if (r !== 0) return;
        return ((s = e[r + t.length]), s === "-" || !s);
      },
      "^=": function (e, t) {
        return e.indexOf(t) === 0;
      },
      "$=": function (e, t) {
        var r = e.lastIndexOf(t);
        return r !== -1 && r + t.length === e.length;
      },
      "!=": function (e, t) {
        return e !== t;
      },
    },
    HGe = {
      " ": function (e) {
        return function (t) {
          while ((t = t.parentNode)) if (e(t)) return t;
        };
      },
      ">": function (e) {
        return function (t) {
          if ((t = t.parentNode)) return e(t) && t;
        };
      },
      "+": function (e) {
        return function (t) {
          if ((t = hbe(t))) return e(t) && t;
        };
      },
      "~": function (e) {
        return function (t) {
          while ((t = hbe(t))) if (e(t)) return t;
        };
      },
      noop: function (e) {
        return function (t) {
          return e(t) && t;
        };
      },
      ref: function (e, t) {
        var r;
        function s(a) {
          var H = a.ownerDocument,
            u = H.getElementsByTagName("*"),
            f = u.length;
          while (f--) if (((r = u[f]), s.test(a))) return ((r = null), !0);
          r = null;
        }
        return (
          (s.combinator = function (a) {
            if (!r || !r.getAttribute) return;
            var H = r.getAttribute(t) || "";
            if (H[0] === "#") H = H.substring(1);
            if (H === a.id && e(r)) return r;
          }),
          s
        );
      },
    },
    zl = {
      escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
      str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
      nonascii: /[\u00A0-\uFFFF]/,
      cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
      qname: /^ *(cssid|\*)/,
      simple: /^(?:([.#]cssid)|pseudo|attr)/,
      ref: /^ *\/(cssid)\/ */,
      combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
      attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
      pseudo: /^(:cssid)(?:\((inside)\))?/,
      inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
      ident: /^(cssid)$/,
    };
  zl.cssid = j8(zl.cssid, "nonascii", zl.nonascii);
  zl.cssid = j8(zl.cssid, "escape", zl.escape);
  zl.qname = j8(zl.qname, "cssid", zl.cssid);
  zl.simple = j8(zl.simple, "cssid", zl.cssid);
  zl.ref = j8(zl.ref, "cssid", zl.cssid);
  zl.attr = j8(zl.attr, "cssid", zl.cssid);
  zl.pseudo = j8(zl.pseudo, "cssid", zl.cssid);
  zl.inside = j8(zl.inside, `[^"'>]*`, zl.inside);
  zl.attr = j8(zl.attr, "inside", v1i("\\[", "\\]"));
  zl.pseudo = j8(zl.pseudo, "inside", v1i("\\(", "\\)"));
  zl.simple = j8(zl.simple, "pseudo", zl.pseudo);
  zl.simple = j8(zl.simple, "attr", zl.attr);
  zl.ident = j8(zl.ident, "cssid", zl.cssid);
  zl.str_escape = j8(zl.str_escape, "escape", zl.escape);
  var cGe = function (e) {
      var t = e.replace(/^\s+|\s+$/g, ""),
        r,
        s = [],
        a = [],
        H,
        u,
        f,
        d,
        _;
      while (t) {
        if ((f = zl.qname.exec(t))) ((t = t.substring(f[0].length)), (u = rHe(f[1])), a.push(Lxt(u, !0)));
        else if ((f = zl.simple.exec(t)))
          ((t = t.substring(f[0].length)), (u = "*"), a.push(Lxt(u, !0)), a.push(Lxt(f)));
        else throw SyntaxError("Invalid selector.");
        while ((f = zl.simple.exec(t))) ((t = t.substring(f[0].length)), a.push(Lxt(f)));
        if (t[0] === "!") ((t = t.substring(1)), (H = vLa()), (H.qname = u), a.push(H.simple));
        if ((f = zl.ref.exec(t))) {
          ((t = t.substring(f[0].length)), (_ = HGe.ref(Y$r(a), rHe(f[1]))), s.push(_.combinator), (a = []));
          continue;
        }
        if ((f = zl.combinator.exec(t))) {
          if (((t = t.substring(f[0].length)), (d = f[1] || f[2] || f[3]), d === ",")) {
            s.push(HGe.noop(Y$r(a)));
            break;
          }
        } else d = "noop";
        if (!HGe[d]) throw SyntaxError("Bad combinator.");
        (s.push(HGe[d](Y$r(a))), (a = []));
      }
      if (((r = TLa(s)), (r.qname = u), (r.sel = t), H))
        ((H.lname = r.qname), (H.test = r), (H.qname = H.qname), (H.sel = r.sel), (r = H));
      if (_) ((_.test = r), (_.qname = r.qname), (_.sel = r.sel), (r = _));
      return r;
    },
    Lxt = function (e, t) {
      if (t) return e === "*" ? pT["*"] : pT.type(e);
      if (e[1])
        return e[1][0] === "."
          ? pT.attr("class", "~=", rHe(e[1].substring(1)), !1)
          : pT.attr("id", "=", rHe(e[1].substring(1)), !1);
      if (e[2]) return e[3] ? pT[rHe(e[2])](S1i(e[3])) : pT[rHe(e[2])];
      if (e[4]) {
        var r = e[6],
          s = /["'\s]\s*I$/i.test(r);
        if (s) r = r.replace(/\s*I$/i, "");
        return pT.attr(rHe(e[4]), e[5] || "-", S1i(r), s);
      }
      throw SyntaxError("Unknown Selector.");
    },
    Y$r = function (e) {
      var t = e.length,
        r;
      if (t < 2) return e[0];
      return function (s) {
        if (!s) return;
        for (r = 0; r < t; r++) if (!e[r](s)) return;
        return !0;
      };
    },
    TLa = function (e) {
      if (e.length < 2)
        return function (t) {
          return !!e[0](t);
        };
      return function (t) {
        var r = e.length;
        while (r--) if (!(t = e[r](t))) return;
        return !0;
      };
    },
    vLa = function () {
      var e;
      function t(r) {
        var s = r.ownerDocument,
          a = s.getElementsByTagName(t.lname),
          H = a.length;
        while (H--) if (t.test(a[H]) && e === r) return ((e = null), !0);
        e = null;
      }
      return (
        (t.simple = function (r) {
          return ((e = r), !0);
        }),
        t
      );
    },
    Z$r = function (e) {
      var t = cGe(e),
        r = [t];
      while (t.sel) ((t = cGe(t.sel)), r.push(t));
      if (r.length < 2) return t;
      return function (s) {
        var a = r.length,
          H = 0;
        for (; H < a; H++) if (r[H](s)) return !0;
      };
    },
    j1i = function (e, t) {
      var r = [],
        s = cGe(e),
        a = t.getElementsByTagName(s.qname),
        H = 0,
        u;
      while ((u = a[H++])) if (s(u)) r.push(u);
      if (s.sel) {
        while (s.sel) {
          ((s = cGe(s.sel)), (a = t.getElementsByTagName(s.qname)), (H = 0));
          while ((u = a[H++])) if (s(u) && xLa.call(r, u) === -1) r.push(u);
        }
        r.sort(DLa);
      }
      return r;
    };
  P1i.exports = Lbe = function (e, t) {
    var r, s;
    if (t.nodeType !== 11 && e.indexOf(" ") === -1) {
      if (e[0] === "#" && t.rooted && /^#[A-Z_][-A-Z0-9_]*$/i.test(e)) {
        if (t.doc._hasMultipleElementsWithId) {
          if (((r = e.substring(1)), !t.doc._hasMultipleElementsWithId(r)))
            return ((s = t.doc.getElementById(r)), s ? [s] : []);
        }
      }
      if (e[0] === "." && /^\.\w+$/.test(e)) return t.getElementsByClassName(e.substring(1));
      if (/^\w+$/.test(e)) return t.getElementsByTagName(e);
    }
    return j1i(e, t);
  };
  Lbe.selectors = pT;
  Lbe.operators = b1i;
  Lbe.combinators = HGe;
  Lbe.matches = function (e, t) {
    var r = { sel: t };
    do if (((r = cGe(r.sel)), r(e))) return !0;
    while (r.sel);
    return !1;
  };
});