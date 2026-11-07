
var ezn = Ie(function (BAc, xAr) {
  var C0t = cr("fs"),
    zKn = cr("os"),
    QKn = cr("path"),
    YKn = sAr(),
    KKn = QKn.join(zKn.homedir(), ".gitconfig"),
    $7e = null,
    ZKn = () => {
      if ($7e === null)
        try {
          if ((($7e = {}), C0t.existsSync(KKn))) {
            let e = C0t.readFileSync(KKn, "utf-8");
            $7e = YKn.parse(e);
          }
        } catch (e) {
          $7e = {};
        }
      return $7e;
    },
    Zwo = () => {
      let e = ZKn();
      return {
        sshCommandSetInConfig: e?.core?.sshCommand !== void 0,
        askPassSetInConfig: e?.core?.askpass !== void 0,
      };
    },
    eko = process.env.GIT_SSH_COMMAND !== void 0,
    tko = process.env.GIT_ASKPASS !== void 0,
    { sshCommandSetInConfig: rko, askPassSetInConfig: nko } = Zwo(),
    iko = {
      ...(tko || nko ? {} : { GIT_ASKPASS: "echo" }),
      ...(eko || rko ? {} : { GIT_SSH_COMMAND: "ssh -oStrictHostKeyChecking=accept-new" }),
    };
  xAr.exports = (e = {}) => ({ stdioString: !0, ...e, shell: !1, env: e.env || { ...iko, ...process.env } });
  xAr.exports.loadGitConfig = ZKn;
});