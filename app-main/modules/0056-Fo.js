
function Fo(e, t) {
  let n = new URL(t, "http://localhost").pathname,
    i = [
      "/project",
      "/project/current",
      "/experimental/session",
      "/session/status",
      "/permission",
      "/question",
      "/file",
      "/file/content",
      "/file/status",
      "/global/event",
    ];
  if (e === "GET")
    return (
      i.includes(n) ||
      /^\/session\/[A-Za-z0-9_.-]+(?:\/(?:message(?:\/[A-Za-z0-9_.-]+)?|children|todo|diff))?$/.test(n)
    );
  if (e === "POST")
    return (
      n === "/session" ||
      /^\/session\/[A-Za-z0-9_.-]+\/(?:prompt_async|abort)$/.test(n) ||
      /^\/(?:permission|question)\/[A-Za-z0-9_.-]+\/(?:reply|reject)$/.test(n)
    );
  return e === "PATCH" && /^\/session\/[A-Za-z0-9_.-]+$/.test(n);
}