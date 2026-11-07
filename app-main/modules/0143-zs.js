
function zs(e) {
  return e
    .flatMap((t) =>
      t.parts.flatMap((n) => {
        if (n.type !== "tool" || !["bash", "shell"].includes(n.tool ?? "") || !n.command) return [];
        if (
          !/(?:^|[\s;&|])(?:(?:bun|npm|pnpm|yarn)\s+(?:run\s+)?(?:test|typecheck|lint|check|build)\b|(?:pytest|vitest|jest|eslint|tsc)(?:\s|$)|(?:dotnet|cargo|go|make)\s+(?:test|build|check|clippy|vet)\b|(?:node|bun|python3?)\s+(?:-m\s+(?:pytest|unittest)\b|["']?[^\s;&|]*(?:test|spec|check|verify)[^\s;&|]*\.(?:[cm]?js|tsx?|py)\b))/i.test(
            n.command,
          )
        )
          return [];
        let i = /[;\n\r|&]/.test(n.command);
        return [
          {
            id: n.id,
            label: n.command.slice(0, 500),
            status:
              n.status === "completed" && Number.isSafeInteger(n.exitCode)
                ? n.exitCode !== 0
                  ? "failed"
                  : i
                    ? "unknown"
                    : "passed"
                : n.status === "error"
                  ? "failed"
                  : "unknown",
            ...(n.exitCode === void 0 ? {} : { exitCode: n.exitCode }),
            output: n.output?.slice(-4000),
          },
        ];
      }),
    )
    .slice(-50);
}