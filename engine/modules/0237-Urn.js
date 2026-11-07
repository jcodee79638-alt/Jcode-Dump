
class Urn {
  _tag = "Span";
  spanId;
  traceId = "native";
  sampled;
  name;
  parent;
  annotations;
  links;
  startTime;
  kind;
  status;
  attributes;
  events = [];
  constructor(e) {
    ((this.name = e.name),
      (this.parent = e.parent),
      (this.annotations = e.annotations),
      (this.links = e.links),
      (this.startTime = e.startTime),
      (this.kind = e.kind),
      (this.sampled = e.sampled),
      (this.status = { _tag: "Started", startTime: e.startTime }),
      (this.attributes = new Map()),
      (this.traceId = OL(e.parent)?.traceId ?? wrn(32)),
      (this.spanId = wrn(16)));
  }
  end(e, t) {
    this.status = { _tag: "Ended", endTime: e, exit: t, startTime: this.status.startTime };
  }
  attribute(e, t) {
    this.attributes.set(e, t);
  }
  event(e, t, r) {
    this.events.push([e, t, r ?? {}]);
  }
  addLinks(e) {
    this.links.push(...e);
  }
}