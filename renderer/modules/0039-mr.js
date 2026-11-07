
function mr(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}