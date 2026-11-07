
function Up(e) {
  if (!e) return {};
  let { errorMap: t, invalid_type_error: r, required_error: s, description: a } = e;
  if (t && (r || s))
    throw Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  if (t) return { errorMap: t, description: a };
  return {
    errorMap: (u, f) => {
      let { message: d } = e;
      if (u.code === "invalid_enum_value") return { message: d ?? f.defaultError };
      if (typeof f.data > "u") return { message: d ?? s ?? f.defaultError };
      if (u.code !== "invalid_type") return { message: f.defaultError };
      return { message: d ?? r ?? f.defaultError };
    },
    description: a,
  };
}