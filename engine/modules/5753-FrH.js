
function FrH(e) {
  let t = new URL(e);
  if (t.protocol === "http:") t.protocol = "ws:";
  if (t.protocol === "https:") t.protocol = "wss:";
  return t.toString();
}