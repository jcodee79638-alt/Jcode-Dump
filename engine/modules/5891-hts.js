
var hts = ne(() => {
  Akt = class Akt {
    queue = [];
    resolvers = [];
    push(e) {
      let t = this.resolvers.shift();
      if (t) t(e);
      else this.queue.push(e);
    }
    async next() {
      if (this.queue.length > 0) return this.queue.shift();
      return new Promise((e) => this.resolvers.push(e));
    }
    async *[Symbol.asyncIterator]() {
      while (!0) yield await this.next();
    }
  };
});