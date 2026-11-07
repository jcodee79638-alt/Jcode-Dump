
var Kne = ne(() => {
  od();
  Oen();
  Ben();
  Gfe();
  CFe();
  CFe();
  Sc = class Sc extends Error {
    kind;
    retryAfter;
    constructor(e = "signin", t = 60) {
      super(
        e === "signup"
          ? "This device or network has reached its signup allowance. Sign in to an existing account or contact Jac. Use the latest Windows app to register."
          : e === "throttled"
            ? `Too many sign-in attempts. Try again in ${Math.max(1, Math.ceil(Math.min(3600, Math.max(1, t)) / 60))} minute(s).`
            : e === "credentials"
              ? "Could not sign in. Check your email and password, then try again."
              : e === "update"
                ? "Jac Code requires an update. Close and reopen Jac Code to update automatically."
                : e === "terminal"
                  ? "Sign-in requires an interactive terminal. Run jac login in a terminal window."
                  : e === "reset"
                    ? "No banked reset is available. Run jac account to check your balance."
                    : e === "unavailable"
                      ? "Jac Code sign-in service is unavailable. Try again later."
                      : e === "cancelled"
                        ? "Jac Code sign-in was cancelled."
                        : e === "storage"
                          ? "Jac Code could not protect your session. Reinstall Jac Code or contact Jac."
                          : "Sign in to Jac Code with jac login.",
      );
      this.kind = e;
      this.retryAfter = t;
      this.name = "SessionError";
    }
  };
  BFe = class BFe extends Error {
    expiresIn;
    #e;
    constructor(e, t) {
      super("Change your temporary password before signing in.");
      this.expiresIn = t;
      ((this.#e = e), (this.name = "PasswordChangeRequired"));
    }
    get challenge() {
      return this.#e;
    }
  };
  bAt = d8s({ store: l8s() });
  Xen = L8s(AQ);
});