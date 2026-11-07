
function to(e) {
  return e.map((t) => (/\s|"/.test(t) ? JSON.stringify(t) : t)).join(" ");
}