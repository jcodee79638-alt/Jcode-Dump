
class Wn {
  static get isDarkMode() {
    return k(this, "isDarkMode", !!window?.matchMedia?.("(prefers-color-scheme: dark)").matches);
  }
}