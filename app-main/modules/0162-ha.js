
function ha(e) {
  return {
    ...Object.fromEntries(
      Object.entries(process.env).filter(([t]) =>
        /^(?:systemroot|windir|comspec|temp|tmp|lang|lc_all|number_of_processors|processor_architecture)$/i.test(
          t,
        ),
      ),
    ),
    PATH: Vn(e).join(L.default.delimiter),
    NO_COLOR: "1",
    CI: "1",
    NPM_CONFIG_USERCONFIG: process.platform === "win32" ? "NUL" : "/dev/null",
    NPM_CONFIG_GLOBALCONFIG:
      process.platform === "win32" ? L.default.join(e, ".jac-v6-empty", "NUL") : "/dev/fd/0",
    NPM_CONFIG_OFFLINE: "true",
    NPM_CONFIG_AUDIT: "false",
    NPM_CONFIG_FUND: "false",
    NPM_CONFIG_UPDATE_NOTIFIER: "false",
  };
}