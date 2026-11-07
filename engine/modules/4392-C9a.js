
function C9a(e, t) {
  if (e.protocol === t.protocol && e.hostname === t.hostname && e.port === t.port) return !0;
  return (
    e.hostname === t.hostname &&
    e.protocol === "http:" &&
    e.port === "" &&
    t.protocol === "https:" &&
    t.port === ""
  );
}