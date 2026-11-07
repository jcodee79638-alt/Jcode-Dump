const fs = require("fs");
const which = process.argv[2];
const file = which === "engine" ? "src/engine.pretty.js" : "src/main.pretty.js";
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
const probes =
  which === "engine"
    ? [
        ["gateway", /jaccoder-private-gateway/],
        ["providerRegistration", /family: "jaccoder"/],
        ["sessionRoute", /"\/session"/],
        ["eventRoute", /"\/global\/event"/],
        ["applyPatchTool", /apply_patch/],
        ["permissionDeny", /action: "deny"/],
        ["initOp", /"init"/],
      ]
    : [
        ["windowOptions", /^function xs/],
        ["engineRpcClass", /^class Cr/],
        ["integrityCheck", /client-integrity/],
        ["schemeRegistration", /registerSchemesAsPrivileged/],
        ["rendererUrl", /Gt = si.pathToFileURL/],
        ["ipcHandler", /ipcMain.handle\("jac:invoke"/],
        ["windowOpen", /setWindowOpenHandler/],
      ];
for (const [name, re] of probes) {
  const i = lines.findIndex((l) => re.test(l));
  console.log(name.padEnd(22), String(i + 1).padStart(7), i >= 0 ? lines[i].trim().slice(0, 100) : "");
}
