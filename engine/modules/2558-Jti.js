
var Jti = Ie(function (ffc, Xti) {
  var eIt = new Set(),
    jlr = !1,
    Plr = ["SIGINT", "SIGTERM"],
    Clr = (e) => {
      for (let t of eIt) t.kill(e);
    },
    q2o = () => {
      for (let e of Plr) process.on(e, Clr);
      jlr = !0;
    },
    G2o = () => {
      if (eIt.size === 0) {
        for (let e of Plr) process.removeListener(e, Clr);
        jlr = !1;
      }
    },
    X2o = (e) => {
      if ((eIt.add(e), !jlr)) q2o();
      e.once("exit", () => {
        (eIt.delete(e), G2o());
      });
    };
  Xti.exports = { add: X2o, handleSignal: Clr, forwardedSignals: Plr };
});