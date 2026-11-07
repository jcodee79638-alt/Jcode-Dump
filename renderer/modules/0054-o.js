
function o(e, n, i, s) {
  let l;
  const a = () => {
      const d = document.createElement("template");
      return ((d.innerHTML = e), d.content.firstChild);
    },
    c = () => (l || (l = a())).cloneNode(!0);
  return ((c.cloneNode = c), c);
}