
function cZr(e = process.env, t = b6s.homedir()) {
  return {
    data: HQ.join(
      e.XDG_DATA_HOME && HQ.isAbsolute(e.XDG_DATA_HOME) ? e.XDG_DATA_HOME : HQ.join(t, ".local", "share"),
      "jaccode",
    ),
    state: HQ.join(
      e.XDG_STATE_HOME && HQ.isAbsolute(e.XDG_STATE_HOME) ? e.XDG_STATE_HOME : HQ.join(t, ".local", "state"),
      "jaccode",
    ),
  };
}