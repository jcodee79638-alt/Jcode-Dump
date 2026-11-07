
var mg = Ie(function (_tc, Iwn) {
  var a_o = Symbol("proc-log.meta");
  Iwn.exports = {
    META: a_o,
    output: {
      LEVELS: ["standard", "error", "buffer", "flush"],
      KEYS: { standard: "standard", error: "error", buffer: "buffer", flush: "flush" },
      standard: function (...e) {
        return process.emit("output", "standard", ...e);
      },
      error: function (...e) {
        return process.emit("output", "error", ...e);
      },
      buffer: function (...e) {
        return process.emit("output", "buffer", ...e);
      },
      flush: function (...e) {
        return process.emit("output", "flush", ...e);
      },
    },
    log: {
      LEVELS: ["notice", "error", "warn", "info", "verbose", "http", "silly", "timing", "pause", "resume"],
      KEYS: {
        notice: "notice",
        error: "error",
        warn: "warn",
        info: "info",
        verbose: "verbose",
        http: "http",
        silly: "silly",
        timing: "timing",
        pause: "pause",
        resume: "resume",
      },
      error: function (...e) {
        return process.emit("log", "error", ...e);
      },
      notice: function (...e) {
        return process.emit("log", "notice", ...e);
      },
      warn: function (...e) {
        return process.emit("log", "warn", ...e);
      },
      info: function (...e) {
        return process.emit("log", "info", ...e);
      },
      verbose: function (...e) {
        return process.emit("log", "verbose", ...e);
      },
      http: function (...e) {
        return process.emit("log", "http", ...e);
      },
      silly: function (...e) {
        return process.emit("log", "silly", ...e);
      },
      timing: function (...e) {
        return process.emit("log", "timing", ...e);
      },
      pause: function () {
        return process.emit("log", "pause");
      },
      resume: function () {
        return process.emit("log", "resume");
      },
    },
    time: {
      LEVELS: ["start", "end"],
      KEYS: { start: "start", end: "end" },
      start: function (e, t) {
        process.emit("time", "start", e);
        function r() {
          return process.emit("time", "end", e);
        }
        if (typeof t === "function") {
          let s = t();
          if (s && s.finally) return s.finally(r);
          return (r(), s);
        }
        return r;
      },
      end: function (e) {
        return process.emit("time", "end", e);
      },
    },
    input: {
      LEVELS: ["start", "end", "read"],
      KEYS: { start: "start", end: "end", read: "read" },
      start: function (...e) {
        let t;
        if (typeof e[0] === "function") t = e.shift();
        process.emit("input", "start", ...e);
        function r() {
          return process.emit("input", "end", ...e);
        }
        if (typeof t === "function") {
          let s = t();
          if (s && s.finally) return s.finally(r);
          return (r(), s);
        }
        return r;
      },
      end: function (...e) {
        return process.emit("input", "end", ...e);
      },
      read: function (...e) {
        let t,
          r,
          s = new Promise((a, H) => {
            ((t = a), (r = H));
          });
        return (process.emit("input", "read", t, r, ...e), s);
      },
    },
  };
});