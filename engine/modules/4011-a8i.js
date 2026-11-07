
function a8i(e) {
  let t = new XTa();
  return {
    use() {
      let r = t.getStore();
      if (!r) throw new o8i(e);
      return r;
    },
    provide(r, s) {
      return t.run(r, s);
    },
  };
}