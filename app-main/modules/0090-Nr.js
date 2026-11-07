
function Nr(e, t, n) {
  return Le.createHash("sha256")
    .update(e.task.id)
    .update(t)
    .update((e.before && rt(e.before, t)?.hash) || "absent")
    .update((e.after && rt(e.after, t)?.hash) || "absent")
    .update(n ?? "absent")
    .digest("hex");
}