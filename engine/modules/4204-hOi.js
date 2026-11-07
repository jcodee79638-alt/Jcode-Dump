
function hOi(e, t) {
  if (Bhe(e, [137, 80, 78, 71, 13, 10, 26, 10])) return "image/png";
  if (Bhe(e, [255, 216, 255])) return "image/jpeg";
  if (Bhe(e, [71, 73, 70, 56])) return "image/gif";
  if (Bhe(e, [66, 77])) return "image/bmp";
  if (Bhe(e, [37, 80, 68, 70, 45])) return "application/pdf";
  if (Bhe(e, [82, 73, 70, 70]) && Bhe(e.subarray(8), [87, 69, 66, 80])) return "image/webp";
  return t;
}