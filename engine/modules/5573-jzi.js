
var jzi = ne(() => {
  Gt();
  Szi();
  Yee();
  ((BMA = nt({ code: re })),
    (EQa = Jo([
      "ParseError",
      "UnsupportedSyntax",
      "UnknownTool",
      "InvalidToolInput",
      "InvalidToolOutput",
      "InvalidDataValue",
      "ToolCallLimitExceeded",
      "TimeoutExceeded",
      "ToolFailure",
      "ExecutionFailure",
    ])),
    (IQa = nt({
      kind: EQa,
      message: re,
      location: nw(nt({ line: Aa, column: Aa })),
      suggestions: nw(On(re)),
    })),
    (Tzi = nt({ name: re })),
    (DQa = nt({ ok: ri(!0), value: Qie, logs: nw(On(re)), truncated: nw(Vi), toolCalls: On(Tzi) })),
    (yQa = nt({ ok: ri(!1), error: IQa, logs: nw(On(re)), truncated: nw(Vi), toolCalls: On(Tzi) })),
    (RMA = Io([DQa, yQa])));
});