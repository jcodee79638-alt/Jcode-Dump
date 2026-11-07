
function br(e) {
  return e === "running"
    ? "Running"
    : e === "completed"
      ? "Completed"
      : e === "failed"
        ? "Failed"
        : e === "interrupted"
          ? "Interrupted"
          : "Stopped";
}
Oe(["click", "input"]);