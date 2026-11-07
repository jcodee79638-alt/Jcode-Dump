
function DPo(e, t) {
  return {
    attributes: e.attributes ? A7e(e.attributes, t) : [],
    name: e.name,
    timeUnixNano: t.encodeHrTime(e.time),
    droppedAttributesCount: e.droppedAttributesCount || 0,
  };
}