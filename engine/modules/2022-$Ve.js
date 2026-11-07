
var $Ve = Ie(function (hYH, Uvn) {
  var Aco = Object.prototype.toString;
  Uvn.exports = function (t) {
    if (t === void 0) return "undefined";
    if (t === null) return "null";
    var r = typeof t;
    if (r === "boolean") return "boolean";
    if (r === "string") return "string";
    if (r === "number") return "number";
    if (r === "symbol") return "symbol";
    if (r === "function") return dco(t) ? "generatorfunction" : "function";
    if (uco(t)) return "array";
    if (hco(t)) return "buffer";
    if (_co(t)) return "arguments";
    if (fco(t)) return "date";
    if (lco(t)) return "error";
    if (pco(t)) return "regexp";
    switch (Ovn(t)) {
      case "Symbol":
        return "symbol";
      case "Promise":
        return "promise";
      case "WeakMap":
        return "weakmap";
      case "WeakSet":
        return "weakset";
      case "Map":
        return "map";
      case "Set":
        return "set";
      case "Int8Array":
        return "int8array";
      case "Uint8Array":
        return "uint8array";
      case "Uint8ClampedArray":
        return "uint8clampedarray";
      case "Int16Array":
        return "int16array";
      case "Uint16Array":
        return "uint16array";
      case "Int32Array":
        return "int32array";
      case "Uint32Array":
        return "uint32array";
      case "Float32Array":
        return "float32array";
      case "Float64Array":
        return "float64array";
    }
    if (mco(t)) return "generator";
    switch (((r = Aco.call(t)), r)) {
      case "[object Object]":
        return "object";
      case "[object Map Iterator]":
        return "mapiterator";
      case "[object Set Iterator]":
        return "setiterator";
      case "[object String Iterator]":
        return "stringiterator";
      case "[object Array Iterator]":
        return "arrayiterator";
    }
    return r.slice(8, -1).toLowerCase().replace(/\s/g, "");
  };
  function Ovn(e) {
    return typeof e.constructor === "function" ? e.constructor.name : null;
  }
  function uco(e) {
    if (Array.isArray) return Array.isArray(e);
    return e instanceof Array;
  }
  function lco(e) {
    return (
      e instanceof Error ||
      (typeof e.message === "string" && e.constructor && typeof e.constructor.stackTraceLimit === "number")
    );
  }
  function fco(e) {
    if (e instanceof Date) return !0;
    return (
      typeof e.toDateString === "function" &&
      typeof e.getDate === "function" &&
      typeof e.setDate === "function"
    );
  }
  function pco(e) {
    if (e instanceof RegExp) return !0;
    return (
      typeof e.flags === "string" &&
      typeof e.ignoreCase === "boolean" &&
      typeof e.multiline === "boolean" &&
      typeof e.global === "boolean"
    );
  }
  function dco(e, t) {
    return Ovn(e) === "GeneratorFunction";
  }
  function mco(e) {
    return typeof e.throw === "function" && typeof e.return === "function" && typeof e.next === "function";
  }
  function _co(e) {
    try {
      if (typeof e.length === "number" && typeof e.callee === "function") return !0;
    } catch (t) {
      if (t.message.indexOf("callee") !== -1) return !0;
    }
    return !1;
  }
  function hco(e) {
    if (e.constructor && typeof e.constructor.isBuffer === "function") return e.constructor.isBuffer(e);
    return !1;
  }
});