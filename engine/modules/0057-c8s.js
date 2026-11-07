
async function c8s(e = vAt.join(vAt.dirname(process.execPath), "JacAuth.exe"), t) {
  let r = await H8s(o8s)(e, ["device", ...(t ? ["--test-directory", t] : [])], {
      windowsHide: !0,
      shell: !1,
      timeout: 1e4,
      maxBuffer: 1024,
    }),
    s = JSON.parse(r.stdout);
  if (
    !s ||
    typeof s !== "object" ||
    !("device" in s) ||
    typeof s.device !== "string" ||
    !/^[a-f0-9]{64}$/.test(s.device)
  )
    throw new Sc("storage");
  let a =
    "hardware" in s && typeof s.hardware === "string" && /^[a-f0-9]{64}$/.test(s.hardware)
      ? s.hardware
      : void 0;
  return { device: s.device, hardware: a };
}