
function CTt(e) {
  let t;
  return () => {
    if (t == null) t = e();
    return t;
  };
}