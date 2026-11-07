
function mi(e) {
  if (e instanceof T) return e.message;
  if (
    e instanceof Error &&
    [
      "The chat workspace folder is unavailable. Choose a project folder instead.",
      "The chat folder could not be opened. Try again.",
    ].includes(e.message)
  )
    return e.message;
  if (
    e instanceof Error &&
    e.message === "Git review is unavailable in this folder. You can keep coding and viewing files."
  )
    return e.message;
  let t = [
    "Choose an available model.",
    "Choose JacCoder 5.5 for images or PDF pages. Your attachments are saved.",
    "Invalid request.",
    "Choose an absolute project folder.",
    "Choose a file inside the project.",
    "Choose a thinking level.",
    "The file changed. Review its latest diff before continuing.",
    "Confirm restoration before continuing.",
    "Close other Jac Code sessions and try again.",
  ];
  if (e instanceof Error && t.includes(e.message)) return e.message;
  return "Jac Code could not complete this request. Try again.";
}