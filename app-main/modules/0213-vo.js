
var vo = (e) => {
  if (!(e.bytes instanceof Uint8Array)) throw new T("type");
  return bn.save(q(e.filename, 260), e.bytes);
};