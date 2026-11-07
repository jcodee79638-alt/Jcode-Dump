
function WrH(e) {
  return e.match(
    /<script\b(?![^>]*\bsrc\s*=)[^>]*\bid=(['"])oc-theme-preload-script\1[^>]*>([\s\S]*?)<\/script>/i,
  );
}