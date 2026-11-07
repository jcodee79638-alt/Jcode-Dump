
function E5n(e, t) {
  let r = { attributes: A7e(e.attributes, t), droppedAttributesCount: 0 },
    s = e.schemaUrl;
  if (s && s !== "") r.schemaUrl = s;
  return r;
}