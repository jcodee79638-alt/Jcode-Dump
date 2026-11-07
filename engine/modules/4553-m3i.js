
function m3i(e) {
  return Object.fromEntries(
    Object.entries(e).filter(([t]) =>
      /^(?:path|pathext|systemroot|windir|comspec|temp|tmp|userprofile|homedrive|homepath|appdata|localappdata|programfiles(?:\(x86\))?|programdata|commonprogramfiles(?:\(x86\))?|number_of_processors|processor_architecture|lang|lc_all|term|home)$/i.test(
        t,
      ),
    ),
  );
}
import G2a from "path";
import { pathToFileURL as X2a } from "url";