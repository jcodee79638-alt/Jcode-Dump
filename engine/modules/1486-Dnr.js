
class Dnr {
  isLeafNode = !1;
  routes;
  handlerStorage;
  addRoute(e) {
    if (this.routes === void 0) this.routes = [e];
    else this.routes.push(e);
    if (this.handlerStorage === void 0) this.handlerStorage = new EEn();
    ((this.isLeafNode = !0), this.handlerStorage.add(e));
  }
}