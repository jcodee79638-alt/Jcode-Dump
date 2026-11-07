
class tr extends D {
  constructor(t) {
    (super(t), (this.annotationElementId = t.annotationElementId), (this.deleted = !0));
  }
  serialize() {
    return this.serializeDeleted();
  }
}