
var UVi = (e) =>
    e != null &&
    typeof e === "object" &&
    typeof e.size === "number" &&
    typeof e.type === "string" &&
    typeof e.text === "function" &&
    typeof e.slice === "function" &&
    typeof e.arrayBuffer === "function",
  i3a = (e) =>
    e != null &&
    typeof e === "object" &&
    typeof e.name === "string" &&
    typeof e.lastModified === "number" &&
    UVi(e),
  s3a = (e) =>
    e != null && typeof e === "object" && typeof e.url === "string" && typeof e.blob === "function";