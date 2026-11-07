
var Qwr = ne(() => {
  UP = class UP extends Error {
    constructor() {
      super(
        "Jac Code must check and install its latest update before continuing. The update could not finish; your installation, projects and chats are kept. Check your connection and permissions, then run jac again in a terminal.",
      );
      this.name = "UpdateError";
    }
  };
});
for (let e of Object.keys(process.env))
  if (e.startsWith("OPENCODE_") && e !== "OPENCODE_WORKER_PATH") delete process.env[e];
process.env.OPENCODE_DISABLE_AUTOUPDATE = "true";
process.env.OPENCODE_DISABLE_DEFAULT_PLUGINS = "true";
process.env.OPENCODE_DISABLE_CLAUDE_CODE = "true";
process.env.OPENCODE_DISABLE_EXTERNAL_SKILLS = "true";
process.env.OPENCODE_DISABLE_MODELS_FETCH = "true";
process.env.OPENCODE_DISABLE_PROJECT_CONFIG = "true";
process.env.OPENCODE_DISABLE_INSTRUCTIONS = "true";
process.env.OPENCODE_PURE = "true";
process.env.DO_NOT_TRACK = "1";
import SR from "path";
import qaH from "os";
import { spawn as ess } from "child_process";
import { copyFile as GaH, mkdtemp as XaH, realpath as Ywr } from "fs/promises";
import { createInterface as JaH } from "readline";
TFe();
import HQ from "path";
import b6s from "os";
import { mkdir as j6s, readFile as gJt, rename as P6s, open as C6s } from "fs/promises";
import { randomUUID as w6s } from "crypto";