
function IZr(e) {
  if (
    !e ||
    typeof e !== "object" ||
    !("name" in e) ||
    e.name !== "APIError" ||
    !("data" in e) ||
    !e.data ||
    typeof e.data !== "object"
  )
    return !1;
  return (
    "statusCode" in e.data &&
    e.data.statusCode === 429 &&
    "message" in e.data &&
    e.data.message === qF.plan_exhausted
  );
}