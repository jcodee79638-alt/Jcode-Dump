
function bs(e, t, n) {
  return (
    e.sender === t &&
    e.senderFrame === t.mainFrame &&
    (e.senderFrame.url === n || e.senderFrame.url.startsWith(n + "#"))
  );
}