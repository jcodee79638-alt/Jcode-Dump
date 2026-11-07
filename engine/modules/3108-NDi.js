
var NDi = "bash",
  i$r = 120000,
  s$r = 600000,
  tma = 1048576,
  rma,
  FDi,
  nma,
  ima = () => process.env.COMSPEC ?? "cmd.exe",
  sma = (e) => {
    let t = e.warnings?.length
      ? `

Warnings:
${e.warnings.map((r) => `- ${r}`).join(`
`)}`
      : "";
    if (e.timeout)
      return `${t.trimStart()}${
        t
          ? `

`
          : ""
      }Command timed out before completion.`;
    return `${t.trimStart()}${
      t
        ? `

`
        : ""
    }Command exited with code ${e.exit}.`;
  },
  oma = (e) => e.cause instanceof Error && e.cause.message === "Timed out",
  ama = (e) => e.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [],
  Hma = (e) => e.replace(/^(['"])(.*)\1$/, "$2"),
  cma,
  Ama,
  uma;