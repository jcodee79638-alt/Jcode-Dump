
function Ll(e) {
  return {
    kind: "layer",
    name: e.service !== void 0 ? e.service.key : e.name,
    service: e.service,
    implementation: e.layer,
    dependencies: e.deps,
    tag: e.tag,
  };
}