
var l3i = ne(() => {
  qRi();
  zRi();
  n3i();
  JMr();
  s3i();
  ((cjt = Symbol("fallbackAttempt")),
    (axr = import.meta.url ? Hxr.dirname(U2a(import.meta.url)) : ""),
    (o3i = Hxr.join(axr, "xdg-open")),
    ({ platform: aLe, arch: a3i } = A3i));
  hPe = { browser: "browser", browserPrivate: "browserPrivate" };
  oLe(hPe, "chrome", () =>
    KXe(
      {
        darwin: "google chrome",
        win32: "chrome",
        linux: ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"],
      },
      {
        wsl: {
          ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
          x64: [
            "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
            "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
          ],
        },
      },
    ),
  );
  oLe(hPe, "brave", () =>
    KXe(
      { darwin: "brave browser", win32: "brave", linux: ["brave-browser", "brave"] },
      {
        wsl: {
          ia32: "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe",
          x64: [
            "/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
            "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe",
          ],
        },
      },
    ),
  );
  oLe(hPe, "firefox", () =>
    KXe(
      {
        darwin: "firefox",
        win32: String.raw`C:\Program Files\Mozilla Firefox\firefox.exe`,
        linux: "firefox",
      },
      { wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe" },
    ),
  );
  oLe(hPe, "edge", () =>
    KXe(
      { darwin: "microsoft edge", win32: "msedge", linux: ["microsoft-edge", "microsoft-edge-dev"] },
      { wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" },
    ),
  );
  oLe(hPe, "safari", () => KXe({ darwin: "Safari" }));
  u3i = R2a;
});