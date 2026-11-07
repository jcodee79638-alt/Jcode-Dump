
const Os = (c) =>
    typeof c == "object" && Number.isInteger(c?.num) && c.num >= 0 && Number.isInteger(c?.gen) && c.gen >= 0,
  yr = (c) => typeof c == "object" && typeof c?.name == "string",
  Ar = Hn.bind(null, Os, yr);