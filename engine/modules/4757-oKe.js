
function oKe(e) {
  return (
    typeof e === "object" &&
    e !== null &&
    (("name" in e && e.name === "AbortError") ||
      ("message" in e && String(e.message).includes("FetchRequestCanceledException")))
  );
}