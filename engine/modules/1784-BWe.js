
function BWe(e, t, r) {
  if (r == null) {
    e.writeBigUInt64LE(0n, t);
    return;
  }
  e.writeBigUInt64LE(BigInt(Qv(r)), t);
}