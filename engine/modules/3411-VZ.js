
var VZ = ne(() => {
  VZ();
  Gt();
  ISt();
  ISt();
  JGe = class JGe extends ki()("PermissionRejectedError", {}) {
    get message() {
      return "The user rejected permission to use this specific tool call.";
    }
  };
  Hvi = class Hvi extends ki()("PermissionCorrectedError", { feedback: re }) {
    get message() {
      return `The user rejected permission to use this specific tool call with the following feedback: ${this.feedback}`;
    }
  };
  cvi = class cvi extends ki()("PermissionDeniedError", { ruleset: e0 }) {
    get message() {
      return `The user has specified a rule which prevents you from using this specific tool call. Here are some of the relevant rules ${JSON.stringify(this.ruleset)}`;
    }
  };
  Avi = class Avi extends ki()("Permission.NotFoundError", { requestID: GG }) {};
});