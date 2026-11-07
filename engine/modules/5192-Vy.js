
var Vy = ne(async () => {
  Gt();
  await Jn([SX(), Jw(), Vy()]);
  L4i = class L4i extends ki()("ToolInvalidArgumentsError", { tool: re, detail: re }) {
    get message() {
      return `The ${this.tool} tool was called with invalid arguments: ${this.detail}.
Please rewrite the input so it satisfies the expected schema.`;
    }
  };
});