
async function Idt(e, t) {
  let r = `${e}-${JSON.stringify(t, (H, u) => (typeof u === "bigint" ? `${u}n` : u))}`,
    s = new TextEncoder().encode(r),
    a = await crypto.subtle.digest("SHA-256", s);
  return [...new Uint8Array(a)].map((H) => H.toString(16).padStart(2, "0")).join("");
}