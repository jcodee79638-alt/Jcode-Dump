
var vht = ne(() => {
  vht();
  Gt();
  ((qse = Jo(["ask", "allow", "deny"]).annotate({ identifier: "PermissionActionConfig" })),
    (nZs = ks(re, qse).annotate({ identifier: "PermissionObjectConfig" })),
    (xV = Io([qse, nZs]).annotate({ identifier: "PermissionRuleConfig" })),
    (Q1n = fG(
      nt({
        read: be(xV),
        edit: be(xV),
        glob: be(xV),
        grep: be(xV),
        list: be(xV),
        bash: be(xV),
        task: be(xV),
        external_directory: be(xV),
        todowrite: be(qse),
        question: be(qse),
        webfetch: be(qse),
        websearch: be(qse),
        lsp: be(xV),
        doom_loop: be(qse),
        skill: be(xV),
      }),
      [ks(re, xV)],
    )),
    (iZs = Io([qse, Q1n])),
    (Y1n = iZs
      .pipe(v$(Q1n, { decode: Sm(sZs), encode: QC({ strict: !1 }) }))
      .annotate({ identifier: "PermissionConfig" })));
});