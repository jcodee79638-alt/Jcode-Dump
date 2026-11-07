
var UMr = ne(() => {
  UMr();
  $Fa = `
  :root { color-scheme: light dark;${gRi}
    --oc-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --oc-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {${ERi} } }
  :root[data-theme="dark"] {${ERi} }
  :root[data-theme="light"] {${gRi} }

  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: var(--oc-bg);
    color: var(--oc-text-base);
    font-family: var(--oc-font-sans);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .card {
    width: min(100%, 28rem);
    padding: 2.25rem 2rem 1.75rem;
    background: var(--oc-card);
    border: 1px solid var(--oc-border-weak);
    border-radius: 14px;
    box-shadow: var(--oc-shadow);
    text-align: center;
  }
  .brand { display: flex; justify-content: center; margin-bottom: 1.75rem; }
  .brand svg { height: 19px; width: auto; }
  .status { display: flex; justify-content: center; margin-bottom: 1.125rem; }
  .icon { display: none; line-height: 0; }
  .icon svg { display: block; }
  .card[data-status="pending"] .icon-pending,
  .card[data-status="success"] .icon-success,
  .card[data-status="error"] .icon-error { display: block; }
  .icon-success { color: var(--oc-success); }
  .icon-error { color: var(--oc-error); }
  .icon-pending { color: var(--oc-text-weak); }
  .headline { margin: 0; font-size: 1.1875rem; font-weight: 500; line-height: 1.3; letter-spacing: -0.012em; color: var(--oc-text-strong); }
  .message { margin: 0.5rem 0 0; font-size: 0.9375rem; color: var(--oc-text-base); }
  .detail {
    margin: 1.25rem 0 0;
    padding: 0.75rem 0.875rem;
    text-align: left;
    font-family: var(--oc-font-mono);
    font-size: 0.8125rem;
    line-height: 1.55;
    color: var(--oc-text-strong);
    background: var(--oc-detail-bg);
    border: 1px solid var(--oc-detail-border);
    border-radius: 8px;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 9.5rem;
    overflow: auto;
  }
  .detail[hidden] { display: none; }
  .footnote { margin: 1.5rem 0 0; font-size: 0.8125rem; color: var(--oc-text-weak); }
  .spinner { animation: oc-spin 0.8s linear infinite; transform-origin: center; }
  @keyframes oc-spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }
`;
});
import { createConnection as yFa } from "net";
import { createServer as MFa } from "http";