
var J7n = Ie(function (G7n) {
  Object.defineProperty(G7n, "__esModule", { value: !0 });
  G7n.processDetector = void 0;
  var W7n = kf(),
    tT = t7e(),
    V7n = cr("os");
  class q7n {
    detect(e) {
      let t = {
        [tT.ATTR_PROCESS_PID]: process.pid,
        [tT.ATTR_PROCESS_EXECUTABLE_NAME]: process.title,
        [tT.ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
        [tT.ATTR_PROCESS_COMMAND_ARGS]: [process.argv[0], ...process.execArgv, ...process.argv.slice(1)],
        [tT.ATTR_PROCESS_RUNTIME_VERSION]: process.versions.node,
        [tT.ATTR_PROCESS_RUNTIME_NAME]: "nodejs",
        [tT.ATTR_PROCESS_RUNTIME_DESCRIPTION]: "Node.js",
      };
      if (process.argv.length > 1) t[tT.ATTR_PROCESS_COMMAND] = process.argv[1];
      try {
        let r = V7n.userInfo();
        t[tT.ATTR_PROCESS_OWNER] = r.username;
      } catch (r) {
        W7n.diag.debug(`error obtaining process owner: ${r}`);
      }
      return { attributes: t };
    }
  }
  G7n.processDetector = new q7n();
});