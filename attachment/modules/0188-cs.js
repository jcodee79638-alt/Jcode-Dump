
function cs() {
  for (const c of this._requests) c.resolve({ value: void 0, done: !0 });
  this._requests.length = 0;
}