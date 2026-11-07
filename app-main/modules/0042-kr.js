
function kr(e, t) {
  return typeof t === "string" &&
    t.length === 36 &&
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(t)
    ? `${e} Support ID ${t}.`
    : e;
}