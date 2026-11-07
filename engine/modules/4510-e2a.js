
function e2a() {
  try {
    return PRi.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return !1;
  }
}