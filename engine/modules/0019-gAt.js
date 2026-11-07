
function gAt(e) {
  return [
    { permission: "*", pattern: "*", action: e === "read" ? "deny" : e === "full" ? "allow" : "ask" },
    ...[
      "read",
      "glob",
      "grep",
      "list",
      "lsp",
      "todowrite",
      "todoread",
      "question",
      "task",
      "jac_harness",
    ].map((r) => ({ permission: r, pattern: "*", action: "allow" })),
    { permission: "external_directory", pattern: "*", action: "ask" },
    { permission: "doom_loop", pattern: "*", action: "ask" },
    { permission: "read", pattern: "*.env", action: "ask" },
    { permission: "read", pattern: "*.env.*", action: "ask" },
    { permission: "read", pattern: "*.env.example", action: "allow" },
    { permission: "plan_enter", pattern: "*", action: "deny" },
    { permission: "plan_exit", pattern: "*", action: "deny" },
  ];
}