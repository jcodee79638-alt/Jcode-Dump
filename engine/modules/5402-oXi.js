
function oXi(e) {
  let t = e.subagent.permission.some((s) => s.permission === "task"),
    r = e.subagent.permission.some((s) => s.permission === "todowrite");
  return [
    ...(e.inheritDesktopPolicy
      ? [...e.parentSessionPermission, ...e.subagent.permission.filter((s) => s.action === "deny")]
      : e.parentSessionPermission.filter(
          (s) => s.permission === "external_directory" || s.action === "deny",
        )),
    ...(r ? [] : [{ permission: "todowrite", pattern: "*", action: "deny" }]),
    ...(t ? [] : [{ permission: "task", pattern: "*", action: "deny" }]),
  ];
}