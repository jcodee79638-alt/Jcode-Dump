
async function exr(e) {
  return YRi(`tell application "Finder" to set app_path to application file id "${e}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}