
function fns(e) {
  return e.pipe(
    Zo((t) => {
      if (t instanceof _xr) return new TJ({ name: t._tag, data: { providerID: t.providerID } });
      if (t instanceof hxr) return new TJ({ name: t._tag, data: { providerID: t.providerID } });
      if (t instanceof Lxr) return new TJ({ name: t._tag, data: {} });
      if (t instanceof $xr) return new TJ({ name: t._tag, data: { field: t.field, message: t.message } });
      return new TJ({ name: "BadRequest", data: {} });
    }),
  );
}