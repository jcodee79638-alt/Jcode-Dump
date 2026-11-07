
function aGs(e = {}) {
  return {
    home: uH.home,
    data: uH.data,
    cache: uH.cache,
    config: Ad.OPENCODE_CONFIG_DIR ?? uH.config,
    state: uH.state,
    tmp: uH.tmp,
    bin: uH.bin,
    log: uH.log,
    repos: uH.repos,
    ...e,
  };
}