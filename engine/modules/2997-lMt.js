
class lMt {
  listeners = [];
  event = (e) => (
    this.listeners.push(e),
    {
      dispose: () => {
        let t = this.listeners.indexOf(e);
        if (t !== -1) this.listeners.splice(t, 1);
      },
    }
  );
  fire(e) {
    for (let t of this.listeners) t(e);
  }
}