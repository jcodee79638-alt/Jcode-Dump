
function vCt(e) {
  let t = e.state === "error" ? "task_error" : "task_result";
  return [
    `<task id="${e.sessionID}" state="${e.state}">`,
    ...(e.summary ? [`<summary>${e.summary}</summary>`] : []),
    `<${t}>`,
    e.text,
    `</${t}>`,
    "</task>",
  ].join(`
`);
}