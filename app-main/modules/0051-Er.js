
function Er(e) {
  let t = Q(e),
    n =
      t.type === "retry" && typeof t.message === "string"
        ? bi(/^Position ([1-9][0-9]{0,2}) in queue$/.exec(t.message)?.[1])
        : void 0;
  return {
    status: !t.type || t.type === "idle" ? "idle" : "busy",
    waitingForSlot: t.type === "retry" && (n !== void 0 || t.message === "Waiting for an available slot"),
    ...(n === void 0 ? {} : { queuePosition: n }),
    ...(t.type === "retry" && t.message === vi ? { retrying: !0 } : {}),
  };
}