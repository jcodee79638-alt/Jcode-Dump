
function IRi(e) {
  let t = e.detail?.trim();
  return `<main class="card" id="oc-card" data-status="${e.status}" role="status" aria-live="polite">
      <div class="brand">${gFa}</div>
      <div class="status" aria-hidden="true">
        <span class="icon icon-pending">${DFa}</span>
        <span class="icon icon-success">${EFa}</span>
        <span class="icon icon-error">${IFa}</span>
      </div>
      <h1 class="headline" id="oc-headline">${lPe(e.headline)}</h1>
      <p class="message" id="oc-message">${e.message}</p>
      <pre class="detail" id="oc-detail"${t ? "" : " hidden"}>${t ? lPe(t) : ""}</pre>
      <p class="footnote" id="oc-footnote">${lPe(e.footnote)}</p>
    </main>`;
}