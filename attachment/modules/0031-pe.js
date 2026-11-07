
const pe = () => [],
  Gs = () => new Map(),
  Ts = () => Object.create(null),
  Un = () => new Set();
typeof Iterator.prototype.join != "function" &&
  (Iterator.prototype.join = function (c) {
    return [...this].join(c);
  });