
function Gee(e) {
  if (e <= 65535) return String.fromCharCode(e);
  return ((e -= 65536), String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}