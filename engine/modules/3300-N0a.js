
function N0a(e) {
  switch (e) {
    case "sse":
      return "text/event-stream";
    case "uint8array":
      return "application/octet-stream";
  }
}