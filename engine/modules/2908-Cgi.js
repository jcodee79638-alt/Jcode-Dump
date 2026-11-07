
var Cgi = Ie(function (V$c, z1t) {
  var Pgi = global.__ARBORIST_FAKE_PLATFORM__ || "win32";
  z1t.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
  if (Pgi !== "win32")
    z1t.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  if (Pgi === "linux") z1t.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
});